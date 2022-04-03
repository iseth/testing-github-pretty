import CommandPalette, {isPlatformMetaKey} from '../command-palette-element'
import {ServerDefinedAction, ServerDefinedItem, serverDefinedItem} from './server-defined-item'

interface JumpToAction extends ServerDefinedAction {
  path: string
}

interface JumpToItemArguments {
  title: string
  icon: string
  path: string
  group: string
}

@serverDefinedItem
export class JumpToItem extends ServerDefinedItem {
  _action: JumpToAction

  static from(args: JumpToItemArguments) {
    return new JumpToItem({
      title: args.title,
      typeahead: args.title,
      priority: 1,
      score: 1,
      group: args.group,
      action: {
        type: 'jump_to',
        description: '',
        path: args.path
      },
      icon: {
        type: 'octicon',
        id: args.icon
      }
    })
  }

  activate(_commandPalette: CommandPalette, event: Event) {
    // activate can be called by either an onKeydown event or a mouse click. If it's a mouse click, we don't need to do
    // anything special, just call the super method to makes sure everything that needs to happen does. If it's an onKeydown event,
    // then we can trigger the normal link activation, which calls a click event on the item, which brings us right back here
    // for the click trigger.
    // we need to only call one or the other so we don't send two tracking events.
    if (event instanceof PointerEvent) {
      super.activate(_commandPalette, event)
    } else if (event instanceof KeyboardEvent) {
      this.activateLinkBehavior(_commandPalette, event, isPlatformMetaKey(event))
    }
  }

  copy(commandPalette: CommandPalette) {
    super.copy(commandPalette)

    const url = new URL(this.action.path, window.location.origin)

    this.copyToClipboardAndAnnounce(url.toString())
    return url.toString()
  }

  get key() {
    return `${super.key}/${this.action.path}`
  }

  get action() {
    return this._action
  }
}
