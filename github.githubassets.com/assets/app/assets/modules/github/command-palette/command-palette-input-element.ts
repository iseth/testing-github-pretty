import {CommandPaletteScopeElement, Scope} from './command-palette-scope-element'
import {attr, controller, findTarget} from '@github/catalyst'
import {isPlatformMetaKey} from './command-palette-element'

/**
 * <command-palette-input> manages top bar of the command palette, including the
 * search scope tokens, text field, typeahead, and clear button.
 *
 * == Attributes
 * - value: Sets the text field value
 * - placeholder: Sets the placeholder for the text field
 * - typeahead: Sets the typeahead value. If typeahead value starts with the text
 *              fields input (case insensitive match), it is displayed as an autocomplete.
 *              Otherwise, it is displayed after the text fields input, preceded by an en dash.
 * - scope: Sets the text in the scope UI element.
 *
 * == Events
 * - command-palette-input: Fires when the user enters text
 * - command-palette-descope: Fires when the user hits [Backspace] on an empty text field
 * - command-palette-cleared: Fires when the user clicks the clear button
 */

@controller
export class CommandPaletteInputElement extends HTMLElement {
  static tagName = 'command-palette-input'

  static get observedAttributes() {
    return ['value', 'typeahead', 'scope']
  }

  scopeElement: CommandPaletteScopeElement
  defaultScope: Scope
  input: HTMLInputElement
  overlayInput: HTMLInputElement
  clearButton: HTMLElement
  searchIcon: HTMLElement
  spinner: HTMLElement
  typeaheadValue: string
  setupComplete = false
  connected = false

  @attr multiPageEnabled = false

  setup() {
    this.classList.add('d-flex', 'flex-items-center', 'flex-nowrap', 'py-1', 'pl-3', 'pr-2', 'border-bottom')

    this.input = this.querySelector('input.js-input')!
    this.overlayInput = this.querySelector('input.js-overlay-input')!
    this.clearButton = this.querySelector('.js-clear')!
    this.scopeElement = this.querySelector<CommandPaletteScopeElement>('command-palette-scope')!
    this.searchIcon = this.querySelector('.js-search-icon')!
    this.spinner = this.querySelector('.js-spinner')!

    this.defaultScope = this.scope

    if (this.hasAttribute('autofocus')) {
      this.input.focus()
    }

    this.clearButton.hidden = true

    // Do we need to emit events at the start?
    if (this.value.length !== 0) {
      this._dispatchEvent('command-palette-input')
    }

    this.setupComplete = true
  }

  connectedCallback() {
    if (!this.setupComplete) {
      this.setup()
    }

    this.value = this.getAttribute('value') || ''
    this.typeahead = this.getAttribute('typeahead') || ''
    this.placeholder = this.getAttribute('placeholder') || ''

    this.connected = true
  }

  attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
    if (!this.input) return

