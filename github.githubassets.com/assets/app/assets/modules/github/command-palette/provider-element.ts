import {Provider} from '@github/command-palette-api'
import {Query} from './query'

/**
 * This is the base for all ProviderElements. It defines the shared interface/attributes between
 * the provider elements, most notably it contains a `Provider` attribute.
 */
export abstract class ProviderElement extends HTMLElement {
  provider: Provider
  _lastFetchQuery: Query
  isSetup = false

  connectedCallback() {
    this.isSetup = true
  }

  async fetchWithDebounce(query: Query, isEmpty: boolean) {
    // Improve debounce to use library https://github.com/github/platform-ux/issues/696
    this._lastFetchQuery = query
    await this.delay(this.provider.debounce)

    if (this._lastFetchQuery !== query) {
      return {results: []}
    } else {
      return this.provider.fetch(query, isEmpty)
    }
  }

  private delay(wait: number) {
    return new Promise(resolve => setTimeout(resolve, wait))
  }
}
