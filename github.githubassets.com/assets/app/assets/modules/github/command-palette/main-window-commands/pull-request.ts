/**
 * This file contains main window commands for pull requests.
 *
 * To add another command, define a new subclass and append the
 * class to the default export at the bottom of the file.
 */
import {EditIssueBody, EditIssueTitle} from './issue'
import ClipboardCopyElement from '@github/clipboard-copy-element'
import CommandPalette from '../command-palette-element'
import {MainWindowCommand} from '../main-window-command'
import {OpenCodespace} from './codespaces'
import {copyText} from '../copy'

class EditPullRequestBody extends EditIssueBody {
  title = 'Edit pull request body'

  pullRequestBody() {
    return document.querySelector('.js-command-palette-pull-body')
  }

  isPullRequest() {
    return !!this.pullRequestBody()
  }

  isApplicable() {
    return this.isPullRequest()
  }
}

class EditPullRequestTitle extends EditIssueTitle {
  title = 'Edit pull request title'

  pullRequestBody() {
    return document.querySelector('.js-command-palette-pull-body')
  }

  isPullRequest() {
    return !!this.pullRequestBody()
  }

  isApplicable() {
    return this.fetchButton() instanceof HTMLButtonElement && this.isPullRequest()
  }
}

class UpdateBranch extends MainWindowCommand {
  title = 'Update current branch'
  icon = 'sync-color-fg-muted'

  isApplicable() {
    return this.fetchButton() instanceof HTMLButtonElement
  }

  fetchButton() {
    return document.querySelector<HTMLButtonElement>('.js-update-branch-form button')
  }

  run() {
    const button = this.fetchButton()

    if (button) {
      button.scrollIntoView({behavior: 'smooth', block: 'center'})
      button.click()
    }
  }
}

class ConvertToDraft extends MainWindowCommand {
  title = 'Convert to draft'
  icon = 'git-pull-request-draft-color-fg-muted'

  isApplicable() {
    return this.fetchButton() instanceof HTMLButtonElement
  }

  fetchButton() {
    return document.querySelector<HTMLButtonElement>('.js-convert-to-draft')
  }

  run() {
    const details = this.fetchButton()?.closest<HTMLDetailsElement>('details')

    if (details) {
      details.open = true

      setTimeout(() => {
        details.querySelector<HTMLButtonElement>('.js-convert-to-draft')?.focus()
      }, 0)
    }
  }
}

class CopyBranchName extends MainWindowCommand {
  title = 'Copy current branch name'
  icon = 'copy-color-fg-muted'

  isApplicable() {
    return this.fetchClipboardCopy() instanceof ClipboardCopyElement
  }

  fetchClipboardCopy() {
    return document.querySelector('.js-copy-branch')
  }

  async run(commandPalette: CommandPalette) {
    const cloneContainer = this.fetchClipboardCopy()
    if (cloneContainer instanceof ClipboardCopyElement) {
      const url = cloneContainer.value
      try {
        await copyText(url)

        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('success', 'Branch name copied to clipboard!')
      } catch {
        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('error', 'Unable to copy branch name to clipboard!')
      }
    }
  }
}

export default [CopyBranchName, EditPullRequestTitle, EditPullRequestBody, UpdateBranch, ConvertToDraft, OpenCodespace]
