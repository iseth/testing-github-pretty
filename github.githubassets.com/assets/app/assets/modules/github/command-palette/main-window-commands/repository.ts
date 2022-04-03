/**
 * This file contains main window commands for repositories.
 *
 * To add another command, define a new subclass and append the
 * class to the default export at the bottom of the file.
 */
import ClipboardCopyElement from '@github/clipboard-copy-element'
import CommandPalette from '../command-palette-element'
import {MainWindowCommand} from '../main-window-command'
import {OpenCodespace} from './codespaces'
import {copyText} from '../copy'

class CopyPermalink extends MainWindowCommand {
  title = 'Copy file permalink'
  icon = 'copy-color-fg-muted'

  isApplicable() {
    return this.fetchPermalinkContainer() instanceof HTMLAnchorElement
  }

  fetchPermalinkContainer() {
    return document.querySelector<HTMLAnchorElement>('.js-permalink-shortcut')
  }

  async run(commandPalette: CommandPalette) {
    const permalinkContainer = this.fetchPermalinkContainer()
    if (permalinkContainer) {
      const url = `${permalinkContainer.href}${window.location.hash}`
      try {
        await copyText(url)

        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('success', 'Copied permalink!')
      } catch {
        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('error', 'Failed to copy permalink!')
      }
    }
  }
}

class CloneCopyHttps extends MainWindowCommand {
  title = 'Clone repository: Copy HTTPS'
  icon = 'copy-color-fg-muted'
  priority = 4

  isApplicable() {
    return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof ClipboardCopyElement
  }

  fetchClipboardCopy() {
    return document.querySelector('.js-clone-url-http')
  }

  backendCommandsDisabled() {
    return !!window.commandPalette && !(window.commandPalette as CommandPalette).hasAttribute('data-commands-path')
  }

  async run(commandPalette: CommandPalette) {
    const cloneContainer = this.fetchClipboardCopy()
    if (cloneContainer instanceof ClipboardCopyElement) {
      const url = cloneContainer.value
      try {
        await copyText(url)

        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('success', 'Clone URL copied!')
      } catch {
        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('error', `Clone URL couldn't be copied`)
      }
    }
  }
}

class CloneCopySsh extends MainWindowCommand {
  title = 'Clone repository: Copy SSH'
  icon = 'copy-color-fg-muted'
  priority = 3

  isApplicable() {
    return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof ClipboardCopyElement
  }

  fetchClipboardCopy() {
    return document.querySelector('.js-clone-url-ssh')
  }

  backendCommandsDisabled() {
    return !!window.commandPalette && !(window.commandPalette as CommandPalette).hasAttribute('data-commands-path')
  }

  async run(commandPalette: CommandPalette) {
    const cloneContainer = this.fetchClipboardCopy()
    if (cloneContainer instanceof ClipboardCopyElement) {
      const url = cloneContainer.value
      try {
        await copyText(url)

        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('success', 'Clone URL copied!')
      } catch {
        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('error', `Clone URL couldn't be copied`)
      }
    }
  }
}

class CloneCopyCli extends MainWindowCommand {
  title = 'Clone repository: Copy GitHub CLI'
  icon = 'copy-color-fg-muted'
  priority = 2

  isApplicable() {
    return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof ClipboardCopyElement
  }

  fetchClipboardCopy() {
    return document.querySelector('.js-clone-url-gh-cli')
  }

  backendCommandsDisabled() {
    return !!window.commandPalette && !(window.commandPalette as CommandPalette).hasAttribute('data-commands-path')
  }

  async run(commandPalette: CommandPalette) {
    const cloneContainer = this.fetchClipboardCopy()
    if (cloneContainer instanceof ClipboardCopyElement) {
      const url = cloneContainer.value
      try {
        await copyText(url)

        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('success', 'Clone URL copied!')
      } catch {
        // eslint-disable-next-line i18n-text/no-en
        commandPalette.displayFlash('error', `Clone URL couldn't be copied`)
      }
    }
  }
}

export default [CloneCopyHttps, CloneCopySsh, CloneCopyCli, CopyPermalink, OpenCodespace]
