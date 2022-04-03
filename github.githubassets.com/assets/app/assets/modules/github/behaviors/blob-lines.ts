import {DOMRangeFromBlob, formatBlobRangeAnchor, parseBlobRange, parseFileAnchor} from '../blob-anchor'
import type {AnchorInfo} from '../blob-anchor'
import ClipboardCopyElement from '@github/clipboard-copy-element'
import {TemplateInstance} from '@github/template-parts'
import hashChange from './hash-change'
import {observe} from 'selector-observer'
import {on} from 'delegated-events'
import {sendEvent} from '../hydro-analytics'
import {surroundContents} from '../range'

let skipNextScrollTo = false

function queryLineElement(anchorPrefix: string, line: number) {
  return document.querySelector(`#${anchorPrefix}LC${line}`)
}

// Highlight a line or range of lines.
function highlightLines({blobRange, anchorPrefix}: AnchorInfo): void {
  const lineElements = document.querySelectorAll('.js-file-line')

  if (lineElements.length === 0) return
  clearHighlights()

  if (!blobRange) return

  if (blobRange.start.column === null || blobRange.end.column === null) {
    for (let i = blobRange.start.line; i <= blobRange.end.line; i += 1) {
      const line = queryLineElement(anchorPrefix, i)
      if (line) line.classList.add('highlighted')
    }
  } else if (
    blobRange.start.line === blobRange.end.line &&
    blobRange.start.column != null &&
    blobRange.end.column != null
  ) {
    const range = DOMRangeFromBlob(blobRange, line => queryLineElement(anchorPrefix, line))

    if (range) {
      const span = document.createElement('span')
      span.classList.add('highlighted')
      surroundContents(range, span)
    }
  } else {
    // TODO column highlights across multiple lines
  }
}

// Clear all highlighted lines and ranges.
function clearHighlights() {
  for (const el of document.querySelectorAll('.js-file-line.highlighted')) {
    el.classList.remove('highlighted')
  }

  for (const el of document.querySelectorAll('.js-file-line .highlighted')) {
    const lineEl = el.closest<HTMLElement>('.js-file-line')!
    el.replaceWith(...el.childNodes)
    lineEl.normalize()
  }
}

// Highlight and scroll to the lines in the current location hash.
function scrollLinesIntoView(): void {
  const anchorInfo = parseFileAnchor(window.location.hash)

  highlightLines(anchorInfo)
  showOrHideLineActions()

  const {blobRange, anchorPrefix} = anchorInfo

  const line = blobRange && queryLineElement(anchorPrefix, blobRange.start.line)

  if (!skipNextScrollTo && line) {
    line.scrollIntoView()
    const container = line.closest<HTMLElement>('.blob-wrapper, .js-blob-wrapper')!
    container.scrollLeft = 0
  }

  skipNextScrollTo = false
}

// Update highlighted lines when the page loads and
// anytime the hash changes.
hashChange(function () {
  if (document.querySelector('.js-file-line-container')) {
    setTimeout(scrollLinesIntoView, 0)
    const hash = window.location.hash
    for (const element of document.querySelectorAll('.js-update-url-with-hash')) {
      if (element instanceof HTMLAnchorElement) {
        element.hash = hash
      } else if (element instanceof HTMLFormElement) {
        const newAction = new URL(element.action, window.location.origin)
        newAction.hash = hash
        element.action = newAction.toString()
      }
    }
  }
})

function setCopyLines(lines: NodeListOf<HTMLElement>): void {
  const lineTextArray: string[] = []
  for (const line of lines) {
    lineTextArray.push(line.textContent!)
  }
  const button = document.getElementById('js-copy-lines')
  if (button instanceof ClipboardCopyElement) {
    // eslint-disable-next-line i18n-text/no-en
    button.textContent = `Copy ${lines.length === 1 ? 'line' : 'lines'}`
    button.value = lineTextArray.join('\n')
    const gaText = `Blob, copyLines, numLines:${lines.length.toString()}`
    button.setAttribute('data-ga-click', gaText)
  }
}

