import {Query} from '../query'
import {SearchLinkItem} from '../items/search-link-item'
import {ServerDefinedItem} from '../items/server-defined-item'
import {ServerDefinedProvider} from './server-defined-provider'

/**
 * Provides links to search a repository, an organization/user, or all of GitHub.
 */
export class SearchLinksProvider extends ServerDefinedProvider {
  enabledFor(query: Query): boolean {
    if (query.isBlank() || query.mode === '?' || query.mode === '>') {
      return false
    } else {
      return true
    }
  }

  clearCache(): void {
    // nothing
  }

  get hasCommands(): boolean {
    return false
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(query: Query, _isEmpty = false) {
    return {results: [SearchLinkItem.create(query)]} as {results: ServerDefinedItem[]}
  }
}
