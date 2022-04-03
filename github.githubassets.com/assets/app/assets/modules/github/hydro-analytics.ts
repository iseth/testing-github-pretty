import {AnalyticsClient, getOptionsFromMeta} from '@github/hydro-analytics-client'
import type {Context} from '@github/hydro-analytics-client'

const dimensionPrefix = 'dimension_'
let hydroAnalyticsClient: AnalyticsClient | undefined

try {
  const options = getOptionsFromMeta('octolytics')

  // Remove the base context because meta tags can change as the user navigates with Turbo
  // These will be folded in for each event & page view
  delete options.baseContext

  hydroAnalyticsClient = new AnalyticsClient(options)
} catch (_) {
  // Failed to get options from meta tags.  This most likely means analytics are disabled.
}

function extendBaseContext(context?: Context) {
  const baseContext = getOptionsFromMeta('octolytics').baseContext || {}

  if (baseContext) {
    delete baseContext.app_id
    delete baseContext.event_url
    delete baseContext.host

    for (const key in baseContext) {
      // some octolytics meta tags are prefixed with dimension-, which we don't need with the new hydro-analytics-client
      if (key.startsWith(dimensionPrefix)) {
        baseContext[key.replace(dimensionPrefix, '')] = baseContext[key]
        delete baseContext[key]
      }
    }
  }

  const visitorMeta = document.querySelector<HTMLMetaElement>('meta[name=visitor-payload]')
  if (visitorMeta) {
    const visitorHash = JSON.parse(atob(visitorMeta.content))
    Object.assign(baseContext, visitorHash)
  }

  return Object.assign(baseContext, context)
}

export function sendPageView(context?: Context) {
  hydroAnalyticsClient?.sendPageView(extendBaseContext(context))
}

export function sendEvent(type: string, context: Record<string, string | number | boolean | undefined | null>) {
  const service = document.head?.querySelector<HTMLMetaElement>('meta[name="current-catalog-service"]')?.content

  const cleanContext: Context = service ? {service} : {}

  for (const [key, value] of Object.entries(context)) {
    if (value !== undefined && value !== null) {
      cleanContext[key] = `${value}`
    }
  }

  hydroAnalyticsClient?.sendEvent(type || 'unknown', extendBaseContext(cleanContext))
}
