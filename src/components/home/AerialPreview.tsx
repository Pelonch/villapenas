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
  const [previewFailed, setPreviewFailed] = useState(false)
  const [dialogFailed, setDialogFailed] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldLoadPreview = isExperienceActive && !prefersReducedMotion && !previewFailed
  const shouldLoadDialog = isDialogOpen && !prefersReducedMotion && !dialogFailed
  const titleId = 'aerial-view-dialog-title'

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
        className="group absolute bottom-[5.25rem] right-4 z-20 w-32 overflow-hidden border border-paper/30 bg-ink text-left text-paper shadow-2xl shadow-ink/25 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-0 sm:bottom-24 sm:right-6 sm:w-48 lg:bottom-28 lg:w-56"
        type="button"
        aria-haspopup="dialog"
        aria-label={content.openAerialDialog}
        disabled={!isExperienceActive}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="vp-aerial-fallback absolute inset-0" aria-hidden="true" />
          {shouldLoadPreview ? (
            <video
              className="absolute inset-0 size-full object-cover"
              src={homeExperienceConfig.media.aerial.video}
              poster={homeExperienceConfig.media.aerial.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              onError={() => setPreviewFailed(true)}
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 via-ink/35 to-transparent px-3 pb-2.5 pt-7 sm:px-4 sm:pb-3.5">
            <span className="flex items-center gap-2 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-paper sm:text-[0.65rem]">
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
        className="m-auto w-[min(92vw,70rem)] border border-paper/20 bg-ink p-0 text-paper shadow-2xl shadow-black/40 backdrop:bg-ink/85"
        aria-labelledby={titleId}
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog()
          }
        }}
      >
        <div className="relative aspect-video min-h-[13rem] overflow-hidden bg-moss sm:min-h-[20rem]">
          <div className="vp-aerial-fallback absolute inset-0" aria-hidden="true" />
          {shouldLoadDialog ? (
            <video
              className="absolute inset-0 size-full object-contain"
              src={homeExperienceConfig.media.aerial.video}
              poster={homeExperienceConfig.media.aerial.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              onError={() => setDialogFailed(true)}
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
