import {observe} from 'selector-observer'

// Flip tooltip direction of child elements if an item gets .is-stuck
// so tooltips are still visible when the user scrolls down a blob and
// the button bar sticks to the top
observe('.js-blob-header.is-stuck', {
  add(el) {
    flipTooltip(el)
  },
  remove(el) {
    flipTooltip(el, true)
  }
})

function flipTooltip(element: Element, inverse = false) {
  const pairs = {
    'tooltipped-nw': 'tooltipped-sw',
    'tooltipped-n': 'tooltipped-s',
    'tooltipped-ne': 'tooltipped-se'
  }

  for (const [key, value] of Object.entries(pairs)) {
    const from = inverse ? value : key
    const to = inverse ? key : value
    for (const el of element.querySelectorAll(`.${from}`)) {
      el.classList.replace(from, to)
    }
  }
}
