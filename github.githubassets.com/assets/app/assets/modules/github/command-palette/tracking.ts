import {AccessPolicyItem} from './items/access-policy-item'
import {CommandItem} from './items/command-item'
import CommandPalette from './command-palette-element'
import {CopyableItem} from './items/copyable-item'
import {Item} from '@github/command-palette-api'
import {JumpToItem} from './items/jump-to-item'
import {MainWindowCommandItem} from './items/main-window-command-item'
import {ServerDefinedItem} from './items/server-defined-item'
import {sendEvent} from '../hydro-analytics'

/**
 * Sends a hydro BrowserEvent with command palette meta data
 *
 * @param type: The type of the event, this is prepended to 'command_palette-TYPE' to create the event name
 * @item Item: The item that is acted on and for which we can send more details
 *
 */
export function sendTrackingEvent(type: string, item?: Item) {
  const commandPalette = document.querySelector<CommandPalette>('command-palette')!
  let title = ''
  if (item && (item.group === 'commands' || item.group === 'global_commands')) {
    title = item.title
  }

  const meta = {
    command_palette_session_id: commandPalette.sessionId,
    command_palette_scope: commandPalette.query.scope.type,
    command_palette_mode: commandPalette.getMode(),
    command_palette_title: title,
    command_palette_position: item?.position,
    command_palette_score: item?.score,
    command_palette_group: item?.group,
    command_palette_item_type: item instanceof ServerDefinedItem ? item?.itemType : item?.constructor.name
  }

  let action_type: string

  if (type === 'activate') {
    action_type = activateTrackingEventType(item)
  } else {
    action_type = type
  }

  sendEvent(`command_palette_${action_type}`, meta)
}

function activateTrackingEventType(item?: Item) {
  if (item instanceof AccessPolicyItem) {
    return 'access_policy_executed'
  } else if (item instanceof CommandItem || item instanceof MainWindowCommandItem || item instanceof CopyableItem) {
    return 'command_executed'
  } else if (item instanceof JumpToItem) {
    return item.element?.newTabOpened ? 'jump_to_new_tab' : 'jump_to'
  } else {
    return 'activate'
  }
}
