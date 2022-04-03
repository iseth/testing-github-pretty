import {TemplateInstance} from '@github/template-parts'
import {dialog} from '../details-dialog'
import {on} from 'delegated-events'
import {parseHTML} from '../parse-html'
import {prefetchCodespaceLocation} from '../prefetch-codespace-location'

on('submit', '.js-toggle-hidden-codespace-form', function (event) {
  const form = event.currentTarget as HTMLFormElement
  toggleFormSubmissionInFlight(form)
})

on('click', '.js-create-codespace-with-sku-button', async function (event) {
  const skuButton = event.currentTarget
  const form =
    (skuButton.closest("[data-target*='new-codespace.createCodespaceForm']") as HTMLFormElement) ||
    (skuButton.closest("[data-target*='new-codespace.createCodespaceWithSkuSelectForm']") as HTMLFormElement)

  await prefetchCodespaceLocation(form)

  if (form.classList.contains('js-open-in-vscode-form')) {
    toggleFormSubmissionInFlight(form)
    createCodespaceIntoVscode(form)
  } else {
    form.submit()
    createFormSubmitted()
  }
})

function toggleFormSubmissionInFlight(form: HTMLFormElement) {
  const elementsToHide = form.querySelectorAll<HTMLElement>('.js-toggle-hidden')
  for (const element of elementsToHide) {
    element.hidden = !element.hidden
  }

  const elementsToDisable = form.querySelectorAll<HTMLElement>('.js-toggle-disabled')
  for (const element of elementsToDisable) {
    if (element.getAttribute('aria-disabled')) {
      element.removeAttribute('aria-disabled')
    } else {
      element.setAttribute('aria-disabled', 'true')
    }
  }
}

function getFormTarget(form: HTMLFormElement): Element | null {
  return form.closest('[data-replace-remote-form-target]')
}

async function createFormSubmitted(): Promise<void> {
  const details = document.querySelector<HTMLDetailsElement>('.js-codespaces-details-container')!
  if (details) {
    details.open = false
  }
  const target = document.querySelector<HTMLElement>('new-codespace')!
  if (target && !target.getAttribute('data-no-submit-on-create')) {
    try {
      const response = await fetch('/codespaces/new')
      if (response && response.ok) {
        const html = parseHTML(document, await response.text())
        target.replaceWith(html)
      }
    } catch (error) {
      // Leave the form as-is in an un-reset, but functional, state.
    }
  }
}

on('submit', '.js-create-codespaces-form-command', function (event) {
  const form = event.currentTarget as HTMLFormElement
  if (!form.classList.contains('js-open-in-vscode-form')) {
    createFormSubmitted()
    toggleFormSubmissionInFlight(form)
    renderAllDone()
  }
})

on('submit', 'form.js-codespaces-delete-form', async function (event) {
  event.preventDefault()

  const form = event.currentTarget as HTMLFormElement
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        // We're passing *both* the Accept header and the XHR header. Ideally
        // we'd *only* pass Accept but currently the SAML filter only returns a
        // 401 for XHR requests. So we need to pass both headers to get the
        // behavior we want here.
        Accept: 'text/fragment+html',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.ok) {
      const html = parseHTML(document, await response.text())
      const target = getFormTarget(form)!
      target.replaceWith(html)
    } else if (response.status === 401) {
      // If we get a 401 then it _probably_ means they need to re-auth
      // (e.g., session expired), so try doing a full form submission instead,
      // which should bounce them through the appropriate authentication flow.
      form.submit()
    } else {
      throw new Error(`Unexpected response: ${response.statusText}`)
    }
  } finally {
    toggleFormSubmissionInFlight(form)
  }
})

on('submit', 'form.js-open-in-vscode-form', async function (event) {
  event.preventDefault()
  const form = event.currentTarget as HTMLFormElement
  await createCodespaceIntoVscode(form)
})

async function openDialog(dialogID: string, opener?: HTMLFormElement): Promise<HTMLElement> {
  const dialogTemplate = document.querySelector<HTMLTemplateElement>(`#${dialogID}`)!
  const openedDialog = await dialog({
    content: dialogTemplate.content.cloneNode(true) as DocumentFragment,
    dialogClass: 'project-dialog'
  })

  if (opener) {
    opener.setAttribute('aria-expanded', 'true')
  }

  openedDialog.addEventListener(
    'dialog:remove',
    function () {
      if (opener) {
        toggleFormSubmissionInFlight(opener)
      }
    },
    {once: true}
  )

  return openedDialog
}

async function createCodespaceIntoVscode(form: HTMLFormElement) {
  const response = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      // We're passing *both* the Accept header and the XHR header. Ideally
      // we'd *only* pass Accept but currently the SAML filter only returns a
      // 401 for XHR requests. So we need to pass both headers to get the
      // behavior we want here.
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  if (response.ok) {
    const json = await response.json()
    if (json.codespace_url) {
      window.location.href = json.codespace_url
      toggleFormSubmissionInFlight(form)
      createFormSubmitted()
      renderAllDone()
    } else {
      const dropdown = form.closest('get-repo') || form.closest('new-codespace')
      if (dropdown) {
        form.setAttribute('data-src', json.loading_url)
        form.dispatchEvent(new CustomEvent('pollvscode'))
      } else if (form.closest('prefetch-pane')) {
        form.setAttribute('data-src', json.loading_url)
        form.dispatchEvent(new CustomEvent('prpollvscode'))
      }
      toggleFormSubmissionInFlight(form)
      // This flow polls and we want to leave the popover open until finished so we do not call
      // createFormSubmitted() here. Instead we close the popover in connectedCallback of the
      // <vscode-forwarder> element we end up injecting into the DOM.
    }
  } else if (response.status === 422) {
    const body = await response.json()
    if (body.error_type === 'concurrency_limit_error') {
      await openDialog('concurrency-error', form)
    } else {
      const template = document.querySelector<HTMLTemplateElement>('template.js-flash-template')!
      const message = body.error
      template.after(new TemplateInstance(template, {className: 'flash-error', message}))
      toggleFormSubmissionInFlight(form)
    }
  }
}

// This method is used to render the "All done" html when opening a codespace in VS Code
// Will happen after allowed permissions or after the advanced options screens.
async function renderAllDone(): Promise<void> {
  const target = document.querySelector<HTMLElement>('.js-codespaces-completable')!
  const url = target && target.getAttribute('data-src')
  if (!url) {
    return
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // We're passing *both* the Accept header and the XHR header. Ideally
      // we'd *only* pass Accept but currently the SAML filter only returns a
      // 401 for XHR requests. So we need to pass both headers to get the
      // behavior we want here.
      Accept: 'text/fragment+html',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  if (response.ok) {
    const html = parseHTML(document, await response.text())
    target.replaceWith(html)
  } else {
    throw new Error(`Unexpected response: ${response.statusText}`)
  }
}
