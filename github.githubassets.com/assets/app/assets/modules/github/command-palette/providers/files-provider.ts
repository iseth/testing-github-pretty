import {AccessPolicyItem} from '../items/access-policy-item'
import {JumpToItem} from '../items/jump-to-item'
import {PrefetchedProvider} from './prefetched-provider'
import {Query} from '../query'
import {ServerDefinedItem} from '../items/server-defined-item'

/**
 * This is a special prefetched provider that supports linking to file line
 * numbers using the `:123` syntax. This happens in the browser.
 *
 */

export class FilesProvider extends PrefetchedProvider {
  /**
   * Fetch results from server and serialize into JumpToItems using file paths.
   */
  async fetchSrc(query: Query) {
    if (!this.src) throw new Error('No src provided')

    const url = new URL(this.src, window.location.origin)
    url.search = query.params().toString()
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    const data = await response.json()
    const results = data.results[0]

    if (results['base_file_path']) {
      const baseFilePath = results['base_file_path'] as string
      const filePaths = results.paths as string[]
      data.results = filePaths.map(file => {
        return JumpToItem.from({
          title: file,
          path: `${baseFilePath}/${file}`,
          icon: 'file-color-fg-muted',
          group: 'files'
        })
      })
    } else if (results['action'] && results.action.type === 'access_policy') {
      data.results = [new AccessPolicyItem(results)]
    } else {
      data.results = []
    }

    return data
  }

  async fetch(query: Query, isEmpty = false) {
    const endsWithLineNumberMatch = query.text.match(/(.+):(\d*)\s*$/)

    if (endsWithLineNumberMatch) {
      return this.fetchWithLineNumbers(query, endsWithLineNumberMatch)
    } else {
      return super.fetch(query, isEmpty)
    }
  }

  /**
   * Build and return a list of items that link to a line number in a file. This
   * relies on super.fetch to return items matching the query without the line
   * number and then appends the line number afterwards.
   *
   * @param query
   * @param endsWithLineNumberMatch
   * @returns list of file jump to items linking to a line number
   */
  async fetchWithLineNumbers(query: Query, endsWithLineNumberMatch: RegExpMatchArray) {
    const newQueryText = endsWithLineNumberMatch[1]
    const lineNumber = endsWithLineNumberMatch[2]
    const queryWithoutLineNumber = new Query(newQueryText, query.mode, {scope: query.scope})

    const items = [] as ServerDefinedItem[]
    const superItems = (await super.fetch(queryWithoutLineNumber, false)).results
    for (const item of superItems) {
      if (item instanceof JumpToItem) {
        items.push(this.convert(item, lineNumber))
      }
    }

    return {results: items}
  }

  /**
   * This takes an item and returns a new one with a line number attached. This
   * builds a new item, it doesn't mutate the original.
   *
   * If the line number is empty or the item isn't a JumpToItem, the same item is
   * returned.
   *
   * @param item to be converted
   * @param lineNumber to append to item
   * @returns item with line number append, if appropriate
   */
  convert(item: ServerDefinedItem, lineNumber: string) {
    if (lineNumber === '') return item
    if (!(item instanceof JumpToItem)) return item

    item.title = `${item.title}:${lineNumber}`
    item.action.path = `${item.action.path}#L${lineNumber}`

    return item
  }
}
