import {Item, Octicon, ProviderResponse} from '@github/command-palette-api'
import {Query} from '../query'
import {RemoteProvider} from './remote-provider'

/**
 * This provides results to the command palette.
 *
 * It prefetches results from the server and filters them on the client-side as
 * the user types. Results are prefetched when the command palette is activated
 * or when the scope changes.
 *
 * Because the results are already loaded, this provider has near-zero latency.
 *
 * If your data source has a bounded size that is 1,000 or less, a prefetched
 * provider will offer a better user experience with less server load.
 */
export class PrefetchedProvider extends RemoteProvider {
  octicons: Octicon[]
  maxItems = 1000
  scopedItems: {
    [scopeId: string]: Item[]
  } = {}
  cachedOcticons: {
    [scopeId: string]: Octicon[]
  } = {}

  clearCache() {
    super.clearCache()
    this.scopedItems = {}
    this.cachedOcticons = {}
  }

  get debounce() {
    return 0
  }

  async prefetch(query: Query) {
    if (!this.scopeMatch(query)) return
    // No need to fetch from server if we already have the results.
    if (this.scopedItems[query.scope.id]) return

    // When pre-fetching we want results from a query with no query text.
    // A query with no text should generally return a complete set of results
    // that the fuzzy filter can then filter based on the query text.
    const blankQuery = new Query('', query.mode, {
      subjectId: query.subjectId,
      subjectType: query.subjectType,
      returnTo: query.returnTo,
      scope: query.scope
    })
    const responseData = await this.fetchSrc(blankQuery, query.mode)
    this.octicons = responseData.octicons || []
    const items = responseData.results || []

    // Cache these results for this scope. fetch can then return them immediately.
    this.scopedItems[query.scope.id] = items
    this.cachedOcticons[query.scope.id] = this.octicons
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(query: Query, _isEmpty: boolean): Promise<ProviderResponse> {
    const items = this.scopedItems[query.scope.id] || []
    const octicons = this.cachedOcticons[query.scope.id] || []

    const matchingItems = this.fuzzyFilter(items, query)
    return {results: matchingItems.slice(0, this.maxItems), octicons}
  }
}
