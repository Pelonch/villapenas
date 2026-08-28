export type SocialMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL'

export type SocialItemLayout =
  | 'feature'
  | 'standard'
  | 'tall'
  | 'wide'
  | 'wideLeft'
  | 'wideRight'

export interface SocialMediaItem {
  id: string
  mediaType: SocialMediaType
  mediaUrl: string
  thumbnailUrl?: string
  permalink?: string
  caption?: string
  alt?: string
  featured?: boolean
  order: number
  layout: SocialItemLayout
}
