import {TemplateResult, html, render} from 'lit-html'
import {observe} from 'selector-observer'
import {on} from 'delegated-events'

interface ColorModeParam {
  color_mode: Omit<ColorModes, 'auto'>
}

enum ColorModes {
  Auto = 'auto',
  Light = 'light',
  Dark = 'dark'
}

/**
 * getUserSystemColorMode Attempts to detect the color mode the user has specified
 * in their operating system's preferences.
 * Defaults to 'light'
 * @returns One of 'light' or 'dark' color modes.
 */
function getUserSystemColorMode() {
  if (window.matchMedia(`(prefers-color-scheme: ${ColorModes.Dark})`).matches) {
    return ColorModes.Dark
  }

  return ColorModes.Light
}

// Enrichable Markdown Rendering:
//
// We use the `markdown-enrichment` to render code blocks in markdown.
// The CodeRenderService is responsible for rendering the code blocks to html and
// this code will find those blocks and enrich them with the code rendering service appropriate
// for the language.
// If we're enriching a raw code block, we need to hide the original
// code block once the iframe has rendered successfully

const RENDER_PLAINTEXT_SELECTOR = '.js-render-plaintext'
export function markdownEnrichmentSuccess(where: Element) {
  const parent = where.closest('.js-render-needs-enrichment')
  if (!parent) {
    return
  }

  const rawCodeBlock = parent.querySelector(RENDER_PLAINTEXT_SELECTOR)

  if (rawCodeBlock) {
    setCodeBlockLoaderVisibility(parent as HTMLElement, false)
  }
}

export function showMarkdownRenderError(parent: HTMLElement, template: TemplateResult) {
  setCodeBlockLoaderVisibility(parent, false)
  setRawCodeBlockVisibility(parent, true)
  parent.classList.add('render-error')

  const plaintextTarget = parent.querySelector(RENDER_PLAINTEXT_SELECTOR)
  if (!plaintextTarget) {
    return
  }
  plaintextTarget.classList.remove('render-plaintext-hidden')
  const plaintextEl = plaintextTarget.querySelector('pre') as HTMLElement

  render(html`${template} ${plaintextEl}`, plaintextTarget)
}

// Show the spinner or not when enriching a code block.
function setCodeBlockLoaderVisibility(where: HTMLElement, loaderVisible: boolean) {
  const loader = where.getElementsByClassName('js-render-enrichment-loader')[0] as HTMLElement
  const expander = where.getElementsByClassName('render-expand')[0] as HTMLElement
  if (loader) {
    loader.hidden = !loaderVisible
  }
  if (expander) {
    expander.hidden = loaderVisible
  }
}

function setRawCodeBlockVisibility(where: HTMLElement, codeVisible: boolean) {
  const rawCodeBlock = where.querySelector(RENDER_PLAINTEXT_SELECTOR) as HTMLElement

  if (codeVisible) {
    rawCodeBlock.classList.remove('render-plaintext-hidden')
  } else {
    rawCodeBlock.classList.add('render-plaintext-hidden')
  }
}

class EnrichableMarkdownRenderer {
  enrichmentTarget: HTMLElement
  el: HTMLElement
  iframeUrl: string
  identifier: string
  iframeContentType: string
  iframeOrigin: string
  iframeContent: string

  constructor(el: HTMLElement) {
    this.el = el
    this.enrichmentTarget = el.getElementsByClassName('js-render-enrichment-target')[0] as HTMLElement
    this.iframeUrl = this.getIframeUrl()
    this.identifier = this.el.getAttribute('data-identity')!
    this.iframeContentType = this.el.getAttribute('data-type')!
    this.iframeOrigin = new URL(this.iframeUrl, window.location.origin).origin
    this.iframeContent = this.el.getAttribute('data-content')!
    // Setup the loading state for this code block to show the spinner
    setCodeBlockLoaderVisibility(this.el, true)
  }

  enrich() {
    const enriched = this.createDialog()
    render(enriched, this.enrichmentTarget)
    this.setupModal()
  }

  private getIframeUrl() {
    const baseUrl = this.el.getAttribute('data-src')!
    const params = {
      ...this.colorMode()
    }
    const queryParams = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')

    return `${baseUrl}?${queryParams}`
  }

