import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import { provisionalVenueImageSrc } from '../../config/images.ts'
import type {
  AmenityGroup,
  AmenityGroupId,
  AmenitiesContent,
} from '../../i18n/types.ts'
import { Container } from '../ui/Container.tsx'
import { ImageWithFallback } from '../ui/ImageWithFallback.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface AmenitiesSectionProps {
  content: AmenitiesContent
}

interface AmenityFeatureProps {
  group: AmenityGroup
  index: number
  onCollageRef: (element: HTMLDivElement | null) => void
  onLayerRef: (index: number, element: HTMLDivElement | null) => void
}

interface AmenityCollageProps
  extends Pick<
    AmenityFeatureProps,
    'group' | 'onCollageRef' | 'onLayerRef'
  > {
  isOnRight: boolean
}

const collageLayerClasses: Record<
  AmenityGroupId,
  readonly [string, string, string]
> = {
  rancho: [
    'left-0 top-8 z-10 h-[60%] w-[66%] lg:left-[1vw] lg:top-[6vh] lg:h-[52vh] lg:w-[27vw] lg:!bg-transparent lg:!p-0',
    'right-0 top-0 z-20 h-[38%] w-[42%] lg:left-[20vw] lg:top-0 lg:h-[38vh] lg:w-[30vw] lg:!bg-cream lg:!pb-8 lg:!pl-8 lg:!pr-0 lg:!pt-8',
    'bottom-2 right-[7%] z-30 h-[45%] w-[53%] lg:bottom-auto lg:left-[33vw] lg:top-[41vh] lg:h-[31vh] lg:w-[22vw] lg:!bg-transparent lg:!p-0',
  ],
  pool: [
    'right-0 top-4 z-10 h-[63%] w-[68%] lg:left-[1vw] lg:right-auto lg:top-[6vh] lg:h-[52vh] lg:w-[27vw] lg:!bg-transparent lg:!p-0',
    'left-[1%] top-[17%] z-30 h-[38%] w-[41%] lg:left-[20vw] lg:top-0 lg:z-20 lg:h-[38vh] lg:w-[30vw] lg:!bg-cream lg:!pb-8 lg:!pl-8 lg:!pr-0 lg:!pt-8',
    'bottom-0 left-[8%] z-20 h-[43%] w-[54%] lg:bottom-auto lg:left-[33vw] lg:top-[41vh] lg:z-30 lg:h-[31vh] lg:w-[22vw] lg:!bg-transparent lg:!p-0',
  ],
  bbq: [
    'left-[8%] top-0 z-10 h-[64%] w-[65%] lg:left-[1vw] lg:top-[6vh] lg:h-[52vh] lg:w-[27vw] lg:!bg-transparent lg:!p-0',
    'right-0 top-[21%] z-30 h-[41%] w-[40%] lg:left-[20vw] lg:right-auto lg:top-0 lg:z-20 lg:h-[38vh] lg:w-[30vw] lg:!bg-cream lg:!pb-8 lg:!pl-8 lg:!pr-0 lg:!pt-8',
    'bottom-0 left-0 z-20 h-[39%] w-[48%] lg:bottom-auto lg:left-[33vw] lg:top-[41vh] lg:z-30 lg:h-[31vh] lg:w-[22vw] lg:!bg-transparent lg:!p-0',
  ],
}

const layerMotionRanges = [16, 34, 52] as const

