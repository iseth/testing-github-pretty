import {attr, controller} from '@github/catalyst'
import {ModeObserver} from './mode-observer'
import {Query} from './query'
/**
 * <command-palette-tip> represent the hint text displayed in various empty states.
 *
 * Tips can be configured to appear when the mode, type, or value match a certain string.
 *
 * @example
 * <command-palette-tip data-value="say hi">Hi there!</command-palette-tip>
 * <command-palette-tip data-mode=">">You are using command mode.</command-palette-tip>
 * <command-palette-tip data-match-mode="[^?]|^$">You are using any mode except for the help mode.</command-palette-tip>
 * <command-palette-tip data-scope-types="[\"owner\",\"repository\"]">You are scoped to an owner or a repository.</command-palette-tip>
 * <command-palette-tip data-on-empty>There are no results!</command-palette-tip>
 */
const matchAll = '*'
const undefinedRegex = ''

@controller
export class CommandPaletteTipElement extends HTMLElement implements ModeObserver {
  // By default, anything will match.
  @attr scopeTypes = undefinedRegex
  @attr mode = matchAll
  @attr matchMode = undefinedRegex
  @attr value = matchAll
  @attr onEmpty = false
  @attr onError = false

  connectedCallback() {
    this.hidden = true
  }

  available(query: Query, isEmpty = false, error = false) {
    const available =
      this.valueMatch(query.text) &&
      this.scopeTypeMatch(query.scope.type) &&
      this.modeMatch(query.mode) &&
      this.showOnEmpty(isEmpty) &&
      this.showOnError(error)

    return available
  }

  toggle(query: Query, isEmpty = false, error = false) {
    this.hidden = !this.available(query, isEmpty, error)
  }

  valueMatch(value: string) {
    return this.value === matchAll || this.value === value
  }

  scopeTypeMatch(scopeType: string) {
    return (
      this.scopeTypes !== undefinedRegex &&
      (this.scopeTypes === matchAll || JSON.parse(this.scopeTypes).includes(scopeType))
    )
  }

  modeMatch(mode: string) {
    if (this.matchMode === undefinedRegex) {
      return this.mode === matchAll || this.mode === mode
    } else {
      const regex = new RegExp(this.matchMode)
      return mode.match(regex) !== null
    }
  }

  showOnEmpty(isEmpty: boolean) {
    if (this.onEmpty) {
      return isEmpty
    } else {
      return true
    }
  }

  showOnError(error: boolean) {
    if (this.onError) {
      return error
    } else {
      return true
    }
  }
}
