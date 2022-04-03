import {getItem, removeItem, setItem} from './session-storage'
import {requestUri} from './analytics-overrides'

const SOFT_NAV_FAIL = 'soft-navigation-fail'
const SOFT_NAV_REFERRER = 'soft-navigation-referrer'
const SOFT_NAV_MARK = 'soft-navigation-marker'

export function inSoftNavigation() {
  return getItem(SOFT_NAV_MARK) === '1'
}

export function hasSoftNavFailure() {
  return Boolean(getItem(SOFT_NAV_FAIL))
}

export function startSoftNav() {
  setItem(SOFT_NAV_MARK, '1')
  setItem(SOFT_NAV_REFERRER, requestUri() || window.location.href)
}

export function endSoftNav() {
  setItem(SOFT_NAV_MARK, '0')
}

function clearSoftNav() {
  setItem(SOFT_NAV_MARK, '0')
  removeItem(SOFT_NAV_REFERRER)
  removeItem(SOFT_NAV_FAIL)
}

export function setSoftNavFailReason(reason: string) {
  setItem(SOFT_NAV_FAIL, reason || 'reload')
}

export function getSoftNavFailReason() {
  return getItem(SOFT_NAV_FAIL)
}

let visitCount = 0
export function softNavSucceeded() {
  visitCount += 1
  document.dispatchEvent(new CustomEvent('soft-nav', {detail: visitCount}))
}

export function softNavFailed() {
  document.dispatchEvent(new CustomEvent('soft-nav:error', {detail: getItem(SOFT_NAV_FAIL) || 'reload'}))
  visitCount = 0
  clearSoftNav()
}

export function softNavInitial() {
  document.dispatchEvent(new CustomEvent('soft-nav:initial-load'))
  visitCount = 0
  clearSoftNav()
}

export function getSoftNavReferrer() {
  return getItem(SOFT_NAV_REFERRER) || document.referrer
}
