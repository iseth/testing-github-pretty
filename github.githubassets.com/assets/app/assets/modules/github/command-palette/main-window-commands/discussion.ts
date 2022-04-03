/**
 * This file contains main window commands for issues.
 *
 * To add another command, define a new subclass and append the
 * class to the default export at the bottom of the file.
 */
import {MainWindowCommand} from '../main-window-command'

class DeleteDiscussion extends MainWindowCommand {
  title = 'Delete discussion…'
  icon = 'trash-color-fg-muted'

  get deleteButton() {
    return document.querySelector<HTMLButtonElement>('button#dialog-show-delete-discussion')
  }

  get dialogElement() {
    return document.querySelector<HTMLElement>('#delete-discussion')
  }

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-delete-discussion-details')
  }

  isApplicable() {
    return this.deleteButton != null || this.fetchDetails() instanceof HTMLDetailsElement
  }

  run() {
    const deleteDiscussionsButton = this.deleteButton
    if (deleteDiscussionsButton) {
      deleteDiscussionsButton.click()
      setTimeout(() => {
        this.dialogElement?.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus()
      }, 0)
      return
    }

    const deleteDiscussionsDetails = this.fetchDetails()
    if (deleteDiscussionsDetails) {
      deleteDiscussionsDetails.open = true
      setTimeout(() => {
        deleteDiscussionsDetails?.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus()
      }, 0)
    }
  }
}

class EditDiscussion extends MainWindowCommand {
  title = 'Edit discussion body'
  icon = 'pencil-color-fg-muted'

  get editButton() {
    return document.querySelector<HTMLDetailsElement>('.js-discussions-comment-edit-button')
  }

  isApplicable() {
    return this.editButton != null
  }

  run() {
    this.editButton?.click()
  }
}

class TransferDiscussion extends MainWindowCommand {
  title = 'Transfer discussion…'
  icon = 'arrow-right-color-fg-muted'

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-transfer-discussion-details')
  }

  isApplicable() {
    return this.fetchDetails() instanceof HTMLDetailsElement
  }

  run() {
    const transferDiscussionDetails = this.fetchDetails()

    if (transferDiscussionDetails) {
      const focusMenu = () => {
        setTimeout(() => {
          transferDiscussionDetails?.querySelector<HTMLElement>('[data-menu-button]')?.focus()
        }, 0)
      }

      transferDiscussionDetails.querySelector<HTMLElement>('include-fragment')?.addEventListener('load', focusMenu)

      transferDiscussionDetails.open = true
      focusMenu()
    }
  }
}

export default [DeleteDiscussion, TransferDiscussion, EditDiscussion]