function AmenityCollage({
  group,
  onCollageRef,
  onLayerRef,
  isOnRight,
}: AmenityCollageProps) {
  const layerClasses = collageLayerClasses[group.id]
  const desktopPosition = isOnRight ? 'lg:left-[44vw]' : 'lg:left-0'

  return (
    <div
      ref={onCollageRef}
      className={`relative isolate mx-auto h-[22rem] w-full max-w-[36rem] sm:h-[31rem] lg:absolute lg:inset-y-0 lg:mx-0 lg:h-full lg:w-[55vw] lg:max-w-none lg:shrink-0 ${desktopPosition}`}
    >
      {group.images.map((image, index) => (
        <div
          key={`${group.id}-${index}`}
          ref={(element) => onLayerRef(index, element)}
          className={`absolute overflow-hidden bg-cream p-3 will-change-transform sm:p-4 lg:p-5 ${layerClasses[index] ?? ''}`}
        >
          <ImageWithFallback
            className="size-full object-cover"
            src={image.src}
            fallbackSrc={provisionalVenueImageSrc}
            width="1254"
            height="1254"
            alt={image.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

function AmenityFeature({
  group,
  index,
  onCollageRef,
  onLayerRef,
}: AmenityFeatureProps) {
  const isCollageOnRight = index % 2 === 1
  const textDesktopPosition = isCollageOnRight
    ? 'lg:left-[12vw]'
    : 'lg:left-[59vw]'

  return (
    <article className="grid gap-14 lg:relative lg:ml-[-4vw] lg:block lg:min-h-[72vh] lg:w-[calc(100%+8vw)] lg:gap-0">
      <div
        className={`lg:absolute lg:top-1/2 lg:z-40 lg:w-[29vw] lg:-translate-y-1/2 ${textDesktopPosition}`}
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {`${String(index + 1).padStart(2, '0')} / ${group.category}`}
        </p>
        <h3 className="mt-6 max-w-md font-display text-4xl leading-[0.98] tracking-[-0.045em] text-ink sm:text-5xl">
          {group.title}
        </h3>
        <p className="mt-7 max-w-md text-base leading-8 text-ink/75 sm:text-lg">
          {group.description}
        </p>
      </div>
      <div>
        <AmenityCollage
          group={group}
          onCollageRef={onCollageRef}
          onLayerRef={onLayerRef}
          isOnRight={isCollageOnRight}
        />
      </div>
    </article>
  )
}

export function AmenitiesSection({ content }: AmenitiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const collageRefs = useRef<Array<HTMLDivElement | null>>([])
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const titleId = 'amenities-title'

  useEffect(() => {
    const resetLayers = () => {
      layerRefs.current.forEach((layer) => {
        if (layer) {
          layer.style.transform = ''
        }
      })
    }

    if (prefersReducedMotion) {
      resetLayers()
      return
    }

    const section = sectionRef.current

    if (!section) {
      return
    }

    const desktopMotion = window.matchMedia('(min-width: 1024px)')
    let animationFrame = 0
    let isSectionVisible = false

    const updateLayers = () => {
      animationFrame = 0

      if (!isSectionVisible || !desktopMotion.matches) {
        resetLayers()
        return
      }

      const viewportHeight = window.innerHeight

      collageRefs.current.forEach((collage, groupIndex) => {
        if (!collage) {
          return
        }

        const bounds = collage.getBoundingClientRect()

        if (bounds.bottom <= 0 || bounds.top >= viewportHeight) {
          return
        }

        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)),
        )
        const centeredProgress = progress * 2 - 1

        layerMotionRanges.forEach((range, layerIndex) => {
          const layer = layerRefs.current[groupIndex * 3 + layerIndex]

          if (layer) {
            const offset = Math.round(centeredProgress * range)
            layer.style.transform = `translate3d(0, ${offset}px, 0)`
          }
        })
      })
    }

    const scheduleUpdate = () => {
      if (!isSectionVisible || animationFrame) {
        return
      }

      animationFrame = window.requestAnimationFrame(updateLayers)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry?.isIntersecting ?? false

        if (isSectionVisible) {
          scheduleUpdate()
        } else {
          resetLayers()
        }
      },
      { rootMargin: '16% 0px' },
    )
    const handleMediaChange = () => {
      if (!desktopMotion.matches) {
        resetLayers()
      }

      scheduleUpdate()
    }

    observer.observe(section)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    desktopMotion.addEventListener('change', handleMediaChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      desktopMotion.removeEventListener('change', handleMediaChange)

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }

      resetLayers()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="amenidades"
      className="scroll-mt-24 bg-cream py-24 pb-28 text-ink sm:py-32 sm:pb-32 lg:overflow-x-clip lg:py-40 lg:pb-36"
      aria-labelledby={titleId}
    >
      <Container>
        <SectionHeading
          eyebrow={`02 / ${content.eyebrow}`}
          id={titleId}
          title={content.heading}
          description={content.description}
        />
      </Container>
      <div className="mx-auto mt-20 w-full max-w-7xl px-5 sm:mt-28 sm:px-8 lg:mt-36 lg:max-w-none lg:px-[4vw]">
        {content.groups.map((group, index) => (
          <div
            key={group.id}
            className={index === 0 ? '' : 'mt-28 sm:mt-36 lg:mt-0'}
          >
            <AmenityFeature
              group={group}
              index={index}
              onCollageRef={(element) => {
                collageRefs.current[index] = element
              }}
              onLayerRef={(layerIndex, element) => {
                layerRefs.current[index * 3 + layerIndex] = element
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
