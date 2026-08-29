import { useState } from 'react'
import { provisionalVenueImageSrc } from '../../config/images.ts'
import { getPackageImageSource } from '../../config/packages.ts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import type { Locale, PackagesContent } from '../../i18n/types.ts'
import { useQuoteContext } from '../../quote/context.ts'
import {
  getQuoteCatalogDisplay,
  type QuotePackageDisplay,
  type QuotePackageServiceDisplay,
} from '../../quote/display.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { ImageWithFallback } from '../ui/ImageWithFallback.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface PackagesSectionProps {
  content: PackagesContent
  locale: Locale
}

interface PackageCardProps {
  content: PackagesContent
  fillGridRow: boolean
  isExpanded: boolean
  onSelectPackage: () => void
  onToggleServices: () => void
  venuePackage: QuotePackageDisplay
}

const servicePreviewLimit = 3

function getPackageGridClasses(packageCount: number): string {
  if (packageCount === 1) {
    return 'mx-auto max-w-[42.5rem] grid-cols-1'
  }

  if (packageCount === 2) {
    return 'md:grid-cols-2'
  }

  return 'md:grid-cols-2 xl:grid-cols-3'
}

function getServiceLabel(service: QuotePackageServiceDisplay): string {
  const quantityPrefix = service.quantity === null ? '' : `${service.quantity} `
  const detail = service.detail?.trim()
  const baseLabel = `${quantityPrefix}${service.name}`

  return detail ? `${baseLabel} - ${detail}` : baseLabel
}

function PackageCard({
  content,
  fillGridRow,
  isExpanded,
  onSelectPackage,
  onToggleServices,
  venuePackage,
}: PackageCardProps) {
  const description = venuePackage.description?.trim()
  const visibleServices = isExpanded
    ? venuePackage.services
    : venuePackage.services.slice(0, servicePreviewLimit)
  const headingId = `package-${venuePackage.id}-title`
  const serviceListId = `package-${venuePackage.id}-services`
  const formattedPrice = content.formatPrice(venuePackage.priceColones)

  return (
    <article
      className={`flex flex-col border border-paper/20 bg-bark/30 ${fillGridRow ? 'h-full' : 'self-start'}`}
      aria-labelledby={headingId}
    >
      <div className="aspect-[4/3] overflow-hidden bg-bark">
        <ImageWithFallback
          className="size-full object-cover"
          src={getPackageImageSource(venuePackage.id)}
          fallbackSrc={provisionalVenueImageSrc}
          width="1254"
          height="1254"
          alt={content.packageImageAlt(venuePackage.name)}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <header>
          <h3
            id={headingId}
            className="font-display text-3xl leading-none tracking-[-0.035em] text-paper sm:text-4xl"
          >
            {venuePackage.name}
          </h3>
          <p className="mt-7 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {content.priceLabel}
          </p>
          <data
            className="mt-2 block font-display text-4xl leading-none tracking-[-0.035em] text-paper sm:text-5xl"
            value={String(venuePackage.priceColones)}
            aria-label={`${content.priceLabel}: ${formattedPrice}`}
          >
            {formattedPrice}
          </data>
        </header>

        {description ? (
          <p className="mt-7 text-base leading-7 text-paper/75">{description}</p>
        ) : null}

        {venuePackage.services.length > 0 ? (
          <section
            className="mt-8 border-t border-paper/15 pt-6"
            aria-labelledby={`${headingId}-services`}
          >
            <h4
              id={`${headingId}-services`}
              className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold"
            >
              {content.includedServices}
            </h4>
            <ul id={serviceListId} className="mt-4 space-y-3 text-sm leading-6 text-paper/80">
              {visibleServices.map((service) => (
                <li key={service.id} className="border-l border-gold/60 pl-3">
                  {getServiceLabel(service)}
                </li>
              ))}
            </ul>
            <button
              className="mt-5 min-h-11 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              type="button"
              aria-controls={serviceListId}
              aria-expanded={isExpanded}
              onClick={onToggleServices}
            >
              {isExpanded ? content.showLessServices : content.showAllServices}
            </button>
          </section>
        ) : null}

        <div className="mt-auto pt-8">
          <Button className="w-full" onClick={onSelectPackage}>
            {content.selectPackage}
          </Button>
        </div>
      </div>
    </article>
  )
}

