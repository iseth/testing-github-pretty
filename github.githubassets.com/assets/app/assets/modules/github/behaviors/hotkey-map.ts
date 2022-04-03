// Hotkey Behavior
//
// See https://github.com/github/hotkey

import {areCharacterKeyShortcutsEnabled, isNonCharacterKeyShortcut} from './keyboard-shortcuts-helper'
import {install, uninstall} from '@github/hotkey'
import {observe} from 'selector-observer'

// Disable character key shortcuts based on user preference
observe('[data-hotkey]', {
  constructor: HTMLElement,
  add(element) {
    if (areCharacterKeyShortcutsEnabled()) {
      install(element)
    } else {
      const shortcut = element.getAttribute('data-hotkey')
      if (shortcut) {
        const validShortcuts = filterOutCharacterKeyShortcuts(shortcut)
        if (validShortcuts.length > 0) {
          element.setAttribute('data-hotkey', validShortcuts)
          install(element)
        }
      }
    }
  },
  remove(element) {
    uninstall(element)
  }
})

// This function keeps non-character key shortcuts and filters out character key shortcuts.
// See `isNonCharacterKeyShortcut` for more information.
export default function filterOutCharacterKeyShortcuts(string: string) {
  const shortcuts = string.split(',')
  return shortcuts
    .filter((s: string) => {
      return isNonCharacterKeyShortcut(s)
    })
    .join(',')
}
