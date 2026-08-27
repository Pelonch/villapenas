export const travelTimeIds = [
  'santaCruz',
  'tamarindo',
  'haciendaPinilla',
  'avellanasBeach',
  'guanacasteAirport',
] as const

export type TravelTimeId = (typeof travelTimeIds)[number]

interface TravelTime {
  id: TravelTimeId
  minutes: number
}

interface LocationConfig {
  googleMapsEmbedUrl: string | null
  travelTimes: readonly TravelTime[]
}

// Replace with Google's explicit Share > Embed a map URL once it is provided.
const googleMapsEmbedUrl: string | null = null

export const locationConfig = {
  googleMapsEmbedUrl,
  travelTimes: [
    { id: 'santaCruz', minutes: 10 },
    { id: 'tamarindo', minutes: 30 },
    { id: 'haciendaPinilla', minutes: 30 },
    { id: 'avellanasBeach', minutes: 35 },
    { id: 'guanacasteAirport', minutes: 45 },
  ],
} as const satisfies LocationConfig
