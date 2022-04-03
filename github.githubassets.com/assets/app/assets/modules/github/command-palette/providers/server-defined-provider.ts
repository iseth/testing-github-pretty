import {ProviderBase} from '../provider'
import {ProviderResponse} from '@github/command-palette-api'
import {Query} from '../query'
import {ServerDefinedProviderElement} from '../server-defined-provider-element'

/**
 * The interface which determines which server defined provider properties can passed to the client.
 * These properties are passed through `ServerDefinedProviderElement`.
 */
export interface ServerDefinedProviderProperties {
  type: string
  modes: string[]
  debounce: number
  scopeTypes: string[]
  src: string | undefined
  hasCommands: boolean
  hasWildCard: boolean
}

/**
 * A provider subclass which is the base for all server defined providers. This provider gives it's
 * subclasses access to `ServerDefinedProviderProperties` provided by a `ServerDefinedProviderElement`.
 */
export class ServerDefinedProvider extends ProviderBase implements ServerDefinedProviderProperties {
  element: ServerDefinedProviderElement

  constructor(element: ServerDefinedProviderElement) {
    super()
    this.element = element
  }

  get type(): string {
    return this.element.type
  }

  get modes(): string[] {
    return this.element.modes
  }

  get debounce(): number {
    return this.element.debounce
  }

  get scopeTypes(): string[] {
    return this.element.scopeTypes
  }

  get src(): string | undefined {
    return this.element.src
  }

  get hasWildCard(): boolean {
    return this.element.hasWildCard
  }

  get hasCommands(): boolean {
    return this.element.hasCommands
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetch(_query: Query, _isEmpty: boolean): Promise<ProviderResponse> {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enabledFor(_query: Query): boolean {
    throw new Error('Method not implemented.')
  }
  clearCache(): void {
    throw new Error('Method not implemented.')
  }
}
