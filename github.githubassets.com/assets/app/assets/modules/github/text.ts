// Gets the length of code-points from a String.
//
// This is different to `string.length` which returns the amount of utf-8
// bytes, which is a different metric as - for example - the poo emoji is 2
// utf-8 bytes, but 1 unicode code point.
//
// See http://blog.jonnew.com/posts/poo-dot-length-equals-two for more.
export function getUtf8StringLength(str: string): number {
  const joiner = '\u200D'
  const split = str.split(joiner)
  let count = 0

  for (const s of split) {
    // removing the variation selectors
    const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join('')).length
    count += num
  }

  // assuming the joiners are used appropriately
  return count / split.length
}
/**
 * Replace text in a textarea with a new string and
 * place the cursor at the selectionEnd position.
 * @param textarea an `<input>` or `<textarea>` element
 * @param oldText The text to replace
 * @param newText The new text to replace with
 * @returns The new text
 */
export function replaceText(
  textarea: HTMLInputElement | HTMLTextAreaElement,
  oldText: string,
  newText: string
): string {
  let beginning = textarea.value.substring(0, textarea.selectionEnd || 0)
  let remaining = textarea.value.substring(textarea.selectionEnd || 0)
  beginning = beginning.replace(oldText, newText)
  remaining = remaining.replace(oldText, newText)

  setTextareaValueAndCursor(textarea, beginning + remaining, beginning.length)

  return newText
}

/**
 * Replace selected text in a textarea with a new string.
 * If the selection is empty, the old text is replaced by the
 * new text in the whole textarea.
 * @param textarea an `<input>` or `<textarea>` element
 * @param oldText The text to replace
 * @param newText The new text to replace with
 * @returns The new text
 */
export function replaceSelection(
  textarea: HTMLInputElement | HTMLTextAreaElement,
  oldText: string,
  newText: string
): string {
  if (textarea.selectionStart === null || textarea.selectionEnd === null) {
    return replaceText(textarea, oldText, newText)
  }
  const beginning = textarea.value.substring(0, textarea.selectionStart)
  const remaining = textarea.value.substring(textarea.selectionEnd)

  setTextareaValueAndCursor(textarea, beginning + newText + remaining, beginning.length)

  return newText
}

type InsertOptions = {
  appendNewline?: boolean
}
/**
 * Inserts text into a text input and moves the cursor appropriately.
 * If the cursor happens to be in the middle of a line, or the textarea isn't empty,
 * we add a newline character before the inserted text. We also advance the cursor
 * appropriately
 * @param textarea an `<input>` or `<textarea>` element
 * @param text The text to add
 * @param appendNewline optionally adds a `\n` character after `text`
 */
export function insertText(
  textarea: HTMLInputElement | HTMLTextAreaElement,
  text: string,
  options: InsertOptions = {}
): string {
  const point = textarea.selectionEnd || 0
  const beginning = textarea.value.substring(0, point)
  const remaining = textarea.value.substring(point)
  const newline = textarea.value === '' || beginning.match(/\n$/) ? '' : '\n'
  const trailingNewline = options.appendNewline ? '\n' : ''
  const insertedText = newline + text + trailingNewline

  textarea.value = beginning + insertedText + remaining
  const newPoint = point + insertedText.length
  textarea.selectionStart = newPoint
  textarea.selectionEnd = newPoint
  textarea.dispatchEvent(new CustomEvent('change', {bubbles: true, cancelable: false}))
  textarea.focus()
  return insertedText
}

/**
 * Helper function to set the value of a textarea and move the cursor to a given position.
 * Emits a `change` event.
 * @param textarea an `<input>` or `<textarea>` element
 * @param value The new value
 * @param cursor The position to move the cursor to
 */
function setTextareaValueAndCursor(textarea: HTMLInputElement | HTMLTextAreaElement, value: string, cursor: number) {
  textarea.value = value
  textarea.selectionStart = cursor
  textarea.selectionEnd = cursor
  textarea.dispatchEvent(new CustomEvent('change', {bubbles: true, cancelable: false}))
}
