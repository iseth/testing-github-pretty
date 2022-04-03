import {attr, controller, target} from '@github/catalyst'
import {HelpItem} from './items/help-item'
import {Query} from './query'
/**
 * <command-palette-help> elements represent a help item's content. When added inside the help provider,
 * they will be displayed in the help mode.
 *
 * Help items can be configured to appear when their scopeType arrays match a certain scope.
 *
 * @example
 * <command-palette-provider data-type="help" data-mode="*">
 *   <command-palette-help data-prefix="#" data-scope-types="[\"owner\",\"repository\"]">
 *     <span data-target="command-palette-help.titleElement">Search for issues</span>
 *     <span data-target="command-palette-help.hintElement"><code>#</code></span>
 *   </command-palette-help>
 * </command-palette-provider>
 */

@controller
export class CommandPaletteHelpElement extends HTMLElement {
  @attr group: string
  @attr prefix: string
  @attr scopeTypes: string

  @target titleElement: HTMLElement
  @target hintElement: HTMLElement

  connectedCallback() {
    this.hidden = true
  }

  show(query: Query): boolean {
    return this.isEnabledScopeType(query)
  }

  isEnabledScopeType(query: Query): boolean {
    if (!this.scopeTypes) {
      return true
    }

    return this.scopeTypes && JSON.parse(this.scopeTypes).includes(query.scope.type)
  }

  toItem(index: number) {
    const args: {title: string; group: string; prefix?: string; index: number; persistentHint?: string} = {
      group: this.group,
      title: this.titleElement.innerHTML,
      index
    }
    if (this.prefix) {
      args.prefix = this.prefix
    }
    if (this.hintElement.textContent) {
      args.persistentHint = this.hintElement.innerHTML
    }
    return HelpItem.from(args)
  }
}
