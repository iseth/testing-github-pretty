import {MarkdownQuote, Quote} from '@github/quote-selection'
import {debounce} from '@github/mini-throttle'
import {observe} from 'selector-observer'
import {on} from 'delegated-events'
import visible from '../visible'

let activeSelection: SelectionContext | null

// Hide the "Quote reply" button on threads where there is no textarea to quote
// text into. This prevents it from showing up on locked threads.
observe('.js-comment-quote-reply', function (button) {
  ;(button as HTMLElement).hidden =
    button
      .closest('.js-quote-selection-container')
      ?.querySelector('.js-inline-comment-form-container textarea, .js-new-comment-form textarea') == null
})

function isHighlightContainer(el: Element): boolean {
  return el.nodeName === 'DIV' && el.classList.contains('highlight')
}

function hasContent(node: Node): boolean {
  return node.nodeName === 'IMG' || node.firstChild != null
}

const filters: {[key: string]: (arg0: HTMLElement) => string | HTMLElement} = {
  PRE(el) {
    const parent = el.parentElement
    if (parent && isHighlightContainer(parent)) {
      const match = parent.className.match(/highlight-source-(\S+)/)
      const flavor = match ? match[1] : ''
      const text = (el.textContent || '').replace(/\n+$/, '')
      el.textContent = `\`\`\`${flavor}\n${text}\n\`\`\``
      el.append('\n\n')
    }
    return el
  },
  A(el) {
    const text = el.textContent || ''
    if (el.classList.contains('user-mention') || el.classList.contains('team-mention')) {
      return text
    } else if (el.classList.contains('issue-link') && /^#\d+$/.test(text)) {
      return text
    } else {
      return el
    }
  },
  IMG(el) {
    const alt = el.getAttribute('alt')
    if (alt && el.classList.contains('emoji')) {
      return alt
    } else {
      return el
    }
  },
  DIV(el) {
    if (el.classList.contains('js-suggested-changes-blob')) {
      // skip quoting suggested changes widget
      el.remove()
    } else if (el.classList.contains('blob-wrapper-embedded')) {
      // handle embedded blob snippets
      const container = el.parentElement!
      const link = container.querySelector<HTMLAnchorElement>('a[href]')!
      const p = document.createElement('p')
      p.textContent = link.href
      container.replaceWith(p)
    }
    return el
  }
}

function insertMarkdownSyntax(root: DocumentFragment): void {
  const nodeIterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.nodeName in filters && hasContent(node)) {
        return NodeFilter.FILTER_ACCEPT
      } else {
        return NodeFilter.FILTER_SKIP
      }
    }
  })
  const results: HTMLElement[] = []
  let node = nodeIterator.nextNode()

  while (node) {
    if (node instanceof HTMLElement) {
      results.push(node)
    }
    node = nodeIterator.nextNode()
  }

  // process deepest matches first
  results.reverse()

  for (const el of results) {
    el.replaceWith(filters[el.nodeName](el))
  }
}

on('click', '.js-comment-quote-reply', function ({isTrusted, currentTarget}) {
  const container = currentTarget.closest<HTMLElement>('.js-comment')!
  const commentBody = container.querySelector<HTMLElement>('.js-comment-body')!
  const commentBodyClone = container.querySelector<HTMLElement>('.js-comment-body')!.cloneNode(true)
  const quoteSelectionContainer = container.closest('.js-quote-selection-container')!
  // Remove elements that contain meta info and should not be present in the quoted text
  const ignorableElements = commentBody.querySelectorAll('button.js-convert-to-issue-button, span.js-clear')
  for (const el of ignorableElements) {
    el.remove()
  }
  let quote = new Quote()

  // User pressed `r` but has nothing selected
  if (!isTrusted && quote.range.collapsed) {
    return
  }

  if (quoteSelectionContainer.hasAttribute('data-quote-markdown')) {
    quote = new MarkdownQuote(
      quoteSelectionContainer.getAttribute('data-quote-markdown') || '',
      (fragment: DocumentFragment) => {
        const parent = quote.range.startContainer.parentElement
        const codeBlock = parent && parent.closest('pre')
        if (codeBlock instanceof HTMLElement) {
          const pp = codeBlock.parentElement
          if (pp && isHighlightContainer(pp)) {
            const div = document.createElement('div')
            div.className = pp.className
            div.appendChild(fragment)
            fragment.appendChild(div)
          }
        }
        insertMarkdownSyntax(fragment)
      }
    )
  }

  // If the user has selected text before clicking the dropdown, use that as the quote.
  // (Workaround for Safari clearing the selection just before <details> is opened).
  if (activeSelection && commentBody.contains(activeSelection.anchorNode)) {
    quote.range = activeSelection.range
  } else if (quote.range.collapsed) {
    quote.select(commentBody)
  }

  if (quote.closest('.js-quote-selection-container') !== quoteSelectionContainer) return

  // Capture the current range incase elements switch focus
  const range = quote.range

  quoteSelectionContainer.dispatchEvent(
    new CustomEvent('quote-selection', {
      bubbles: true,
      detail: quote
    })
  )

  // Replace the range for elements that changed focus
  quote.range = range

  for (const textarea of quoteSelectionContainer.querySelectorAll('textarea')) {
    if (visible(textarea)) {
      quote.insert(textarea)
      break
    }
  }

  // Restore the HTML to it's initial form. The ignorable elements had to be removed
  // So that the quote lib would not include then into the selection
  container.querySelector<HTMLElement>('.js-comment-body')!.replaceWith(commentBodyClone)
})

type SelectionContext = {
  anchorNode: Node | null
  range: Range
}

// Workaround for Safari clearing the selection just before a <details> element
// was activated: persist the previous selection and use its range when quoting.
let previousSelection: SelectionContext | null

document.addEventListener(
  'selectionchange',
  debounce(function () {
    const selection = window.getSelection()!
    let range
    try {
      range = selection.getRangeAt(0)
    } catch {
      previousSelection = null
      return
    }
    previousSelection = {
      anchorNode: selection.anchorNode,
      range
    }
  }, 100)
)
document.addEventListener(
  'toggle',
  () => {
    activeSelection = previousSelection
  },
  {capture: true}
)