function setPermalink(numLines: number): string | undefined {
  const permalinkContainer = document.querySelector('.js-permalink-shortcut')
  if (permalinkContainer instanceof HTMLAnchorElement) {
    const url = `${permalinkContainer.href}${window.location.hash}`
    const button = document.getElementById('js-copy-permalink')
    if (button instanceof ClipboardCopyElement) {
      button.value = url
      const gaText = `Blob, copyPermalink, numLines:${numLines.toString()}`
      button.setAttribute('data-ga-click', gaText)
    }
    return url
  }
}

function setOpenIssueLink(permalink: string, numLines: number) {
  const newIssueLink = document.getElementById('js-new-issue')
  if (newIssueLink instanceof HTMLAnchorElement) {
    if (!newIssueLink.href) return
    const newIssueUrl = new URL(newIssueLink.href, window.location.origin)
    const params = new URLSearchParams(newIssueUrl.search)
    params.set('permalink', permalink)
    newIssueUrl.search = params.toString()
    newIssueLink.href = newIssueUrl.toString()
    newIssueLink.setAttribute('data-ga-click', `Blob, newIssue, numLines:${numLines.toString()}`)
  }
}

function setOpenDiscussionLink(permalink: string, numLines: number) {
  const newDiscussionLink = document.getElementById('js-new-discussion')
  if (!(newDiscussionLink instanceof HTMLAnchorElement) || !newDiscussionLink?.href) return
  const newDiscussionUrl = new URL(newDiscussionLink.href, window.location.origin)
  const params = new URLSearchParams(newDiscussionUrl.search)
  params.set('permalink', permalink)
  newDiscussionUrl.search = params.toString()
  newDiscussionLink.href = newDiscussionUrl.toString()
  newDiscussionLink.setAttribute('data-ga-click', `Blob, newDiscussion, numLines:${numLines.toString()}`)
}

function setViewGitBlame(numLines: number): void {
  const button = document.getElementById('js-view-git-blame')
  if (!button) return
  button.setAttribute('data-ga-click', `Blob, viewGitBlame, numLines:${numLines.toString()}`)
}

function showOrHideLineActions(): void {
  const actions = document.querySelector<HTMLElement>('.js-file-line-actions')
  if (!actions) return

  const lines = document.querySelectorAll<HTMLElement>('.js-file-line.highlighted')
  const firstSelected = lines[0]

  if (firstSelected) {
    setCopyLines(lines)
    setViewGitBlame(lines.length)
    const permalink = setPermalink(lines.length)
    if (permalink) setOpenIssueLink(permalink, lines.length)
    if (permalink) setOpenDiscussionLink(permalink, lines.length)

    actions.style.top = `${firstSelected.offsetTop - 2}px`
    /* eslint-disable-next-line github/no-d-none */
    actions.classList.remove('d-none')
  } else {
    /* eslint-disable-next-line github/no-d-none */
    actions.classList.add('d-none')
  }
}

// Prevent scroll position from changing after setting location.hash.
//
// callback - Function to preserve scroll position after.
function preserveLineNumberScrollPosition(callback: () => void): void {
  const scrollTop = window.scrollY
  skipNextScrollTo = true
  callback()
  window.scrollTo(0, scrollTop)
}

// Clicking line numbers highlights the line
on('click', '.js-line-number', function (event) {
  const anchorInfo = parseFileAnchor(event.currentTarget.id)

  const {blobRange} = anchorInfo

  const currentLines = parseBlobRange(window.location.hash)
  if (currentLines && event.shiftKey) {
    anchorInfo.blobRange = {
      start: currentLines.start,
      end: blobRange.end
    }
  }

  preserveLineNumberScrollPosition(() => {
    window.location.hash = formatBlobRangeAnchor(anchorInfo)
  })
})

// "Jump to Line" modal
on('submit', '.js-jump-to-line-form', function (event) {
  const field = event.currentTarget.querySelector<HTMLInputElement>('.js-jump-to-line-field')!
  // Regex removes all characters except integers and dashes (for multi-line case)
  const strippedField = field.value.replace(/[^\d-]/g, '')
  const lineNums = strippedField
    .split('-')
    .map(s => parseInt(s, 10))
    .filter(n => n > 0)
    .sort((a, b) => a - b)
  if (lineNums.length) window.location.hash = `L${lineNums.join('-L')}`

  event.preventDefault()
})

