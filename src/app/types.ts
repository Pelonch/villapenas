export const pageIds = ['home', 'gallery', 'policies', 'contact'] as const

export type PageId = (typeof pageIds)[number]
