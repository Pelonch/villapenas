import { RouteView } from './app/RouteView.tsx'
import { useCurrentRoute } from './app/useCurrentRoute.ts'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import { usePageMetadata } from './app/metadata.ts'

function App() {
  const { location, route } = useCurrentRoute()

  usePageMetadata(route)

  return (
    <div>
      <SiteHeader location={location} route={route} />
      <main>
        <RouteView route={route} />
      </main>
    </div>
  )
}

export default App
