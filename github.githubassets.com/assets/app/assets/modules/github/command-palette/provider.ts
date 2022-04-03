import {Item, Provider, ProviderResponse} from '@github/command-palette-api'
import {Query} from './query'

/**
 * This abstract class defines the shared proprieties of all providers (defined within the command palette).
 */
export abstract class ProviderBase implements Provider {
  abstract fetch(query: Query, isEmpty: boolean): Promise<ProviderResponse>
  abstract enabledFor(query: Query): boolean
  abstract clearCache(): void
  abstract get hasCommands(): boolean
  abstract get debounce(): number

  /**
   * Filter and sort by relevance.
   *
   * Filtering is done by fuzzy matching against the title using fzy.js. During
   * filtering, items are updated with a score.
   *
   * @param items that should be filtered and sorted
   * @param query used to filter items
   * @param minScore items with a score greater than this will be returned (default 0)
   * @returns items that match query sorted by relevance
   */
  fuzzyFilter<T extends Item = Item>(items: T[], query: Query, minScore = 0) {
    if (query.isBlank()) {
      return items
    }

    const matchingItems = [] as T[]
    for (const item of items) {
      const score = item.calculateScore(query.text)
      if (score > minScore) {
        matchingItems.push(item)
      }
    }

    return matchingItems
  }
}
