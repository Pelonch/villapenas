import { useEffect, useState } from 'react'
import { getRoute, type BrowserLocation, type Route } from './routes.ts'

interface CurrentRoute {
  location: BrowserLocation
  route: Route
}

function readBrowserLocation(): BrowserLocation {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

export function useCurrentRoute(): CurrentRoute {
  const [location, setLocation] = useState<BrowserLocation>(readBrowserLocation)
  const route = getRoute(location.pathname)

  useEffect(() => {
    const updateLocation = () => setLocation(readBrowserLocation())

    window.addEventListener('popstate', updateLocation)
    window.addEventListener('hashchange', updateLocation)

    return () => {
      window.removeEventListener('popstate', updateLocation)
      window.removeEventListener('hashchange', updateLocation)
    }
  }, [])

  return { location, route }
}
