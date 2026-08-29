interface FloatingQuoteCtaProps {
  href: string
  isHiddenOnMobile: boolean
  isVisible: boolean
  label: string
}

export function FloatingQuoteCta({
  href,
  isHiddenOnMobile,
  isVisible,
  label,
}: FloatingQuoteCtaProps) {
  if (!isVisible) {
    return null
  }

  return (
    <a
      className={`vp-floating-quote fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-bark bg-ink px-4 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream shadow-md shadow-ink/25 hover:shadow-lg hover:shadow-ink/30 active:shadow-sm active:shadow-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:bottom-6 sm:right-6 sm:min-h-13 sm:px-6 sm:py-3.5 sm:text-xs ${isHiddenOnMobile ? 'max-lg:hidden' : ''}`}
      href={href}
    >
      <span>{label}</span>
      <svg
        className="vp-floating-quote-arrow size-3 shrink-0 text-sand"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M3 13 13 3M6 3h7v7" />
      </svg>
    </a>
  )
}
