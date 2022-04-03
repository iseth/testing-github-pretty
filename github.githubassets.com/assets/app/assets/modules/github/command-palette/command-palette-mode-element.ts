import {attr, controller} from '@github/catalyst'
import {Scope} from './command-palette-scope-element'

/**
 * <command-palette-mode> represent a mode which the command palette can operate within.
 *
 * == Attributes
 * - char: the mode character
 * - placeholder: the placeholder text to display when the command palette is in this mode
 * - scopeTypes: the scope types for when this mode is active
 */

const matchAll = '*'

@controller
export class CommandPaletteModeElement extends HTMLElement {
  @attr char: string
  @attr placeholder: string
  @attr scopeTypes = ''

  /**
   * Returns whether this mode is active for the given scope and first character.
   *
   * @param scope the scope to check
   * @param firstChar the first character from the command palette input
   */
  active(scope: Scope, firstChar: string): boolean {
    return this.scopeTypeMatch(scope.type) && this.modeMatch(firstChar)
  }

  scopeTypeMatch(scopeType: string) {
    if (!this.scopeTypes) {
      return true
    }

    return this.scopeTypes && JSON.parse(this.scopeTypes).includes(scopeType)
  }

  modeMatch(mode: string) {
    return this.char === matchAll || this.char === mode
  }

  /**
   * Returns the character to display for this mode.
   */
  character(): string {
    return this.char === matchAll ? '' : this.char
  }
}
