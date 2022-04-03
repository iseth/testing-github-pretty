import {dialog} from '../details-dialog'
import {eventToHotkeyString} from '@github/hotkey'
import {fetchSafeDocumentFragment} from '../fetch'
import {isFormField} from '../form'
import {isShortcutAllowed} from './keyboard-shortcuts-helper'
import {observe} from 'selector-observer'
import {on} from 'delegated-events'

let shortcutModalShown = false

async function showKeyboardShortcuts() {
  if (shortcutModalShown) return
  shortcutModalShown = true

  const metaKeyboardShortcuts = document.querySelector<HTMLMetaElement>('meta[name=github-keyboard-shortcuts]')!
  const options = {contexts: metaKeyboardShortcuts.content}
  const url = `/site/keyboard_shortcuts?${new URLSearchParams(options).toString()}`

  const shortcutModal = await dialog({
    content: fetchSafeDocumentFragment(document, url),
    labelledBy: 'keyboard-shortcuts-heading'
  })
  shortcutModal.style.width = '800px'
  shortcutModal.addEventListener(
    'dialog:remove',
    function () {
      shortcutModalShown = false
    },
    {once: true}
  )
}

// Toggles ajax request to display keyboard shortcuts.
//
// Add a class of `js-keyboard-shortcuts` to get this behavior on your page.
on('click', '.js-keyboard-shortcuts', showKeyboardShortcuts)

document.addEventListener('keydown', (event: Event) => {
  if (!(event instanceof KeyboardEvent)) return
  if (!isShortcutAllowed(event)) return

  if (event.target instanceof Node && isFormField(event.target)) return
  if (eventToHotkeyString(event) !== 'Shift+?') return
  showKeyboardShortcuts()
})

observe('.js-modifier-key', {
  constructor: HTMLElement,
  add(container) {
    if (/Macintosh/.test(navigator.userAgent)) {
      let shortcut = container.textContent
      if (shortcut) {
        shortcut = shortcut.replace(/ctrl/, '⌘')
        shortcut = shortcut.replace(/alt/, '⌥')
        container.textContent = shortcut
      }
    }
  }
})

observe('.js-modifier-label-key', {
  add(container) {
    let shortcutLabel = container.textContent?.replace(/ctrl/i, 'Ctrl')
    if (!shortcutLabel) return
    if (/Macintosh/.test(navigator.userAgent)) {
      shortcutLabel = shortcutLabel.replace(/ctrl/i, 'Cmd')
      shortcutLabel = shortcutLabel.replace(/alt/i, 'Option')
    }
    container.textContent = shortcutLabel
  }
})
