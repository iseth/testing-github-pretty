import {insertText, replaceSelection, replaceText} from '../../text'
import {
  installHTML,
  installImageLink,
  installLink,
  installTable,
  installText,
  uninstallHTML,
  uninstallImageLink,
  uninstallLink,
  uninstallTable,
  uninstallText
} from '@github/paste-markdown'
import type {Attachment} from '@github/file-attachment-element'
import type {ImageDimensions} from '../../image-dimensions'
import {getCodeEditor} from '../../code-editor'
import imageDimensions from '../../image-dimensions'
import {observe} from 'selector-observer'
import {on} from 'delegated-events'
import {updateCaret} from './caret-placement'

observe('.js-paste-markdown', {
  constructor: HTMLElement,
  add(el) {
    installTable(el)
    installImageLink(el)
    installLink(el)
    installText(el)
    installHTML(el)
  },
  remove(el) {
    uninstallTable(el)
    uninstallImageLink(el)
    uninstallLink(el)
    uninstallText(el)
    uninstallHTML(el)
  }
})

const attachmentPlaceholders = new WeakMap<Attachment, string>()

/**
 * Caches the attachment's placeholder text as it was inserted into the `<textarea>` element.
 * This is intended to make removing the placeholder later easier. The sole reason we're doing all
 * of this is because `insertText` sometimes adds a `\n` before the inserted text, and sometimes doesn't.
 * Rather than adding more logic to figure out what happened, we memoize the result.
 *
 * This is exported so we can use it in testing
 */
export function cachePlaceholder(attachment: Attachment, placeholder: string) {
  attachmentPlaceholders.set(attachment, placeholder)
}

/**
 *  Gets the cached placeholder for the attachment. Falls back to calculating the replacement text
 *  if there is no entry. The worst case outcome here is that we leave an extra newline character
 *  in the textarea.
 *
 *  This function is only exported for testing purposes
 */
export function getPlaceholder(attachment: Attachment): string {
  return attachmentPlaceholders.get(attachment) || replacementText(attachment)
}

// Based off `isImage` from @github/file-attachment-element
// Eventually, we should upstream this
function isVideo(attachment: Attachment): boolean {
  return ['video/mp4', 'video/quicktime'].includes(attachment.file.type)
}

