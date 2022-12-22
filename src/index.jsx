import 'utils/disable-speedy'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'

import 'service-worker-registration'
import 'styles'
import pagesManifest from 'pages-manifest.json'
import App from './App'

const root = document.getElementById('root')

root.style.display = 'none'

new MutationObserver((_, observer) => {
  if (document.getElementsByTagName('h1').length) {
    root.style.display = 'block'
    observer.disconnect()
  }
}).observe(root, { childList: true, subtree: true })

createRoot(root).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </BrowserRouter>
)

const events = ['mousedown', 'keydown']
let userInteracted = false

events.forEach(event => addEventListener(event, () => (userInteracted = true), { once: true }))

const reloadIfPossible = () => {
  if (userInteracted || document.visibilityState === 'visible') return

  let { pathname } = window.location

  if (pathname !== '/') pathname = pathname.replace(/\/$/, '')

  const reloadAllowed = !!pagesManifest.find(
    ({ path, preventReload }) => !preventReload && isStructureEqual(pathname, path)
  )

  if (reloadAllowed) window.location.reload()
}

navigator.serviceWorker.addEventListener('message', ({ data }) => {
  if (data.type === 'update-available') {
    reloadIfPossible()

    window.addEventListener('visibilitychange', reloadIfPossible)
  } else if (data.type === 'periodic-sync-update-occured') localStorage.setItem('syncTime', data.syncTime)
})
