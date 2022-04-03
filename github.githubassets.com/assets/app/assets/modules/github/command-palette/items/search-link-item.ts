import {ServerDefinedItemData, serverDefinedItem} from './server-defined-item'
import CommandPalette from '../command-palette-element'
import {CommandPaletteItemGroupElement} from '../command-palette-item-group-element'
import {JumpToItem} from './jump-to-item'
import {Query} from '../query'

interface SearchLinkItemData extends ServerDefinedItemData {
  titleScope: string
}

@serverDefinedItem
export class SearchLinkItem extends JumpToItem {
  titleScope: string

  static create(query: Query) {
    let titleScope: string
    let path: string

    if (query.scope.type === 'repository') {
      const nwo = query.scope.tokens.map(t => t.text).join('/')

      titleScope = `in ${nwo}`
      path = `/${nwo}/search?q=${query.text}`
    } else if (query.scope.type === 'owner') {
      const orgSearchQuery = `org:${query.scope.text} ${query.text}`
      titleScope = `in ${query.scope.text}`
      path = `/search?q=${orgSearchQuery}`
    } else {
      titleScope = `across all of GitHub`
      path = `/search?q=${query.text}`
    }

    return new SearchLinkItem({
      title: `Search ${query.text}${titleScope}`,
      typeahead: '',
      priority: -10,
      score: -10,
      group: CommandPaletteItemGroupElement.footerGroupId,
      action: {
        type: 'jump_to',
        description: '',
        path
      },
      icon: {
        type: 'octicon',
        id: 'search-color-fg-muted'
      },
      titleScope
    })
  }

  constructor(data: SearchLinkItemData) {
    super(data)
    this.titleScope = data.titleScope
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autocomplete(_commandPalette: CommandPalette) {
    // nothing to autocomplete
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateScore(_queryText: string): number {
    return 0
  }
}
