/**
 * This file contains codespace realted main window commands.
 *
 * To add another command, define a new subclass
 * These commands can be exported to other main-wiondow-commands files to be executed on different pages
 */
import {MainWindowCommand} from '../main-window-command'

type Elements = {
  codespacesForm: HTMLFormElement | null
  codespacesTab: HTMLButtonElement | null
  codeModal: HTMLDetailsElement | null
  newCodespacesButton: HTMLElement | null
}

export class OpenCodespace extends MainWindowCommand {
  title = 'Open in new codespace'
  icon = 'codespaces-color-fg-muted'
  priority = 11

  isApplicable() {
    const elements = this.fetchElements()
    return !!(elements.codeModal && elements.codespacesForm && elements.newCodespacesButton && elements.codespacesTab)
  }

  run() {
    const {codeModal, codespacesTab, newCodespacesButton} = this.fetchElements()
    if (!(codeModal && codespacesTab && newCodespacesButton)) return

    codeModal.open = true
    codespacesTab.click()

    if (newCodespacesButton instanceof HTMLButtonElement) {
      newCodespacesButton.click()
    } else {
      ;(newCodespacesButton.parentElement as HTMLDetailsElement).open = true

      setTimeout(() => {
        document.querySelector<HTMLButtonElement>('.js-create-codespace-with-sku-button')?.focus()
      }, 0)
    }
  }

  fetchElements(): Elements {
    const codespacesForm = document.querySelector<HTMLFormElement>('.js-create-codespaces-form-command')
    const codeModal = codespacesForm?.closest<HTMLDetailsElement>('details') || null
    const codespacesTab = codeModal?.querySelector<HTMLButtonElement>('[data-tab="cloud"]') || null
    const newCodespacesButton =
      codespacesForm?.querySelector<HTMLElement>('summary[role="button"], button[type="submit"]') || null

    return {
      codespacesForm,
      codeModal,
      codespacesTab,
      newCodespacesButton
    }
  }
}
