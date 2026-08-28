interface ApiConfig {
  baseUrl: string
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '')
  }

  if (import.meta.env.DEV) {
    return '/api'
  }

  return 'https://villa-penas-production.up.railway.app'
}

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
} as const satisfies ApiConfig
