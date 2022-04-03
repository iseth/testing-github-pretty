import type {AliveEvent, Metadata, MetadataUpdate, Notifier, Subscription} from '@github/alive-client'
import {IDLE_METADATA_KEY, PresenceMetadataSet, SubscriptionSet, Topic, isPresenceChannel} from '@github/alive-client'
import {compose, fromEvent} from '../subscription'

import {AliveSession} from '../alive-session'
import {addIdleStateListener} from '../alive/idle-state'
import {debounce} from '@github/mini-throttle'
import {isFeatureEnabled} from '../features'
import {observe} from 'selector-observer'
import {ready} from '../document-ready'
import safeStorage from '../safe-storage'
import {taskQueue} from '../eventloop-tasks'

function isSharedWorkerSupported(): boolean {
  return 'SharedWorker' in window && safeStorage('localStorage').getItem('bypassSharedWorker') !== 'true'
}

function workerSrc(): string | null {
  return document.head.querySelector<HTMLLinkElement>('link[rel=shared-web-socket-src]')?.href ?? null
}

function socketUrl(): string | null {
  return document.head.querySelector<HTMLLinkElement>('link[rel=shared-web-socket]')?.href ?? null
}

function socketRefreshUrl(): string | null {
  return (
    document.head.querySelector<HTMLLinkElement>('link[rel=shared-web-socket]')?.getAttribute('data-refresh-url') ??
    null
  )
}

function sessionIdentifier(): string | null {
  return (
    document.head.querySelector<HTMLLinkElement>('link[rel=shared-web-socket]')?.getAttribute('data-session-id') ?? null
  )
}

function subscriptions(el: Element): Array<Subscription<Element>> {
  return channels(el).map((topic: Topic) => ({subscriber: el, topic}))
}

export function channels(el: Element): Topic[] {
  const names = (el.getAttribute('data-channel') || '').trim().split(/\s+/)
  return names.map(Topic.parse).filter(isPresent)
}

function isPresent(value: Topic | null): value is Topic {
  return value != null
}

function notify(subscribers: Iterable<Element>, {channel, type, data}: AliveEvent) {
  for (const el of subscribers) {
    el.dispatchEvent(
      new CustomEvent(`socket:${type}`, {
        bubbles: false,
        cancelable: false,
        detail: {name: channel, data}
      })
    )
  }
}

class AliveSessionProxy {
  private worker: SharedWorker
  private subscriptions = new SubscriptionSet<Element>()
  private presenceMetadata = new PresenceMetadataSet<Element>()
  private notify: Notifier<Element>

  constructor(src: string, url: string, refreshUrl: string, sessionId: string, notifier: Notifier<Element>) {
    this.notify = notifier
    this.worker = new SharedWorker(src, `github-socket-worker-v2-${sessionId}`)
    this.worker.port.onmessage = ({data}) => this.receive(data)
    this.worker.port.postMessage({connect: {url, refreshUrl}})
  }

  subscribe(subs: Array<Subscription<Element>>) {
    const added = this.subscriptions.add(...subs)
    if (added.length) {
      this.worker.port.postMessage({subscribe: added})
    }

    // We may be adding a subscription to a presence channel which is already subscribed.
    // In this case, we need to explicitly ask the SharedWorker to send us the presence data.
    const addedChannels = new Set(added.map(topic => topic.name))
    const redundantPresenceChannels = subs.reduce((redundantChannels, subscription) => {
      const channel = subscription.topic.name

      if (isPresenceChannel(channel) && !addedChannels.has(channel)) {
        redundantChannels.add(channel)
      }

      return redundantChannels
    }, new Set<string>())

    if (redundantPresenceChannels.size) {
      this.worker.port.postMessage({requestPresence: Array.from(redundantPresenceChannels)})
    }
  }

  unsubscribeAll(...subscribers: Element[]) {
    const removed = this.subscriptions.drain(...subscribers)
    if (removed.length) {
      this.worker.port.postMessage({unsubscribe: removed})
    }

    const updatedPresenceChannels = this.presenceMetadata.removeSubscribers(subscribers)
    this.sendPresenceMetadataUpdate(updatedPresenceChannels)
  }

  updatePresenceMetadata(metadataUpdates: Array<MetadataUpdate<Element>>) {
    const updatedChannels = new Set<string>()

    for (const update of metadataUpdates) {
      // update the local metadata for this specific element
      this.presenceMetadata.setMetadata(update)
      updatedChannels.add(update.channelName)
    }

    // Send the full local metadata for these channels to the SharedWorker
    this.sendPresenceMetadataUpdate(updatedChannels)
  }