observe('.js-check-bidi', alertOnBidiCharacter)

// There are 9 unicode codepoints in two contiguous blocks that act as
// bidi (bidirectional) control characters which can obscure malicious code:
// +-----------+----------------------------------+
// | codepoint | Control character name           |
// +-----------+----------------------------------+
// |  \u202A   | LEFT-TO-RIGHT EMBEDDING (LRE)    |
// |  \u202B   | RIGHT-TO-LEFT EMBEDDING (RLE)    |
// |  \u202C   | POP DIRECTIONAL FORMATTING (PDF) |
// |  \u202D   | LEFT-TO-RIGHT OVERRIDE (LRO)     |
// |  \u202E   | RIGHT-TO-LEFT OVERRIDE (RLO)     |
// |        [ ... ].                              |
// |  \u2066   | LEFT-TO-RIGHT ISOLATE (LRI)      |
// |  \u2067   | RIGHT-TO-LEFT ISOLATE (RLI)      |
// |  \u2068   | FIRST STRONG ISOLATE (FSI)       |
// |  \u2069   | POP DIRECTIONAL ISOLATE (PDI)    |
// +-----------+----------------------------------+
const bidiRegex = /[\u202A-\u202E]|[\u2066-\u2069]/
const bidiReplacementMap: {[char: string]: string} = {
  '\u202A': 'U+202A', // LEFT-TO-RIGHT EMBEDDING
  '\u202B': 'U+202B', // RIGHT-TO-LEFT EMBEDDING
  '\u202C': 'U+202C', // POP DIRECTIONAL FORMATTING
  '\u202D': 'U+202D', // LEFT-TO-RIGHT OVERRIDE
  '\u202E': 'U+202E', // RIGHT-TO-LEFT OVERRIDE
  '\u2066': 'U+2066', // LEFT-TO-RIGHT ISOLATE
  '\u2067': 'U+2067', // RIGHT-TO-LEFT ISOLATE
  '\u2068': 'U+2068', // FIRST STRONG ISOLATE
  '\u2069': 'U+2069' // POP DIRECTIONAL ISOLATE
}

// Function to recursively search elements for child text nodes,
// find bidi characters and optionally replace them with their unicode
// character codes. If we are not replacing characters, we will return
// early when we find the first bidi character.
//
// _revealedCharacterTemplate - Template to use when replacing characters, if null we will skip characer replacement
//
// Returns true if a bidi character is found, false if no bidi character was found
function checkNodeForBidiCharacters(el: Node, _revealedCharacterTemplate: HTMLTemplateElement | null): boolean {
  if (el.nodeType === Node.TEXT_NODE) return checkTextNodeForBidiCharacters(el, _revealedCharacterTemplate)
  if (!el.childNodes || !el.childNodes.length) return false

  let foundBidiCharacter = false
  for (const node of el.childNodes) {
    foundBidiCharacter ||= checkNodeForBidiCharacters(node, _revealedCharacterTemplate)
    // If we found a bidi character and we are not replacing characters stop searching
    if (foundBidiCharacter && !_revealedCharacterTemplate) break
  }
  return foundBidiCharacter
}

function checkTextNodeForBidiCharacters(el: Node, _revealedCharacterTemplate: HTMLTemplateElement | null): boolean {
  // search for bidi characters and optionally replace
  let foundBidiCharacter = false
  if (el.nodeValue) {
    for (let i = el.nodeValue.length - 1; i >= 0; i--) {
      const char = el.nodeValue.charAt(i)
      if (bidiReplacementMap[char]) {
        foundBidiCharacter = true
        // If we are not replacing characters, we can break early to avoid searching the entire node
        if (!_revealedCharacterTemplate) break
        const revealedCharacterInstance = new TemplateInstance(_revealedCharacterTemplate, {
          revealedCharacter: bidiReplacementMap[char]
        })
        // Delete the hidden character and replace it with the revealed character
        const r = new Range()
        r.setStart(el, i)
        r.setEnd(el, i + 1)
        r.deleteContents()
        r.insertNode(revealedCharacterInstance)
      }
    }
  }
  return foundBidiCharacter
}

