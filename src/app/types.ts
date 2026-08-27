export const pageIds = ['home', 'policies', 'contact'] as const

export type PageId = (typeof pageIds)[number]
