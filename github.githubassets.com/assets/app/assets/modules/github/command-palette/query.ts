import {CommandPaletteScopeElement, Scope} from './command-palette-scope-element'
import {Query as QueryAPI} from '@github/command-palette-api'

interface QueryOptions {
  scope?: Scope
  subjectId?: string
  subjectType?: string
  returnTo?: string
}
export class Query implements QueryAPI {
  scope: Scope
  subjectId?: string
  subjectType?: string
  returnTo?: string
  queryText: string
  queryMode: string

  constructor(text: string, mode: string, {scope, subjectId, subjectType, returnTo}: QueryOptions = {}) {
    this.queryText = text
    this.queryMode = mode
    this.scope = scope ?? CommandPaletteScopeElement.emptyScope
    this.subjectId = subjectId
    this.subjectType = subjectType
    this.returnTo = returnTo
  }

  get text() {
    return this.queryText
  }

  get mode() {
    return this.queryMode
  }

  get path() {
    return this.buildPath(this)
  }

  buildPath(query: Query, queryText: string = query.text) {
    return `scope:${query.scope.type}-${query.scope.id}/mode:${query.mode}/query:${queryText}`
  }

  clearScope() {
    this.scope = CommandPaletteScopeElement.emptyScope
  }

  hasScope() {
    return this.scope.id !== CommandPaletteScopeElement.emptyScope.id
  }

  isBlank() {
    return this.text.trim().length === 0
  }

  isPresent() {
    return !this.isBlank()
  }

  immutableCopy() {
    const text = this.text
    const mode = this.mode
    const scope = {...this.scope}

    return new Query(text, mode, {
      scope,
      subjectId: this.subjectId,
      subjectType: this.subjectType,
      returnTo: this.returnTo
    })
  }

  hasSameScope(query: Query) {
    return this.scope.id === query.scope.id
  }

  params() {
    const params = new URLSearchParams()

    if (this.isPresent()) {
      params.set('q', this.text)
    }

    if (this.hasScope()) {
      params.set('scope', this.scope.id)
    }

    if (this.mode) {
      params.set('mode', this.mode)
    }

    if (this.returnTo) {
      params.set('return_to', this.returnTo)
    }

    if (this.subjectId) {
      params.set('subject', this.subjectId)
    }

    return params
  }
}