// Search for bidi Unicode characters, which can obscure malicious code,
// within blob/diff elements, and display an alert if they are present.
// This is run after the content is displayed, so it won't impact the page TTI.
// The container should provide 2 templates: .js-file-alert-template and .js-line-alert-template.
export function alertOnBidiCharacter(container: Element) {
  let result = false
  const start = performance.now()
  const blobText = container.textContent || ''

  // Quick check for bidi characters, it may return false positive if the occurrence
  // is on a comment or other random content inside the blob container.
  if (bidiRegex.test(blobText)) {
    // .js-file-line covers blob and csv rendering,
    // .blob-code-inner covers diff rendering, more specific with .diff-table to avoid being checked twice in blob.
    const contentElements = container.querySelectorAll<HTMLElement>(
      '.diff-table .blob-code-inner, .js-file-line-container .js-file-line, .js-suggested-changes-blob .blob-code-inner'
    )

    const lineAlertTemplate = document.querySelector<HTMLTemplateElement>('.js-line-alert-template')
    const revealedCharTemplate = document.querySelector<HTMLTemplateElement>('.js-revealed-character-template')

    // This is not an array, so we use a loop to check elements
    for (const element of contentElements) {
      if (checkNodeForBidiCharacters(element, revealedCharTemplate)) {
        result = true

        if (lineAlertTemplate) {
          const lineAlertElement = new TemplateInstance(lineAlertTemplate, {})

          // By default, alerts are included after the offending element,
          // then we use CSS to display it properly. This is so to not break table layouts.
          // But for CSV we need to render before, otherwise the alert jumps to the next line,
          // so to avoid an even uglier CSS placement, we use .before() for it.
          if (container.getAttribute('data-line-alert') === 'before') {
            element.before(lineAlertElement)
          } else {
            element.after(lineAlertElement)
          }
        }
      }
    }
  }

  const duration = performance.now() - start
  const context = {durationMs: duration.toString(), result: result.toString()}

  sendEvent('blob_js_check_bidi_character', context)

  if (result) {
    // Searching the template in the whole document, to prevent duplicating it on each container (each file/comment in a PR)
    const fileAlertTemplate = document.querySelector<HTMLTemplateElement>('.js-file-alert-template')
    if (fileAlertTemplate) {
      // Create a URL to reload the current page with the opposing hidden character parameter
      const revealButtonUrl = new URL(window.location.href, window.location.origin)
      revealButtonUrl.searchParams.get('h') === '1'
        ? revealButtonUrl.searchParams.delete('h')
        : revealButtonUrl.searchParams.set('h', '1')

      const fileAlertElement = new TemplateInstance(fileAlertTemplate, {revealButtonHref: revealButtonUrl.href})
      container.prepend(fileAlertElement)
    }
  }

  // Remove the attribute to avoid checking again and duplicating the alert on pjax navigation
  container.classList.remove('js-check-bidi')
}

class CodeListingLine {
  lineElement: Element
  numberElement: Element

  constructor(lineElement: Element, numberElement: Element) {
    this.lineElement = lineElement
    this.numberElement = numberElement
  }

  // Find a DOM Range for a given character range in a blob line.
  range(startOffset: number, endOffset: number): Range | null {
    startOffset = isNaN(startOffset) ? 0 : startOffset
    endOffset = isNaN(endOffset) ? 0 : endOffset

    let startNode: ChildNode | null = null
    let startNodeIndex = 0
    let endNodeIndex = 0
    for (const [nodeIndex, textNode] of this.lineElement.childNodes.entries()) {
      const length = (textNode.textContent || '').length
      if (length > startOffset && !startNode) {
        startNode = textNode
        startNodeIndex = nodeIndex
      }
      if (length >= endOffset) {
        endNodeIndex = nodeIndex
        break
      }

      startOffset -= length
      endOffset -= length
    }

    const range = document.createRange()
    if (startNodeIndex === endNodeIndex) {
      // The entire range is contained in a single element,
      // so we want a character range within that element's text node.

      while (startNode && startNode.nodeName !== '#text') {
        startNode = startNode.childNodes[0]
      }

      if (!startNode) {
        return null
      }

      range.setStart(startNode, startOffset)
      range.setEnd(startNode, endOffset)
    } else {
      // The range spans multiple elements,
      // so we want an element range covering all of them.

      range.setStart(this.lineElement, startNodeIndex)
      range.setEnd(this.lineElement, endNodeIndex + 1)
    }

    return range
  }
}

