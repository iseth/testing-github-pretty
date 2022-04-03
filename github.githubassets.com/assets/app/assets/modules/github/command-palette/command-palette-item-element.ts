import {Item, ItemInteraction} from '@github/command-palette-api'
import {TemplateResult, html, render} from '@github/jtml'
import {attr, controller, target} from '@github/catalyst'
import {hasMatch, positions} from 'fzy.js'
import {AccessPolicyItem} from './items/access-policy-item'
import CommandPalette from './command-palette-element'
import {HelpItem} from './items/help-item'
import {JumpToOrgItem} from './items/jump-to-org-item'
import {JumpToTeamItem} from './items/jump-to-team-item'
import {SearchLinkItem} from './items/search-link-item'
import {ServerDefinedItem} from './items/server-defined-item'
import {copyText} from './copy'
import {sendTrackingEvent} from './tracking'

@controller
export class CommandPaletteItemElement extends HTMLElement implements ItemInteraction {
  @attr itemId = ''
  @attr itemTitle = ''
  @attr subtitle = ''
  @attr selected = false
  @attr score = 0

  @target titleElement: HTMLElement
  @target iconElement: HTMLElement
  @target subtitleElement: HTMLElement
  @target hintText: HTMLElement
  @target persistentHint: HTMLElement
  @target containerElement: HTMLAnchorElement

  titleNodes: Node[] = []
  item: Item
  hint?: string
  href: string
  rendered = false
  newTabOpened = false

  containerDataTarget = 'command-palette-item.containerElement'
  containerClasses = 'mx-2 px-2 rounded-2 d-flex flex-items-start no-underline border-0'
  containerStyle = 'padding-top: 10px; padding-bottom: 10px; cursor: pointer;'

  activate(commandPalette: CommandPalette, event?: Event): void {
    this.item.activate(commandPalette, event)
    sendTrackingEvent('activate', this.item)
  }

  copy(commandPalette: CommandPalette): string | undefined {
    sendTrackingEvent('copy', this.item)
    return this.item.copy(commandPalette)
  }

  select() {
    /* no-op */
  }

  renderOcticon(octiconSvg: string) {
    this.iconElement.innerHTML = octiconSvg
  }

  renderAvatar(src: string, alt: string) {
    let avatarTemplate: TemplateResult

    if (this.item instanceof JumpToOrgItem) {
      avatarTemplate = html`<img src="${src}" alt="${alt}" class="avatar avatar-1 avatar-small" />`
    } else if (this.item instanceof JumpToTeamItem) {
      avatarTemplate = html`<img src="${src}" alt="${alt}" class="avatar avatar-1" />`
    } else {
      avatarTemplate = html`<img src="${src}" alt="${alt}" class="avatar avatar-1 avatar-small circle" />`
    }

    render(avatarTemplate, this.iconElement)
  }

  setItemAttributes(item: Item) {
    this.item = item
    this.itemId = item.id
    this.itemTitle = item.title
    this.hint = item.hint
    this.href = item.path ?? ''

    if (item.subtitle) {
      this.subtitle = item.subtitle
    }

    if (item instanceof ServerDefinedItem) {
      item.element = this
    }
  }

  render(selected: boolean, queryText: string): CommandPaletteItemElement {
    this.renderBaseElement()

    if (selected) {
      this.selected = true
    }

    if (this.item instanceof AccessPolicyItem && this.item.typeahead) {
      this.titleNodes = this.emphasizeTextMatchingQuery(this.item.title, this.item.typeahead)
    } else if (this.item instanceof HelpItem) {
      const span = document.createElement('span')
      span.innerHTML = this.item.title
      this.titleNodes = [span]

      if (this.item.persistentHint) {
        this.persistentHint.innerHTML = this.item.persistentHint
        this.persistentHint.hidden = false
      }
    } else if (this.item instanceof SearchLinkItem && queryText) {
      const nodes: Node[] = []

      nodes.push(document.createTextNode('Search'))

      const mark = document.createElement('strong')
      mark.textContent = ` '${queryText}' `
      nodes.push(mark)
      nodes.push(document.createTextNode(this.item.titleScope))

      this.titleNodes = nodes
    } else if (queryText) {
      this.titleNodes = this.emphasizeTextMatchingQuery(this.item.title, queryText)
    }

    return this
  }

  connectedCallback() {
    if (this.subtitle) {
      this.subtitleElement.removeAttribute('hidden')
    }

    // titleNodes can contain <strong> tags to emphasise any text present in the query
    // so we can replace the plain text title with these, if there are any
    if (this.titleNodes.length > 0) {
      this.titleElement.textContent = ''
      this.titleElement.append(...this.titleNodes)
    }
  }

  /* eslint-disable-next-line custom-elements/no-method-prefixed-with-on */
  onClick(event: Event) {
    this.activate(this.commandPalette, event)
  }

  get commandPalette() {
    return this.closest<CommandPalette>('command-palette')!
  }

  attributeChangedCallback(name: string, _old: string, newValue: string) {
    if (this.rendered) {
      if (name === 'data-selected') {
        this.setSelectionAppearance()
      } else if (name === 'data-item-title') {
        this.titleElement.textContent = newValue
      } else if (name === 'data-subtitle') {
        this.subtitleElement.textContent = newValue
      }
    }
  }

