import { socialConfig } from '../../config/social.ts'
import type { InstagramContent } from '../../i18n/types.ts'
import type { SocialItemLayout, SocialMediaItem } from '../../types/social.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface MomentsSectionProps {
  content: InstagramContent
  items: readonly SocialMediaItem[]
}

interface MomentTileProps {
  content: InstagramContent
  item: SocialMediaItem
  layout?: SocialItemLayout
}

const desktopLayoutClasses: Record<SocialItemLayout, string> = {
  feature: 'lg:col-span-5 lg:row-span-4',
  standard: 'lg:col-span-3 lg:row-span-4',
  tall: 'lg:col-span-3 lg:col-start-2 lg:row-span-5',
  wide: 'lg:col-span-5 lg:row-span-4',
  wideLeft: 'lg:col-span-5 lg:col-start-2 lg:row-span-3',
  wideRight: 'lg:col-span-5 lg:col-start-7 lg:row-span-3',
}

function ExternalArrowIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function PlayIndicator() {
  return (
    <span
      className="absolute right-3 top-3 inline-flex size-9 items-center justify-center border border-paper/70 bg-ink/75 text-paper"
      aria-hidden="true"
    >
      <svg className="ml-0.5 size-3" viewBox="0 0 12 12" fill="currentColor">
        <path d="m3 1 7 5-7 5V1Z" />
      </svg>
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

function MomentTile({ content, item, layout = 'standard' }: MomentTileProps) {
  const localizedItem = content.items[item.id]
  const caption = localizedItem?.caption ?? item.caption
  const mediaSource =
    item.mediaType === 'VIDEO' ? item.thumbnailUrl ?? item.mediaUrl : item.mediaUrl
  const isInteractive = isValidPermalink(item.permalink)
  const className = `group relative block h-full overflow-hidden bg-moss ${desktopLayoutClasses[layout]}`
  const mediaClass = isInteractive
    ? 'size-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02]'
    : 'size-full object-cover'
  const captionClass = isInteractive
    ? 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-4 pt-12 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 motion-reduce:transition-none'
    : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-4 pt-12 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper'
  const tileContent = (
    <>
      <img
        className={mediaClass}
        src={mediaSource}
        alt={localizedItem?.alt ?? item.alt ?? ''}
        loading="lazy"
        decoding="async"
      />
      {caption ? (
        <span className={captionClass}>
          {caption}
        </span>
      ) : null}
      {item.mediaType === 'VIDEO' ? <PlayIndicator /> : null}
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
        href={item.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.openPost(caption ?? item.id)}
      >
        {tileContent}
      </a>
    )
  }

  return <div className={className}>{tileContent}</div>
}

export function MomentsSection({ content, items }: MomentsSectionProps) {
  const titleId = 'instagram-title'

  return (
    <section
      id="instagram"
      className="scroll-mt-24 bg-olive py-24 text-paper sm:py-32 lg:py-40"
      aria-labelledby={titleId}
    >
      <Container className="lg:max-w-[96rem] lg:px-12">
        <SectionHeading
          eyebrow={`04 / ${content.eyebrow}`}
          id={titleId}
          title={content.heading}
          description={content.description}
          tone="light"
        />

        <div
          className="-mr-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-5 pb-4 sm:-mr-8 sm:mt-16 sm:pr-8 lg:hidden"
          role="region"
          aria-label={content.heading}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[80vw] max-w-[32rem] shrink-0 snap-start aspect-[4/5]"
            >
              <MomentTile content={content} item={item} />
            </div>
          ))}
        </div>

        <div className="mt-16 hidden grid-cols-12 auto-rows-[4.5rem] gap-3 lg:mt-12 lg:grid lg:auto-rows-[clamp(3.25rem,5vw,5rem)] lg:gap-5">
          {items.map((item) => (
            <MomentTile key={item.id} content={content} item={item} layout={item.layout} />
          ))}
        </div>

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
            <span>{content.profileCta}</span>
            <ExternalArrowIcon />
          </Button>
        </div>
      </Container>
    </section>
  )
}
