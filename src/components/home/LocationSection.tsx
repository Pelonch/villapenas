import { locationConfig } from '../../config/location.ts'
import { siteConfig } from '../../config/site.ts'
import type { LocationContent } from '../../i18n/types.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'

interface LocationSectionProps {
  content: LocationContent
}

interface GoogleMapsLinkProps {
  className?: string
  content: LocationContent
}

function GoogleMapsLink({ className = '', content }: GoogleMapsLinkProps) {
  return (
    <Button
      href={siteConfig.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.openMapsNewTab}
      className={`gap-2 ${className}`}
    >
      <span>{content.openMaps}</span>
      <svg
        className="size-3 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M3 13 13 3M6 3h7v7" />
      </svg>
    </Button>
  )
}

function LocationMap({ content }: Pick<LocationSectionProps, 'content'>) {
  if (locationConfig.googleMapsEmbedUrl) {
    return (
      <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-ink/15 bg-cream shadow-xl shadow-ink/15 sm:min-h-[28rem]">
        <iframe
          className="absolute inset-0 size-full border-0"
          src={locationConfig.googleMapsEmbedUrl}
          title={content.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <figure className="relative flex min-h-[18rem] overflow-hidden rounded-2xl border border-ink/15 bg-olive p-5 text-paper shadow-xl shadow-ink/15 sm:min-h-[28rem] sm:p-9">
      <div className="flex w-full flex-col justify-between border border-paper/20 p-4 sm:p-7">
        <div>
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sand sm:text-xs">
            Google Maps
          </p>
          <h3 className="mt-4 max-w-sm font-display text-3xl leading-[0.95] tracking-[-0.045em] text-paper sm:mt-5 sm:text-5xl">
            {content.mapTitle}
          </h3>
        </div>
        <figcaption className="max-w-sm border-t border-paper/20 pt-5 text-sm leading-7 text-paper/80 sm:text-base">
          {content.mapFallbackDescription}
        </figcaption>
        <div className="mt-8 hidden border-t border-paper/20 pt-5 sm:block">
          <p className="font-display text-2xl tracking-[-0.04em] text-paper">
            {siteConfig.businessName}
          </p>
          <p className="mt-2 whitespace-pre-line text-xs leading-5 text-paper/75 sm:text-sm">
            {content.address}
          </p>
        </div>
      </div>
    </figure>
  )
}

function TravelTimes({ content }: Pick<LocationSectionProps, 'content'>) {
  const titleId = 'travel-times-title'

  return (
    <aside className="mt-16 border-t border-ink/15 pt-7 sm:mt-20 sm:pt-8" aria-labelledby={titleId}>
      <p
        id={titleId}
        className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold sm:text-xs"
      >
        {content.travelTimesLabel}
      </p>
      <dl className="mt-7 grid grid-cols-2 gap-x-6 sm:grid-cols-5 sm:gap-x-0">
        {locationConfig.travelTimes.map((travelTime) => (
          <div
            key={travelTime.id}
            className="flex flex-col border-t border-ink/15 py-5 last:col-span-2 sm:border-t-0 sm:border-l sm:px-5 sm:py-0 sm:first:border-l-0 sm:last:col-span-1"
          >
            <dt className="order-2 mt-2 text-xs font-semibold uppercase tracking-[0.13em] text-ink/65">
              {content.travelTimeLabels[travelTime.id]}
            </dt>
            <dd className="order-1 font-display text-3xl tracking-[-0.045em] text-ink sm:text-4xl">
              {content.formatTravelTime(travelTime.minutes)}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export function LocationSection({ content }: LocationSectionProps) {
  const titleId = 'location-title'

  return (
    <section
      id="ubicacion"
      className="scroll-mt-24 bg-paper py-24 pb-36 text-ink sm:py-32 lg:py-40"
      aria-labelledby={titleId}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-20">
          <div className="flex flex-col lg:py-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {content.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-7 whitespace-pre-line font-display text-5xl leading-[0.92] tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl"
            >
              {content.heading}
            </h2>
            <p className="mt-9 max-w-md text-base leading-8 text-ink/75 sm:text-lg">
              {content.description}
            </p>
            <address className="mt-10 whitespace-pre-line border-l-2 border-gold pl-5 text-sm leading-7 text-ink not-italic sm:text-base">
              {content.address}
            </address>
            <GoogleMapsLink content={content} className="mt-10 hidden self-start lg:inline-flex" />
          </div>
          <LocationMap content={content} />
        </div>
        <GoogleMapsLink content={content} className="mt-8 lg:hidden" />
        <TravelTimes content={content} />
      </Container>
    </section>
  )
}
