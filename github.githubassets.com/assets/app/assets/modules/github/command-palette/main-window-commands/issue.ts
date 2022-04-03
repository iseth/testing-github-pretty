/**
 * This file contains main window commands for issues.
 *
 * To add another command, define a new subclass and append the
 * class to the default export at the bottom of the file.
 */
import {MainWindowCommand} from '../main-window-command'

function moveCursorToEnd(input: HTMLTextAreaElement | HTMLInputElement) {
  input.focus()
  input.selectionStart = input.selectionEnd = input.value.length
}

export class EditIssueBody extends MainWindowCommand {
  title = 'Edit issue body'
  icon = 'pencil-color-fg-muted'

  issueBody() {
    return document.querySelector('.js-command-palette-issue-body')
  }

  isIssue() {
    return !!this.issueBody()
  }

  isApplicable() {
    return this.isIssue()
  }

  run() {
    // Build an edit button (the normal one isn't always loaded)
    const editButton = document.createElement('button')
    editButton.hidden = true
    editButton.classList.add('js-comment-edit-button')

    const issueBody = document.querySelector('div.js-comment')
    issueBody?.appendChild(editButton)

    editButton.click()
    editButton.remove()

    setTimeout(() => {
      const textArea = issueBody?.parentElement?.querySelector<HTMLTextAreaElement>('textarea.js-comment-field')

      if (textArea) {
        moveCursorToEnd(textArea)
      }
    }, 0)
  }
}

export class EditIssueTitle extends MainWindowCommand {
  title = 'Edit issue title'
  icon = 'pencil-color-fg-muted'

  issueBody() {
    return document.querySelector('.js-command-palette-issue-body')
  }

  isIssue() {
    return !!this.issueBody()
  }

  isApplicable() {
    return this.fetchButton() instanceof HTMLButtonElement && this.isIssue()
  }

  fetchButton() {
    return document.querySelector<HTMLButtonElement>('.js-title-edit-button')
  }

  run() {
    this.fetchButton()?.click()

    // Even though the input has an autofocus, it isn't focused when it is unhidden.
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input#issue_title[autofocus]')

      if (input) {
        moveCursorToEnd(input)
      }
    }, 0)
  }
}

class TransferIssue extends MainWindowCommand {
  title = 'Transfer issue…'
  icon = 'arrow-right-color-fg-muted'

  isApplicable() {
    return this.fetchDetails() instanceof HTMLDetailsElement
  }

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-transfer-issue')
  }

  run() {
    const transferIssueDetails = this.fetchDetails()

    if (transferIssueDetails) {
      const focusMenu = () => {
        setTimeout(() => {
          transferIssueDetails.querySelector<HTMLElement>('[data-menu-button]')?.focus()
        }, 0)
      }

      transferIssueDetails.querySelector<HTMLElement>('include-fragment')?.addEventListener('load', focusMenu)

      transferIssueDetails.open = true
      focusMenu()
    }
  }
}

class LockIssue extends MainWindowCommand {
  constructor() {
    super()
    const isLockCommand = this.isLock()
    this.title = `${isLockCommand ? 'Lock' : 'Unlock'} conversation`
    this.icon = `${isLockCommand ? 'lock' : 'key'}-color-fg-muted`
  }

  isApplicable() {
    return this.fetchDetails() instanceof HTMLDetailsElement
  }

  isLock() {
    return document.querySelector('summary.lock-toggle-link')?.textContent?.trim() === 'Lock conversation'
  }

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-lock-issue')
  }

  run() {
    const lockIssueDetails = this.fetchDetails()
    if (lockIssueDetails) {
      lockIssueDetails.open = true

      setTimeout(() => {
        document.querySelector<HTMLSelectElement>('#unlock-reason')?.focus()
      }, 0)
    }
  }
}

class DeleteIssue extends MainWindowCommand {
  title = 'Delete issue…'
  icon = 'trash-color-fg-muted'

  isApplicable() {
    return this.fetchDetails() instanceof HTMLDetailsElement
  }

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-delete-issue')
  }

  run() {
    const deleteIssueDetails = this.fetchDetails()
    if (deleteIssueDetails) {
      deleteIssueDetails.open = true

      setTimeout(() => {
        deleteIssueDetails.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus()
      }, 0)
    }
  }
}

export class ConvertToDiscussion extends MainWindowCommand {
  title = 'Convert issue to discussion…'
  icon = 'comment-discussion-color-fg-muted'

  isApplicable() {
    return this.fetchDetails() instanceof HTMLDetailsElement
  }

  fetchDetails() {
    return document.querySelector<HTMLDetailsElement>('details.js-convert-to-discussion')
  }

  run() {
    const convertToDiscussionDetails = this.fetchDetails()
    if (convertToDiscussionDetails) {
      const focusMenu = () => {
        setTimeout(() => {
          convertToDiscussionDetails.querySelector<HTMLElement>('[data-menu-button]')?.focus()
        }, 0)
      }

      convertToDiscussionDetails.querySelector<HTMLElement>('include-fragment')?.addEventListener('load', focusMenu)

      convertToDiscussionDetails.open = true
      focusMenu()
    }
  }
}

export default [EditIssueTitle, EditIssueBody, LockIssue, TransferIssue, DeleteIssue, ConvertToDiscussion]
