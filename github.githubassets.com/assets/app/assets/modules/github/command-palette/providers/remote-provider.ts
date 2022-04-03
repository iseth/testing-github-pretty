import {Octicon, ProviderResponse} from '@github/command-palette-api'
import {ServerDefinedItem, ServerDefinedItemData} from '../items/server-defined-item'
import {Query} from '../query'
import {ServerDefinedProvider} from './server-defined-provider'

export class RemoteProvider extends ServerDefinedProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetch(query: Query, _isEmpty: boolean): Promise<ProviderResponse> {
    return this.fetchSrc(query)
  }

  enabledFor(query: Query): boolean {
    return this.modeMatch(query) && this.scopeMatch(query)
  }

  clearCache(): void {
    // nothing to clear
  }

  scopeMatch(query: Query) {
    return this.scopeTypes.length === 0 || this.scopeTypes.includes(query.scope.type)
  }

  modeMatch(query: Query) {
    return this.modes.includes(query.mode) || this.hasWildCard
  }

  // Mark: - Protected methods

  protected async fetchSrc(query: Query, overrideMode = ''): Promise<ProviderResponse> {
    if (!this.src) throw new Error('No src defined')

    const url = new URL(this.src, window.location.origin)
    const params = query.params()

    if (overrideMode) {
      params.set('mode', overrideMode)
    }

    url.search = params.toString()
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    if (response.ok) {
      const responseData: {results?: []; octicons?: Octicon[]} = await response.json()
      return {
        results:
          responseData.results?.map((itemData: ServerDefinedItemData) => ServerDefinedItem.build(itemData)) || [],
        octicons: responseData.octicons
      }
    } else {
      return {error: true, results: []}
    }
  }
}
