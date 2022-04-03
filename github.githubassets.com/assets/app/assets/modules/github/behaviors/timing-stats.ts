import {getCLS, getFCP, getFID, getLCP, getTTFB} from 'web-vitals'
import type {Metric} from 'web-vitals'
import {loaded} from '../document-ready'
import {sendStats} from '../stats'

function sendVitals(metric: Metric) {
  const {name, value} = metric
  const stat: PlatformBrowserPerformanceWebVitalTiming = {name: window.location.href}
  switch (name) {
    case 'CLS':
      stat.cls = value
      break
    case 'FCP':
      stat.fcp = value
      break
    case 'FID':
      stat.fid = value
      break
    case 'LCP':
      stat.lcp = value
      break
    case 'TTFB':
      stat.ttfb = value
      break
  }
  sendStats({webVitalTimings: [stat]})

  updateStaffBar(name, value)
}

function updateStaffBar(name: string, value: number) {
  const staffBarContainer = document.querySelector('#staff-bar-web-vitals')
  const metricContainer = staffBarContainer?.querySelector(`[data-metric=${name.toLowerCase()}]`)

  if (!metricContainer) {
    return
  }

  metricContainer.textContent = value.toPrecision(6)
}

function isTimingSuppported(): boolean {
  return !!(window.performance && window.performance.timing && window.performance.getEntriesByType)
}

async function sendTimingResults() {
  if (!isTimingSuppported()) return

  await loaded
  await new Promise(resolve => setTimeout(resolve))

  const resourceTimings = window.performance.getEntriesByType('resource')
  if (resourceTimings.length) {
    sendStats({resourceTimings})
  }

  const navigationTimings = window.performance.getEntriesByType('navigation')
  if (navigationTimings.length) {
    sendStats({navigationTimings})
  }
}

sendTimingResults()
getCLS(sendVitals)
getFCP(sendVitals)
getFID(sendVitals)
getLCP(sendVitals)
getTTFB(sendVitals)
