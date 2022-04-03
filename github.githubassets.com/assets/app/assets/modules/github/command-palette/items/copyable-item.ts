import {ServerDefinedAction, ServerDefinedItem, ServerDefinedItemData, serverDefinedItem} from './server-defined-item'
import CommandPalette from '../command-palette-element'
import {copyText} from '../copy'

interface CopyableAction extends ServerDefinedAction {
  id: string
  text: string
  message: string
}

interface CopyableItemData extends ServerDefinedItemData {
  action: CopyableAction
}

@serverDefinedItem
export class CopyableItem extends ServerDefinedItem {
  data: CopyableItemData
  _action: CopyableAction

  constructor(data: CopyableItemData) {
    super(data)

    this.priority = 11
    this.score = 1
    this.typeahead = data.title
    this.group = 'commands'
  }

  get action() {
    return this._action
  }

  async activate(commandPalette: CommandPalette) {
    super.activate(commandPalette)

    try {
      await copyText(this.action.text)

      commandPalette.displayFlash('success', this.action.message)
      commandPalette.dismiss()
    } catch {
      // eslint-disable-next-line i18n-text/no-en
      commandPalette.displayFlash('error', `Copy failed`)
    }
  }
}
