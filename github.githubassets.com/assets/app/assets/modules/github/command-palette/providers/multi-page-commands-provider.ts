import {MainWindowCommandItem} from '../items/main-window-command-item'
import {Query} from '../query'
import {ServerDefinedProvider} from './server-defined-provider'
import {SwitchTheme} from '../main-window-commands/everywhere'

export class MultiPageCommandsProvider extends ServerDefinedProvider {
  enabledFor(query: Query): boolean {
    if (query.mode === '>') {
      return true
    } else {
      return false
    }
  }

  async fetch(query: Query) {
    return {results: this.fuzzyFilter<MainWindowCommandItem>(this.items, query)}
  }

  get items(): MainWindowCommandItem[] {
    return [SwitchTheme.item()]
  }

  clearCache() {
    // no-op
  }
}
