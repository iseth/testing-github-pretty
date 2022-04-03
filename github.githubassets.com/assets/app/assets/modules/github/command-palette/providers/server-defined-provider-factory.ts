import {FilesProvider} from './files-provider'
import {HelpProvider} from './help-provider'
import {MultiPageCommandsProvider} from './multi-page-commands-provider'
import {PrefetchedProvider} from './prefetched-provider'
import {RemoteProvider} from './remote-provider'
import {SearchLinksProvider} from './search-links-provider'
import {ServerDefinedProvider} from './server-defined-provider'
import {ServerDefinedProviderElement} from '../server-defined-provider-element'

/**
 * A factory for creating server defined providers.
 */
export class ServerDefinedProviderFactory {
  /**
   * A map of provider server provided types to their provider class.
   */
  static providers: {[key: string]: typeof ServerDefinedProvider} = {
    remote: RemoteProvider,
    prefetched: PrefetchedProvider,
    files: FilesProvider,
    help: HelpProvider,
    'search-links': SearchLinksProvider,
    'multi-page-commands': MultiPageCommandsProvider
  }

  /**
   * Creates a `ServerDefinedProvider` subclass based on the properties in a `ServerDefinedProviderElement`.
   * Uses `type` to map to a provider class using `ServerDefinedProviderFactory.providers`.
   * @param properties: A `ServerDefinedProviderElement`
   * @returns a `ServerDefinedProvider` created from the properties.
   */
  static create(properties: ServerDefinedProviderElement): ServerDefinedProvider {
    const providerClass = this.providers[properties.type]
    if (!providerClass) {
      throw new Error(`Unknown provider type: ${properties.type}`)
    }
    return new providerClass(properties)
  }
}
