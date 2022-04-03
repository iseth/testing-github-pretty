import {fromEvent} from '../subscription'
import {observe} from 'selector-observer'

observe('.js-branch-merge-queue-link', {
  subscribe: mergeQueueLink =>
    fromEvent(mergeQueueLink, 'socket:message', async function (event: Event) {
      const newCount = (event as CustomEvent).detail.data.queue_entries_count
      const singularMessage = (mergeQueueLink as HTMLElement).getAttribute('data-singular-message')
      const pluralMessage = (mergeQueueLink as HTMLElement).getAttribute('data-plural-message')

      if (newCount === '1') {
        ;(mergeQueueLink as HTMLElement).textContent = `${newCount} ${singularMessage}`
      } else {
        ;(mergeQueueLink as HTMLElement).textContent = `${newCount} ${pluralMessage}`
      }
    })
})
