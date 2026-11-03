import { useEffect, useRef, useState } from 'react'
import { homeExperienceConfig } from '../../config/homeExperience.ts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import type { HeroContent } from '../../i18n/types.ts'

interface AerialPreviewProps {
  content: HeroContent
  isExperienceActive: boolean
}

export function AerialPreview({
  content,
  isExperienceActive,
}: AerialPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches,
  )
  const [failedPreviewSource, setFailedPreviewSource] = useState<string | null>(null)
  const [failedDialogSource, setFailedDialogSource] = useState<string | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const media = isMobileViewport
    ? homeExperienceConfig.media.aerial.mobile
    : homeExperienceConfig.media.aerial.desktop
  const previewVideoSource = media.previewVideo
  const fullVideoSource = media.fullVideo
  const shouldLoadPreview =
    isExperienceActive &&
    !isDialogOpen &&
    !prefersReducedMotion &&
    failedPreviewSource !== previewVideoSource
  const shouldLoadDialog =
    isDialogOpen && !prefersReducedMotion && failedDialogSource !== fullVideoSource
  const titleId = 'aerial-view-dialog-title'

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateViewport = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches)
    }

    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (isDialogOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }

      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
      return
    }

    if (dialog.open) {
      dialog.close()
    }
  }, [isDialogOpen])

  function returnFocusToTrigger() {
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }

  function handleDialogClose() {
    setIsDialogOpen(false)
    returnFocusToTrigger()
  }

  function closeDialog() {
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        ref={triggerRef}
        className={`group absolute bottom-[5.25rem] right-4 z-20 overflow-hidden border border-paper/30 bg-ink text-left text-paper shadow-2xl shadow-ink/25 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-0 sm:bottom-24 sm:right-6 lg:bottom-28 ${
          isMobileViewport ? 'w-24' : 'w-48 lg:w-56'
        }`}
        type="button"
        aria-haspopup="dialog"
        aria-label={content.openAerialDialog}
        disabled={!isExperienceActive}
        onClick={() => setIsDialogOpen(true)}
      >
        <div
          className={`relative overflow-hidden ${
            isMobileViewport ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        >
          <div className="vp-aerial-fallback absolute inset-0" aria-hidden="true" />
          {shouldLoadPreview ? (
            <video
              className="absolute inset-0 size-full object-cover"
              src={previewVideoSource}
              poster={media.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              onError={() => setFailedPreviewSource(previewVideoSource)}
            />
          ) : isExperienceActive ? (
            <img
              className="absolute inset-0 size-full object-cover"
              src={media.poster}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 via-ink/35 to-transparent px-2 pb-2 pt-6 sm:px-4 sm:pb-3.5 sm:pt-7">
            <span className="flex items-center gap-1.5 whitespace-nowrap font-sans text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-paper sm:gap-2 sm:text-[0.65rem] sm:tracking-[0.16em]">
              {content.aerialPreviewLabel}
              <svg
                className="size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M3 13 13 3M6 3h7v7" />
              </svg>
            </span>
          </div>
        </div>
      </button>

      <dialog
        ref={dialogRef}
        className={`m-auto border border-paper/20 bg-ink p-0 text-paper shadow-2xl shadow-black/40 backdrop:bg-ink/85 ${
          isMobileViewport ? 'w-[min(92vw,29rem)]' : 'w-[min(92vw,70rem)]'
        }`}
        aria-labelledby={titleId}
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog()
          }
        }}
      >
        <div
          className={`relative overflow-hidden bg-moss ${
            isMobileViewport
              ? 'aspect-[9/16] min-h-[20rem]'
              : 'aspect-video min-h-[13rem] sm:min-h-[20rem]'
          }`}
        >
          <div className="vp-aerial-fallback absolute inset-0" aria-hidden="true" />
          {shouldLoadDialog ? (
            <video
              className="absolute inset-0 size-full object-contain"
              src={fullVideoSource}
              poster={media.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              onError={() => setFailedDialogSource(fullVideoSource)}
            />
          ) : isDialogOpen ? (
            <img
              className="absolute inset-0 size-full object-cover"
              src={media.poster}
              alt=""
              aria-hidden="true"
            />
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-5 border-t border-paper/15 px-4 py-3.5 sm:px-5">
          <h2
            id={titleId}
            className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream sm:text-xs"
          >
            {content.aerialDialogTitle}
          </h2>
          <button
            ref={closeButtonRef}
            className="inline-flex size-11 shrink-0 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-sand hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
            type="button"
            aria-label={content.closeAerialDialog}
            onClick={closeDialog}
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  )
}
