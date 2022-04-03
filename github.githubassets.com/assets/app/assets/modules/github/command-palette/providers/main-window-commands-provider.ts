import DiscussionCommands from '../main-window-commands/discussion'
import EverywhereCommands from '../main-window-commands/everywhere'
import IssueCommands from '../main-window-commands/issue'
import {MainWindowCommandItem} from '../items/main-window-command-item'
import {ProviderBase} from '../provider'
import PullRequestCommands from '../main-window-commands/pull-request'
import {Query} from '../query'
import RepositoryCommands from '../main-window-commands/repository'

/**
 * Provides commands that run in the main window. Unlike normal commands, these have full access to the user's session.
 * They should only be used for actions that can't be accomplished using a normal command—like pressing a button in the UI.
 */
class MainWindowCommandsProvider extends ProviderBase {
  enabledFor(query: Query): boolean {
    if (query.mode === '>') {
      return true
    } else {
      return false
    }
  }

  get hasCommands(): boolean {
    return true
  }

  itemsByType: {[id: string]: MainWindowCommandItem[]} = {}
  items: MainWindowCommandItem[] = []
  needsFetch = true

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(query: Query, _isEmpty = false) {
    this.loadCommandItems(query)
    const filteredItems = query.isBlank() ? this.items : this.fuzzyFilter<MainWindowCommandItem>(this.items, query)
    return {results: filteredItems}
  }

  get debounce() {
    return 0
  }

  loadCommandItems(query: Query) {
    if (this.needsFetch) {
      this.items = [
        ...IssueCommands.map(command => command.item()),
        ...PullRequestCommands.map(command => command.item()),
        ...RepositoryCommands.map(command => command.item()),
        ...DiscussionCommands.map(command => command.item()),
        ...EverywhereCommands.map(command => command.item())
      ].filter(item => item.isApplicable(query))
      this.needsFetch = false
    }
  }

  clearCache() {
    this.needsFetch = true
  }
}

if (window.commandPalette) {
  window.commandPalette.registerProvider('main-window-commands-provider', new MainWindowCommandsProvider())
} else {
  window.addEventListener('command-palette-ready', () => {
    window.commandPalette?.registerProvider('main-window-commands-provider', new MainWindowCommandsProvider())
  })
}
