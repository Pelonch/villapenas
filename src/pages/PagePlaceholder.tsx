import type { PageContent } from '../i18n/types.ts'

export interface PlaceholderPageProps {
  content: PageContent
}

export function PagePlaceholder({ content }: PlaceholderPageProps) {
  return (
    <section>
      <h1>{content.heading}</h1>
      <p>{content.placeholder}</p>
    </section>
  )
}