    if (attributeName === 'typeahead') {
      this.typeahead = newValue
    } else if (attributeName === 'value') {
      this.value = newValue
      this._dispatchEvent('command-palette-input')
    }
  }

  focus() {
    this.input.focus()
  }

  setRemovedTokenAndSelect(text: string) {
    if (text) {
      this.value = text
    }

    this.focus()
    this.input.select()
  }

  get scope() {
    return this.scopeElement.scope
  }

  set scope(newScope: Scope) {
    this.scopeElement.scope = newScope
    this.clearButton.hidden = !this.hasSomethingToClear()
  }

  hasScope() {
    return this.scopeElement.hasScope()
  }

  clearScope() {
    return this.scopeElement.clearScope()
  }

  removeToken() {
    return this.scopeElement.removeToken()
  }

  get placeholder() {
    return this.input.getAttribute('placeholder') || ''
  }

  set placeholder(value: string) {
    this.input.setAttribute('placeholder', value)
  }

  get typeaheadPlaceholder() {
    return findTarget(this, 'typeaheadPlaceholder')?.textContent || ''
  }

  set typeaheadPlaceholder(value: string) {
    const placeholder = findTarget(this, 'typeaheadPlaceholder')!
    placeholder.textContent = value
  }

  get value() {
    return this.input?.value || ''
  }

  set value(value) {
    this.input.value = value
    this.typeahead = value
    this.resetPlaceholder()
    this.onInput()
  }

  get overlay() {
    return this.overlayInput.value
  }

  set overlay(value: string) {
    this.overlayInput.value = value
  }

  // For some reason the `@target` decorator isn't working in this element.
  // Until we figure out why, we have these getters and setters to use `findTarget`,
  // which @target uses under the hood anyway.
  set mirror(value: string) {
    const mirror = findTarget(this, 'mirror')!
    mirror.textContent = value
  }

  get typeaheadText(): string {
    const typeaheadText = findTarget(this, 'typeaheadText')!
    return typeaheadText.textContent || ''
  }

  set typeaheadText(value: string) {
    const typeaheadText = findTarget(this, 'typeaheadText')!
    typeaheadText.textContent = value
  }

  get typeahead() {
    return this.typeaheadValue
  }

  set typeahead(value) {
    this.typeaheadValue = this.overlay + value
    this.mirror = this.value

    if (value === '') {
      this.typeaheadText = ''
    } else {
      // when the typeahead is set, the placholder needs to be hidden
      // so that the typeahead can be seen even when there's no query value
      this.placeholder = ''
      this.typeaheadPlaceholder = ''

      if (this.valueStartsWithTypeahead) {
        const offset = this.value.length - (this.overlay ? 1 : 0)
        this.typeaheadText = value.substring(offset)
      } else {
        this.typeaheadText = ` \u2013 ${value}`
      }
    }
  }

  showModePlaceholder(placeholderText = '') {
    this.typeaheadPlaceholder = placeholderText
  }

  get valueStartsWithTypeahead() {
    return this.typeaheadValue.toLowerCase().startsWith(this.value.toLowerCase())
  }

  get isCursorAtEnd() {
    return this.value.length === this.input.selectionStart
  }

  set loading(isLoading: boolean) {
    this.spinner.hidden = !isLoading
    this.searchIcon.hidden = isLoading
  }

  resetScopeIfNeeded() {
    if (!this.multiPageEnabled && this.value === '' && this.scope.id !== this.defaultScope.id) {
      this.scope = this.defaultScope
    }
  }

  resetPlaceholder() {
    const valueWithoutPlaceholder = this.value.replace(this.overlay, '')

    if (valueWithoutPlaceholder && this.overlay) {
      this.typeaheadPlaceholder = ''
    }

    this.placeholder = this.getAttribute('placeholder') || ''
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onInput() {
    this.resetPlaceholder()
    this.clearButton.hidden = !this.hasSomethingToClear()

    // Don't send a input event unless setup/connection is complete.
    // This way we can modify the input during the `this.connectedCallback()` without consequence.
    if (!this.connected) return
    this._dispatchEvent('command-palette-input')
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onClear(event?: Event) {
    // eslint-disable-next-line no-restricted-syntax
    if (event instanceof KeyboardEvent && event.key !== 'Escape') return

    this.value = ''
    this.input.focus()
    this._dispatchEvent('command-palette-cleared')
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onKeydown(event: KeyboardEvent) {
    /* eslint eslint-comments/no-use: off */
    /* eslint-disable no-restricted-syntax */
    // There was something to "select" and user hit proper key
    if (this.isSelectKeystroke(event.key)) {
      this._dispatchEvent('command-palette-select')

      event.stopImmediatePropagation()
      event.preventDefault()
    }

    if (this.hasSomethingToClear() && isPlatformMetaKey(event) && event.key === 'Backspace') {
      this.onClear()
      return
    }

    // User hit backspace on empty input
    if (
      this.input.selectionStart === 0 &&
      this.input.selectionEnd === 0 &&
      (this.hasScope() || this.multiPageEnabled) &&
      event.key === 'Backspace'
    ) {
      this._dispatchEvent('command-palette-descope')

      event.stopImmediatePropagation()
      event.preventDefault()
      return
    }
    /* eslint-enable no-restricted-syntax */
  }

  hasSomethingToClear() {
    return this.scopeElement.hasScope() || this.value.length > 0
  }

  isSelectKeystroke(key: string) {
    return key === 'Tab' || (key === 'ArrowRight' && this.isCursorAtEnd)
  }

  textSelected() {
    return this.input.selectionStart !== this.input.selectionEnd
  }

  /**
   * Emit CustomEvent of given event name with detail containing input and typeahead value.
   *
   * @param eventName
   * @returns void
   */
  _dispatchEvent(eventName: string) {
    const event = new CustomEvent(eventName, {
      cancelable: true,
      detail: {
        typeahead: this.typeahead,
        value: this.value
      }
    })

    return this.dispatchEvent(event)
  }
}
