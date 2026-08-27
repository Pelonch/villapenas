interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  id?: string
  tone?: 'dark' | 'light'
}

export function SectionHeading({
  description,
  eyebrow,
  id,
  title,
  tone = 'dark',
}: SectionHeadingProps) {
  const textColor = tone === 'light' ? 'text-paper' : 'text-ink'
  const descriptionColor = tone === 'light' ? 'text-paper/75' : 'text-ink/70'

  return (
    <header>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-5 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl ${textColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-6 max-w-xl text-base leading-8 sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </header>
  )
}
