import CommandPalette, {isPlatformMetaKey} from '../command-palette-element'
import {ServerDefinedItem, serverDefinedItem} from './server-defined-item'

/**
 * This item is a AccessPolicy CTA which visually looks like a result but behaves somewhat differently
 * There is no hint on hover
 * The key is based on title only because we want to dedup on title and not title + path
 *   path may change multiple times because it inclued a return_to that tracks the mode and query
 */

@serverDefinedItem
// We are not explicitly exporting AccessPolicyItem because this class being used is derived from @item
// @item uses a custom Item#register which is then used to build the class in Item#build from data.type
// data.type for these items is access_policy which maps to this class
export class AccessPolicyItem extends ServerDefinedItem {
  activate(_commandPalette: CommandPalette, event: Event) {
    if (event instanceof PointerEvent) {
      super.activate(_commandPalette, event)
    } else if (event instanceof KeyboardEvent) {
      this.activateLinkBehavior(_commandPalette, event, isPlatformMetaKey(event))
    }
  }

  get key() {
    return this.title
  }
}
