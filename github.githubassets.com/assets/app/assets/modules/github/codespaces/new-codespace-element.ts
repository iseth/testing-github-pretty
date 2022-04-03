import {controller, target} from '@github/catalyst'
import {fetchLocationValues, prefetchCodespaceLocation} from '../prefetch-codespace-location'

interface VSCSLocationsResponse {
  current: 'string'
  available: string[]
}
@controller
class NewCodespaceElement extends HTMLElement {
  @target form: HTMLFormElement
  @target createCodespaceForm: HTMLFormElement
  @target createCodespaceWithSkuSelectForm: HTMLFormElement
  @target vscsTargetUrl: HTMLInputElement
  @target vscsLocationList: HTMLDivElement
  @target vscsLocationSummary: HTMLSpanElement | undefined
  @target loadingVscode: HTMLElement
  @target vscodePoller: HTMLElement
  @target advancedOptionsForm: HTMLFormElement | undefined
  @target locationResubmitParam: HTMLInputElement | undefined
  @target skuNameInput: HTMLInputElement | undefined
  @target selectedLocation: HTMLSpanElement | undefined
  @target autoSelectLocation: HTMLSpanElement | undefined
  @target needsSelectedLocation: HTMLSpanElement | undefined

  async connectedCallback() {
    const form = this.formForLocations()
    if (form) {
      // fetch the location and set any hidden inputs with it
      const locationJSON = await prefetchCodespaceLocation(form, !this.vscsLocationList)
      this.updatePickableLocations(locationJSON)
    }
  }

  formForLocations(): HTMLFormElement | undefined {
    return this.advancedOptionsForm || this.createCodespaceForm
  }

  toggleLoadingVscode() {
    const isHidden = this.loadingVscode.hidden
    const children = this.children
    for (let i = 0; i < children.length; i++) {
      ;(children[i] as HTMLElement).hidden = isHidden
    }
    this.loadingVscode.hidden = !isHidden
  }

  machineTypeSelected(event: Event) {
    const button = event.currentTarget as HTMLInputElement
    const skuName = button.getAttribute('data-sku-name')
    if (this.skuNameInput && skuName) this.skuNameInput.value = skuName
    if (this.advancedOptionsForm) this.advancedOptionsForm.requestSubmit()
  }

  pollForVscode(event: CustomEvent) {
    this.toggleLoadingVscode()
    const pollingUrl = (event.currentTarget as HTMLElement).getAttribute('data-src')
    if (pollingUrl) this.vscodePoller.setAttribute('src', pollingUrl)
  }

  async updatePickableLocations(locationJSON: VSCSLocationsResponse) {
    const form = this.formForLocations()
    if (!locationJSON && form) {
      // locationJSON isn't loaded by prefetchCodespaceLocation if a previous value was set
      // since prefetchCodespaceLocation is used in a handful of places I didn't want to complicate logic
      // elsewhere. This custom element is the special case that needs locationJSON every time so make
      // the call here instead
      const locationsURL = form.getAttribute('data-codespace-locations-url')
      if (!locationsURL) return
      locationJSON = await fetchLocationValues(locationsURL)
    }

    const recommendedLocation = locationJSON.current
    const availableLocations = locationJSON.available

    this.hideUnavailableLocations(availableLocations)
    this.preventSubmissionOfUnavailableLocation(availableLocations, recommendedLocation)
  }

  hideUnavailableLocations(availableLocations: string[]) {
    if (!this.vscsLocationList) return
    if (this.advancedOptionsForm) {
      const items = this.vscsLocationList.querySelectorAll('.select-menu-item')
      for (const item of items) {
        const input = item.querySelector<HTMLInputElement>('input')
        if (input && availableLocations.includes(input.getAttribute('data-location')!)) {
          item.removeAttribute('hidden')
          continue
        }
        if (input) {
          input.removeAttribute('checked')
          input.setAttribute('aria-checked', 'false')
        }
        item.setAttribute('hidden', 'hidden')
      }
    } else {
      // can remove once codespaces_advanced_options is fully shipped
      const items = this.vscsLocationList.querySelectorAll('.SelectMenu-item')
      for (const item of items) {
        if (availableLocations.includes(item.getAttribute('data-location')!)) {
          item.removeAttribute('hidden')
        } else {
          item.setAttribute('hidden', 'hidden')
        }
      }
    }
  }

  preventSubmissionOfUnavailableLocation(availableLocations: string[], recommendedLocation: string) {
    if (this.createCodespaceForm) {
      const createWithLocationInput =
        this.createCodespaceForm.querySelector<HTMLInputElement>('[name="codespace[location]"]')!
      if (createWithLocationInput && !availableLocations.includes(createWithLocationInput.value)) {
        createWithLocationInput.value = recommendedLocation
        if (this.vscsLocationSummary) {
          this.vscsLocationSummary.textContent = this.vscsLocationSummary.getAttribute('data-blank-title')
        }
      }
    }
    if (this.advancedOptionsForm) {
      const hiddenlocationInput = this.advancedOptionsForm.querySelector<HTMLInputElement>('[name="location"]')!
      if (hiddenlocationInput && !availableLocations.includes(hiddenlocationInput.value)) {
        hiddenlocationInput.value = recommendedLocation
      }

      // Make it clear to the user that they need to select something new from the location dropdown.
      const selectedLocationInput =
        this.advancedOptionsForm.querySelector<HTMLInputElement>('[name="location"]:checked')!
      const showingInvalidLocation = !selectedLocationInput && this.autoSelectLocation && this.autoSelectLocation.hidden
      if (showingInvalidLocation) {
        if (this.selectedLocation) this.selectedLocation.setAttribute('hidden', 'hidden')
        if (this.needsSelectedLocation) this.needsSelectedLocation.removeAttribute('hidden')
      }
    }
  }

  vscsTargetUrlUpdated(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    this.vscsTargetUrl.value = element.value
  }
}
