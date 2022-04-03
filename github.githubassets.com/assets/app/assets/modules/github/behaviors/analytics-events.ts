import {on} from 'delegated-events'
import {sendEvent} from '../hydro-analytics'

const GENERIC_CLICK_EVENT_NAME = 'analytics.click'

on('click', '[data-analytics-event]', event => {
  const element = event.currentTarget

  const analyticsEvent = element.getAttribute('data-analytics-event')
  if (!analyticsEvent) return

  const analyticsEventAttributes = JSON.parse(analyticsEvent)

  sendEvent(GENERIC_CLICK_EVENT_NAME, analyticsEventAttributes)
})
