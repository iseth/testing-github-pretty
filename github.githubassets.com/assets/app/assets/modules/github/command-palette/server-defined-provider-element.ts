import {ServerDefinedProvider, ServerDefinedProviderProperties} from './providers/server-defined-provider'
import {attr, controller} from '@github/catalyst'
import {ProviderElement} from './provider-element'
import {ServerDefinedProviderFactory} from './providers/server-defined-provider-factory'

/**
 * This is a custom element that can be used to hold a the configuration for a server defined provider. This is useful for
 * when we want to define proprties of a provider on the server to be used on the client.
 * @example:
 * <server-defined-provider
 *  type="remote"
 *  src="/command_palette/providers/page_navigation"
 *  data-supported-modes="[""]"
 *  scope-types="["", "owner", "repo"]"
 * ></server-defined-provider>
 */
@controller
export class ServerDefinedProviderElement extends ProviderElement implements ServerDefinedProviderProperties {
  // REQUIRED: Expects the provider ID.
  // See the possible provider IDs in `ServerDefinedProviderFactory.providers`
  @attr type: string

  // REQUIRED: Expects a JSON string of supported modes.
  @attr supportedModes: string

  // REQUIRED: Expects a Number string representing the fetch debounce in milliseconds.
  @attr fetchDebounce: string

  // OPTIONAL: Expects a JSON string of scope types.
  @attr supportedScopeTypes: string

  // OPTIONAL: Expects a string path to make fetches to.
  @attr src: string

  // OPTIONAL: Whether the provider supports command items.
  @attr supportsCommands: boolean

  private _wildcard = '*'
  private _modes: string[]
  private _scopeTypes: string[]

  provider: ServerDefinedProvider

  // Mark: - Getters

  get debounce(): number {
    return parseInt(this.fetchDebounce, 10)
  }

  get hasCommands(): boolean {
    return this.supportsCommands
  }

  get hasWildCard(): boolean {
    return this.modes.includes(this._wildcard)
  }

  get modes(): string[] {
    if (this.supportedModes === '') {
      this._modes = ['']
    }

    if (!this._modes) {
      this._modes = JSON.parse(this.supportedModes)
    }

    return this._modes
  }

  get scopeTypes(): string[] {
    if (this.supportedScopeTypes === '') {
      return []
    }

    if (!this._scopeTypes) {
      this._scopeTypes = JSON.parse(this.supportedScopeTypes)
    }

    return this._scopeTypes
  }

  // Mark: - Setup

  connectedCallback(): void {
    this.provider = ServerDefinedProviderFactory.create(this)
  }
}
