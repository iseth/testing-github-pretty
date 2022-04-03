import {attr, controller, target} from '@github/catalyst'
import safeStorage from '../../assets/modules/github/safe-storage'
import {throttle} from '@github/mini-throttle/decorators'

const {getItem, setItem} = safeStorage('localStorage')

interface QueryResponse {
  dismissed: boolean
}

// Apply a class to an element to indicate a feature to call attention to
// it until a user interacts with it in some way to dismiss permanently
@controller
class FeatureCalloutElement extends HTMLElement {
  // Element to apply a "new" label to.
  // By default the first child element.
  @target labelee: HTMLElement

  // Element that should dismiss the callout when interacted with.
  // By default the first child element.
  @target dismisser: HTMLElement

  // The form to submit async to tell the server the user dismissed the callout.
  @target dismissalForm: HTMLFormElement

  // URI path to find out whether the feature notice was dismissed already.
  @attr queryPath: string

  // The feature name
  @attr featureName: string

  // Event to bind to on dismisser which triggers dismissal
  @attr dismissEvent = 'click'

  // The class applied to the feature element to call attention to it.
  @attr labelClass = 'new-feature-label'

  // Used to construct the localstorage key that dismissal data is cached under
  static LocalStoragePrefix = 'feature-callout'

  static FetchHeaders = {
    'X-Requested-With': 'XMLHttpRequest' // controller checks xhr? so we need this
  }

  async connectedCallback() {
    this.bootstrapFromLocalStorage() || (await this.bootstrapFromServer())
  }

  bootstrapFromLocalStorage() {
    const storedData = getItem(this.localStorageKey)
    if (!storedData) {
      return false
    }
    this.bootstrap(JSON.parse(storedData))
    return true
  }

  get localStorageKey() {
    return `${FeatureCalloutElement.LocalStoragePrefix}:${this.featureName}`
  }

  async bootstrapFromServer() {
    try {
      const response = await fetch(this.queryPath, {
        method: 'GET',
        headers: FeatureCalloutElement.FetchHeaders
      })
      const text = await response.text()
      if (!response.ok) {
        throw new Error(`unexpected response status ${response.status}: '${text}'`)
      }
      const parsed: QueryResponse = JSON.parse(text)
      this.bootstrap(parsed)
      if (parsed.dismissed) {
        // Dismissal can't be undone so we can cache it forever in localstorage
        setItem(this.localStorageKey, text)
      }
      return true
    } catch (e) {
      throw new Error(`failed to get feature state from server: ${e}`)
    }
    return false
  }

  // Given a QueryResponse from the server or localstorage, sets up the element.
  bootstrap(response: QueryResponse) {
    if (!('dismissed' in response) || response.dismissed === null) {
      throw new Error(`malformed response, likely no notice configured: '${JSON.stringify(response)}'`)
    }
    if (response.dismissed) {
      return // nothing to do, already dismissed by user
    }
    // not dismissed, set up handlers and show label
    this.applyTargetDefaults()
    this.showCallout()
    this.dismisser.addEventListener(this.dismissEvent, this.handleDismissal.bind(this), {once: true})
    this.detectAndBindToTabContainer()
  }

  // We normally dismiss on click events, which keyboard nav simulates, but
  // if dismisser is a tab inside a tab-container and the tab is revealed
  // with arrow keys no 'click' will be simulated, so we need to a bunch of
  // work to detect it :(
  detectAndBindToTabContainer() {
    const tabContainer = this.querySelector('tab-container')
    if (tabContainer) {
      tabContainer.addEventListener('tab-container-changed', (e: Event) => {
        const evt = e as CustomEvent
        if (
          evt.detail &&
          evt.detail.relatedTarget &&
          evt.detail.relatedTarget.getAttribute('aria-labelledby') === this.dismisser.id
        ) {
          this.handleDismissal()
        }
      })
    }
  }

  // If labelee or dismisser are not specified, set them both to the first child element.
  applyTargetDefaults() {
    if (!this.firstElementChild || (this.labelee && this.dismisser)) {
      return
    }

    let targetValue = this.firstElementChild.getAttribute('data-target') || ''
    if (!this.labelee) {
      targetValue = targetValue.concat(' feature-callout.labelee')
    }
    if (!this.dismisser) {
      targetValue = targetValue.concat(' feature-callout.dismisser')
    }
    this.firstElementChild.setAttribute('data-target', targetValue)
  }

  @throttle(1, {once: true})
  handleDismissal() {
    this.submitForm()
    setItem(this.localStorageKey, '{"dismissed":true}')
  }

  showCallout() {
    this.labelee.classList.add(this.labelClass)
  }

  async submitForm() {
    const form = this.dismissalForm
    if (!form) {
      return
    }
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: FeatureCalloutElement.FetchHeaders
      })
      if (!response.ok) {
        throw new Error(`unexpected response status ${response.status}: ${await response.text()}`)
      }
    } catch (e) {
      throw new Error(`failed to persist dismissal to server: ${e}`)
    }
  }
}
