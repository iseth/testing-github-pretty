import {eventToHotkeyString} from '@github/hotkey'

// Returns false if a user has explicitly disabled character key shortcuts.
export const areCharacterKeyShortcutsEnabled = () => {
  const keyboardShortcutsPreference = document.querySelector<HTMLMetaElement>(
    'meta[name=keyboard-shortcuts-preference]'
  )
  if (keyboardShortcutsPreference) {
    return keyboardShortcutsPreference.content === 'all'
  }
  return true
}

// Character-key shortcuts are implemented only with lowercase characters ("g", "g f"), uppercase characters ("Shift+a", "A"),
// symbols ("Alt+g"), and punctuation ("?", "!", "/").
//
// Returns true if string is NOT what we define as a character key shortcut.
export const isNonCharacterKeyShortcut = (hotkey: string) => {
  return /Enter|Arrow|Escape|Meta|Control|Esc/.test(hotkey) || (hotkey.includes('Alt') && hotkey.includes('Shift'))
}

// Returns false if a user settings has character key shortcut disabled and keyboard event corresponds to a character key shortcut.
export const isShortcutAllowed = (event: KeyboardEvent) => {
  const hotkey = eventToHotkeyString(event)
  if (areCharacterKeyShortcutsEnabled()) {
    return true
  }
  return isNonCharacterKeyShortcut(hotkey)
}
