/*
  Deprecation Warning:
  `CommandPalettePageElement` has re-implemented much of the functionality here
  and this class will eventually be removed entirely.
*/

import {Item, Octicon} from '@github/command-palette-api'
import {attr, controller, targets} from '@github/catalyst'
import CommandPalette from './command-palette-element'
import {CommandPaletteItemElement} from './command-palette-item-element'
import {CommandPaletteItemGroupElement} from './command-palette-item-group-element'
import {Query} from './query'
import {debounce} from '@github/mini-throttle'

type OcticonSvgs = {[name: string]: string}

@controller
export class CommandPaletteItemStackElement extends HTMLElement {
  @attr topGroupThreshold = 6.5
  @attr maxHeightVh = 65
  @attr showDebugInfo = false
  @targets groups: CommandPaletteItemGroupElement[]

  octicons: OcticonSvgs = {}
  tryDefaultSelection = false
  currentPath: string
  eventListenersBound = false
  currentHeight = 0
  getQuery: () => Query

  items: {
    [id: string]: Item
  } = {}

  history: {
    [path: string]: {[historyId: string]: number}
  } = {}

  get commandPalette(): CommandPalette | null {
    return this.closest<CommandPalette>('command-palette')
  }

  connectedCallback() {
    this.classList.add('rounded-bottom-2')

    // Read octicons from the page. This is required so local providers can have icons.
    // Delete this once PageStack is fully shipped. PageStack re-implements this.
    if (this.commandPalette && !this.commandPalette.multiPageEnabled) {
      /* eslint-disable-next-line custom-elements/no-dom-traversal-in-connectedcallback */
      const localOcticonContainer = this.commandPalette.querySelector('.js-command-local-provider-octicons')
      if (localOcticonContainer) {
        /* eslint-disable-next-line custom-elements/no-dom-traversal-in-connectedcallback */
        const octiconsArray = Array.from(localOcticonContainer.children).map(octiconElement => {
          return {
            id: octiconElement.getAttribute('data-local-provider-octicon-id'),
            /* eslint-disable-next-line custom-elements/no-dom-traversal-in-connectedcallback */
            svg: octiconElement.innerHTML
          } as Octicon
        })

        this.commandPalette.cacheIcons(octiconsArray)
      }
    }
  }

  get selectedItem(): CommandPaletteItemElement | undefined {
    return this.findSelectedElement()
  }

  set selectedItem(newSelection: CommandPaletteItemElement | undefined) {
    const currentlySelected = this.findSelectedElement()

    if (currentlySelected) {
      currentlySelected.selected = false
    }

    if (newSelection) {
      newSelection.selected = true
      this.selectedItemChanged(newSelection.item)
    }
  }

  get selectedItemIsTopResult(): boolean {
    const topGroup = this.findGroup(CommandPaletteItemGroupElement.topGroupId)

    if (topGroup && topGroup.itemNodes.length > 0) {
      return topGroup.firstItem.itemId === this.selectedItem?.itemId
    }

    return false
  }

  findSelectedElement(): CommandPaletteItemElement | undefined {
    return this.querySelector<CommandPaletteItemElement>('command-palette-item[data-selected]')!
  }

  navigate(indexDiff: number) {
    this.tryDefaultSelection = false
    const movingDownward = indexDiff > 0

    const scrollOptions = {
      behavior: 'smooth',
      block: 'nearest'
    } as ScrollIntoViewOptions

    if (this.selectedItem) {
      let next

      if (movingDownward) {
        next = this.selectedItem?.nextElementSibling as CommandPaletteItemElement
      } else {
        next = this.selectedItem?.previousElementSibling as CommandPaletteItemElement
      }

      if (next) {
        this.selectedItem = next
        this.selectedItem.scrollIntoView(scrollOptions)
      } else if (this.selectedItem) {
        // move to next/previous visible group
        const nextGroup = this.visibleGroups[this.calculateIndex(indexDiff)]
        nextGroup.scrollIntoView(scrollOptions)

        if (movingDownward) {
          this.selectedItem = nextGroup.firstItem
        } else {
          this.selectedItem = nextGroup.lastItem
        }
      }
    } else {
      this.selectedItem = this.firstItem
    }
  }

