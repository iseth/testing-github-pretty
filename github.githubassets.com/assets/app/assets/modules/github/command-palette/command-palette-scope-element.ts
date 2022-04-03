import {CommandPaletteTokenElement, Token} from './command-palette-token-element'
import {attr, controller, target, targets} from '@github/catalyst'
import {html, render} from '@github/jtml'
import {Scope as ScopeAPI} from '@github/command-palette-api'

export interface Scope extends ScopeAPI {
  tokens: Token[]
}

const MAX_TOKEN_DISPLAY_LENGTH_SM = 14
const MAX_SCOPE_DISPLAY_LENGTH_SM = 20
const MAX_TOKEN_DISPLAY_LENGTH = 20
const MAX_SCOPE_DISPLAY_LENGTH = 55

/**
 * <command-palette-scope> manages the scope tokens in the <command-palette-input>
 * it watches for <command-palette-token> elements to derive current scope: id, text, and type
 *
 * == Attributes
 * - tokens: Array of <command-palette-token> elements. When a new scope is set, the token elements are added. When de-scoping token elements are removed.
 * - text: The current scope text for display. Derived from the text attributes of child tokens.
 * - type: The current scope type for querying. Derived from the last child token's type.
 * - id: The current scope id for querying. Derived from the last child token's id.
 */

@controller
export class CommandPaletteScopeElement extends HTMLElement {
  static emptyScope: Scope = {type: '', text: '', id: '', tokens: []}
  lastRemovedToken: CommandPaletteTokenElement

  @attr smallDisplay = false

  @target placeholder: HTMLElement
  @targets tokens: CommandPaletteTokenElement[]

  connectedCallback() {
    this.classList.add('d-inline-flex')
  }

  get lastToken() {
    return this.tokens[this.tokens.length - 1]
  }

  get text(): string {
    return this.tokens.map(t => t.text).join('/')
  }

  get id(): string {
    return this.lastToken ? this.lastToken.id : CommandPaletteScopeElement.emptyScope.id
  }

  get type(): string {
    return this.lastToken ? this.lastToken.type : CommandPaletteScopeElement.emptyScope.type
  }

  get scope(): Scope {
    if (this.hasScope()) {
      return {
        text: this.text,
        type: this.type,
        id: this.id,
        tokens: this.tokens
      }
    } else {
      return CommandPaletteScopeElement.emptyScope
    }
  }

  // Set a new scope by rendering new <command-palette-token> elements
  // to derive updated scope id, text, and type.
  set scope(scope: Scope) {
    this.renderTokens(scope.tokens)
  }

  renderTokens(tokens: Token[]) {
    this.clearScope()

    let tokensLength = 0
    let truncationIndex = tokens.length
    const maxTokenDisplayLength = this.smallDisplay ? MAX_TOKEN_DISPLAY_LENGTH_SM : MAX_TOKEN_DISPLAY_LENGTH
    const maxScopeDisplayLength = this.smallDisplay ? MAX_SCOPE_DISPLAY_LENGTH_SM : MAX_SCOPE_DISPLAY_LENGTH

    for (let i = tokens.length - 1; i >= 0; i--) {
      if (tokensLength + Math.min(tokens[i].text.length, maxTokenDisplayLength) + 5 > maxScopeDisplayLength) {
        break
      }
      tokensLength += Math.min(tokens[i].text.length, maxTokenDisplayLength) + 5
      truncationIndex = i
    }

    // render() replaces the entire inner html of the element so we need to map all the tokens first
    const tokensTemplate = (newTokens: Token[]) => html`${newTokens.map(tokenTemplate)}`
    const tokenTemplate = (token: Token, index: number) => {
      const displayText =
        token.text.length > maxTokenDisplayLength
          ? `${token.text.substring(0, maxTokenDisplayLength - 3)}...`
          : token.text

      return html`
        <command-palette-token
          data-text="${token.text}"
          data-id="${token.id}"
          data-type="${token.type}"
          data-value="${token.value}"
          data-targets="command-palette-scope.tokens"
          hidden="${index < truncationIndex}"
          class="color-fg-default text-semibold"
          style="white-space:nowrap;line-height:20px;"
          >${displayText}<span class="color-fg-subtle text-normal">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        </command-palette-token>
      `
    }

    render(tokensTemplate(tokens), this)
    this.hidden = !this.hasScope()
    if (truncationIndex !== 0) {
      this.placeholder.hidden = false
    }
  }

  removeToken() {
    if (this.lastToken) {
      // Set last remove token for command-palette-input
      this.lastRemovedToken = this.lastToken

      // remove the token and rerender tokens
      this.lastToken.remove()
      this.renderTokens(this.tokens)
    }
  }

  hasScope() {
    return this.tokens.length > 0 && this.type && this.id && this.text
  }

  clearScope() {
    for (const token of this.tokens) {
      token.remove()
    }
    this.placeholder.hidden = true
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this.isConnected) return

    if (name === 'data-small-display' && oldValue !== newValue) {
      this.renderTokens(this.tokens)
    }
  }
}
