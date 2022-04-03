import {controller, target} from '@github/catalyst'
import DetailsDialogElement from '@github/details-dialog-element'
import {parseHTML} from '../parse-html'
import {prefetchCodespaceLocation} from '../prefetch-codespace-location'

@controller
class PrefetchPaneElement extends HTMLElement {
  @target skuSelect: HTMLElement | undefined
  @target skuError: HTMLElement | undefined
  @target selectionDetails: HTMLDetailsElement
  @target loadingVscode: HTMLElement | undefined
  @target vscodePoller: HTMLElement | undefined
  @target openSkuButton: HTMLElement | undefined
  @target skipSkuButton: HTMLElement | undefined
  @target defaultSkuPreview: HTMLElement | undefined
  @target dropdownButton: HTMLButtonElement | undefined
  @target advancedOptionsLink: HTMLAnchorElement | undefined
  @target basicOptionsCheck: SVGElement | undefined
  @target advancedOptionsCheck: SVGElement | undefined
  private prefetching = false
  private remainingRetries = 3 // arbitrary #, to avoid a transient issue
  private shownButton: HTMLElement | undefined
  private currentLocation: string

  async connectedCallback() {
    if (this.openSkuButton && this.skipSkuButton) {
      // We want to be more eager about fetching SKUs when it's
      // possible we can skip the modal entirely.
      await this.prefetchLocationAndSkus()
      this.hideSpinner()
      this.hidden = false
    } else {
      this.showOpenSkuButton()
    }
  }

  async prefetchLocationAndSkus() {
    const branchHasChanged = this.getAttribute('data-branch-has-changed') === 'true'
    if (this.prefetching && !branchHasChanged) return
    const form =
      document.querySelector<HTMLFormElement>('form.js-prefetch-codespace-location') ||
      document.querySelector<HTMLFormElement>('form.js-open-in-vscode-form')

    if (form) {
      this.prefetching = true

      // Only returns on first success, afterwards we'll need to pull it from the ivar.
      const locationJSON = await prefetchCodespaceLocation(form)
      if (locationJSON) this.currentLocation = locationJSON.current

      if (!this.skuSelect) return // Cases where the user doesn't have SKU management enabled.
      const skusUrl = this.getAttribute('data-codespace-skus-url')

      if (this.currentLocation && skusUrl) {
        const response = await fetch(`${skusUrl}&location=${this.currentLocation}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'text/html_fragment'
          }
        })
        if (response.ok) {
          this.setAttribute('data-branch-has-changed', 'false')
          const html = parseHTML(document, await response.text())

          // If the user has only one valid SKU, don't bother showing the selection modal.
          const inputs: HTMLInputElement[] = Array.from(html.querySelectorAll("input[name='codespace[sku_name]']"))
          const enabledInputs: HTMLInputElement[] = inputs.filter((a: HTMLInputElement) => !a.disabled)
          const checkedEnabledInput: HTMLInputElement | undefined = enabledInputs.find(
            (a: HTMLInputElement) => a.checked
          )

          if (checkedEnabledInput && this.defaultSkuPreview) {
            // codespaces_advanced_options is enabled if this target is present
            this.defaultSkuPreview.innerHTML = checkedEnabledInput.getAttribute('data-preview') || ''
            this.showSkipSkuButton()
          } else {
            const onlyOneChoice = enabledInputs.length === 1
            if (onlyOneChoice) {
              if (!checkedEnabledInput) enabledInputs[0].select()
              this.showSkipSkuButton()
            } else {
              this.disableDropDownButton()
            }
          }

          this.skuSelect.replaceWith(html)
          this.skuSelect.hidden = false
          if (this.skuError) this.skuError.hidden = true
        } else {
          this.showOpenSkuButton()
          this.remainingRetries -= 1
          if (this.remainingRetries > 0) this.prefetching = false
          this.skuSelect.hidden = true
          if (this.skuError) this.skuError.hidden = false
        }
      }
    }
  }

  showOpenSkuButton() {
    if (this.shownButton === undefined && this.openSkuButton) {
      this.shownButton = this.openSkuButton
      this.shownButton.hidden = false
      this.skipSkuButton?.remove()
    }
  }

  private hideSpinner(): void {
    const spinner = document.querySelector("[data-target='codespacesCreateButtonSpinner']") as HTMLElement
    if (spinner) spinner.hidden = true
  }

  private disableDropDownButton(): void {
    if (this.dropdownButton) {
      this.useAdvancedCreation()
      this.dropdownButton.style.pointerEvents = 'none'
      this.dropdownButton.classList.add('color-fg-muted')
    }
  }

  showSkipSkuButton() {
    if (this.shownButton === undefined && this.skipSkuButton) {
      this.shownButton = this.skipSkuButton
      this.shownButton.hidden = false

      // We need to hide the parent details in this case as the button we're removing
      // is its summary, so its absence reverts the DOM to a default "Details >".
      const details = this.openSkuButton?.parentElement
      if (details && details instanceof HTMLDetailsElement) details.hidden = true

      this.openSkuButton?.remove()
    }
  }

  toggleLoadingVscode() {
    if (this.loadingVscode) {
      const isHidden = this.loadingVscode.hidden
      const children = this.children
      for (let i = 0; i < children.length; i++) {
        ;(children[i] as HTMLElement).hidden = isHidden
      }
      this.loadingVscode.hidden = !isHidden
    }
  }

  pollForVscode(event: CustomEvent) {
    if (this.vscodePoller) {
      this.toggleLoadingVscode()
      const pollingUrl = (event.currentTarget as HTMLElement).getAttribute('data-src')
      if (pollingUrl) this.vscodePoller.setAttribute('src', pollingUrl)
    }
  }

  useBasicCreation(): void {
    if (this.advancedOptionsLink) {
      if (this.openSkuButton) this.openSkuButton.hidden = false
      if (this.skipSkuButton) this.skipSkuButton.hidden = false
      if (this.advancedOptionsLink) this.advancedOptionsLink.hidden = true
    }
    if (this.basicOptionsCheck) this.basicOptionsCheck.classList.remove('v-hidden')
    if (this.advancedOptionsCheck) this.advancedOptionsCheck.classList.add('v-hidden')
    this.selectionDetails.open = false
  }

  useAdvancedCreation(): void {
    if (this.advancedOptionsLink) {
      if (this.openSkuButton) this.openSkuButton.hidden = true
      if (this.skipSkuButton) this.skipSkuButton.hidden = true
      this.advancedOptionsLink.hidden = false
    }
    if (this.basicOptionsCheck) this.basicOptionsCheck.classList.add('v-hidden')
    if (this.advancedOptionsCheck) this.advancedOptionsCheck.classList.remove('v-hidden')
    this.selectionDetails.open = false
  }
}
