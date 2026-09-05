import { locationConfig, type TravelTimeId } from '../../config/location.ts'
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

function TravelTimeIcon({ id }: { id: TravelTimeId }) {
  return (
    <svg
      className="size-5 shrink-0 text-olive sm:size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === 'santaCruz' ? (
        <>
          <path d="M3 20h18M5 20v-8l7-5 7 5v8M9 20v-4h6v4" />
          <path d="M8 12h.01M16 12h.01" />
        </>
      ) : null}
      {id === 'tamarindo' ? (
        <>
          <path d="M12 21v-8" />
          <path d="M12 13c-4-5-7-4-9-1M12 13c4-5 7-4 9-1M12 11c-3-5-6-5-8-3M12 11c3-5 6-5 8-3" />
        </>
      ) : null}
      {id === 'haciendaPinilla' ? <path d="M5 21V4m0 1h11l-2 4 2 4H5" /> : null}
      {id === 'avellanasBeach' ? (
        <>
          <path d="M3 10c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 7 0" />
          <path d="M3 15c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 7 0" />
        </>
      ) : null}
      {id === 'guanacasteAirport' ? (
        <path d="m22 16-8-2-2 5-2-1 1-5-6-3 1.2-1.2 6 1 3-4 2 1-1 4 5 2Z" />
      ) : null}
    </svg>
  )
}

function TravelTimes({ content }: Pick<LocationSectionProps, 'content'>) {
  const titleId = 'travel-times-title'

  return (
    <aside className="mt-16 border-t border-ink/15 pt-7 sm:mt-20 sm:pt-8" aria-labelledby={titleId}>
      <p
        id={titleId}
        className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-dark sm:text-xs"
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
            <dd className="order-1 flex items-center gap-2 font-display text-3xl tracking-[-0.045em] text-ink sm:text-4xl">
              <TravelTimeIcon id={travelTime.id} />
              <span>{content.formatTravelTime(travelTime.minutes)}</span>
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
      className="scroll-mt-24 bg-paper py-24 pb-24 text-ink sm:py-32 sm:pb-28 lg:py-40 lg:pb-28"
      aria-labelledby={titleId}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-20">
          <div className="flex flex-col lg:py-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
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
            <GoogleMapsLink content={content} className="mt-10 self-start" />
          </div>
          <div className="overflow-hidden self-start rounded-2xl border border-ink/10 bg-cream shadow-sm shadow-ink/10">
            <a
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-inset"
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.openMapsNewTab}
            >
              <img
                className="block h-auto w-full"
                src="/images/brand/villa-penas-location-map.png"
                width="1536"
                height="1024"
                alt={content.illustratedMapAlt}
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
        <TravelTimes content={content} />
      </Container>
    </section>
  )
}