  sendPresenceMetadataUpdate(channelNames: Set<string>) {
    if (!channelNames.size) {
      return
    }

    const updatesForSharedWorker: Array<Omit<MetadataUpdate<Element>, 'subscriber'>> = []

    for (const channelName of channelNames) {
      // get all metadata for this channel (from all elements) to send to the SharedWorker
      updatesForSharedWorker.push({
        channelName,
        metadata: this.presenceMetadata.getChannelMetadata(channelName)
      })
    }

    // Send the full metadata updates to the SharedWorker
    this.worker.port.postMessage({updatePresenceMetadata: updatesForSharedWorker})
  }

  online() {
    this.worker.port.postMessage({online: true})
  }

  offline() {
    this.worker.port.postMessage({online: false})
  }

  hangup() {
    this.worker.port.postMessage({hangup: true})
  }

  private notifyPresenceDebouncedByChannel = new Map<string, Notifier<Element>>()
  private receive(event: AliveEvent) {
    const {channel} = event

    if (event.type === 'presence') {
      // There are times when we get a flood of messages from the SharedWorker, such as a tab that has been idle for a long time and then comes back to the foreground.
      // Since each presence message for a channel contains the full list of users, we can debounce the events and only notify subscribers with the last one
      let debouncedNotify = this.notifyPresenceDebouncedByChannel.get(channel)
      if (!debouncedNotify) {
        debouncedNotify = debounce((subscribers, debouncedEvent) => {
          this.notify(subscribers, debouncedEvent)
          this.notifyPresenceDebouncedByChannel.delete(channel)
        }, 100)
        this.notifyPresenceDebouncedByChannel.set(channel, debouncedNotify)
      }

      debouncedNotify(this.subscriptions.subscribers(channel), event)
      return
    }

    // For non-presence messages, we can send them through immediately since they may contain different messages/data
    this.notify(this.subscriptions.subscribers(channel), event)
  }
}

function connect() {
  const src = workerSrc()
  if (!src) return

  const url = socketUrl()
  if (!url) return

  const refreshUrl = socketRefreshUrl()
  if (!refreshUrl) return

  const sessionId = sessionIdentifier()
  if (!sessionId) return

  const createSession = () => {
    if (isSharedWorkerSupported()) {
      try {
        return new AliveSessionProxy(src, url, refreshUrl, sessionId, notify)
      } catch (_) {
        // ignore errors.  CSP will some times block SharedWorker creation. Fall back to standard AliveSession.
      }
    }

    return new AliveSession(url, refreshUrl, false, notify)
  }
  const session = createSession()

  type Subs = Array<Subscription<Element>>
  const queueSubscribe = taskQueue<Subs>(subs => session.subscribe(subs.flat()))
  const queueUnsubscribe = taskQueue<Element>(els => session.unsubscribeAll(...els))
  const queueMetadata = taskQueue<MetadataUpdate<Element>>(updates => session.updatePresenceMetadata(updates))

  observe('.js-socket-channel[data-channel]', {
    subscribe: el => {
      const elementSubscriptions = subscriptions(el)
      const presenceChannels = elementSubscriptions
        .map(subscription => subscription.topic.name)
        .filter(channelName => isPresenceChannel(channelName))

      let listenerSubscription = {
        unsubscribe() {
          // nothing to clean up by default.  This will be overridden if there are presence channels
        }
      }

      if (presenceChannels.length) {
        let latestMetadata: Metadata | undefined = undefined
        let latestIdle: boolean | undefined
        const queueMetadataOrIdleChange = () => {
          const metadata: Metadata[] = []

          // combine metadata and idle values
          if (latestMetadata) {
            metadata.push(latestMetadata)
          }
          if (latestIdle !== undefined) {
            metadata.push({[IDLE_METADATA_KEY]: latestIdle ? 1 : 0})
          }

          // Send the metadata to all presence channels on this element
          for (const channelName of presenceChannels) {
            queueMetadata({subscriber: el, channelName, metadata})
          }
        }

        listenerSubscription = compose(
          // listen for metadata updates emitted on the element
          fromEvent(el, 'socket:set-presence-metadata', (e: Event) => {
            const {detail} = e as CustomEvent
            latestMetadata = detail
            queueMetadataOrIdleChange()
          }),
          // listen for idle changes, which will cause us to send a metadata update
          addIdleStateListener(idle => {
            if (!isFeatureEnabled('PRESENCE_IDLE')) {
              return
            }
            latestIdle = idle
            queueMetadataOrIdleChange()
          })
        )
      }

      // Process normal subscriptions after setting up metadata listeners
      // This needs to come second so that idle state is ready when we subscribe
      queueSubscribe(elementSubscriptions)

      return listenerSubscription
    },
    remove: el => queueUnsubscribe(el)
  })

  window.addEventListener('online', () => session.online())
  window.addEventListener('offline', () => session.offline())
  window.addEventListener('pagehide', () => {
    if ('hangup' in session) session.hangup()
  })
}

;(async () => {
  await ready
  connect()
})()
