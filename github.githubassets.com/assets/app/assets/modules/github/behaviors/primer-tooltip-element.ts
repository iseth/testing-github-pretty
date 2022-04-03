import type {AnchorAlignment, AnchorSide} from '@primer/behaviors'
import {getAnchoredPosition} from '@primer/behaviors'

const TOOLTIP_OPEN_CLASS = 'hx_tooltip-open'
const TOOLTIP_CLASS = 'hx_tooltip'
const TOOLTIP_OFFSET = 10

type Direction = 'n' | 's' | 'e' | 'w' | 'ne' | 'se' | 'nw' | 'sw'

const DIRECTION_CLASSES = [
  'hx_tooltip-n',
  'hx_tooltip-s',
  'hx_tooltip-e',
  'hx_tooltip-w',
  'hx_tooltip-ne',
  'hx_tooltip-se',
  'hx_tooltip-nw',
  'hx_tooltip-sw'
]
type DirectionClass = typeof DIRECTION_CLASSES[number]

const DIRECTION_TO_CLASS: Record<Direction, DirectionClass> = {
  n: 'hx_tooltip-n',
  s: 'hx_tooltip-s',
  e: 'hx_tooltip-e',
  w: 'hx_tooltip-w',
  ne: 'hx_tooltip-ne',
  se: 'hx_tooltip-se',
  nw: 'hx_tooltip-nw',
  sw: 'hx_tooltip-sw'
}

class PrimerTooltipElement extends HTMLElement {
  static observedAttributes = ['data-type', 'data-direction', 'id', 'hidden']

  #abortController: AbortController

  get htmlFor(): string {
    return this.getAttribute('for') || ''
  }

  set htmlFor(value: string) {
    this.setAttribute('for', value)
  }

  get control(): HTMLElement | null {
    return this.ownerDocument.getElementById(this.htmlFor)
  }

  get type(): 'description' | 'label' {
    const type = this.getAttribute('data-type')
    return type === 'label' ? 'label' : 'description'
  }

  set type(value: 'description' | 'label') {
    this.setAttribute('data-type', value)
  }

  #direction: Direction = 's'
  get direction(): Direction {
    return this.#direction
  }

  set direction(value: Direction) {
    this.setAttribute('data-direction', value)
  }

  #align: AnchorAlignment = 'center'
  get align(): AnchorAlignment {
    return this.#align
  }

  #side: AnchorSide = 'outside-bottom'
  get side(): AnchorSide {
    return this.#side
  }

  #allowUpdatePosition = false

  connectedCallback() {
    this.hidden = true
    this.#allowUpdatePosition = true

    if (!this.id) {
      this.id = `tooltip-${Date.now()}-${(Math.random() * 10000).toFixed(0)}`
    }

    if (!this.control) return

    this.classList.add(TOOLTIP_CLASS)
    this.setAttribute('role', 'tooltip')

    this.addEvents()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'id' || name === 'data-type') {
      if (!this.id || !this.control) return
      if (this.type === 'label') {
        this.control.setAttribute('aria-labelledby', this.id)
      } else {
        let describedBy = this.control.getAttribute('aria-describedby')
        describedBy ? (describedBy = `${describedBy} ${this.id}`) : (describedBy = this.id)
        this.control.setAttribute('aria-describedby', describedBy)
      }
    } else if (name === 'hidden') {
      if (this.hidden) {
        this.classList.remove(TOOLTIP_OPEN_CLASS, ...DIRECTION_CLASSES)
      } else {
        this.classList.add(TOOLTIP_OPEN_CLASS, TOOLTIP_CLASS)
        for (const tooltip of this.ownerDocument.querySelectorAll<HTMLElement>(this.tagName)) {
          if (tooltip !== this) tooltip.hidden = true
        }
        this.updatePosition()
      }
    } else if (name === 'data-direction') {
      this.classList.remove(...DIRECTION_CLASSES)
      const direction = (this.#direction = (newValue || 's') as Direction)
      if (direction === 'n') {
        this.#align = 'center'
        this.#side = 'outside-top'
      } else if (direction === 'ne') {
        this.#align = 'start'
        this.#side = 'outside-top'
      } else if (direction === 'e') {
        this.#align = 'center'
        this.#side = 'outside-right'
      } else if (direction === 'se') {
        this.#align = 'start'
        this.#side = 'outside-bottom'
      } else if (direction === 's') {
        this.#align = 'center'
        this.#side = 'outside-bottom'
      } else if (direction === 'sw') {
        this.#align = 'end'
        this.#side = 'outside-bottom'
      } else if (direction === 'w') {
        this.#align = 'center'
        this.#side = 'outside-left'
      } else if (direction === 'nw') {
        this.#align = 'end'
        this.#side = 'outside-top'
      }
    }
  }

