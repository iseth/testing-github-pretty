import {attr, controller} from '@github/catalyst'
import {Provider} from '@github/command-palette-api'
import {ProviderElement} from './provider-element'

/**
 * This is a custom element that can be used to hold a client defined provider. This is useful for
 * when we want to programmatically define a provider that we want to use in the command palette.
 */
@controller
export class ClientDefinedProviderElement extends ProviderElement {
  @attr providerId: string

  /**
   * Takes a `Provider` or a `Provider` and returns a `ClientDefinedProviderElement`
   * containing the given provider.
   * @param providerId: The id of the provider. Referenced when registering and deregistering.
   * @param provider: The provider to be used.
   * @returns: A `ClientDefinedProviderElement` containing the given provider.
   */
  static build(providerId: string, provider: Provider): ClientDefinedProviderElement {
    const element = new ClientDefinedProviderElement()
    element.providerId = providerId
    element.provider = provider
    return element
  }

  connectedCallback() {
    this.setAttribute('data-targets', 'command-palette.clientDefinedProviderElements')
  }
}
