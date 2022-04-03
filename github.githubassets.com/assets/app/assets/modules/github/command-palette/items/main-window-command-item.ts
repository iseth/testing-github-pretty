import {Item, Query} from '@github/command-palette-api'
import CommandPalette from '../command-palette-element'
import {MainWindowCommand} from '../main-window-command'

/**
 * Render an item for a main window command. Responsible to instantiate itself
 * from a MainWindowCommand and run the command when activated by the user.
 */

type CommandOverrides = {
  title?: string
  subtitle?: string
  priority?: number
  group?: string
  icon?: string
  iconType?: string
}
export class MainWindowCommandItem extends Item {
  command: MainWindowCommand

  constructor(command: MainWindowCommand, overrides: CommandOverrides) {
    super({
      title: overrides.title ?? command.title,
      subtitle: overrides.subtitle ?? command.subtitle,
      typeahead: overrides.title ?? command.title,
      priority: overrides.priority ?? command.priority,
      group: overrides.group ?? command.group,
      icon: {
        type: overrides.iconType ?? command.iconType,
        id: overrides.icon ?? command.icon
      },
      hint: 'Run command'
    })
    this.command = command
  }

  get path(): string | undefined {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  copy(commandPalette: CommandPalette): string | undefined {
    return undefined
  }

  activate(commandPalette: CommandPalette) {
    this.command.run(commandPalette)
    if (this.command.dismissAfterRun) {
      commandPalette.dismiss()
    }
  }

  isApplicable(query: Query) {
    return this.command.isApplicable(query)
  }

  select(commandPalette: CommandPalette) {
    if (this.command.select) {
      this.command.select(commandPalette)
    } else {
      commandPalette.autocomplete(this)
    }
  }
}
