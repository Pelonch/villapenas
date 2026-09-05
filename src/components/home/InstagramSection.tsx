import { socialConfig } from '../../config/social.ts'
import { provisionalVenueImageSrc } from '../../config/images.ts'
import { useInstagramPosts } from '../../hooks/useInstagramPosts.ts'
import type { InstagramContent } from '../../i18n/types.ts'
import type { InstagramPostWithPreview } from '../../types/instagram.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { ImageWithFallback } from '../ui/ImageWithFallback.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface InstagramSectionProps {
  content: InstagramContent
}

interface InstagramPostTileProps {
  content: InstagramContent
  post: InstagramPostWithPreview
  layoutClassName?: string
}

const desktopLayoutClasses = [
  'lg:order-1 lg:col-span-5 lg:row-span-5',
  'lg:order-2 lg:col-span-4 lg:row-span-3',
  'lg:order-4 lg:col-span-4 lg:row-span-2',
  'lg:order-3 lg:col-span-3 lg:row-span-5',
  'lg:order-5 lg:col-span-6 lg:row-span-3',
  'lg:order-6 lg:col-span-6 lg:row-span-3',
] as const

function ExternalArrowIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function MediaIndicator({
  label,
  mediaType,
}: {
  label: string
  mediaType: 'VIDEO' | 'CAROUSEL_ALBUM'
}) {
  const icon =
    mediaType === 'VIDEO' ? (
      <svg className="size-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="m3 1 7 5-7 5V1Z" />
      </svg>
    ) : (
      <svg className="size-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 5v8h8" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    )

  return (
    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 border border-paper/30 bg-ink/55 px-1.5 py-1 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-paper/90 backdrop-blur-sm">
      {icon}
      {label}
    </span>
  )
}

