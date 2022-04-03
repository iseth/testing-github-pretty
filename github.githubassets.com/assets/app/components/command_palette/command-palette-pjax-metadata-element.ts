import {attr, controller, targets} from '@github/catalyst'
import {CommandPalettePageElement} from './command-palette-page-element'

@controller
export class CommandPalettePjaxMetadataElement extends HTMLElement {
  @attr defaultScopeId = ''
  @attr defaultScopeType = ''

  @targets defaultPages: CommandPalettePageElement[]

  get resetPages(): CommandPalettePageElement[] {
    const defaultPages = this.defaultPages
    const lastPageIndex = defaultPages.length - 1

    return defaultPages.map((page, index) => {
      const pageElement = page.cloneNode() as CommandPalettePageElement
      pageElement.hidden = index !== lastPageIndex
      pageElement.removeAttribute('data-targets')

      return pageElement
    })
  }
}
