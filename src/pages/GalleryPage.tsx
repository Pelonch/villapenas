import { useMemo, useState } from 'react'
import { GalleryLightbox } from '../components/gallery/GalleryLightbox.tsx'
import { Container } from '../components/ui/Container.tsx'
import { galleryCategoryIds, galleryPhotos } from '../config/gallery.ts'
import type {
  GalleryFilterId,
  GalleryPageContent,
  Locale,
} from '../i18n/types.ts'

const initialPhotoCount = 18
const galleryFilters = ['all', ...galleryCategoryIds] as const satisfies readonly GalleryFilterId[]

interface GalleryPageProps {
  content: GalleryPageContent
  locale: Locale
}

export function GalleryPage({ content, locale }: GalleryPageProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>('all')
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(initialPhotoCount)
  const filteredPhotos = useMemo(
    () =>
      activeFilter === 'all'
        ? galleryPhotos
        : galleryPhotos.filter((photo) => photo.category === activeFilter),
    [activeFilter],
  )
  const visiblePhotos = filteredPhotos.slice(0, visiblePhotoCount)
  const selectedPhotoIndex = selectedPhotoId
    ? filteredPhotos.findIndex((photo) => photo.id === selectedPhotoId)
    : -1
  const selectedPhoto =
    selectedPhotoIndex === -1 ? null : (filteredPhotos[selectedPhotoIndex] ?? null)

  function changeFilter(filter: GalleryFilterId) {
    setActiveFilter(filter)
    setVisiblePhotoCount(initialPhotoCount)
    setSelectedPhotoId(null)
  }

  function moveLightbox(step: number) {
    setSelectedPhotoId((currentPhotoId) => {
      const currentIndex = filteredPhotos.findIndex(
        (photo) => photo.id === currentPhotoId,
      )

      if (currentIndex === -1 || filteredPhotos.length === 0) {
        return currentPhotoId
      }

      const nextIndex =
        (currentIndex + step + filteredPhotos.length) % filteredPhotos.length

      return filteredPhotos[nextIndex]?.id ?? currentPhotoId
    })
  }

  return (
    <article className="bg-paper text-ink">
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24" aria-labelledby="gallery-title">
        <Container>
          <div className="max-w-4xl border-l-2 border-gold pl-5 sm:pl-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {content.eyebrow}
            </p>
            <h1
              id="gallery-title"
              className="mt-7 max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
            >
              {content.heading}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ink/75 sm:mt-9 sm:text-lg">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink/15 bg-cream/45 py-12 sm:py-16 lg:py-20" aria-labelledby="gallery-title">
        <Container>
          <div className="flex flex-wrap gap-2" role="group" aria-label={content.filterLabel}>
            {galleryFilters.map((filter) => {
              const isActive = filter === activeFilter

              return (
                <button
                  key={filter}
                  className={`min-h-11 rounded-full border px-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold ${
                    isActive
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/20 bg-paper text-ink/75 hover:border-ink hover:text-ink'
                  }`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => changeFilter(filter)}
                >
                  {content.categories[filter]}
                </button>
              )
            })}
          </div>

          <ul className="mt-10 columns-1 gap-4 sm:mt-12 sm:columns-2 lg:columns-3" aria-label={content.eyebrow}>
            {visiblePhotos.map((photo, index) => (
              <li key={photo.id} className="mb-4 break-inside-avoid">
                <button
                  className="group block w-full overflow-hidden bg-cream text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  type="button"
                  aria-label={content.openPhoto(photo.alt[locale])}
                  onClick={() => setSelectedPhotoId(photo.id)}
                >
                  <img
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    src={photo.images.md.src}
                    srcSet={`${photo.images.sm.src} ${photo.images.sm.width}w, ${photo.images.md.src} ${photo.images.md.width}w`}
                    sizes="(min-width: 1024px) 29vw, (min-width: 640px) 42vw, 100vw"
                    width={photo.images.md.width}
                    height={photo.images.md.height}
                    alt={photo.alt[locale]}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>

          {visiblePhotoCount < filteredPhotos.length ? (
            <div className="mt-10 flex justify-center sm:mt-12">
              <button
                className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-bark hover:bg-bark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                type="button"
                onClick={() => setVisiblePhotoCount((count) => count + initialPhotoCount)}
              >
                {content.showMore}
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      {selectedPhoto ? (
        <GalleryLightbox
          content={content}
          locale={locale}
          photo={selectedPhoto}
          photoIndex={selectedPhotoIndex}
          photoTotal={filteredPhotos.length}
          onClose={() => setSelectedPhotoId(null)}
          onPrevious={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
        />
      ) : null}
    </article>
  )
}
