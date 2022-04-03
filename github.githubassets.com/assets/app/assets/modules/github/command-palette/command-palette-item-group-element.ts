import {attr, controller, target} from '@github/catalyst'
import {html, render} from '@github/jtml'
import CommandPaletteElement from './command-palette-element'
import {CommandPaletteItemElement} from './command-palette-item-element'
import {Item} from '@github/command-palette-api'

@controller
export class CommandPaletteItemGroupElement extends HTMLElement {
  static defaultGroupLimit = 5
  static activeModeLimit = 50

  static topGroupId = 'top'
  static defaultGroupId = 'default'
  static footerGroupId = 'footer'
  static helpGroupIds = ['modes_help', 'filters_help']
  static commandGroupIds = ['commands']

  static topGroupScoreThreshold = 9

  @attr groupTitle: string
  @attr groupHint: string
  @attr groupId: string
  @attr groupLimits = ''
  @attr defaultPriority = 0 // used for sorting groups in the PageStack

  @target list: HTMLUListElement
  @target header: HTMLHeadingElement

  connectedCallback() {
    this.classList.add('py-2', 'border-top')
    this.setAttribute('hidden', 'true')
    this.renderElement('')
  }

  prepareForNewItems() {
    this.list.innerHTML = ''
    this.setAttribute('hidden', 'true')

    if (!this.classList.contains('border-top')) {
      this.classList.add('border-top')
    }
  }

  hasItem(item: Item): boolean {
    return this.list.querySelectorAll(`[data-item-id="${item.id}"]`).length > 0
  }

  renderElement(mode: string) {
    // there are two possible templates for this element - one with a title and one without
    const groupTemplate = () => {
      if (this.hasTitle) {
        return html`
          <div class="d-flex flex-justify-between my-2 px-3">
            <span data-target="command-palette-item-group.header" class="color-fg-muted text-bold f6 text-normal">
              ${this.groupTitle}
            </span>
            <span data-target="command-palette-item-group.header" class="color-fg-muted f6 text-normal">
              ${!mode ? this.groupHint : ''}
            </span>
          </div>
          <div
            role="listbox"
            class="list-style-none"
            data-target="command-palette-item-group.list"
            aria-label="${this.groupTitle} results"
          ></div>
        `
      } else {
        return html`
          <div
            role="listbox"
            class="list-style-none"
            data-target="command-palette-item-group.list"
            aria-label="${this.groupTitle} results"
          ></div>
        `
      }
    }

    render(groupTemplate(), this)
  }

  push(renderedItem: CommandPaletteItemElement) {
    this.removeAttribute('hidden')
    if (this.topGroup && this.atLimit) {
      if (renderedItem.itemId !== this.firstItem.itemId) {
        this.replaceTopGroupItem(renderedItem)
      }
    } else {
      this.list.append(renderedItem)
    }
  }

  replaceTopGroupItem(item: CommandPaletteItemElement) {
    this.list.replaceChild(item, this.firstItem)
  }

  // Deprecated in favor of `groupLimitForScopeType` (see anti-pattern note below)
  groupLimitForScope() {
    // this is an anti-pattern; see https://github.github.io/catalyst/guide/anti-patterns/
    const commandPalette = this.closest<CommandPaletteElement>('command-palette')

    if (commandPalette) {
      const scopeType = commandPalette.query.scope.type
      return JSON.parse(this.groupLimits)[scopeType]
    }

    return undefined
  }

  get limit() {
    const groupLimitForScope = this.groupLimitForScope()

    if (this.topGroup) {
      return 1
    } else if (this.isModeActive()) {
      return 50
    } else if (groupLimitForScope) {
      return groupLimitForScope
    }

    return CommandPaletteItemGroupElement.defaultGroupLimit
  }

  get atLimit() {
    return this.list.children.length >= this.limit
  }
  // end deprecation

  parsedGroupLimits() {
    if (!this.groupLimits) {
      return {}
    }
    return JSON.parse(this.groupLimits)
  }

  limitForScopeType(scopeType: string) {
    const groupLimitsByScopeType = this.parsedGroupLimits()
    const groupLimitForScope = groupLimitsByScopeType[scopeType]

    if (this.topGroup) {
      return 1
    } else if (this.isModeActive()) {
      return CommandPaletteItemGroupElement.activeModeLimit
    } else if (groupLimitForScope) {
      return groupLimitForScope
    }

    return CommandPaletteItemGroupElement.defaultGroupLimit
  }

  atLimitForScopeType(scopeType: string) {
    return this.list.children.length >= this.limitForScopeType(scopeType)
  }

  isModeActive() {
    // this is an anti-pattern; see https://github.github.io/catalyst/guide/anti-patterns/
    const commandPalette = this.closest<CommandPaletteElement>('command-palette')
    if (!commandPalette) return false
    return commandPalette.getMode()
  }

  get topGroup() {
    return this.groupId === CommandPaletteItemGroupElement.topGroupId
  }

  get hasTitle() {
    return this.groupId !== CommandPaletteItemGroupElement.footerGroupId
  }

  get itemNodes(): NodeListOf<CommandPaletteItemElement> {
    return this.list.querySelectorAll<CommandPaletteItemElement>('command-palette-item')
  }

  get firstItem(): CommandPaletteItemElement {
    return this.itemNodes[0]
  }

  get lastItem(): CommandPaletteItemElement {
    return this.itemNodes[this.itemNodes.length - 1]
  }
}
