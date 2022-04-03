import {persistResumableFields, restoreResumableFields, setForm} from '@github/session-resume'
import {debounce} from '@github/mini-throttle'
import {getPageID} from '../session-resume-helpers'
import {observe} from 'selector-observer'

const debouncedRestoreResumableFields = debounce(function () {
  restoreResumableFields(getPageID())
}, 50)

/**
 * Returns true while turbo is showing a "preview" of the route from cache: in other words between
 * the time a route is visited and the time it is loaded
 * @returns boolean
 */
function isTurboRenderingCachePreview(): boolean {
  return document.querySelector('html')?.hasAttribute('data-turbo-preview') ?? false
}

// Session Resume.
//
// Annotate fields to be persisted on navigation away from the current page.
// Fields be automatically restored when the user revists the page again in
// their current browser session (excludes seperate tabs).
//
// Not design for persisted crash recovery.

// Listen for all form submit events and to see if their default submission
// behavior is invoked.
window.addEventListener('submit', setForm, {capture: true})

// Resume field content on regular page loads.
window.addEventListener('pageshow', function () {
  restoreResumableFields(getPageID())
})

// Resume field content on pjax page loads.
window.addEventListener('pjax:end', function () {
  restoreResumableFields(getPageID())
})

// Resume field content on elements that are added later
// We use a debounced version to avoid repeatedly calling it if multiple
// fields are added
observe('.js-session-resumable', function () {
  // we don't want to restore fields on turbo-cache previews as that empties the cache
  // causing the fields to be lost when turbo re-renders with the fetched page
  if (!isTurboRenderingCachePreview()) {
    debouncedRestoreResumableFields()
  }
})

// Persist resumable fields when page is unloaded
window.addEventListener('pagehide', function () {
  persistResumableFields(getPageID(), {selector: '.js-session-resumable'})
})

// Persist resumable fields before pjax swaps them out
window.addEventListener('pjax:beforeReplace', function (event) {
  const state = event.detail.previousState
  const url = state ? state.url : null

  if (url) {
    persistResumableFields(getPageID(new URL(url, window.location.origin)), {selector: '.js-session-resumable'})
  } else {
    const error = new Error('pjax:beforeReplace event.detail.previousState.url is undefined')
    setTimeout(function () {
      throw error
    })
  }
})

// preserve fields before navigating away
window.addEventListener('turbo:before-visit', function () {
  persistResumableFields(getPageID(), {selector: '.js-session-resumable'})
})

// restore fields once turbo navigation has finished
window.addEventListener('turbo:load', function () {
  restoreResumableFields(getPageID())
})
