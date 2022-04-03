import {controller, target} from '@github/catalyst'
import {fetchSafeDocumentFragment} from '../fetch'

@controller
class OptionsPopoverElement extends HTMLElement {
  @target dropdownDetails: HTMLDetailsElement
  @target modalDetails: HTMLDetailsElement
  @target settingsModal: HTMLElement
  @target skuForm: HTMLFormElement
  @target resultMessage: HTMLElement
  @target errorMessage: HTMLElement
  @target exportDetails: HTMLDetailsElement

  reset(event: Event) {
    event.preventDefault() // We don't want default details-dialog-close behavior, which resets the form.
    this.dropdownDetails.hidden = false
    this.modalDetails.hidden = true
    this.exportDetails.hidden = true

    this.skuForm.hidden = false
    while (this.resultMessage.firstChild) {
      this.resultMessage.removeChild(this.resultMessage.firstChild)
    }
    this.resultMessage.hidden = true
    this.errorMessage.hidden = true
  }

  showSettingsModal() {
    this.dropdownDetails.hidden = true
    this.modalDetails.open = true
    this.modalDetails.hidden = false
  }

  showExportModal() {
    this.dropdownDetails.hidden = true
    this.exportDetails.open = true
    this.exportDetails.hidden = false
    this.insertBranchExportComponent()
  }

  async insertBranchExportComponent() {
    const container = this.querySelector<HTMLElement>('[data-branch-export-url]')
    if (!container) return

    const url = container.getAttribute('data-branch-export-url')
    if (!url) return

    const branchExportComponentHTML = await fetchSafeDocumentFragment(document, url)
    if (!branchExportComponentHTML) return

    // It would be nicer to use replaceChildren but it's too recent and still unsupported in TypeScript.
    container.innerHTML = ''
    container.appendChild(branchExportComponentHTML)
  }
}