  disconnectedCallback() {
    this.#abortController.abort()
  }

  private addEvents() {
    if (!this.control) return

    this.#abortController = new AbortController()
    const {signal} = this.#abortController

    this.addEventListener('mouseleave', this, {signal})
    this.control.addEventListener('mouseenter', this, {signal})
    this.control.addEventListener('mouseleave', this, {signal})
    this.control.addEventListener('focus', this, {signal})
    this.control.addEventListener('blur', this, {signal})
    this.ownerDocument.addEventListener('keydown', this, {signal})
  }

  handleEvent(event: Event) {
    if (!this.control) return

    // Ensures that tooltip stays open when hovering between tooltip and element
    // WCAG Success Criterion 1.4.13 Hoverable
    if ((event.type === 'mouseenter' || event.type === 'focus') && this.hidden) {
      this.hidden = false
    } else if (event.type === 'blur') {
      this.hidden = true
    } else if (
      event.type === 'mouseleave' &&
      (event as MouseEvent).relatedTarget !== this.control &&
      (event as MouseEvent).relatedTarget !== this
    ) {
      this.hidden = true
    } else if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Escape' && !this.hidden) {
      this.hidden = true
    }
  }

  // `getAnchoredPosition` may calibrate `anchoredSide` but does not recalibrate `align`.
  //  Therefore, we need to determine which `align` is best based on the initial `getAnchoredPosition` calcluation.
  //  https://github.com/primer/behaviors/issues/63
  private adjustedAnchorAlignment(anchorSide: AnchorSide): AnchorAlignment | undefined {
    if (!this.control) return

    const tooltipPosition = this.getBoundingClientRect()
    const targetPosition = this.control.getBoundingClientRect()
    const tooltipWidth = tooltipPosition.width

    const tooltipCenter = tooltipPosition.left + tooltipWidth / 2
    const targetCenter = targetPosition.x + targetPosition.width / 2

    if (Math.abs(tooltipCenter - targetCenter) < 2 || anchorSide === 'outside-left' || anchorSide === 'outside-right') {
      return 'center'
    } else if (tooltipPosition.left === targetPosition.left) {
      return 'start'
    } else if (tooltipPosition.right === targetPosition.right) {
      return 'end'
    } else if (tooltipCenter < targetCenter) {
      if (tooltipPosition.left === 0) return 'start'
      return 'end'
    } else {
      if (tooltipPosition.right === 0) return 'end'
      return 'start'
    }
  }

  private updatePosition() {
    if (!this.control) return
    if (!this.#allowUpdatePosition || this.hidden) return

    this.style.left = `0px` // Ensures we have reliable tooltip width in `getAnchoredPosition`
    let position = getAnchoredPosition(this, this.control, {
      side: this.#side,
      align: this.#align,
      anchorOffset: TOOLTIP_OFFSET
    })
    let anchorSide = position.anchorSide

    // We need to set tooltip position in order to determine ideal align.
    this.style.top = `${position.top}px`
    this.style.left = `${position.left}px`
    let direction: Direction = 's'

    const align = this.adjustedAnchorAlignment(anchorSide)
    if (!align) return

    this.style.left = `0px` // Reset tooltip position again to ensure accurate width in `getAnchoredPosition`
    position = getAnchoredPosition(this, this.control, {side: anchorSide, align, anchorOffset: TOOLTIP_OFFSET})
    anchorSide = position.anchorSide

    this.style.top = `${position.top}px`
    this.style.left = `${position.left}px`

    if (anchorSide === 'outside-left') {
      direction = 'w'
    } else if (anchorSide === 'outside-right') {
      direction = 'e'
    } else if (anchorSide === 'outside-top') {
      if (align === 'center') {
        direction = 'n'
      } else if (align === 'start') {
        direction = 'ne'
      } else {
        direction = 'nw'
      }
    } else {
      if (align === 'center') {
        direction = 's'
      } else if (align === 'start') {
        direction = 'se'
      } else {
        direction = 'sw'
      }
    }

    this.classList.add(DIRECTION_TO_CLASS[direction])
  }
}

if (!window.customElements.get('primer-tooltip')) {
  window.PrimerTooltipElement = PrimerTooltipElement
  window.customElements.define('primer-tooltip', PrimerTooltipElement)
}

declare global {
  interface Window {
    PrimerTooltipElement: typeof PrimerTooltipElement
  }
}
