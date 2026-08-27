import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getLocalizedPath, getRoute } from './app/routes.ts'
import './index.css'
import App from './App.tsx'

const initialRoute = getRoute(window.location.pathname)

if (initialRoute.isRoot) {
  const defaultPath = getLocalizedPath(initialRoute.locale, initialRoute.page)
  window.history.replaceState(
    null,
    '',
    `${defaultPath}${window.location.search}${window.location.hash}`,
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('The application root element was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