  setSelectionAppearance() {
    if (this.selected) {
      this.containerElement.classList.add('color-bg-subtle')
      this.hintText.hidden = false
    } else {
      this.containerElement.classList.remove('color-bg-subtle')
      this.hintText.hidden = true
    }
  }

  renderLinkContainer(content: TemplateResult) {
    return html`
      <a
        data-target="${this.containerDataTarget}"
        data-action="click:command-palette-item#onClick"
        href="${this.href}"
        class="${this.containerClasses}"
        data-skip-pjax
        style="${this.containerStyle}"
      >
        ${content}
      </a>
    `
  }

  renderSpanContainer(content: TemplateResult) {
    return html`
      <span
        data-target="${this.containerDataTarget}"
        class="${this.containerClasses}"
        style="${this.containerStyle}"
        data-action="click:command-palette-item#onClick"
      >
        ${content}
      </span>
    `
  }

  renderElementContent(): TemplateResult {
    return html`
      <div
        data-target="command-palette-item.iconElement"
        class="mr-2 color-fg-muted d-flex flex-items-center"
        style="height: 24px; min-width: 16px;"
      ></div>

      <div class="flex-1 d-flex flex-column" style="line-height: 24px;">
        <span data-target="command-palette-item.titleElement" class="color-fg-default f5">${this.itemTitle}</span>
        <p data-target="command-palette-item.subtitleElement" class="color-fg-muted f6 mb-0" hidden>${this.subtitle}</p>
      </div>

      <div class="color-fg-muted f5" style="line-height: 20px;">
        <span class="hide-sm" data-target="command-palette-item.hintText" style="line-height: 24px;" hidden
          >${this.getHint()}</span
        >
        <span
          class="hide-sm"
          data-target="command-palette-item.persistentHint"
          style="line-height: 24px;"
          hidden
        ></span>
      </div>
    `
  }

  renderBaseElement() {
    const content = this.renderElementContent()
    const itemTemplate = () => {
      if (this.href) {
        return this.renderLinkContainer(content)
      } else {
        return this.renderSpanContainer(content)
      }
    }

    render(itemTemplate(), this)
    this.rendered = true
  }

  // Behavior moved over from Item.ts

  // Link behavior

  activateLinkBehavior(_commandPalette: CommandPalette, event: Event, isPlatformMetaKey: boolean) {
    const link = this.containerElement

    if (isPlatformMetaKey && link instanceof HTMLAnchorElement) {
      this.newTabOpened = true
      this.openLinkInNewTab(link)
    } else {
      this.newTabOpened = false
      this.openLink(link)
    }
  }

  openLinkInNewTab(link: HTMLAnchorElement) {
    const previousTarget = link.getAttribute('target')
    link.setAttribute('target', '_blank')
    link.click()

    if (previousTarget) {
      link.setAttribute('target', previousTarget)
    } else {
      link.removeAttribute('target')
    }
  }

  openLink(link: HTMLAnchorElement) {
    link.click()
  }

  //Compy behavior

  /**
   * Copy given text to the clipboard and display a hint to the user.
   *
   * @param text to be copied
   * @param hintText to display to user (defaults to 'Copied!')
   */
  copyToClipboardAndAnnounce(text: string, hintText?: string) {
    copyText(text)

    const hint = this.hintText
    const previousHint = hint.textContent
    hint.classList.add('color-fg-success')
    hint.textContent = hintText ?? 'Copied!'
    setTimeout(() => {
      hint.classList.remove('color-fg-success')
      hint.textContent = previousHint
    }, 2000)
  }

  // Default hint behavior

  /**
   * Returns hint text to display on hover
   */
  getHint(): TemplateResult {
    if (this.item instanceof AccessPolicyItem || this.item instanceof HelpItem) {
      return html``
    } else if (this.hint) {
      return html`<span class="hide-sm">${this.hint}</span>`
    } else if (this.item instanceof ServerDefinedItem && this.item.scope) {
      return html`<div class="hide-sm">
        <kbd class="hx_kbd">Enter</kbd>
        to jump to
        <kbd class="hx_kbd ml-1">Tab</kbd>
        to search
      </div>`
    } else {
      return html`<span class="hide-sm">Jump to</span>`
    }
  }

  /**
   * Takes a string and emphasizes the portion that matches. The match is case
   * insensitive and emphasizes any partial match.
   *
   * When there is no match, an array containing a single text node is returned.
   *
   * @param text
   * @param queryText
   * @returns list of nodes representing the text
   */
  emphasizeTextMatchingQuery(text: string, queryText: string): Node[] {
    if (!hasMatch(queryText, text)) {
      const textNodeWithEverything = document.createTextNode(text)
      return [textNodeWithEverything]
    }

    const nodes = [] as Node[]
    let lastPosition = 0
    for (const matchingPosition of positions(queryText, text)) {
      const notMatchingText = text.slice(lastPosition, matchingPosition)
      if (notMatchingText !== '') {
        const textNode = document.createTextNode(text.slice(lastPosition, matchingPosition))
        nodes.push(textNode)
      }

      lastPosition = matchingPosition + 1
      const mark = document.createElement('strong')
      mark.textContent = text[matchingPosition]
      nodes.push(mark)
    }

    const textNode = document.createTextNode(text.slice(lastPosition))
    nodes.push(textNode)

    return nodes
  }
}
