// If the current page is openable in blackbird, do so on click.
// This would be achievable without any custom JS by just using
// data-hotkey except for two things:
//  - PJAX and other replaceState-triggered location updates like
//    the `y` hotkey need to be respected.
//  - the editor cares about the hash of the page.
// So we'll construct the href client-side.

import {on} from 'delegated-events'

export function getBlackbirdURL(blackbirdLink: HTMLAnchorElement, currentURL: URL, selection?: string): URL {
  const output = new URL('', window.location.origin)
  const pathComponents = currentURL.pathname.split('/')
  output.pathname = pathComponents.slice(1, 3).join('/')
  output.hash = currentURL.hash

  // If the user has currently selected something, search for that
  if (selection) {
    output.search = `?q=${encodeURIComponent(selection)}`
  }

  // If the URL contains a ?q=..., let's forward that to blackbird
  const u = new URLSearchParams(currentURL.search)
  const search = u.get('q')
  if (search) {
    output.search = `?q=${encodeURIComponent(search)}`
  }

  // If the path is a blob or tree view path, jump to the corresponding view in blackbird
  else if (pathComponents.length >= 6 && (pathComponents[3] === 'blob' || pathComponents[3] === 'tree')) {
    output.pathname = currentURL.pathname
  }

  output.host = blackbirdLink.host
  output.protocol = blackbirdLink.protocol
  output.port = blackbirdLink.port
  return output
}

on('click', '.js-blackbird-shortcut', function (event) {
  // Assumption: the href of the shortcut is the base URL for
  // the blackbird frontend, e.g. https://cs.github.com/
  const target = event.currentTarget as HTMLAnchorElement
  const blackbirdURL = getBlackbirdURL(
    target,
    new URL(window.location.href, window.location.origin),
    window.getSelection()?.toString()
  )
  target.href = blackbirdURL.href
})
