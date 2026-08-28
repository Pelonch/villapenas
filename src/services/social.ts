import { curatedSocialMediaItems } from '../config/social.ts'
import type { SocialMediaItem } from '../types/social.ts'

// Replace this local adapter when GET /public/instagram is available.
export function getSocialMediaItems(): readonly SocialMediaItem[] {
  return [...curatedSocialMediaItems].sort((first, second) => first.order - second.order)
}
