import {ServerDefinedAction, ServerDefinedItem, ServerDefinedItemData, serverDefinedItem} from './server-defined-item'
import CommandPalette from '../command-palette-element'

interface CommandAction extends ServerDefinedAction {
  id: string
}

interface CommandItemData extends ServerDefinedItemData {
  action: CommandAction
}

@serverDefinedItem
export class CommandItem extends ServerDefinedItem {
  data: CommandItemData
  _action: CommandAction

  constructor(data: CommandItemData) {
    super(data)

    this.typeahead = data.title
    this.group = 'commands'
  }

  get action() {
    return this._action
  }

  async activate(commandPalette: CommandPalette) {
    super.activate(commandPalette)

    const path = commandPalette.getAttribute('data-commands-path')
    const token = commandPalette.querySelector<HTMLInputElement>('.js-commands-csrf')!.value
    if (!path || !token) return

    const params = commandPalette.query.params()
    params.set('command', this.action.id)

    commandPalette.commandPaletteInput.loading = true

    const response = await fetch(path, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Scoped-CSRF-Token': token,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: params
    })

    commandPalette.commandPaletteInput.loading = false

    if (response.ok) {
      const result: {action: string; arguments: {[key: string]: string}} = await response.json()
      this.handleResponse(commandPalette, result.action, result.arguments)
    } else {
      // eslint-disable-next-line i18n-text/no-en
      commandPalette.displayFlash('error', 'Failed to run command')
    }
  }

  handleResponse(commandPalette: CommandPalette, action: string, args: {[key: string]: string}) {
    switch (action) {
      case 'displayFlash':
        commandPalette.displayFlash(args.type, args.message)
        commandPalette.dismiss()
        break
    }
  }
}