function isValidPermalink(permalink: string | undefined): permalink is string {
  if (!permalink) {
    return false
  }

  try {
    const url = new URL(permalink)

    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function InstagramPostTile({
  content,
  post,
  layoutClassName = '',
}: InstagramPostTileProps) {
  const caption = post.caption
  const accessibleLabel =
    caption !== null && caption.length > 0 && caption.length <= 160
      ? caption
      : content.postAlt
  const isInteractive = isValidPermalink(post.permalink)
  const imagePositionClassName = post.permalink.includes('/DaalzXSkXZH')
    ? 'object-[50%_60%]'
    : ''
  const className = `group relative block h-full overflow-hidden bg-moss ${layoutClassName}`
  const mediaIndicator =
    post.mediaType === 'VIDEO'
      ? <MediaIndicator label={content.videoLabel} mediaType="VIDEO" />
      : post.mediaType === 'CAROUSEL_ALBUM'
        ? <MediaIndicator label={content.carouselLabel} mediaType="CAROUSEL_ALBUM" />
        : null
  const tileContent = (
    <>
      <ImageWithFallback
        className={`size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:transition-none ${imagePositionClassName}`}
        src={post.previewUrl}
        fallbackSrc={provisionalVenueImageSrc}
        alt={accessibleLabel}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      {caption ? (
        <span className="line-clamp-3 absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/75 to-transparent px-4 pb-4 pt-12 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 motion-reduce:transition-none">
          {caption}
        </span>
      ) : null}
      {mediaIndicator}
      {isInteractive ? (
        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-center opacity-0 transition-all duration-300 group-hover:bg-ink/35 group-hover:opacity-100 group-focus-visible:bg-ink/35 group-focus-visible:opacity-100 motion-reduce:transition-none">
          <span className="inline-flex items-center gap-2 border border-paper/60 px-4 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper">
            {content.viewOnInstagram}
            <ExternalArrowIcon />
          </span>
        </span>
      ) : null}
    </>
  )

  if (isInteractive) {
    return (
      <a
        className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold`}
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.openPost(accessibleLabel)}
      >
        {tileContent}
      </a>
    )
  }

  return <div className={className}>{tileContent}</div>
}

function InstagramGallerySkeleton({ content }: Pick<InstagramSectionProps, 'content'>) {
  return (
    <div
      className="vp-instagram-scroll -mr-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-5 pb-4 sm:-mr-8 sm:mt-16 sm:pr-8 md:mr-0 md:mt-16 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:p-0 lg:mt-12 lg:grid-cols-12 lg:auto-rows-[clamp(3.25rem,5vw,5rem)] lg:gap-5"
      role="status"
    >
      <span className="sr-only">{content.loading}</span>
      {desktopLayoutClasses.map((layoutClassName, index) => (
        <div
          key={layoutClassName}
          className={`w-[80vw] max-w-[32rem] shrink-0 snap-start aspect-[4/5] animate-pulse md:w-auto md:max-w-none md:shrink lg:aspect-auto ${index % 2 === 0 ? 'bg-paper/10' : 'bg-paper/15'} ${layoutClassName}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function InstagramGallery({
  content,
  posts,
}: Pick<InstagramSectionProps, 'content'> & {
  posts: readonly InstagramPostWithPreview[]
}) {
  return (
    <>
      <div
        className="vp-instagram-scroll -mr-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-5 pb-4 sm:-mr-8 sm:mt-16 sm:pr-8 md:hidden"
        role="region"
        aria-label={content.heading}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-[80vw] max-w-[32rem] shrink-0 snap-start aspect-[4/5]"
          >
            <InstagramPostTile content={content} post={post} />
          </div>
        ))}
      </div>

      <div className="mt-16 hidden grid-cols-2 gap-4 md:grid lg:hidden">
        {posts.map((post) => (
          <div key={post.id} className="aspect-[4/5]">
            <InstagramPostTile content={content} post={post} />
          </div>
        ))}
      </div>

      <div className="mt-16 hidden grid-cols-12 auto-rows-[clamp(3.25rem,5vw,5rem)] gap-5 lg:mt-12 lg:grid">
        {posts.map((post, index) => (
          <InstagramPostTile
            key={post.id}
            content={content}
            post={post}
            layoutClassName={desktopLayoutClasses[index] ?? 'lg:col-span-4 lg:row-span-4'}
          />
        ))}
      </div>
    </>
  )
}

export function InstagramSection({ content }: InstagramSectionProps) {
  const { retry, state } = useInstagramPosts()
  const titleId = 'instagram-title'
  const hasPosts = state.status === 'success' && state.posts.length > 0

  return (
    <section
      id="instagram"
      className="scroll-mt-24 bg-olive py-24 text-paper sm:py-32 lg:py-32"
      aria-labelledby={titleId}
      aria-busy={state.status === 'loading' || undefined}
    >
      <Container className="lg:max-w-[96rem] lg:px-12">
        <SectionHeading
          eyebrow={`04 / ${content.eyebrow}`}
          id={titleId}
          title={content.heading}
          description={content.description}
          tone="light"
        />

        {state.status === 'loading' ? <InstagramGallerySkeleton content={content} /> : null}
        {hasPosts ? <InstagramGallery content={content} posts={state.posts} /> : null}
        {state.status === 'success' && state.posts.length === 0 ? (
          <p className="mt-12 max-w-xl border-l border-gold/70 pl-4 text-base leading-8 text-paper/75" role="status">
            {content.empty}
          </p>
        ) : null}
        {state.status === 'error' ? (
          <div className="mt-12 border-l border-gold/70 pl-4" role="status">
            <p className="max-w-xl text-base leading-8 text-paper/75">{content.error}</p>
            <button
              className="mt-5 min-h-11 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold-light underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
              type="button"
              onClick={retry}
            >
              {content.retry}
            </button>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-6 border-t border-paper/20 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl tracking-[-0.025em] text-paper">
            {socialConfig.instagram.handle}
          </p>
          <Button
            href={socialConfig.instagram.profileUrl}
            variant="secondary"
            className="gap-2 self-start sm:self-auto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.profileCtaNewTab}
          >
            <InstagramIcon />
            <span>{content.profileCta}</span>
            <ExternalArrowIcon />
          </Button>
        </div>
      </Container>
    </section>
  )
}