function PackagesSkeleton({ content }: Pick<PackagesSectionProps, 'content'>) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3" role="status">
      <span className="sr-only">{content.loading}</span>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse border border-paper/20 bg-bark/30 p-6 sm:p-8"
          aria-hidden="true"
        >
          <div className="aspect-[4/3] bg-paper/10" />
          <div className="mt-8 h-9 w-2/3 bg-paper/10" />
          <div className="mt-5 h-12 w-1/2 bg-paper/10" />
          <div className="mt-9 space-y-3">
            <div className="h-4 w-full bg-paper/10" />
            <div className="h-4 w-4/5 bg-paper/10" />
            <div className="h-4 w-3/5 bg-paper/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

function PackagesMessage({
  actionLabel,
  message,
  onAction,
}: {
  actionLabel?: string
  message: string
  onAction?: () => void
}) {
  return (
    <div className="border border-paper/20 bg-bark/30 p-8 sm:p-10" role="status">
      <p className="max-w-xl text-base leading-8 text-paper/80 sm:text-lg">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-7" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

export function PackagesSection({ content, locale }: PackagesSectionProps) {
  const { packagesState: state, retryPackages, selectPackage } = useQuoteContext()
  const [expandedPackageIds, setExpandedPackageIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  )
  const titleId = 'packages-title'
  const prefersReducedMotion = usePrefersReducedMotion()

  const togglePackageServices = (packageId: number) => {
    setExpandedPackageIds((packageIds) => {
      const nextPackageIds = new Set(packageIds)

      if (nextPackageIds.has(packageId)) {
        nextPackageIds.delete(packageId)
      } else {
        nextPackageIds.add(packageId)
      }

      return nextPackageIds
    })
  }

  const hasExpandedPackage = expandedPackageIds.size > 0
  const packages =
    state.status === 'success'
      ? getQuoteCatalogDisplay(locale, state.packages, []).packages
      : []

  const selectPackageAndScroll = (packageId: number) => {
    selectPackage(packageId)
    document.getElementById('cotizador')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="paquetes"
      className="scroll-mt-24 bg-ink py-24 text-paper sm:py-32 lg:py-40"
      aria-labelledby={titleId}
      aria-busy={state.status === 'loading' || undefined}
    >
      <Container>
        <SectionHeading
          eyebrow={`03 / ${content.eyebrow}`}
          id={titleId}
          title={content.heading}
          description={content.description}
          tone="light"
        />
        <div className="mt-16 sm:mt-20 lg:mt-24">
          {state.status === 'loading' ? <PackagesSkeleton content={content} /> : null}
          {state.status === 'error' ? (
            <PackagesMessage
              message={content.error}
              actionLabel={content.retry}
              onAction={retryPackages}
            />
          ) : null}
          {state.status === 'success' && packages.length === 0 ? (
            <PackagesMessage message={content.empty} />
          ) : null}
          {state.status === 'success' && packages.length > 0 ? (
            <div
              className={`grid w-full gap-6 lg:gap-8 ${getPackageGridClasses(packages.length)} ${hasExpandedPackage ? 'items-start' : ''}`}
            >
              {packages.map((venuePackage) => (
                <PackageCard
                  key={venuePackage.id}
                  content={content}
                  fillGridRow={!hasExpandedPackage}
                  isExpanded={expandedPackageIds.has(venuePackage.id)}
                  onSelectPackage={() => selectPackageAndScroll(venuePackage.id)}
                  onToggleServices={() => togglePackageServices(venuePackage.id)}
                  venuePackage={venuePackage}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
