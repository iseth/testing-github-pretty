import {loaded} from '../document-ready'
import {sendPageView} from '../hydro-analytics'
;(async function () {
  // PJAX should be treated like pageloads
  document.addEventListener('pjax:complete', () =>
    sendPageView({
      pjax: 'true'
    })
  )

  // Send a page view as soon as the page is loaded
  await loaded
  sendPageView()
})()
