import { apiConfig } from '../config/api.ts'
import type {
  InstagramFeedResponse,
  InstagramMediaChild,
  InstagramPost,
  InstagramPostWithPreview,
} from '../types/instagram.ts'

type JsonRecord = Record<string, unknown>

type InstagramMedia = Pick<
  InstagramPost,
  'mediaType' | 'mediaUrl' | 'thumbnailUrl'
>

interface SelectedInstagramPost {
  post: InstagramPost
  carouselChildIndex: number | null
}

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

function readStringField(
  record: JsonRecord,
  camelCaseKey: string,
  snakeCaseKey: string,
): string | null {
  return readString(record[camelCaseKey]) ?? readString(record[snakeCaseKey])
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isInstagramPermalink(value: string): boolean {
  try {
    const url = new URL(value)

    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      (url.hostname === 'instagram.com' || url.hostname.endsWith('.instagram.com'))
    )
  } catch {
    return false
  }
}

function readMediaUrl(value: unknown): string | null {
  const url = readNullableString(value)

  return url !== null && isHttpUrl(url) ? url : null
}

function readMediaUrlField(
  record: JsonRecord,
  camelCaseKey: string,
  snakeCaseKey: string,
): string | null {
  return readMediaUrl(record[camelCaseKey]) ?? readMediaUrl(record[snakeCaseKey])
}

function parseInstagramMediaChild(value: unknown): InstagramMediaChild | null {
  if (!isRecord(value)) {
    return null
  }

  const mediaType = readStringField(value, 'mediaType', 'media_type')

  if (mediaType === null) {
    return null
  }

  return {
    id: readString(value.id),
    mediaType,
    mediaUrl: readMediaUrlField(value, 'mediaUrl', 'media_url'),
    thumbnailUrl: readMediaUrlField(value, 'thumbnailUrl', 'thumbnail_url'),
  }
}

function readInstagramMediaChildren(value: unknown): readonly InstagramMediaChild[] {
  const childValues =
    Array.isArray(value)
      ? value
      : isRecord(value) && Array.isArray(value.data)
        ? value.data
        : []

  return childValues.flatMap((childValue) => {
    const child = parseInstagramMediaChild(childValue)

    return child === null ? [] : [child]
  })
}

function parseInstagramPost(value: unknown): InstagramPost | null {
  if (!isRecord(value)) {
    return null
  }

  const id = readString(value.id)
  const mediaType = readStringField(value, 'mediaType', 'media_type')
  const permalink = readString(value.permalink)
  const timestamp = readString(value.timestamp)

  if (
    id === null ||
    mediaType === null ||
    permalink === null ||
    !isInstagramPermalink(permalink) ||
    timestamp === null
  ) {
    return null
  }

  return {
    id,
    caption: readNullableString(value.caption),
    mediaType,
    mediaUrl: readMediaUrlField(value, 'mediaUrl', 'media_url'),
    thumbnailUrl: readMediaUrlField(value, 'thumbnailUrl', 'thumbnail_url'),
    permalink,
    timestamp,
    children: readInstagramMediaChildren(value.children),
  }
}

function isClearlyImageUrl(value: string): boolean {
  try {
    return /\.(?:avif|gif|jpe?g|png|webp)$/i.test(new URL(value).pathname)
  } catch {
    return false
  }
}

function getPosterUrl(media: InstagramMedia): string | null {
  if (media.thumbnailUrl !== null) {
    return media.thumbnailUrl
  }

  if (media.mediaUrl === null || media.mediaType === 'VIDEO') {
    return null
  }

  return media.mediaUrl
}

function getVideoUrl(media: InstagramMedia): string | null {
  if (
    media.mediaType !== 'VIDEO' ||
    media.mediaUrl === null ||
    isClearlyImageUrl(media.mediaUrl)
  ) {
    return null
  }

  return media.mediaUrl
}

function getCarouselChild(
  post: InstagramPost,
  carouselChildIndex: number | null,
): InstagramMediaChild | null {
  if (carouselChildIndex !== null) {
    return post.children[carouselChildIndex - 1] ?? null
  }

  if (post.mediaUrl === null) {
    return null
  }

  return (
    post.children.find(
      (child) =>
        child.mediaUrl === post.mediaUrl || child.thumbnailUrl === post.mediaUrl,
    ) ?? null
  )
}

function resolvePostPreview(
  post: InstagramPost,
  carouselChildIndex: number | null,
): Pick<InstagramPostWithPreview, 'previewUrl' | 'videoUrl'> | null {
  if (post.mediaType !== 'CAROUSEL_ALBUM') {
    const previewUrl = getPosterUrl(post)

    return previewUrl === null
      ? null
      : { previewUrl, videoUrl: getVideoUrl(post) }
  }

  const child = getCarouselChild(post, carouselChildIndex)
  const previewUrl = child === null ? getPosterUrl(post) : getPosterUrl(child) ?? getPosterUrl(post)

  if (previewUrl === null) {
    return null
  }

  return { previewUrl, videoUrl: child === null ? null : getVideoUrl(child) }
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

function getCarouselChildIndex(permalink: string): number | null {
  try {
    const value = new URL(permalink).searchParams.get('img_index')
    const index = value === null ? Number.NaN : Number(value)

    return Number.isInteger(index) && index > 0 ? index : null
  } catch {
    return null
  }
}

function selectInstagramPosts(
  posts: readonly InstagramPost[],
): readonly SelectedInstagramPost[] {
  const postsByShortcode = new Map<string, InstagramPost>()

  for (const post of posts) {
    const shortcode = getInstagramPostShortcode(post.permalink)

    if (shortcode !== null && !postsByShortcode.has(shortcode)) {
      postsByShortcode.set(shortcode, post)
    }
  }

  return selectedInstagramPermalinks.flatMap((permalink) => {
    const shortcode = getInstagramPostShortcode(permalink)
    const post = shortcode === null ? undefined : postsByShortcode.get(shortcode)

    return post
      ? [{ post, carouselChildIndex: getCarouselChildIndex(permalink) }]
      : []
  })
}

function parseInstagramFeedResponse(value: unknown): readonly InstagramPostWithPreview[] {
  if (!isRecord(value) || !Array.isArray(value.data)) {
    throw new Error('Invalid Instagram response.')
  }

  const parsedPosts: InstagramPost[] = []

  for (const postValue of value.data) {
    const post = parseInstagramPost(postValue)

    if (post === null) {
      throw new Error('Invalid Instagram post in response.')
    }

    parsedPosts.push(post)
  }

  const response: InstagramFeedResponse = { data: parsedPosts }
  const posts: InstagramPostWithPreview[] = []

  for (const { post, carouselChildIndex } of selectInstagramPosts(response.data)) {
    const preview = resolvePostPreview(post, carouselChildIndex)

    if (preview !== null) {
      posts.push({ ...post, ...preview })
    }
  }

  return posts
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
