export interface InstagramPost {
  id: string
  caption: string | null
  mediaType: string
  mediaUrl: string | null
  thumbnailUrl: string | null
  permalink: string
  timestamp: string
}

export interface InstagramFeedResponse {
  data: readonly InstagramPost[]
}

export interface InstagramPostWithPreview extends InstagramPost {
  previewUrl: string
}
