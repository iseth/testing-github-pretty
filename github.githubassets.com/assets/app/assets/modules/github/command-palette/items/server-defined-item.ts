import {Icon, Item, ItemData} from '@github/command-palette-api'
import CommandPalette from '../command-palette-element'
import {CommandPaletteItemElement} from '../command-palette-item-element'
import {CommandPaletteItemGroupElement} from '../command-palette-item-group-element'
import {Scope} from '../command-palette-scope-element'

export interface ServerDefinedItemData extends ItemData {
  score: number
  action: ServerDefinedAction
  scope?: Scope
  match_fields?: string[]
}

export interface ServerDefinedAction {
  type: string
  description?: string
  path?: string
}

export function serverDefinedItem(itemClass: typeof ServerDefinedItem): void {
  ServerDefinedItem.register(itemClass)
}

export class ServerDefinedItem extends Item implements ServerDefinedItemData {
  static itemClasses = {} as {[id: string]: typeof ServerDefinedItem}

  static defaultData: ServerDefinedItemData = {
    title: '',
    score: 1,
    priority: 1,
    action: {
      type: '',
      path: ''
    },
    icon: {
      type: 'octicon',
      id: 'dash-color-fg-muted'
    },
    group: CommandPaletteItemGroupElement.defaultGroupId
  }

  static register(classObject: typeof ServerDefinedItem) {
    this.itemClasses[classObject.itemType] = classObject
  }

  static get itemType() {
    return this.buildItemType(this.name)
  }

  static buildItemType(className: string) {
    return className
      .replace(/([A-Z]($|[a-z]))/g, '_$1')
      .replace(/(^_|_Item$)/g, '')
      .toLowerCase()
  }

  title: string
  priority: number
  score: number
  subtitle?: string
  typeahead?: string
  scope?: Scope
  icon?: Icon
  hint?: string
  group: string
  position = ''
  _action: ServerDefinedAction

  // Memoization
  element?: CommandPaletteItemElement

  static build(data: ServerDefinedItemData) {
    const itemClass = this.itemClasses[data.action.type]

    if (itemClass) {
      return new itemClass(data)
    } else {
      throw new Error(`No item handler for ${data.action.type}`)
    }
  }

  constructor(data: ServerDefinedItemData) {
    super(data)
    this.score = data.score
    this.scope = data.scope
    this.matchFields = data.match_fields
    this._action = data.action
  }

  get action() {
    return this._action
  }

  /**
   * Build a string that uniquely identifies this item. By default, an item is
   * identified from its action type, group and title.
   */
  get key() {
    return `${this.action.type}/${this.title}/${this.group}`
  }

  get path(): string {
    return this.action.path || ''
  }

  get itemType() {
    return ServerDefinedItem.buildItemType(this.constructor.name)
  }

  select(commandPalette: CommandPalette) {
    if (this.scope) {
      commandPalette.setScope(this.scope)
    } else {
      commandPalette.autocomplete(this)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activate(commandPalette: CommandPalette, event?: Event) {
    // Default no-op
  }

  activateLinkBehavior(commandPalette: CommandPalette, event: Event, isPlatformMetaKey: boolean) {
    this.element?.activateLinkBehavior(commandPalette, event, isPlatformMetaKey)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  copy(commandPalette: CommandPalette): string | undefined {
    return undefined
  }

  /**
   * Copy given text to the clipboard and display a hint to the user.
   *
   * @param text to be copied
   * @param hintText to display to user (defaults to 'Copied!')
   */
  copyToClipboardAndAnnounce(text: string, hintText?: string) {
    this.element?.copyToClipboardAndAnnounce(text, hintText)
  }
}