  /**
   * Calculate a valid index by adding a number (positive or negative). If the
   * index goes out of bounds, it is moved into bounds again.
   *
   * For example, if you have 3 items and the current index is 1.
   * - When you pass 1, it will return 2.
   * - When you pass 2, it will return 0.
   * - When you pass -2, it will return 2.
   *
   * JavaScript modulo operator doesn't handle negative numbers the same as
   * positive numbers so we have to do some additional work in the last line.
   *
   * @param indexDiff a positive or negative number
   * @returns new index (always in bound)
   */
  calculateIndex(indexDiff: number) {
    let currentIndex = this.visibleGroups.findIndex(group => group.groupId === this.selectedItem?.item.group)

    if (this.findGroup(CommandPaletteItemGroupElement.topGroupId)?.firstItem === this.selectedItem) {
      currentIndex = 0
    }

    const newIndexUnbounded = currentIndex + indexDiff
    const length = this.visibleGroups.length
    return ((newIndexUnbounded % length) + length) % length
  }

  historyItems(path: string) {
    if (!this.history[path]) {
      this.history[path] = {}
    }

    return this.history[path]
  }

  addItemToHistory(queryText: string, queryPath: string, item: Item) {
    const history = this.historyItems(queryPath)
    const newScore = item.calculateScore(queryText)

    history[item.id] = newScore
  }

  addItems(itemQuery: Query, newItems: Item[], prefillStack = false) {
    for (const item of newItems) {
      this.addItemToHistory(itemQuery.text, itemQuery.path, item)
      this.items[item.id] = item

      // `prefillStack` is only true for pre-fetched providers
      if (prefillStack) {
        this.prefillHistory(item, itemQuery)
      }
    }

    debounce(this.renderCurrentItems.bind(this), this.debounceWait)()
  }

  /**
   * Removes an item from the items collection.
   *
   * @returns boolean - whether the item was removed or not
   */
  removeItem(item: Item) {
    return delete this.items[item.id]
  }

  /**
   * Removes a set of items from the items collection.
   *
   * @returns Array<{item: Item; removed: boolean}> - an array of objects which specify which
   *          objects were removed from history.
   */
  removeItems(items: Item[]) {
    const removedItems = items.map(item => {
      return {
        item,
        removed: this.removeItem(item)
      }
    })

    debounce(this.renderCurrentItems.bind(this), this.debounceWait)()
    return removedItems
  }

  // Takes an item and automatically pushes it to all of its hypothetical query paths, so that it is immediately available as the user keeps typing.
  // Example: a result with the title of "acme, inc." would get pushed into the result stack for paths of potential queries such as "a", "ac", "acm", etc...
  prefillHistory(item: Item, query: Query) {
    for (const title of item.matchingFields) {
      const maxCharsToPrefill = 15 // don't wanna get too crazy with how much we're prefilling here. 15 chars is plenty.
      const limit = Math.min(title.length, maxCharsToPrefill)

      for (let char = 0; char <= limit; char++) {
        const queryText = title.slice(0, char)

        this.addItemToHistory(queryText, query.buildPath(query, queryText), item)
      }
    }
  }

  // When prefilling is enabled, we don't need as much of a debounce wait
  get debounceWait(): number {
    return 16
  }

  renderCurrentItems() {
    const currentQuery = this.getQuery().immutableCopy()
    if (this.currentPath !== currentQuery.path) {
      // the path has changed, start fresh
      this.reset()
    }

    const items = [...this.currentItems]

    if (currentQuery.isPresent() && items.length > 0) {
      // fill top results from the highest sorted
      const topGroup = this.findGroup(CommandPaletteItemGroupElement.topGroupId)

      for (let i = 0; topGroup && i < topGroup.limit; i++) {
        const topItem = items[i]

        const score = topItem.calculateScore(currentQuery.queryText)
        const topItemScore = topItem.priority + score

        if (topItem && topItemScore > this.topGroupThreshold) {
          this.renderItem(items.shift()!, CommandPaletteItemGroupElement.topGroupId)
        }
      }
    }

    this.renderItems(items)
    this.updateSelectedItem()
    this.itemsUpdated()
  }

  itemsUpdated() {
    const event = new CustomEvent('itemsUpdated', {
      cancelable: true,
      detail: {
        items: this.currentItems,
        queryPath: this.getQuery().immutableCopy().path
      }
    })

    return this.dispatchEvent(event)
  }

