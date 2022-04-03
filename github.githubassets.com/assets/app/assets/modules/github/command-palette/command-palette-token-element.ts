import {attr, controller} from '@github/catalyst'

export interface Token {
  text: string
  type: string
  id: string
  value: string
}

/**
 * <command-palette-token> represent a token used to build the scope UI. Each token holds attributes that can be used for querying.
 *
 * == Attributes
 * - text: The text to be shown for the token
 * - type: The type of token it is: owner or repository
 * - id: The global relay id for the token
 * - value: The value for query on descope
 */

@controller
export class CommandPaletteTokenElement extends HTMLElement {
  @attr type = ''
  @attr id = ''
  @attr text = ''
  @attr value = ''
}
