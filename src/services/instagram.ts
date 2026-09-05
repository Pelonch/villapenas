import { apiConfig } from '../config/api.ts'
import type {
  InstagramFeedResponse,
  InstagramPost,
  InstagramPostWithPreview,
} from '../types/instagram.ts'

type JsonRecord = Record<string, unknown>

const selectedInstagramPermalinks = [
  'https://www.instagram.com/p/Dcv6g81RYdb/',
  'https://www.instagram.com/p/DcRM3n-Rflw/',
  'https://www.instagram.com/p/DcKNlIxGLds/?img_index=1',
  'https://www.instagram.com/p/DbLmDs5Rc4Z/',
  'https://www.instagram.com/p/DbhSDVkMMtU/',
  'https://www.instagram.com/p/DaalzXSkXZH/?img_index=2',
] as const

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null
}

function readNullableString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function readMediaUrl(value: unknown): string | null {
  const url = readNullableString(value)

  return url !== null && isHttpUrl(url) ? url : null
}

function parseInstagramPost(value: unknown): InstagramPost | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readString(value.id)
  const mediaType = readString(value.mediaType)
  const permalink = readString(value.permalink)
  const timestamp = readString(value.timestamp)

  if (
    id === null ||
    mediaType === null ||
    permalink === null ||
    !isHttpUrl(permalink) ||
    timestamp === null
  ) {
    return null
  }

  return {
    id,
    caption: readNullableString(value.caption),
    mediaType,
    mediaUrl: readMediaUrl(value.mediaUrl),
    thumbnailUrl: readMediaUrl(value.thumbnailUrl),
    permalink,
    timestamp,
  }
}

function getPreviewUrl(post: InstagramPost): string | null {
  return post.mediaType === 'VIDEO'
    ? post.thumbnailUrl ?? post.mediaUrl
    : post.mediaUrl
}

function getInstagramPostShortcode(permalink: string): string | null {
  try {
    const url = new URL(permalink)
    const pathSegments = url.pathname.split('/').filter(Boolean)

    return pathSegments.length >= 2 ? pathSegments.at(-1) ?? null : null
  } catch {
    return null
  }
}

function selectInstagramPosts(
  posts: readonly InstagramPostWithPreview[],
): readonly InstagramPostWithPreview[] {
  const postsByShortcode = new Map<string, InstagramPostWithPreview>()

  for (const post of posts) {
    const shortcode = getInstagramPostShortcode(post.permalink)

    if (shortcode !== null && !postsByShortcode.has(shortcode)) {
      postsByShortcode.set(shortcode, post)
    }
  }

  return selectedInstagramPermalinks.flatMap((permalink) => {
    const shortcode = getInstagramPostShortcode(permalink)
    const post = shortcode === null ? undefined : postsByShortcode.get(shortcode)

    return post ? [post] : []
  })
}

function parseInstagramFeedResponse(value: unknown): readonly InstagramPostWithPreview[] {
  if (!isRecord(value) || !Array.isArray(value.data)) {
    throw new Error('Invalid Instagram response.')
  }

  const parsedPosts: InstagramPost[] = []
  const posts: InstagramPostWithPreview[] = []

  for (const postValue of value.data) {
    const post = parseInstagramPost(postValue)

    if (post === null) {
      throw new Error('Invalid Instagram post in response.')
    }

    parsedPosts.push(post)
  }

  const response: InstagramFeedResponse = { data: parsedPosts }

  for (const post of response.data) {
    const previewUrl = getPreviewUrl(post)

    if (previewUrl !== null) {
      posts.push({ ...post, previewUrl })
    }
  }

  return selectInstagramPosts(posts)
}

export async function getInstagramPosts(
  signal?: AbortSignal,
): Promise<readonly InstagramPostWithPreview[]> {
  const url = apiConfig.getUrl('public/instagram')
  const request: RequestInit = { headers: { Accept: 'application/json' } }

  if (signal) {
    request.signal = signal
  }

  const response = await fetch(url, request)

  if (!response.ok) {
    throw new Error('Unable to load Instagram posts.')
  }

  return parseInstagramFeedResponse(await response.json())
}
