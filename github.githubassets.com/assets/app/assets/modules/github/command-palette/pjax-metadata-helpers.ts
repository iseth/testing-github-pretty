import {CommandPalettePjaxMetadataElement} from '../../../../components/command_palette/command-palette-pjax-metadata-element'

export function getPjaxMetadataElement(): CommandPalettePjaxMetadataElement | null {
  return document.querySelector<CommandPalettePjaxMetadataElement>('.js-command-palette-pjax-metadata')
}
