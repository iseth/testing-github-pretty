import {getDocumentHtmlSafeNonces, verifyResponseHtmlSafeNonce} from './html-safe'
import {parseHTML} from './parse-html'

export async function fetchSafeDocumentFragment(
  document: Document,
  url: RequestInfo,
  options?: RequestInit
): Promise<DocumentFragment> {
  const request = new Request(url, options)
  request.headers.append('X-Requested-With', 'XMLHttpRequest')
  const response = await self.fetch(request)
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}${response.statusText || ''}`)
  }
  verifyResponseHtmlSafeNonce(getDocumentHtmlSafeNonces(document), response)
  return parseHTML(document, await response.text())
}

export function fetchPoll(url: RequestInfo, options?: RequestInit, timeBetweenRequests = 1000): Promise<Response> {
  return (async function poll(wait: number): Promise<Response> {
    const request = new Request(url, options)
    request.headers.append('X-Requested-With', 'XMLHttpRequest')
    const response = await self.fetch(request)
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status}${response.statusText || ''}`)
    }

    if (response.status === 200) return response
    if (response.status === 202) {
      await new Promise(resolve => setTimeout(resolve, wait))
      return poll(wait * 1.5)
    }
    throw new Error(`Unexpected ${response.status} response status from poll endpoint`)
  })(timeBetweenRequests)
}
