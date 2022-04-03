import {CommandPaletteHelpElement} from '../command-palette-help-element'
import {Query} from '../query'
import {ServerDefinedItem} from '../items/server-defined-item'
import {ServerDefinedProvider} from './server-defined-provider'

/**
 * Provides links to search a repository, an organization/user, or all of GitHub.
 */
export class HelpProvider extends ServerDefinedProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enabledFor(_query: Query): boolean {
    return true
  }

  clearCache(): void {
    // nothing
  }

  get hasCommands(): boolean {
    return false
  }

  get debounce() {
    return 0
  }

  async fetch(query: Query, isEmpty = false) {
    if (query.mode === '?' || isEmpty) {
      const helpElements = Array.from(this.element.querySelectorAll<CommandPaletteHelpElement>('command-palette-help'))
      const helpItems = helpElements
        .filter(helpElement => helpElement.show(query))
        .map((helpElement, index) => helpElement.toItem(index))

      return {results: helpItems} as {results: ServerDefinedItem[]}
    } else {
      return {results: []} as {results: ServerDefinedItem[]}
    }
  }
}