class CodeListing {
  container: Element

  constructor(container: Element) {
    this.container = container
  }

  findLine(lineNum: number | string | null): CodeListingLine | null {
    if (!lineNum) {
      return null
    }

    // Find the coresponding line number element. For diffs this will
    // always be the right side line number.
    const lineNumElement = this.container.querySelector<HTMLElement>(`.js-blob-rnum[data-line-number='${lineNum}']`)
    if (!lineNumElement) {
      return null
    }

    // Find the code wrapper immediatly after the line number. For diffs
    // this ensures we're always annotating the right-hand side.
    let lineElement = lineNumElement.nextElementSibling
    if (!lineElement || !lineElement.classList.contains('js-file-line')) {
      return null
    }

    // For PR diffs, some interaction markup may exist within the line element
    // (e.g. comment button). This skips over those if they exist.
    lineElement = lineElement.querySelector<HTMLElement>('.js-code-nav-pass') || lineElement

    return new CodeListingLine(lineElement, lineNumElement)
  }
}

const annotatedErrors: WeakMap<HTMLElement, boolean> = new WeakMap()
function annotateCodeownersErrors(errorsContainer: Element) {
  const fileContainer = errorsContainer.closest('.js-blob-code-container, .js-file-content')
  const tooltipTemplate = errorsContainer.querySelector<HTMLTemplateElement>('.js-codeowners-error-tooltip-template')
  const lineAlertTemplate = errorsContainer.querySelector<HTMLTemplateElement>(
    '.js-codeowners-error-line-alert-template'
  )
  if (!fileContainer || !tooltipTemplate || !lineAlertTemplate) {
    return
  }

  const errors = errorsContainer.querySelectorAll<HTMLElement>('.js-codeowners-error')
  const listing = new CodeListing(fileContainer)

  for (const error of errors) {
    if (annotatedErrors.get(error)) {
      continue
    }

    const lineNum = error.getAttribute('data-line')
    const kind = error.getAttribute('data-kind')
    const suggestion = error.getAttribute('data-suggestion')
    const startOffset = parseInt(error.getAttribute('data-start-offset') || '', 10)
    const endOffset = parseInt(error.getAttribute('data-end-offset') || '', 10)

    const line = listing.findLine(lineNum)
    const range = line?.range(startOffset, endOffset)

    if (!line || !range) {
      continue
    }

    let message = kind
    if (suggestion) {
      message += `: ${suggestion}`
    }

    // Our highlight and tooltip styles both use the `::after`
    // pseudo element, so we have to apply them to different elements.
    const highlight = document.createElement('SPAN')
    highlight.className = 'error-highlight'
    range.surroundContents(highlight)

    const tooltip = new TemplateInstance(tooltipTemplate, {message}).firstElementChild
    range.surroundContents(tooltip!)

    const lineAlertElement = new TemplateInstance(lineAlertTemplate, {})
    line.numberElement.appendChild(lineAlertElement)

    annotatedErrors.set(error, true)
  }
}
observe('.js-codeowners-errors', annotateCodeownersErrors)
on('expander:expanded', '.js-file', function (event: Event) {
  if (!event.target || !(event.target instanceof HTMLElement)) {
    return
  }

  const errorsContainer = event.target.querySelector<HTMLElement>('.js-codeowners-errors')
  if (!errorsContainer) {
    return
  }

  annotateCodeownersErrors(errorsContainer)
})
