interface ApiConfig {
  baseUrl: string
  getUrl: (path: string) => URL
}

function normalizeApiBaseUrl(value: string): string {
  const url = new URL(value, window.location.origin)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('VITE_API_BASE_URL must use http or https.')
  }

  if (url.search || url.hash) {
    throw new Error('VITE_API_BASE_URL must not include a query string or hash.')
  }

  return url.href.replace(/\/+$/, '')
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (configuredUrl) {
    return normalizeApiBaseUrl(configuredUrl)
  }

  if (import.meta.env.DEV) {
    return normalizeApiBaseUrl('/api')
  }

  // The existing deployed API is an intentional public production fallback.
  return normalizeApiBaseUrl('https://villa-penas-production.up.railway.app')
}

function getApiUrl(path: string): URL {
  return new URL(path.replace(/^\/+/, ''), `${apiConfig.baseUrl}/`)
}

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  getUrl: getApiUrl,
} as const satisfies ApiConfig
