import CommandPalette from './command-palette-element'
import {MainWindowCommandItem} from './items/main-window-command-item'
import {Query} from '@github/command-palette-api'

/* Set to a CommandPalette::Icons::Octicon#id */
type CommandPaletteOcticonId = string

/**
 * Inherit from this class to create a new main window command.
 */
export class MainWindowCommand {
  static item(overrides = {}) {
    return new MainWindowCommandItem(new this(), overrides)
  }

  title: string
  subtitle: string
  icon: CommandPaletteOcticonId
  iconType = 'octicon'
  group = 'commands'
  priority = 0
  dismissAfterRun = true
  select?(commandPalette: CommandPalette): void

  /**
   * Called when the command is executed.
   * @param _commandPalette
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_commandPalette: CommandPalette) {
    new Error('Not implemented')
  }

  /**
   * Called before showing the command in the command palette.
   *
   * This can be used to check if this command can be run against the subject.
   * For example, if you're writing a command that presses a button, you can
   * check if that button is present on the page. If it isn't, return false to
   * hide this command. You can also check against the query, which is provided.
   *
   * @returns true if command applies to the current page
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isApplicable(_query: Query) {
    return true
  }
}

export class MainWindowGlobalCommand extends MainWindowCommand {
  group = 'global_commands'
}
