import {CommandPalette as CommandPaletteAPI, Item, Octicon, Page, Provider} from '@github/command-palette-api'
import {attr, controller, target, targets} from '@github/catalyst'
import {ClientDefinedProviderElement} from './client-defined-provider-element'
import {CommandPaletteInputElement} from './command-palette-input-element'
import {CommandPaletteItemElement} from './command-palette-item-element'
import {CommandPaletteItemGroupElement} from './command-palette-item-group-element'
import {CommandPaletteItemStackElement} from './command-palette-item-stack-element'
import {CommandPaletteModeElement} from './command-palette-mode-element'
import {CommandPalettePageStackElement} from '../../../../components/command_palette/command-palette-page-stack-element'
import {CommandPaletteTipElement} from './command-palette-tip-element'
import {GlobalProvidersPage} from './pages/global-providers-page'
import {PrefetchedProvider} from './providers/prefetched-provider'
import {ProviderElement} from './provider-element'
import {Query} from './query'
import {Scope} from './command-palette-scope-element'
import {ServerDefinedProviderElement} from './server-defined-provider-element'
import {crc32} from '@allex/crc32'
import {debounce} from '@github/mini-throttle/decorators'
import {getPjaxMetadataElement} from './pjax-metadata-helpers'
import {sendTrackingEvent} from './tracking'

const isMac = () => {
  return navigator.platform.match(/Mac/)
}

const platformMetaKey = isMac() ? 'metaKey' : 'ctrlKey'
const platformModifierKey = isMac() ? 'Meta' : 'Control'

/* eslint-disable-next-line custom-elements/no-exports-with-element */
export const isPlatformMetaKey = (event: Event) => {
  if (!(event instanceof KeyboardEvent)) {
    return false
  }

  return event[platformMetaKey]
}

type OcticonSvgs = {[name: string]: string}

const DISPLAY_BREAKPOINT_SM = 450
@controller
export default class CommandPalette extends HTMLElement implements CommandPaletteAPI {
  static tagName = 'command-palette'

  commandPaletteInput: CommandPaletteInputElement
  list: HTMLElement
  groups: NodeListOf<CommandPaletteItemGroupElement>
  activated = false
  error = false
  modes: CommandPaletteModeElement[]
  defaultMode: CommandPaletteModeElement
  activeMode: CommandPaletteModeElement

  // default to a blank query
  query: Query = new Query('', '')

  previouslyActiveElement?: HTMLElement
  octicons: OcticonSvgs = {}
  requestsInProgress: Array<Array<Promise<void>>> = []
  setupComplete = false
  sessionId = ''

  @attr returnTo = ''
  @attr userId = ''
  @attr multiPageEnabled = false

  // Hotkeys to open the command palette in various modes are set as data attributes.
  // Users can customize their hotkeys, which are stored in UserSettings.

  // Default hotkeys are assigned here so that the component can function on its own,
  // but GitHub's UserSettings has its own defaults which are passed in through the data attributes.

  // Tip: the logic to handle the keyboard events to activate the command palette
  // currently lives in the `command-palette` bundle file

  // This is the hotkey to open the command palette
  // cmd+k is used in textareas for inserting markdown hyperlinks,
  // so there's an optional secondary activation hotkey that can be used when the user is in a markdown textarea.
  // See the `secondaryActivationHotkey` getter which will return the last segment of this hotkey.
  @attr activationHotkey = 'Mod+k,Mod+Alt+k'

  // This is the hotkey to open the command palette in "command" mode
  // (and windows sees a capital K instead of the Shift key)
  @attr commandModeHotkey = 'Mod+Shift+k,Control+K'

  // tempoarary way to activate the site command palette in Memex projects.
  // requires the `command_palette_on_memex` feature flag to work.
  @attr memexActivationHotkey = 'Mod+p'

  @target pageStack: CommandPalettePageStackElement

  @targets clientDefinedProviderElements: ClientDefinedProviderElement[]
  @targets serverDefinedProviderElements: ServerDefinedProviderElement[]

  get itemStackElement() {
    return this.querySelector<CommandPaletteItemStackElement>('command-palette-item-stack')!
  }

