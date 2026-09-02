import { mockInstagramPosts } from '../data/instagram.ts'
import type { InstagramPost } from '../types/instagram.ts'

// Replace this local adapter with the NestJS Instagram feed endpoint when available.
export function getInstagramPosts(
  signal?: AbortSignal,
): Promise<readonly InstagramPost[]> {
  if (signal?.aborted) {
    return Promise.reject(new DOMException('The Instagram request was aborted.', 'AbortError'))
  }

  return Promise.resolve(mockInstagramPosts.map((post) => ({ ...post })))
}
