import {ServerDefinedAction, ServerDefinedItem, ServerDefinedItemData, serverDefinedItem} from './server-defined-item'
import CommandPalette from '../command-palette-element'

interface HelpItemData extends ServerDefinedItemData {
  persistentHint?: string
  action: HelpAction
}

interface HelpAction extends ServerDefinedAction {
  prefix?: string
}

interface HelpItemArguments {
  title: string
  group: string
  index: number
  prefix?: string
  persistentHint?: string
}

@serverDefinedItem
export class HelpItem extends ServerDefinedItem {
  persistentHint?: string
  _action: HelpAction

  static from(args: HelpItemArguments): ServerDefinedItem {
    return new HelpItem({
      title: args.title,
      typeahead: '',
      priority: -10 - args.index,
      score: -10,
      group: args.group,
      action: {
        type: 'help',
        description: '',
        prefix: args.prefix
      },
      persistentHint: args.persistentHint
    })
  }

  constructor(data: HelpItemData) {
    super(data)
    this.persistentHint = data.persistentHint
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activate(commandPalette: CommandPalette, _event: Event) {
    commandPalette.commandPaletteInput.value = this.action.prefix + commandPalette.getTextWithoutMode()
  }

  autocomplete(commandPalette: CommandPalette) {
    commandPalette.commandPaletteInput.value = this.action.prefix + commandPalette.getTextWithoutMode()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateScore(_queryText: string): number {
    return 0
  }

  get action() {
    return this._action
  }
}