  selectedItemChanged(item: Item) {
    const event = new CustomEvent('selectedItemChanged', {
      bubbles: true,
      cancelable: true,
      detail: {
        item,
        isDefaultSelection: this.tryDefaultSelection
      }
    })

    return this.dispatchEvent(event as CustomEvent)
  }

  renderItems(items: Item[]) {
    for (const item of items) {
      this.renderItem(item, item.group)
    }

    this.setGroupBorders()
    this.setMaxHeight()
  }

  // sort of like using CSS vh units, we set the max height of the results container to be a % the height of the viewport
  get maximumHeight(): number {
    const maximumPixelHeight = 475
    const percentage = 50 // the item stack should never be more than X% of the viewport height
    const percentagePixels = window.innerHeight * (percentage / 100)

    return Math.min(percentagePixels, maximumPixelHeight)
  }

  get innerContentHeight(): number {
    let height = 0

    for (const child of this.children) {
      const el = child as HTMLElement
      const style = getComputedStyle(el)
      const marginTop = parseInt(style.marginTop.replace('px', ''), 10)
      const marginBottom = parseInt(style.marginBottom.replace('px', ''), 10)
      const totalHeight = el.offsetHeight + marginTop + marginBottom

      if (el.offsetHeight > 0) {
        height += totalHeight
      }
    }

    return height
  }

  // setting the max (& min) height of the item stack will trigger a CSS transition
  // to smoothly animate as results are added and removed
  setMaxHeight() {
    // we disable the transition if the height change is too drastic (X% of max height)
    const distanceThresholdPercentage = 0.6
    const distanceThreshold = this.maximumHeight * distanceThresholdPercentage

    const newHeight = Math.round(Math.min(this.maximumHeight, this.innerContentHeight))
    const diff = Math.abs(this.currentHeight - newHeight)

    if (diff > distanceThreshold) {
      this.classList.add('no-transition')
    } else {
      this.classList.remove('no-transition')
    }

    this.setAttribute('style', `max-height:${newHeight}px; min-height:${newHeight}px;`)
    this.currentHeight = newHeight
  }

  // Semi-hacky way to remove the top border from the first visible group,
  // but ensure that the other groups still have their top borders.
  // This could possibly be achieved with a CSS selector?
  setGroupBorders() {
    if (this.visibleGroups.length > 0) {
      this.visibleGroups[0].classList.remove('border-top')

      for (const group of this.visibleGroups) {
        const i = this.visibleGroups.indexOf(group)

        if (i === 0) {
          group.classList.remove('border-top')

          if (group.header) {
            group.classList.remove('py-2')
            group.classList.add('mb-2', 'mt-3')
          }
        } else {
          group.classList.add('border-top')

          if (group.header) {
            group.classList.remove('mb-2', 'mt-3')
            group.classList.add('py-2')
          }
        }
      }
    }
  }

  createItemElementAndRender(item: Item, selected: boolean, queryText: string): CommandPaletteItemElement {
    const element = new CommandPaletteItemElement()
    element.setItemAttributes(item)
    element.render(selected, queryText)

    return element
  }

  renderItem(item: Item, groupId: string) {
    const groupElement = this.findGroup(groupId)

    if (!groupElement) {
      return
    }

    if (
      (groupElement.hasItem(item) || groupElement.atLimit || this.topGroup?.hasItem(item)) &&
      !groupElement?.topGroup
    ) {
      return
    }

    const renderedItem = this.createItemElementAndRender(item, false, this.getQuery().immutableCopy().queryText)

    if (this.showDebugInfo) {
      // sets a data-score attribute on the element that can be viewed in the browser's web inspector,
      // ...helpful for debugging result quality in production
      renderedItem.score = item.score
    }

    groupElement.push(renderedItem)

    const itemElement = renderedItem.containerElement

    if (itemElement) {
      const position = groupElement.list.children.length.toString()
      item.position = position
    }

    // we can only render icons after the item has been added to the DOM.
    // - this can be improved!
    if (item.icon) {
      if (item.icon.type === 'octicon') {
        const iconSvg = this.octicons[item.icon.id!]
        const fallbackIconSvg = this.octicons['dash-color-fg-muted']

        renderedItem.renderOcticon(iconSvg || fallbackIconSvg)
      } else if (item.icon.type === 'avatar') {
        renderedItem.renderAvatar(item.icon.url!, item.icon.alt!)
      }
    } else {
      renderedItem.iconElement.hidden = true
    }

    renderedItem.addEventListener('mousemove', e => {
      const moved = e.movementX !== 0 || e.movementY !== 0

      if (moved && this.selectedItem !== renderedItem) {
        this.tryDefaultSelection = false
        this.selectedItem = renderedItem
      }
    })
  }

