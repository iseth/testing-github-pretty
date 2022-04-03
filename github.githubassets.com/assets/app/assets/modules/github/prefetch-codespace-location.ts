import {on} from 'delegated-events'

export async function prefetchCodespaceLocation(form: HTMLFormElement, setLocationInputValue = true) {
  // There may be two hidden location inputs on the page, one for the self-reloading form, and one nested in the
  // create button's form, which we actually submit to create the codespace.
  const locationInputs = form.querySelectorAll<HTMLInputElement>('[name="codespace[location]"], [name="location"]')!
  if (locationInputs.length === 0) return
  for (const el of locationInputs) {
    if (el.value) return // If any exist and are unset, we'll fetch and set with the new result for them all.
  }

  const submitButton = form.querySelector('button[type=submit]')
  if (submitButton instanceof HTMLInputElement) {
    submitButton.disabled = true
  }

  const locationsURL = form.getAttribute('data-codespace-locations-url')
  if (!locationsURL) return

  const locationJSON = await fetchLocationValues(locationsURL)
  if (setLocationInputValue && locationJSON) {
    for (const el of locationInputs) {
      el.value = locationJSON.current
    }
  }

  return locationJSON
}

export async function fetchLocationValues(url: string) {
  const response = await fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json'
    }
  })
  if (!response.ok) {
    const responseError = new Error()
    const statusText = response.statusText ? ` ${response.statusText}` : ''
    responseError.message = `HTTP ${response.status}${statusText}`
    throw responseError
  }
  return response.json()
}

on('submit', '.js-prefetch-codespace-location', async function (event) {
  const form = event.currentTarget as HTMLFormElement

  event.preventDefault()
  await prefetchCodespaceLocation(form)
  form.submit()
})
