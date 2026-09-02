export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'

export interface InstagramPost {
  id: string
  mediaType: InstagramMediaType
  mediaUrl: string
  thumbnailUrl?: string
  permalink?: string
  caption?: string
  timestamp?: string
}

export interface InstagramFeedResponse {
  posts: readonly InstagramPost[]
}
