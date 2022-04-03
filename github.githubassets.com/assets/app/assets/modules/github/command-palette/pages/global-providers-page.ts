import {Page, Provider} from '@github/command-palette-api'
import {ClientDefinedProviderElement} from '../client-defined-provider-element'
import {ProviderElement} from '../provider-element'
import {ServerDefinedProviderElement} from '../server-defined-provider-element'

type PageProps = {
  title: string
  scopeId: string
  scopeType: string
}

export class GlobalProvidersPage implements Page {
  title: string
  scopeId: string
  scopeType: string

  constructor(data: PageProps) {
    this.title = data.title
    this.scopeId = data.scopeId
    this.scopeType = data.scopeType
  }

  get providers(): Provider[] {
    return this._providerElements.map(providerElement => providerElement.provider)
  }

  get _providerElements(): ProviderElement[] {
    return [...this.serverDefinedProviderElements, ...this.clientDefinedProviderElements]
  }

  get serverDefinedProviderElements(): ServerDefinedProviderElement[] {
    const providerElements = document.querySelectorAll<ServerDefinedProviderElement>('server-defined-provider')
    return Array.from(providerElements)
  }

  get clientDefinedProviderElements(): ClientDefinedProviderElement[] {
    const providerElements = document.querySelectorAll<ClientDefinedProviderElement>('client-defined-provider')
    return Array.from(providerElements)
  }
}
