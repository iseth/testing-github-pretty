// Append any window.location.hash changes to the permalink.
//
// For example, if you're viewing:
// /github/linguist/blob/master/lib/linguist/languages.yml#L12
//
// You probably want the permalink to preserve the #L12, and go to:
// /github/linguist/blob/SHA/lib/linguist/languages.yml#L12
//
//
// Also update link that we want to keep in sync with the permalink change.
//
// For example, if you `y` a Markdown file and click the "Display as source blob"
// button, probably you want its link (href) to change from:
// /github/linguist/blob/master/README.md?plain=1
//
// to:
// /github/linguist/blob/SHA/README.md?plain=1

import {on} from 'delegated-events'
import {replaceState} from '../history'

on('click', '.js-permalink-shortcut', function (event) {
  const target = event.currentTarget as HTMLAnchorElement
  try {
    replaceState(null, '', target.href + window.location.hash)
  } catch (error) {
    window.location.href = target.href + window.location.hash
  }
  for (const element of document.querySelectorAll('.js-permalink-replaceable-link')) {
    if (element instanceof HTMLAnchorElement) {
      element.href = element.getAttribute('data-permalink-href')!
    }
  }
  event.preventDefault()
})
