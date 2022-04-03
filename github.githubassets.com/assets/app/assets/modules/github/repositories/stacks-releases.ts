import {observe} from 'selector-observer'
import {on} from 'delegated-events'

// new tags do not have anything and are dependent on the target
let lastDefiniteInput: HTMLInputElement

// whether a ref or oid
let lastDefiniteInputType: string

export async function validateStack(targetElement: Element) {
  const urlStr = document.querySelector<HTMLDivElement>('.js-release-stack')!.getAttribute('data-stack-url')!
  const url = new URL(urlStr, window.location.origin)
  let result

  // set to loading
  updateStackChecks({target_found: true, template_found: true, loading: true}, 'tag')

  switch (targetElement.id) {
    case 'tag-list': {
      // get the tag selected
      const tagInputElement = targetElement.querySelector<HTMLInputElement>('input[name="release[tag_name]"]:checked')!

      if (!tagInputElement) return

      // get result for the tag
      result = await getStackStatus(url, 'ref', tagInputElement)

      // if this is a new tag, set status based on the what's selected in the target
      if (!result.target_found && !!lastDefiniteInput) {
        result = await getStackStatus(url, lastDefiniteInputType, lastDefiniteInput)
      }

      // set result either from the valid ref or last checked target
      updateStackChecks(result, 'tag')

      break
    }
    case 'filter-list-branches': {
      // get the branch selected
      // the first validate defaults to this since the default branch element in the form is checked on load
      const branchNameElement = targetElement.querySelector<HTMLInputElement>(
        'input[name="release[target_commitish]"]:checked'
      )!

      if (!branchNameElement) return

      // a branch definitely has a tree associated
      lastDefiniteInput = branchNameElement
      lastDefiniteInputType = 'ref'

      // get the result from controller
      result = await getStackStatus(url, 'ref', branchNameElement)

      // update based result
      updateStackChecks(result, 'branch')

      break
    }
    case 'filter-list-tags': {
      // get commit selected
      const commitInputElement = targetElement.querySelector<HTMLInputElement>(
        'input[name="release[target_commitish]"]:checked'
      )!

      if (!commitInputElement) return

      // a commit definitely has a tree associated
      lastDefiniteInput = commitInputElement
      lastDefiniteInputType = 'oid'

      // similar to branch ^
      result = await getStackStatus(url, 'oid', commitInputElement)
      updateStackChecks(result, 'commit')

      break
    }
  }
}

// a cache to store results of an input to be used if that input is selected again
const previouslyChecked = new WeakMap()

async function getStackStatus(url: URL, targetKey: string, target: HTMLInputElement) {
  // return from map if result already is fetched
  if (previouslyChecked.has(target)) return previouslyChecked.get(target)

  const params = new URLSearchParams(url.search.slice(1))
  params.append(targetKey, target.value)
  url.search = params.toString()

  const response = await fetch(url.toString(), {
    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
  })

  // say target not found by default
  let result = {target_found: false}
  if (response.ok) {
    // if target found then set target_found to true
    result = await response.json()
    result['target_found'] = true
  }

  // store the result for this input
  previouslyChecked.set(target, result)
  return result
}

export const successMessages = {
  branding: 'Icon and color found in stack template.',
  template: 'Contains all the required information.',
  readme: 'File exists.'
}

export type StackResult = {
  target_found: boolean
  loading?: boolean
  template_found?: boolean
  template?: string | null
  readme?: string | null
  branding?: string | null
  template_path?: string | null
  readme_path?: string | null
  branding_path?: string | null
}

export type StackRow = 'template' | 'readme' | 'branding'
type StackRowPath = 'template_path' | 'readme_path' | 'branding_path'

function updateStackChecks(result: StackResult, type: string) {
  // do nothing if target not found, this is useful in case of a new tag
  // when the lastDefiniteInput is used to set the result
  if (!result.target_found) return

  const banner: HTMLDivElement = document.querySelector('.js-releases-marketplace-banner-container')!
  const bannerHeading: HTMLHeadingElement = document.querySelector('.js-releases-marketplace-publish-heading')!
  const createReleaseButton: HTMLButtonElement = document.querySelector('.js-publish-release')!

  let disableRelease = false

  // hide the banner and heading if a stack template doesnt exist to the associated target
  createReleaseButton.disabled = bannerHeading.hidden = banner.hidden = !result.template_found

  // return since no updates needed
  if (!result.template_found) return

  // iterate through each of the rows
  const rowNames: StackRow[] = ['branding', 'template', 'readme']
  for (const rowName of rowNames) {
    let rowStatus: string

    // interpret the status based on result
    // it can be loading, success or failure
    // loading is explicitly set in the validateStack function before fetching the results
    // failure or success is interpreted based on whether an error is return for the corresponding row by controller
    if (result.loading) {
      rowStatus = 'loading'
    } else {
      rowStatus = result[rowName] ? 'failure' : 'success'
    }

    if (rowStatus === 'failure') {
      disableRelease = true
    }

    // get the row element
    const row: HTMLDivElement = banner.querySelector(`#${rowName}-row`)!

    // make the corresponding icon hidden based on state interpreted
    for (const icon of row.querySelectorAll<HTMLDivElement>('.status-icon')) {
      icon.hidden = !(icon.getAttribute('data-state') === rowStatus)
    }

    const rowMessage: HTMLDivElement = row.querySelector<HTMLDivElement>('.js-status-text')!

    // remove all colors of text
    for (const textClass of ['color-fg-attention', 'color-fg-danger', 'color-fg-muted']) {
      rowMessage.classList.remove(textClass)
    }

    // set color message based on status
    switch (rowStatus) {
      case 'success':
        // use row default from successMessages to set the success message
        rowMessage.textContent = successMessages[rowName]
        rowMessage.classList.add('color-fg-muted')
        break
      case 'failure':
        // use error returned from controller
        rowMessage.textContent = result[rowName]!
        rowMessage.classList.add('color-fg-danger')
        break
      case 'loading':
        // same for all rows
        rowMessage.textContent = 'Loading...'
        rowMessage.classList.add('color-fg-attention')
    }

    // update the edit/add button
    for (const button of row.querySelectorAll<HTMLAnchorElement>('.js-modify-button')) {
      // get and set the href irrespetive of branch or not
      const rowPathKey: StackRowPath = `${rowName}_path`
      button.setAttribute('href', result[rowPathKey]!)

      // make it visible only in non loading case of branches since tags/commits aren't editable
      if (type === 'branch' && rowStatus !== 'loading')
        // make the right button visible based on status similar to icon
        button.hidden = !(button.getAttribute('data-state') === rowStatus)
      else button.hidden = true
    }
  }

  createReleaseButton.disabled = disableRelease
}

on('change', '.js-release-stack #filter-list-branches', event => validateStack(event.currentTarget))
on('change', '.js-release-stack #filter-list-tags', event => validateStack(event.currentTarget))
on('change', '.js-release-stack #tag-list', event => validateStack(event.currentTarget))

// trigger on load
observe('.js-release-stack #filter-list-branches', function (element) {
  validateStack(element)
})
