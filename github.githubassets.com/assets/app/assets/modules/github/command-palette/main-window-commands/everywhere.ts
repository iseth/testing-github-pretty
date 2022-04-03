/**
 * This file contains main window commands that should appear everywhere. This
 * is useful when a command applies in many contexts. You can control when the
 * command is available to run by implementing `isApplicable`.
 *
 * To add another command, define a new subclass and append the
 * class to the default export at the bottom of the file.
 */
import {ColorModeWithAuto, getClientTheme, setClientMode, setClientTheme} from '../../color-modes'
import {CommandPalette, StaticItemsPage} from '@github/command-palette-api'
import {MainWindowCommand, MainWindowGlobalCommand} from '../main-window-command'
import {MainWindowCommandItem} from '../items/main-window-command-item'

class OpenInDotDev extends MainWindowCommand {
  title = 'Open in github.dev editor'
  icon = 'codespaces-color-fg-muted'
  priority = 10

  isApplicable() {
    return this.fetchLink() instanceof HTMLAnchorElement
  }

  fetchLink() {
    return document.querySelector<HTMLAnchorElement>('.js-github-dev-shortcut')
  }

  run() {
    this.fetchLink()?.click()
  }
}

export class SwitchTheme extends MainWindowGlobalCommand {
  title = 'Switch theme'
  icon = 'paintbrush-color-fg-muted'
  priority = 9
  dismissAfterRun = false

  run(commandPalette: CommandPalette) {
    commandPalette.pushPage(new StaticItemsPage(this.title, 'switch-theme-page-1', this.pageItems))
  }

  get pageItems(): MainWindowCommandItem[] {
    return [
      SwitchToDark.item({group: 'commands', title: 'Default dark'}),
      SwitchToLight.item({group: 'commands', title: 'Default light'}),
      SwitchToDarkDimmed.item({group: 'commands', title: 'Dark dimmed'}),
      SwitchToDarkHighContrast.item({group: 'commands', title: 'Dark high contrast'}),
      SwitchToAuto.item({group: 'commands', title: 'Sync with system settings'})
    ]
  }

  select(commandPalette: CommandPalette) {
    this.run(commandPalette)
  }
}

class SwitchToDark extends MainWindowGlobalCommand {
  title = 'Switch theme to default dark'
  icon = 'moon-color-fg-muted'
  mode: ColorModeWithAuto = 'dark'
  theme = 'dark'

  applyTheme() {
    this.loadStyles(this.theme)

    if (this.mode !== 'auto') {
      setClientTheme(this.theme, this.mode)
    }
    setClientMode(this.mode)
  }

  async run() {
    // Set color theme in browser immediately to provide instantaneous response.
    this.applyTheme()
    this.saveSettings(this.mode, this.lightTheme, this.darkTheme)
  }

  /**
   * Save color mode settings to server. If successful, the server settings are
   * applied to the browser to ensure what the user sees is matches the server.
   */
  async saveSettings(colorMode: ColorModeWithAuto = this.mode, lightTheme?: string, darkTheme?: string) {
    const csrfToken = document.querySelector<HTMLInputElement>('.js-color-mode-csrf')!.value
    const path = document.querySelector<HTMLInputElement>('.js-color-mode-path')!.value
    const formData = new FormData()

    formData.set('color_mode', colorMode)
    if (lightTheme) formData.set('light_theme', lightTheme)
    if (darkTheme) formData.set('dark_theme', darkTheme)

    const response = await fetch(path, {
      method: 'PUT',
      body: formData,
      mode: 'same-origin',
      headers: {
        'Scoped-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    const settings = (await response.json()) as {
      color_mode: ColorModeWithAuto
      light_theme: string
      dark_theme: string
    }

    // Load theme CSS
    this.loadStyles(settings.light_theme)
    this.loadStyles(settings.dark_theme)

    // Set theme CSS classes
    setClientTheme(settings.light_theme, 'light')
    setClientTheme(settings.dark_theme, 'dark')

    // Set color mode classes
    setClientMode(settings.color_mode)
  }

  loadStyles(theme: string) {
    const linkTag = document.querySelector<HTMLLinkElement>(`link[data-color-theme='${theme}']`)

    if (linkTag && !linkTag.hasAttribute('href') && linkTag.hasAttribute('data-href')) {
      linkTag.setAttribute('href', linkTag.getAttribute('data-href')!)
    }
  }

  get darkTheme(): string | undefined {
    if (this.mode === 'dark') {
      return this.theme
    } else {
      return getClientTheme('dark')!
    }
  }

  get lightTheme(): string | undefined {
    if (this.mode === 'light') {
      return this.theme
    } else {
      return getClientTheme('light')!
    }
  }
}

class SwitchToDarkHighContrast extends SwitchToDark {
  title = 'Switch theme to dark high contrast'
  theme = 'dark_high_contrast'
}

class SwitchToDarkDimmed extends SwitchToDark {
  title = 'Switch theme to dark dimmed'
  theme = 'dark_dimmed'
}

class SwitchToLight extends SwitchToDark {
  title = 'Switch theme to default light'
  icon = 'sun-color-fg-muted'
  mode: ColorModeWithAuto = 'light'
  theme = 'light'
}

class SwitchToAuto extends SwitchToDark {
  title = 'Switch theme settings to sync with system'
  icon = 'sun-color-fg-muted'
  mode: ColorModeWithAuto = 'auto'

  get darkTheme() {
    return undefined
  }

  get lightTheme() {
    return undefined
  }
}

class UpdateSubscription extends MainWindowCommand {
  constructor() {
    super()
    const isSubscribeCommand = this.isSubscribe()
    this.title = `${isSubscribeCommand ? 'Subscribe' : 'Unsubscribe'}`
    this.icon = `${isSubscribeCommand ? 'bell' : 'bell-slash'}-color-fg-muted`
  }

  isApplicable() {
    return this.fetchButton() instanceof HTMLButtonElement && this.fetchButton()?.disabled === false
  }

  isSubscribe() {
    return this.fetchButton()?.textContent?.trim() === 'Subscribe'
  }

  fetchButton() {
    return document.querySelector<HTMLButtonElement>('.thread-subscribe-button')
  }

  run() {
    this.fetchButton()?.click()
  }
}

export default [
  OpenInDotDev,
  SwitchToLight,
  SwitchToDark,
  SwitchToDarkDimmed,
  SwitchToDarkHighContrast,
  SwitchToAuto,
  UpdateSubscription
]