  setup() {
    this.modes = Array.from(this.querySelectorAll<CommandPaletteModeElement>('command-palette-mode')!)
    this.defaultMode = this.querySelector<CommandPaletteModeElement>('.js-command-palette-default-mode')!
    this.commandPaletteInput = this.querySelector<CommandPaletteInputElement>('command-palette-input')!
    this.groups = this.querySelectorAll<CommandPaletteItemGroupElement>('command-palette-item-group')!

    if (!this.multiPageEnabled) {
      this.itemStackElement.getQuery = () => this.query
    }

    document.addEventListener('pjax:end', this.pjaxReset.bind(this))
    /* eslint-disable-next-line compat/compat */
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.commandPaletteInput.scopeElement.smallDisplay = entry.contentRect.width < DISPLAY_BREAKPOINT_SM
      }
    })

    resizeObserver.observe(this)

    if (this.defaultOpen) {
      this.manualToggle(true)
      this.clearReturnToParams()
    }

    window.commandPalette = this

    this.setupComplete = true

    const event = new Event('command-palette-ready', {
      bubbles: true,
      cancelable: true
    })
    this.dispatchEvent(event)
  }

  connectedCallback() {
    if (!this.setupComplete) {
      this.setup()
    }
  }

  /**
   * This function is responsible for clearing state from the command palette.
   * This is useful for when the command palette moves between PJAX navigation events.
   *
   * By default it resets the input.
   *
   * @param resetInput an optional argument which specifies that the the input should be reset.
   * @returns a promise from `prefetchProviderData` if a fetch was requested, or `undefined` if not.
   */
  clear(resetInput = true): Promise<void> {
    this.clearProviderCaches()

    if (this.multiPageEnabled) {
      this.pageStack.reset(this.pjaxMeta?.resetPages || [])
    } else {
      // clear whole item stack
      this.itemStackElement.clear()
    }

    if (resetInput) this.resetInput()

    // re-request providers if the palette is still active
    if (this.activated) {
      return this.prefetchProviderData()
    } else {
      return Promise.resolve()
    }
  }

  /**
   * This function is responsible for clearing command state from the command palette.
   * This is useful for when the there is a state change on page (eg. Issue close).
   *
   * By default it resets the input.
   *
   * @param resetInput an optional argument which specifies that the the input should be reset.
   */
  @debounce(250)
  clearCommands(resetInput = true): Promise<void> {
    this.clearCommandProviderCaches()

    if (!this.multiPageEnabled) {
      // remove commands data/state from the ItemStack
      this.itemStackElement.clearItemsFor(CommandPaletteItemGroupElement.commandGroupIds)
    }

    if (resetInput) this.resetInput()

    // re-request command providers if the palette is still active
    if (this.activated) {
      return this.prefetchProviderData({providers: this.commandsProviderElements})
    } else {
      return Promise.resolve()
    }
  }

  /**
   * Resets the input to it's default state for the page.
   */
  resetInput() {
    this.commandPaletteInput.value = ''
    this.commandPaletteInput.resetScopeIfNeeded()
  }

  // things that should be done every time the command palette is opened
  activate() {
    // Generate a new sessionId every activation for tracking
    this.sessionId = this.generateSessionId()
    this.commandPaletteInput.scopeElement.smallDisplay = this.offsetWidth < DISPLAY_BREAKPOINT_SM
    this.commandPaletteInput.resetScopeIfNeeded()
    this.commandPaletteInput.focus()
    this.setActiveModeElement()
    this.setQuery()
    this.toggleTips()

    if (this.multiPageEnabled) {
      this.pageStack.currentPage.hidden = false
      this.pageStack.currentPage.fetch()
      this.pageStack.bindListeners()
    } else {
      this.prefetchProviderData()
      this.updateOverlay()

      this.itemStackElement.bindListeners()

      // Prefetch data for global scope in case user backs out of non global scope
      if (this.commandPaletteInput.hasScope()) {
        // We create the same query as the current query, but without a scope
        const query = new Query(this.query.queryText, this.query.queryMode, {
          subjectId: this.query.subjectId,
          subjectType: this.query.subjectType,
          returnTo: this.query.returnTo
        })
        this.prefetchProviderData({query})
      }
    }

    this.activated = true
    sendTrackingEvent('session_initiated')
  }

  // things that should be done when the command palette is closed
  deactivate() {
    this.activated = false

    if (!this.multiPageEnabled) {
      this.itemStackElement.clearSelection()
      this.itemStackElement.unbindListeners()
    } else {
      this.pageStack.unbindListeners()
    }

    if (this.previouslyActiveElement) {
      this.previouslyActiveElement.focus()
    }

    sendTrackingEvent('session_terminated')
  }

  generateSessionId() {
    return crc32(`${Date.now()}_${this.userId}_${this.query.path}`).toString()
  }

  manualToggle(open: boolean) {
    const details = this.closest('details')!
    open ? (details.open = true) : details.removeAttribute('open')
  }

  /**
   * Close the command palette.
   */
  dismiss() {
    this.manualToggle(false)
    this.clear()
  }

  // subjectId needs to change between pjax pages so we read it from a data-pjax-replace element
  get defaultScopeId() {
    return this.pjaxMeta?.defaultScopeId || ''
  }

  // subjectType needs to change between pjax pages so we read it from a data-pjax-replace element
  get defaultScopeType() {
    return this.pjaxMeta?.defaultScopeType || ''
  }

  // this element gets re-rendered after a pjax navigation
  get pjaxMeta() {
    return getPjaxMetadataElement()
  }

  // If the activation hotkey has a comma, use the final comma-separated segment
  // as the "secondary" hotkey, which works when a user is focused
  // in a Markdown textarea.
  get secondaryActivationHotkey(): string {
    const hotkeys = this.activationHotkey.split(',')

    if (hotkeys.length > 1) {
      return hotkeys[hotkeys.length - 1]
    }

    return ''
  }

  get platformActivationHotkey(): string {
    return this.platformHotkey(this.activationHotkey)
  }

  get platformSecondardActivationHotkey(): string {
    return this.platformHotkey(this.secondaryActivationHotkey)
  }

  get platformCommandModeHotkey(): string {
    return this.platformHotkey(this.commandModeHotkey)
  }

  get platformMemexActivationHotkey(): string {
    return this.platformHotkey(this.memexActivationHotkey)
  }

  // Substitutes the `Mod` keyword for the platform's modifier key.
  // Also works around some platform-specific quirks.
  // Returns an empty string if the user has chosen to disable that hotkey.
  platformHotkey(hotkeyString: string): string {
    if (hotkeyString === 'none') return ''

    let hotkey = hotkeyString

    if (isMac()) {
      // the order of mod & alt on Mac platforms needs to be switched around
      // in order to match `eventToHotkeyString` from the hotkey library,
      // but we store them in a standardized format in UserSettings, so it gets swapped around here.
      hotkey = hotkey.replace(/Mod\+Alt/g, 'Alt+Mod')
    } else {
      // For a hotkey such as Control+Shift+p, Windows sees it as Control+P (capitalized, without Shift)
      // So we want to replace the first occurrence of Shift+char with a capitalized char
      // and append that to the configured hotkey.
      if (hotkey.includes('Shift')) {
        const key = hotkey.charAt(hotkey.length - 1)
        hotkey += `,${hotkey.replace(`Shift+${key}`, key.toUpperCase())}`
      }
    }

    // `Mod` is a special keyword that means "Command" or "Control" depending on the platform
    return hotkey.replace(/Mod/g, platformModifierKey)
  }

  pjaxReset() {
    // Because we are using the same command palette in layouts/application across pjax pages
    // we need to manually run various actions to reset command palette after a pjax page navigation.
    // Including a new command palette via pjax in erb introduces lifecycle issues that make component set up inconsistent
    //   see: https://github.com/github/web-systems/issues/64#issuecomment-906683997
    // activate() should run other needed actions to get palette into correct state every open after this
    this.activated = false
    this.clear()
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onInput() {
    this.commandPaletteInput.typeahead = ''
    this.setActiveModeElement()
    this.setQuery()

    if (this.activated) {
      this.fetchProviderData()
    }

    if (!this.multiPageEnabled) {
      this.itemStackElement.updateSelectedItem()
    }

    this.toggleTips()
    this.updateOverlay()
  }

  updateOverlay() {
    const mode = this.getMode()
    this.commandPaletteInput.overlay = mode

    for (const group of this.groups) {
      group.renderElement(mode)
    }

    if (mode && this.getTextWithoutMode() === '') {
      const placeholder = this.getModeElement().placeholder || ''
      this.commandPaletteInput.showModePlaceholder(placeholder)
    } else {
      this.commandPaletteInput.showModePlaceholder('')
    }
  }

  itemsUpdated(event: Event) {
    if (!(event instanceof CustomEvent)) return

    const currentItems = event.detail.items as Item[]
    const currentItemsExcludingFooter = currentItems.filter(
      item => item.group !== CommandPaletteItemGroupElement.footerGroupId
    )
    const currentItemsExcludingFooterAndHelp = currentItemsExcludingFooter.filter(
      item => !CommandPaletteItemGroupElement.helpGroupIds.includes(item.group)
    )

    const hasHelpItems = currentItemsExcludingFooter.length > currentItemsExcludingFooterAndHelp.length
    const isEmpty = this.finishedLoading && currentItemsExcludingFooterAndHelp.length === 0 && this.activated

    if (currentItemsExcludingFooterAndHelp.length > 0) {
      // if we have any actual items, we can remove the empty state immediately
      // instead of waiting for results to finish to make the UI a bit more responsive
      this.toggleEmptyState(false, hasHelpItems)
    } else if (isEmpty) {
      // if providers have finished and it's still empty,
      // we know that we should show the empty state and toggle the tips.
      this.toggleEmptyState(true, hasHelpItems)
      this.toggleTips()
    }

    this.toggleErrorTips()
  }

  loadingStateChanged(event: Event) {
    if (!(event instanceof CustomEvent)) return
    this.commandPaletteInput.loading = event.detail.loading
  }

  pageFetchError(event: Event) {
    if (!(event instanceof CustomEvent)) return

    this.error = true
    this.toggleErrorTips()
  }

  selectedItemChanged(event: Event) {
    if (!(event instanceof CustomEvent)) return
    const item = event.detail.item as Item
    const isDefaultSelection = event.detail.isDefaultSelection
    this.updateTypeahead(item, isDefaultSelection)
  }

  /**
   * Grabs first character from the input and checks if it matches against a mode. Once the mode is
   * found, it memoizes it for fast retrieval.
   * A mode is considered active if the first character of the input matches the mode character,
   * and if mode is valid for the current scope.
   *
   */
  setActiveModeElement() {
    const firstChar = this.commandPaletteInput.value.substring(0, 1)

    const currentMode = this.modes
      .filter(mode => mode.active(this.query.scope, firstChar))
      .find(mode => mode.character() === firstChar)

    this.activeMode = currentMode || this.defaultMode

    if (this.multiPageEnabled) {
      this.pageStack.currentMode = this.activeMode.character()
    }
  }

  /**
   * Grabs the current mode, query (without the mode), scope, subject, and return_to params and
   * memoizes them in the command-palette-element. Calling this function ensures that `this.query`
   * is up to date.
   *
   */
  setQuery() {
    this.query = new Query(this.getTextWithoutMode().trimStart(), this.getMode(), {
      scope: this.commandPaletteInput.scope,
      subjectId: this.defaultScopeId,
      subjectType: this.defaultScopeType,
      returnTo: this.returnTo
    })

    if (this.multiPageEnabled) {
      this.pageStack.currentQueryText = this.getTextWithoutMode().trimStart()
    }
  }

  /**
   * Returns the memoized mode set by `setActiveModeElement()`.
   *
   * @returns the active mode element
   */
  getModeElement(): CommandPaletteModeElement {
    return this.activeMode
  }

  /**
   * Grabs first character from input and checks if it is a mode character that is enabled for the current scope
   * If so, it returns that character.
   *
   * @returns mode character
   */
  getMode(): string {
    return this.getModeElement()?.character()
  }

  /**
   * Returns user input with mode character removed, if present. For example, if
   * the user types `>switch`, this will return `switch`.
   *
   * @returns user input without mode prefix
   */
  getTextWithoutMode() {
    if (!this.commandPaletteInput) return ''

    const text = this.commandPaletteInput.value
    const modeChar = this.getMode()

    if (modeChar && text.startsWith(modeChar)) {
      return text.substring(1)
    }

    return text
  }

  get selectedItem(): CommandPaletteItemElement | undefined {
    if (this.multiPageEnabled) {
      return this.pageStack.currentPage.selectedItem
    }

    return this.itemStackElement.selectedItem
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onSelect(event: Event) {
    if (this.selectedItem) {
      this.selectedItem.item.select(this)
    } else {
      // Tell the input that there was nothing to scope into, or autocomplete
      event.preventDefault()
    }
  }

  autocomplete(item: Item) {
    const input = this.commandPaletteInput
    if (item.typeahead !== undefined) {
      input.value = input.overlay + item.typeahead
    } else {
      input.value = input.overlay + item.title
    }
  }

  setScope(newScope?: Scope) {
    if (this.multiPageEnabled) {
      const scope = newScope ? newScope : this.commandPaletteInput.scope

      for (const token of scope.tokens) {
        const isLastToken = token === scope.tokens[scope.tokens.length - 1]

        const page = new GlobalProvidersPage({
          title: token.value,
          scopeId: token.id,
          scopeType: token.type
        })

        this.pageStack.push(page, !isLastToken)
      }

      this.commandPaletteInput.value = ''
    } else {
      this.itemStackElement.clearSelection()
      if (newScope) {
        this.commandPaletteInput.scope = newScope
      }
      this.commandPaletteInput.value = ''

      this.setQueryScope()
      this.toggleTips()
      this.prefetchProviderData()
    }
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onDescope() {
    if (this.multiPageEnabled) {
      this.pageStack.pop()
      return
    }

    const hasScope = this.commandPaletteInput.hasScope()

    if (hasScope) {
      const text = this.commandPaletteInput.value
      this.commandPaletteInput.removeToken()
      this.setScope()
      this.commandPaletteInput.setRemovedTokenAndSelect(text)
    }
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onInputClear() {
    if (this.multiPageEnabled) {
      this.pageStack.clear()
    } else {
      this.commandPaletteInput.clearScope()
      this.setScope()
    }
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onKeydown(event: KeyboardEvent) {
    /* eslint eslint-comments/no-use: off */
    /* eslint-disable no-restricted-syntax */
    if (event.key === 'Enter' && this.selectedItem) {
      this.selectedItem?.activate(this, event)

      event.preventDefault()
      event.stopPropagation()
    } else if (event.key === 'ArrowDown') {
      this.navigateToItem(1)
      event.preventDefault()
      event.stopPropagation()
    } else if (event.key === 'ArrowUp') {
      this.navigateToItem(-1)
      event.preventDefault()
      event.stopPropagation()
    } else if (this.isCopyEvent(event) && this.selectedItem) {
      this.selectedItem.copy(this)

      event.preventDefault()
      event.stopPropagation()
    }
    /* eslint-enable no-restricted-syntax */
  }

  navigateToItem(diff: number) {
    if (!this.multiPageEnabled) {
      this.itemStackElement.navigate(diff)
    } else {
      this.pageStack.navigate(diff)
    }
  }

  toggleTips() {
    const availableTips = this.modeTips.filter(tipElement => tipElement.available(this.query))
    const tipToShow = availableTips[Math.floor(Math.random() * availableTips.length)]

    for (const tip of this.modeTips) {
      tip.hidden = !(tipToShow === tip)
    }

    if (this.multiPageEnabled) {
      this.pageStack.hasVisibleTip = !!tipToShow
      this.pageStack.currentPage.recomputeStyles()
    } else if (this.finishedLoading) {
      this.itemStackElement.setMaxHeight()
    }
  }

  toggleEmptyState(isEmpty: boolean, hasHelpItems: boolean) {
    for (const emptyState of this.emptyStateElements) {
      emptyState.toggle(this.query, isEmpty)
    }

    if (!hasHelpItems && isEmpty) {
      const helpProvider = this.serverDefinedProviderElements.find(element => element.type === 'help')
      if (helpProvider) {
        if (this.multiPageEnabled) {
          this.pageStack.currentPage.fetch([helpProvider.provider], {isEmpty: true})
        } else {
          this.fetchProviderData([helpProvider], {isEmpty: true})
        }
      }
    } else if (hasHelpItems && !isEmpty && !this.multiPageEnabled) {
      this.itemStackElement.clearItemsFor(CommandPaletteItemGroupElement.helpGroupIds)
    }

    if (this.finishedLoading && !this.multiPageEnabled) {
      this.itemStackElement.setMaxHeight()
    }
  }

  toggleErrorTips() {
    for (const tip of this.errorStateTips) {
      tip.toggle(this.query, false, this.error)
    }
  }

  updateInputScope(event: Event) {
    if (!(event instanceof CustomEvent)) return
    this.commandPaletteInput.scope = this.pageStack.scope
  }

  updateTypeahead(selectedItem: Item, isDefaultSelection = false) {
    if (this.getTextWithoutMode() === '' && (!selectedItem || isDefaultSelection)) {
      this.commandPaletteInput.typeahead = ''
    } else if (selectedItem) {
      this.commandPaletteInput.typeahead = selectedItem.typeahead ?? selectedItem.title ?? ''
    }
  }

  /**
   * See if this keyboard event should be treated like a copy command.
   *
   * This relies on two checks:
   * 1. See if the keypress maps to the common copy keyboard shortcut for the operating system.
   * 2. Ensure the user hasn't selected any text (if they have, we don't want to intercept).
   *
   * @param event
   * @returns true when command palette should respond to event with copy
   */
  isCopyEvent(event: KeyboardEvent) {
    /* eslint eslint-comments/no-use: off */
    /* eslint-disable no-restricted-syntax */
    if (this.commandPaletteInput.textSelected()) return false

    if (isMac()) {
      return event.metaKey && event.key === 'c'
    } else {
      return event.ctrlKey && event.key === 'c'
    }
    /* eslint-enable no-restricted-syntax */
  }

  setQueryScope() {
    this.query.scope = this.commandPaletteInput.scope
  }

  /**
   * Prefetch data from the source and then update with the latest results.
   *
   * @param query an optional `Query` to make fetches for. Defaults to `this.query`
   * @param providers an optional array of `CommandPaletteProviderElement`s to make fetches to.
   */
  async prefetchProviderData(givenOptions: {query?: Query; providers?: ProviderElement[]} = {}) {
    if (this.multiPageEnabled) return
    const defaultOptions = {query: this.query, providers: this.providerElements}
    const options = {
      ...defaultOptions,
      ...givenOptions
    }

    await Promise.all(
      Array.from(options.providers).map(async providerElement => {
        const provider = providerElement.provider

        if (provider instanceof PrefetchedProvider) {
          if (!provider.scopeMatch(options.query)) return

          await provider.prefetch(options.query.immutableCopy())
          this.cacheIcons(provider.octicons)
        }

        await this.fetchProviderData([providerElement], {prefillItemStack: true})
      })
    )
  }

  /**
   * Fetches results from providers and then adds it to the item stack.
   *
   * @param providerElements list of providers (defaults to `this.providers`)
   * @param prefillItemStack an optional boolean to indicate if these results should be propagated
   *                         for all of their possible query paths. Defaults to `false`.
   * @param isEmpty an optional boolean to indicate whether the command palette is empty after
   *                fetching from the providers. This is useful to tell the help mode provider
   *                to activate. Defaults to `false`.
   */
  async fetchProviderData(
    providerElements?: ProviderElement[],
    givenOptions: {prefillItemStack?: boolean; isEmpty?: boolean} = {}
  ) {
    if (this.multiPageEnabled) return

    const defaultOptions = {prefillItemStack: false, isEmpty: false}
    const options = {
      ...defaultOptions,
      ...givenOptions
    }

    const targetProviderElements = providerElements ?? this.providerElements
    this.error = false
    await this.fetchWithSpinner(
      targetProviderElements.map(async providerElement => {
        if (!providerElement.provider.enabledFor(this.query)) return

        const query = this.query.immutableCopy()
        const providerData = await providerElement.fetchWithDebounce(query, options.isEmpty)
        if (providerData) {
          if (providerData.error) {
            this.error = true
            this.toggleErrorTips()
          }

          if (providerData.octicons) {
            this.cacheIcons(providerData.octicons)
          }
        }

        if (!this.multiPageEnabled) {
          this.itemStackElement.addItems(query, providerData.results, options.prefillItemStack)
        }
      })
    )
  }

  /**
   * This function uses the `requestsInProgress` array to show/hide
   * the loading spinner only when all in-flight requests have finished.
   *
   * @param promises an array of promises to be executed
   */
  async fetchWithSpinner(promises: Array<Promise<void>>) {
    // push the array of promises into the request stack
    this.requestsInProgress.push(promises)

    // show the loading spinner & perform the requests
    this.commandPaletteInput.loading = true
    await Promise.all(promises)

    // remove this group of requests from the request stack once they have finished
    this.requestsInProgress.splice(this.requestsInProgress.indexOf(promises), 1)

    // if there are no other requests still pending, we can hide the loading spinner
    this.commandPaletteInput.loading = this.requestsInProgress.length > 0
  }

  get providerElements(): ProviderElement[] {
    return [...this.serverDefinedProviderElements, ...this.clientDefinedProviderElements]
  }

  get commandsProviderElements() {
    return this.providerElements.filter(providerElement => providerElement.provider.hasCommands)
  }

  clearProviderCaches() {
    for (const providerElement of this.providerElements) {
      providerElement.provider.clearCache()
    }
  }

  clearCommandProviderCaches() {
    for (const commandProviderElement of this.commandsProviderElements) {
      commandProviderElement.provider.clearCache()
    }
  }

  registerProvider(providerId: string, provider: Provider) {
    const existingProviderElement = this.querySelector(`client-defined-provider[data-provider-id="${providerId}"]`)
    if (existingProviderElement) {
      existingProviderElement.remove()
    }

    const providerElement = ClientDefinedProviderElement.build(providerId, provider)
    this.appendChild(providerElement)
  }

  pushPage(page: Page) {
    if (!this.multiPageEnabled) return

    this.pageStack.push(page)
    this.resetInput()
  }

  get tipElements() {
    const tips = this.querySelectorAll<CommandPaletteTipElement>('command-palette-tip')
    return Array.from(tips)
  }

  get modeTips() {
    return this.tipElements.filter(tipElement => !tipElement.onEmpty && !tipElement.onError)
  }

  get emptyStateElements() {
    return this.tipElements.filter(tipElement => tipElement.onEmpty)
  }

  get errorStateTips() {
    return this.tipElements.filter(tipElement => tipElement.onError)
  }

  get finishedLoading() {
    return this.requestsInProgress.length === 0
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  get defaultOpen() {
    return this.getAttribute('data-default-open') !== null
  }

  clearReturnToParams() {
    const params = new URLSearchParams(location.search)
    params.delete('command_palette_open')
    params.delete('command_query')
    params.delete('command_mode')
    params.delete('clear_command_scope')
    history.replaceState(null, '', `?${params}${location.hash}`)
  }

  cacheIcons(octicons: Octicon[]) {
    if (!this.multiPageEnabled) {
      for (const octicon of octicons) {
        this.itemStackElement.octicons[octicon.id] = octicon.svg
      }
    }
  }

  displayFlash(type: string, message: string, durationMs = 5000) {
    const toastContainer = document.querySelector<HTMLDivElement>('.js-command-palette-toasts')
    if (!toastContainer) return

    const everyToast = toastContainer.querySelectorAll<HTMLDivElement>('.Toast')
    for (const toast of everyToast) {
      toast.hidden = true
    }

    const toast = toastContainer.querySelector<HTMLDivElement>(`.Toast.Toast--${type}`)
    if (!toast) return

    const toastContent = toast.querySelector('.Toast-content')!
    toastContent.textContent = message

    toast.hidden = false
    setTimeout(() => {
      toast.hidden = true
    }, durationMs)
  }
}
