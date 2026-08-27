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
  travelTimes: readonly TravelTime[]
}

export const locationConfig = {
  travelTimes: [
    { id: 'santaCruz', minutes: 10 },
    { id: 'tamarindo', minutes: 30 },
    { id: 'haciendaPinilla', minutes: 30 },
    { id: 'avellanasBeach', minutes: 35 },
    { id: 'guanacasteAirport', minutes: 45 },
  ],
} as const satisfies LocationConfig