  /**
   * colorMode queries the DOM for the user's preferred
   * color mode setting — either `dark`, `light`, or `auto`. A value of
   * `auto` indicates that the color mode is derived from the user's
   * system preferences, which triggers a further check.
   *
   * @returns ColorModeParam
   */
  private colorMode(): ColorModeParam {
    let colorMode = document.querySelector('html')?.getAttribute('data-color-mode')

    if (colorMode === ColorModes.Auto || !colorMode) {
      colorMode = getUserSystemColorMode()
    }

    return {color_mode: colorMode}
  }
  // We need some interactions in the modal to add the
  // iframe to the dialog when it is opened. We tag the iframe
  // with a full screen identifier so the rendering service has a
  // unique identifier for the iframe.
  private setupModal() {
    const iframe = this.generateIframeCode('-fullscreen')
    const dialogEl = this.el.querySelector('.Box-body') as HTMLElement
    const dialogButton = this.el.querySelector('.js-full-screen-render') as HTMLButtonElement
    dialogButton.addEventListener('click', () => {
      render(iframe, dialogEl)
    })
  }

  // This is a dialog element to allow the user to see the full screen rendering
  // it calls out the iframe code to be rendered in the normal view
  private createDialog() {
    const iframeDom = this.generateIframeCode()
    return html` <div class="d-flex flex-column flex-auto js-render-box">
      <details class="details-reset details-overlay details-overlay-dark">
        <summary class="btn-sm btn position-absolute js-full-screen-render render-expand" aria-haspopup="dialog" hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="octicon"
            style="display:inline-block;vertical-align:text-bottom"
          >
            <path
              fill-rule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"
            ></path>
          </svg>
        </summary>
        <details-dialog class="Box Box--overlay render-full-screen d-flex flex-column anim-fade-in fast">
          <div>
            <button
              aria-label="Close dialog"
              data-close-dialog=""
              type="button"
              data-view-component="true"
              class="Link--muted btn-link position-absolute render-full-screen-close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="display:inline-block;vertical-align:text-bottom"
                class="octicon octicon-x"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
            <div class="Box-body"></div>
          </div>
        </details-dialog>
      </details>
      ${iframeDom}
    </div>`
  }

  // Generate the iframe code to be rendered
  private generateIframeCode(identityPrefix = '') {
    const iframeIdentity = this.identifier + identityPrefix
    const iframeUrl = `${this.iframeUrl}#${iframeIdentity}`

    return html`
      <div
        class="render-container js-render-target p-0"
        data-identity="${iframeIdentity}"
        data-host="${this.iframeOrigin}"
        data-type="${this.iframeContentType}"
      >
        <iframe
          class="render-viewer"
          src="${iframeUrl}"
          name="${iframeIdentity}"
          data-content="${this.iframeContent}"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        >
        </iframe>
      </div>
    `
  }
}

observe('.js-render-needs-enrichment', function (el) {
  const htmlEl = el as HTMLElement
  const enricher = new EnrichableMarkdownRenderer(htmlEl)
  enricher.enrich()
})

/**
 * Toggling back and forth between the `preview` and `write` tabs produces jank in
 * the form of an occasionally visible fully rendered chart. This is because we leave the
 * chart on the page until a request to regenerate the chart can be made.
 *
 * So, we add an event in `preview.ts` we can hook into,
 * and clear out the previously rendered chart before requesting a new one from viewscreen
 */
on('preview:toggle:off', '.js-previewable-comment-form', function (event) {
  const target = event.currentTarget
  const htmlEl = target.querySelector<HTMLElement>('.js-render-needs-enrichment')
  const enrichTarget = htmlEl?.querySelector('.js-render-enrichment-target')

  if (!enrichTarget) {
    return
  }

  enrichTarget.innerHTML = ''
})

on('preview:rendered', '.js-previewable-comment-form', function (event) {
  const target = event.currentTarget
  const htmlEl = target.querySelector<HTMLElement>('.js-render-needs-enrichment')
  if (htmlEl) {
    setRawCodeBlockVisibility(htmlEl, false)
  }
})

export default EnrichableMarkdownRenderer