function parameterizeName(name: string): string {
  return name
    .replace(/[[\]\\"<>&]/g, '.') // Convert unwanted chars to separator
    .replace(/\.{2,}/g, '.') // No more than 1 separator in a row
    .replace(/^\.|\.$/gi, '') // Remove leading/trailing separator
}

// Returns an uploading status message while the file is uploading. The
// placeholder will be replaced with a URL to the image once the upload
// is complete.
function placeholderText(attachment: Attachment): string {
  // Video uploads do not include braces around the text
  if (isVideo(attachment)) return `\nUploading ${attachment.file.name}…\n`

  const prefix = attachment.isImage() ? '!' : ''
  return `${prefix}[Uploading ${attachment.file.name}…]()`
}

// Strips non-word characters from a file name so it's safe to use in a
// markdown image alt tag without needing to be escaped.
function altText(name: string): string {
  return parameterizeName(name)
    .replace(/\.[^.]+$/, '') // Strip file extension
    .replace(/\./g, ' ') // Bring back some white space
}

const RETINA_PPI = 72 * 2

function disableSubmit(event: CustomEvent & {currentTarget: Element}) {
  const closestForm = (event.target as HTMLElement).closest('form')!
  const submitButton = closestForm.querySelector<HTMLButtonElement>('.btn-primary')!
  submitButton.disabled = true
}

function enableSubmit(event: CustomEvent & {currentTarget: Element}) {
  const closestForm = (event.target as HTMLElement).closest('form')!
  const submitButton = closestForm.querySelector<HTMLButtonElement>('.btn-primary')!
  submitButton.disabled = false
}

type CustomEventPayload = CustomEvent & {currentTarget: Element}

/**
 * This function is only exported to make async testing easier
 */
export async function onUploadCompleted(event: CustomEventPayload) {
  const {attachment} = event.detail
  const target = event.currentTarget
  let tagText
  if (attachment.isImage()) {
    tagText = await imageTag(attachment)
  } else if (isVideo(attachment)) {
    tagText = videoMarkdown(attachment)
  } else {
    tagText = mdLink(attachment)
  }
  // note at this point event.currentTarget is possibly null
  // see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
  setValidityAndLinkText('', tagText, event, target)
}

function mdLink(attachment: Attachment): string {
  return `[${attachment.file.name}](${attachment.href})`
}

function videoMarkdown(attachment: Attachment): string {
  return `\n${attachment.href!}\n`
}

async function imageTag(attachment: Attachment): Promise<string> {
  const dimensions = await imageSize(attachment.file)
  const alt = altText(attachment.file.name)
  const src = attachment.href
  if (dimensions.ppi === RETINA_PPI) {
    const width = Math.round(dimensions.width / 2)
    // eslint-disable-next-line github/unescaped-html-literal
    return `<img width="${width}" alt="${alt}" src="${src}">`
  }
  return `![${alt}](${src})`
}

async function imageSize(file: File): Promise<ImageDimensions> {
  const empty = {width: 0, height: 0, ppi: 0}
  try {
    return (await imageDimensions(file)) ?? empty
  } catch {
    return empty
  }
}

/**
 * When swapping out the placeholder for an image or video, we need
 * to remember to get the extra leading newline for video uploads
 */
function replacementText(attachment: Attachment) {
  const placeholder = placeholderText(attachment)
  if (isVideo(attachment)) {
    return `\n${placeholder}\n`
  } else {
    return `${placeholder}\n`
  }
}

/**
 * Make the textarea valid and remove the placeholder. The submit button will
 * get enabled outside this function.
 */
function removeFailedUpload(event: CustomEventPayload) {
  const field = event.currentTarget.querySelector<HTMLTextAreaElement>('.js-comment-field')
  const textToRemove = getPlaceholder(event.detail.attachment)
  if (field) {
    // Regular editor
    field.setCustomValidity('')
    replaceText(field, textToRemove, '')
  } else {
    // CodeMirror (code editor)
    const editor = getCodeEditor(event.currentTarget.querySelector<HTMLTextAreaElement>('.js-code-editor')!)!.editor!

    const cursor = editor.getSearchCursor(textToRemove)
    cursor.findNext()
    cursor.replace('')
  }
}

/**
 *  Updates text inserted in editor for dropped assets, be it a regular editor
 *  (textarea) or a code editor (CodeMirror) editing a Markdown file
 *
 *  If validity is 'uploading', inserts "[Uploading asset-name](...)" at cursor,
 *  otherwise replace that placeholder with href
 *
 *  target is only required if event.currentTarget is lost (e.g., after await)
 */

function setValidityAndLinkText(
  validity: 'uploading' | '',
  tagText: string,
  event: CustomEventPayload,
  target?: EventTarget & Element
) {
  const field = (target || event.currentTarget).querySelector<HTMLTextAreaElement>('.js-comment-field')!
  const fileUploadLoadingText = (target || event.currentTarget).querySelector<HTMLSpanElement>(
    '.js-file-upload-loading-text'
  )!
  const placeholder = placeholderText(event.detail.attachment)
  const {batch} = event.detail

  if (field) {
    const selectedText = field.value.substring(field.selectionStart, field.selectionEnd)
    // Regular text editor
    if (validity === 'uploading') {
      let insertedPlaceholder
      if (selectedText.length) {
        insertedPlaceholder = replaceSelection(field, selectedText, placeholder)
      } else {
        insertedPlaceholder = insertText(field, placeholder, {appendNewline: true})
      }
      // If things go wrong, the most reliable way we can remove the placeholder
      // for an attachment is to cache it.  This is mostly so we don't have to
      // try to figure out if `insertText` added a leading newline into the
      // textarea
      attachmentPlaceholders.set(event.detail.attachment, insertedPlaceholder)
    } else {
      replaceText(field, placeholder, tagText)
    }
    batch.isFinished() ? enableSubmit(event) : disableSubmit(event)
  } else {
    // CodeMirror (code editor)
    const editor = getCodeEditor(
      (target || event.currentTarget).querySelector<HTMLTextAreaElement>('.js-code-editor')!
    )!.editor!

    if (validity === 'uploading') {
      if (editor.getSelection().length) {
        // replace selected text with placeholder
        editor.replaceSelection(placeholder)
      } else {
        // insert placeholder at cursor
        const cursor = editor.getCursor()
        const toReplace = replacementText(event.detail.attachment)
        editor.replaceRange(toReplace, cursor)
      }
    } else {
      const cursor = editor.getSearchCursor(placeholder)
      cursor.findNext()
      cursor.replace(tagText)
    }
    batch.isFinished() ? enableSubmit(event) : disableSubmit(event)
  }
  if (fileUploadLoadingText) {
    const fileUploadMessage = fileUploadLoadingText.getAttribute('data-file-upload-message')
    fileUploadLoadingText.textContent = `${fileUploadMessage} (${batch.uploaded() + 1}/${batch.size})`
  }
}

on('upload:setup', '.js-upload-markdown-image', function (event) {
  setValidityAndLinkText('uploading', '', event)
})

on('upload:complete', '.js-upload-markdown-image', onUploadCompleted)

on('upload:error', '.js-upload-markdown-image', function (event) {
  removeFailedUpload(event)
  const {batch} = event.detail
  batch.isFinished() ? enableSubmit(event) : disableSubmit(event)
})

function updateCursor(event: DragEvent) {
  // The file-attachment-element bubbles up dragover and dragenter events after preventing their default
  // behavior. We want to manually position the cursor in the textarea so that it reflects where the user
  // will drop the file.
  event.stopPropagation()

  const attachmentElement = event.currentTarget as HTMLElement

  if (!attachmentElement) return

  const textArea = attachmentElement.querySelector<HTMLTextAreaElement>('.js-comment-field')
  if (textArea) {
    updateCaret(textArea, event)
  } else {
    const editor = getCodeEditor(attachmentElement.querySelector<HTMLTextAreaElement>('.js-code-editor')!)?.editor
    if (editor) {
      const c = editor.coordsChar({left: event.pageX, top: event.pageY})
      editor.setCursor(c)
    }
  }
}

/**
 * This function isn't used in production, it's only for keeping a fast feedback looop in dev/troubleshooting.
 * To use in dev mode, add
 * ```
 * on('click', 'textarea', debugUpdateCaret)
 * ```
 * to this file and uncomment the `console.log`
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debugUpdateCaret = (event: MouseEvent) => {
  const textArea = event.currentTarget as HTMLTextAreaElement
  const rect = textArea.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top + textArea.scrollTop
  // eslint-disable-next-line no-console
  console.log({
    x,
    y,
    cursor: textArea.selectionStart,
    t: textArea.value.substring(textArea.selectionStart - 10, textArea.selectionStart)
  })
  const d = new DragEvent('dragenter', {clientX: event.clientX, clientY: event.clientY})
  updateCaret(textArea, d)
}

on('dragenter', 'file-attachment', updateCursor)

on('dragover', 'file-attachment', updateCursor)

on('upload:invalid', '.js-upload-markdown-image', function (event) {
  removeFailedUpload(event)
  const {batch} = event.detail
  batch.isFinished() ? enableSubmit(event) : disableSubmit(event)
})
