import {
  endSoftNav,
  hasSoftNavFailure,
  inSoftNavigation,
  setSoftNavFailReason,
  softNavFailed,
  softNavInitial,
  softNavSucceeded,
  startSoftNav
} from '../soft-nav-helpers'
import {isFeatureEnabled} from '../features'
interface ProgressBar {
  setValue(n: number): void
  hide(): void
  show(): void
}
interface BrowserAdapter {
  progressBar: ProgressBar
}
interface HeadSnapshot {
  detailsByOuterHTML: {
    [outerHTML: string]: {
      tracked: boolean
      elements: Element[]
    }
  }
}

if (isFeatureEnabled('TURBO')) {
  ;(async () => {
    const {PageRenderer, session} = await import('@hotwired/turbo')
    const adapter = session.adapter as typeof session.adapter & BrowserAdapter

    document.addEventListener('turbo:before-fetch-request', event => {
      const frame = event.target
      if ((frame as Element)?.tagName === 'TURBO-FRAME') {
        adapter.progressBar.setValue(0)
        adapter.progressBar.show()
      }
    })

    document.addEventListener('turbo:frame-render', event => {
      const frame = event.target
      if ((frame as Element)?.tagName === 'TURBO-FRAME') {
        adapter.progressBar.setValue(100)
        adapter.progressBar.hide()
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const originalTrackedElementsAreIdentical = Object.getOwnPropertyDescriptor(
      PageRenderer.prototype,
      'trackedElementsAreIdentical'
    ).get!
    Object.defineProperty(PageRenderer.prototype, 'trackedElementsAreIdentical', {
      get() {
        const identical = originalTrackedElementsAreIdentical.call(this)
        if (!identical)
          setReasonForTurboFail(this.currentHeadSnapshot as HeadSnapshot, this.newHeadSnapshot as HeadSnapshot)
        return identical
      }
    })

    function setReasonForTurboFail(current: HeadSnapshot, next: HeadSnapshot) {
      const currentTracked = Object.fromEntries(getSnapshotSignatures(current))
      for (const [key, value] of getSnapshotSignatures(next)) {
        if (currentTracked[key] !== value) {
          setSoftNavFailReason(`${key.replace(/^x-/, '')} changed`)
          break
        }
      }
    }

    function* getSnapshotSignatures(snapshot: HeadSnapshot): IterableIterator<[string, string]> {
      for (const detail of Object.values(snapshot.detailsByOuterHTML)) {
        if (detail.tracked) {
          for (const element of detail.elements) {
            if (element instanceof HTMLMetaElement && element.getAttribute('http-equiv')) {
              yield [element.getAttribute('http-equiv') || '', element.getAttribute('content') || '']
            }
          }
        }
      }
    }
  })()

  const isIntraPageNavigation = (currentUrl: string, targetUrl: string): boolean => {
    const current = new URL(currentUrl, window.location.origin)
    const target = new URL(targetUrl, window.location.origin)

    return current.host === target.host && current.pathname === target.pathname
  }

  document.addEventListener('turbo:click', function (event) {
    if (!(event.target instanceof HTMLElement)) return

    const el = event.target.closest('[data-turbo-frame]')
    if (el instanceof HTMLElement) {
      event.target.setAttribute('data-turbo-frame', el.getAttribute('data-turbo-frame') || '')
    }

    if (!(event instanceof CustomEvent)) return
    // https://github.com/hotwired/turbo/issues/539
    // If we are doing an intra-page navigation, we want to prevent Turbo from performing a visit
    // so it won't mess with focus styles.
    if (isIntraPageNavigation(location.href, event.detail.url)) {
      event.preventDefault()
    }
  })

  document.addEventListener('turbo:before-render', event => {
    if (!(event instanceof CustomEvent)) return

    const newDocument: HTMLHtmlElement = event.detail.newBody.ownerDocument.documentElement
    const currentDocument = document.documentElement

    for (const attr of currentDocument.attributes) {
      if (!newDocument.hasAttribute(attr.nodeName) && attr.nodeName !== 'aria-busy') {
        currentDocument.removeAttribute(attr.nodeName)
      }
    }

    for (const attr of newDocument.attributes) {
      if (currentDocument.getAttribute(attr.nodeName) !== attr.nodeValue) {
        currentDocument.setAttribute(attr.nodeName, attr.nodeValue!)
      }
    }
  })

  document.addEventListener('turbo:visit', startSoftNav)
  document.addEventListener('turbo:render', endSoftNav)
  document.addEventListener('beforeunload', endSoftNav)

  document.addEventListener('turbo:load', event => {
    const isHardLoad = Object.keys((event as CustomEvent).detail.timing).length === 0
    if (!isHardLoad) {
      softNavSucceeded()
    } else if (hasSoftNavFailure() || inSoftNavigation()) {
      softNavFailed()
    } else {
      softNavInitial()
    }
  })
}
