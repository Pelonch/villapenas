import { getHomeAnchorHref } from '../app/routes.ts'
import { Container } from '../components/ui/Container.tsx'
import { Button } from '../components/ui/Button.tsx'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon.tsx'
import { siteConfig } from '../config/site.ts'
import { createWhatsAppUrl } from '../config/whatsapp.ts'
import type { Locale, ContactPageContent } from '../i18n/types.ts'

interface ContactPageProps {
  content: ContactPageContent
  locale: Locale
}

function ExternalArrow() {
  return (
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
  )
}

export function ContactPage({ content, locale }: ContactPageProps) {
  const quoteHref = getHomeAnchorHref(locale, 'cotizador')

  return (
    <article className="overflow-hidden bg-paper text-ink">
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36" aria-labelledby="contact-title">
        <Container>
          <div className="w-full max-w-4xl border-l-2 border-gold pl-5 sm:pl-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {content.heroEyebrow}
            </p>
            <h1
              id="contact-title"
              className="mt-7 max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.06em] text-ink sm:text-6xl lg:text-8xl"
            >
              {content.heading}
            </h1>
            <p className="mt-8 max-w-2xl break-words text-base leading-8 text-ink/75 sm:mt-10 sm:text-lg">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink/15 bg-cream/60 py-16 sm:py-24 lg:pt-32 lg:pb-20" aria-labelledby="contact-information-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] lg:gap-20">
            <div>
              <p
                id="contact-information-title"
                className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark"
              >
                {content.contactInformationEyebrow}
              </p>
              <div className="mt-8 border-y border-ink/15 py-8 sm:mt-10 sm:py-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">
                  {content.whatsappLabel}
                </p>
                <a
                  className="mt-4 inline-flex font-display text-4xl tracking-[-0.05em] text-ink underline decoration-gold/70 decoration-1 underline-offset-8 transition-colors hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-5xl"
                  href={`tel:${siteConfig.whatsappNumber.replace(/\s/g, '')}`}
                >
                  {siteConfig.whatsappNumber}
                </a>
              </div>
              <Button
                href={createWhatsAppUrl(content.whatsappMessage)}
                className="mt-8 gap-2 sm:mt-10"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.whatsappNewTab}
              >
                <WhatsAppIcon />
                <span>{content.whatsappCta}</span>
                <ExternalArrow />
              </Button>
            </div>

            <aside className="border-t border-ink/15 pt-8 lg:mt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" aria-labelledby="contact-location-title">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                {content.locationEyebrow}
              </p>
              <h2
                id="contact-location-title"
                className="mt-6 max-w-sm font-display text-4xl leading-[0.95] tracking-[-0.05em] text-ink sm:text-5xl"
              >
                {content.locationHeading}
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-ink/75">
                {content.locationDescription}
              </p>
              <address className="mt-8 whitespace-pre-line border-l-2 border-gold pl-5 text-sm leading-7 text-ink not-italic sm:text-base">
                {content.address}
              </address>
              <Button
                href={siteConfig.googleMapsUrl}
                variant="secondary"
                className="mt-8 gap-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.openMapsNewTab}
              >
                <span>{content.openMaps}</span>
                <ExternalArrow />
              </Button>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-bark py-16 text-paper sm:py-24 lg:py-28" aria-labelledby="contact-quote-title">
        <Container>
          <div className="flex max-w-5xl flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                {content.quoteEyebrow}
              </p>
              <h2
                id="contact-quote-title"
                className="mt-6 font-display text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl"
              >
                {content.quoteHeading}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-paper/75 sm:text-lg">
                {content.quoteDescription}
              </p>
            </div>
            <Button
              href={quoteHref}
              className="shrink-0 gap-2 self-start !border-paper !bg-paper !text-ink hover:!border-cream hover:!bg-cream lg:self-auto"
            >
              <span>{content.quoteCta}</span>
              <ExternalArrow />
            </Button>
          </div>
        </Container>
      </section>
    </article>
  )
}
