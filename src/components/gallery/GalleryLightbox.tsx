import { useEffect, useRef } from 'react'
import type { GalleryPhoto } from '../../config/gallery.ts'
import type { GalleryPageContent, Locale } from '../../i18n/types.ts'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

interface GalleryLightboxProps {
  content: GalleryPageContent
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  locale: Locale
  photo: GalleryPhoto
  photoIndex: number
  photoTotal: number
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export function GalleryLightbox({
  content,
  onClose,
  onNext,
  onPrevious,
  locale,
  photo,
  photoIndex,
  photoTotal,
}: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const handlersRef = useRef({ onClose, onNext, onPrevious })
  const touchStartXRef = useRef<number | null>(null)

  useEffect(() => {
    handlersRef.current = { onClose, onNext, onPrevious }
  }, [onClose, onNext, onPrevious])

  useEffect(() => {
    const previousActiveElement = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        handlersRef.current.onClose()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlersRef.current.onPrevious()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handlersRef.current.onNext()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [])

  function handleTouchEnd(touchEndX: number) {
    const touchStartX = touchStartXRef.current
    touchStartXRef.current = null

    if (touchStartX === null || Math.abs(touchEndX - touchStartX) < 48) {
      return
    }

    if (touchEndX < touchStartX) {
      onNext()
    } else {
      onPrevious()
    }
  }

  const photoAlt = photo.alt[locale]

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-5 text-paper sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={content.dialogLabel}
      tabIndex={-1}
      onPointerDown={onClose}
    >
      <button
        ref={closeButtonRef}
        className="absolute right-5 top-5 inline-flex size-11 items-center justify-center border border-paper/35 text-paper transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:right-8 sm:top-8"
        type="button"
        aria-label={content.closeLightbox}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onClose}
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>

      <button
        className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-paper/35 text-paper transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:left-8"
        type="button"
        aria-label={content.previousPhoto}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onPrevious}
      >
        <ArrowIcon direction="left" />
      </button>

      <figure
        className="m-0 flex max-h-[82svh] max-w-[calc(100vw-7rem)] items-center justify-center sm:max-w-[calc(100vw-11rem)]"
        onPointerDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStartXRef.current = event.changedTouches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          const touchEndX = event.changedTouches[0]?.clientX

          if (touchEndX !== undefined) {
            handleTouchEnd(touchEndX)
          }
        }}
      >
        <img
          className="max-h-[82svh] max-w-full object-contain"
          src={photo.images.full.src}
          width={photo.images.full.width}
          height={photo.images.full.height}
          alt={photoAlt}
          decoding="async"
        />
      </figure>

      <button
        className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-paper/35 text-paper transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:right-8"
        type="button"
        aria-label={content.nextPhoto}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onNext}
      >
        <ArrowIcon direction="right" />
      </button>

      <p
        className="absolute bottom-5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/75 sm:bottom-8"
        aria-live="polite"
      >
        {content.photoCounter(photoIndex + 1, photoTotal)}
      </p>
    </div>
  )
}