  findGroup(groupId: string): CommandPaletteItemGroupElement | undefined {
    return this.groups.find(g => g.groupId === groupId)
  }

  get topGroup() {
    return this.findGroup(CommandPaletteItemGroupElement.topGroupId)
  }

  get groupIds() {
    return this.groups.map(g => g.groupId)
  }

  updateSelectedItem() {
    // Reset selected item if it is no longer in the list
    if (this.isSelectedItemInvalid()) {
      this.clearSelection()
    }

    if (this.setDefaultSelection()) {
      this.selectedItem = this.firstItem
    }
  }

  setDefaultSelection() {
    const inScopeOrSearch = this.getQuery().hasScope() || this.getQuery().isPresent()
    return this.tryDefaultSelection && inScopeOrSearch
  }

  noItemSelected() {
    return !this.selectedItem || this.isSelectedItemInvalid()
  }

  isSelectedItemInvalid() {
    return !this.currentItems.some(item => item.id === this.selectedItem?.itemId)
  }

  isEmpty() {
    return !this.currentItems || this.currentItems.length === 0
  }

  clearSelection() {
    this.selectedItem = undefined
  }

  /**
   * Clears the ItemStack's `items` and `history`. Also, calls `reset` which prepares each group for
   * new items.
   */
  clear() {
    this.history = {}
    this.items = {}
    this.reset()
  }

  /**
   * Prepares each group for new items as well as resets the default selection and the `currentPath`.
   */
  reset() {
    this.tryDefaultSelection = true
    this.currentPath = this.getQuery().immutableCopy().path

    for (const group of this.groups) {
      group.prepareForNewItems()
    }
  }

  /**
   * Clears the ItemStack of specific group and related item data only. Triggers a re-render.
   *
   * @param groupIds The groups to clear.
   */
  clearItemsFor(groupIds: string[]) {
    const groups = this.groups.filter(group => groupIds.includes(group.groupId))
    for (const group of groups) {
      group.prepareForNewItems()
    }

    const items = Object.values(this.items).filter(item => groupIds.includes(item.group))

    this.removeItems(items)
  }

  get visibleGroups(): CommandPaletteItemGroupElement[] {
    return this.groups.filter(g => !g.hidden)
  }

  get firstItem(): CommandPaletteItemElement | undefined {
    const visibleGroups = this.visibleGroups

    if (visibleGroups.length > 0) {
      return visibleGroups[0].querySelector<CommandPaletteItemElement>('command-palette-item')!
    }
  }

  /**
   * Returns the list of items matching the current query.
   * Also, efficiently prunes items from history when they no longer exist.
   */
  get currentItems(): Item[] {
    const query = this.getQuery().immutableCopy()
    const history = this.historyItems(query.path)

    const items = Object.entries(history)
      .map(([historyId, score]) => {
        const item = this.items[historyId]

        if (item) {
          // set the score to the one that was pre-calculated in history
          item.score = score
          return item
        } else {
          // prune the item from history since it no longer exists
          delete history[historyId]
          return null
        }
      })
      .filter((i): i is Item => i !== null)

    if (!items) {
      return []
    }

    if (query.isBlank()) {
      // use default sort order returned from server when no query is present
      return items.sort((a, b) => b.priority - a.priority)
    } else {
      return items.sort((a, b) => b.score - a.score || b.priority - a.priority)
    }
  }

  disconnectedCallback() {
    this.unbindListeners()
  }

  bindListeners() {
    // we can't use ResizeObserver because we're actively
    // resizing this element when we `setMaxHeight`.

    if (!this.eventListenersBound) {
      // eslint-disable-next-line github/prefer-observers
      window.addEventListener('resize', this.setMaxHeight.bind(this))
      this.eventListenersBound = true
    }
  }

  unbindListeners() {
    window.removeEventListener('resize', this.setMaxHeight.bind(this))
    this.eventListenersBound = false
  }
}
