import { Button } from '../components/ui/Button.tsx'
import { Container } from '../components/ui/Container.tsx'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon.tsx'
import { createWhatsAppUrl } from '../config/whatsapp.ts'
import type { PoliciesPageContent, PolicyContent } from '../i18n/types.ts'

interface PoliciesPageProps {
  content: PoliciesPageContent
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

function PolicyBody({ policy }: { policy: PolicyContent }) {
  return (
    <div className="mt-5 max-w-2xl space-y-5 text-base leading-8 text-ink/75 sm:mt-6 sm:text-lg">
      {policy.highlightedParagraph ? (
        <p>
          {policy.highlightedParagraph.before}
          <strong className="font-display text-xl font-normal tracking-[-0.025em] text-clay sm:text-2xl">
            {policy.highlightedParagraph.emphasis}
          </strong>
          {policy.highlightedParagraph.after}
        </p>
      ) : null}
      {policy.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

export function PoliciesPage({ content }: PoliciesPageProps) {
  return (
    <article className="overflow-hidden bg-paper text-ink">
      <section className="pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28" aria-labelledby="policies-title">
        <Container>
          <div className="max-w-4xl border-l-2 border-gold pl-5 sm:pl-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {content.heroEyebrow}
            </p>
            <h1
              id="policies-title"
              className="mt-7 max-w-3xl whitespace-pre-line font-display text-5xl leading-[0.92] tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl"
            >
              {content.heading}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ink/75 sm:mt-9 sm:text-lg">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink/15 bg-cream/45 py-16 sm:py-24 lg:py-28" aria-label={content.heroEyebrow}>
        <Container className="max-w-6xl">
          <ol className="border-t border-ink/15">
            {content.policies.map((policy, index) => {
              const policyNumber = String(index + 1).padStart(2, '0')
              const titleId = `policy-${policyNumber}-title`

              return (
                <li
                  key={policy.title}
                  className="grid gap-5 border-b border-ink/15 py-10 sm:gap-7 sm:py-14 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-12 lg:py-16"
                  aria-labelledby={titleId}
                >
                  <p className="font-display text-4xl leading-none tracking-[-0.05em] text-gold sm:text-5xl">
                    <span aria-hidden="true">{policyNumber}</span>
                    <span className="sr-only">{policyNumber}</span>
                  </p>
                  <div>
                    <h2
                      id={titleId}
                      className="font-display text-4xl leading-[0.95] tracking-[-0.05em] text-ink sm:text-5xl"
                    >
                      {policy.title}
                    </h2>
                    <PolicyBody policy={policy} />
                  </div>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>

      <section className="bg-bark py-16 text-paper sm:py-24 lg:py-28" aria-labelledby="policy-acknowledgement-title">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.65fr)] lg:gap-20">
            <div className="max-w-2xl">
              <h2
                id="policy-acknowledgement-title"
                className="font-display text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl"
              >
                {content.acknowledgementHeading}
              </h2>
              <p className="mt-6 text-base leading-8 text-paper/75 sm:text-lg">
                {content.acknowledgementDescription}
              </p>
            </div>
            <aside className="border-t border-paper/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" aria-labelledby="policy-contact-title">
              <h3
                id="policy-contact-title"
                className="font-display text-3xl leading-none tracking-[-0.045em] text-paper sm:text-4xl"
              >
                {content.contactHeading}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-7 text-paper/75">
                {content.contactDescription}
              </p>
              <Button
                href={createWhatsAppUrl(content.contactWhatsAppMessage)}
                className="mt-8 gap-2 !border-paper !bg-paper !text-ink hover:!border-cream hover:!bg-cream"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.contactWhatsAppNewTab}
              >
                <WhatsAppIcon />
                <span>{content.contactCta}</span>
                <ExternalArrow />
              </Button>
            </aside>
          </div>
        </Container>
      </section>
    </article>
  )
}
