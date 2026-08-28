import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import type {
  AmenityGroup,
  AmenityGroupId,
  AmenitiesContent,
} from '../../i18n/types.ts'
import { Container } from '../ui/Container.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface AmenitiesSectionProps {
  content: AmenitiesContent
}

interface AmenityFeatureProps {
  group: AmenityGroup
  index: number
}

const collageLayerClasses: Record<
  AmenityGroupId,
  readonly [string, string, string]
> = {
  rancho: [
    'left-0 top-8 z-10 h-[60%] w-[66%] lg:w-[62%]',
    'right-0 top-0 z-20 h-[38%] w-[42%]',
    'bottom-2 right-[7%] z-30 h-[45%] w-[53%]',
  ],
  pool: [
    'right-0 top-4 z-10 h-[63%] w-[68%] lg:w-[62%]',
    'left-[1%] top-[17%] z-30 h-[38%] w-[41%]',
    'bottom-0 left-[8%] z-20 h-[43%] w-[54%]',
  ],
  bbq: [
    'left-[8%] top-0 z-10 h-[64%] w-[65%] lg:w-[62%]',
    'right-0 top-[21%] z-30 h-[41%] w-[40%]',
    'bottom-0 left-0 z-20 h-[39%] w-[48%]',
  ],
}

const layerMotionFactors = [-1, 0.72, -0.48] as const

function AmenityCollage({ group }: Pick<AmenityFeatureProps, 'group'>) {
  const collageRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])
  const prefersReducedMotion = usePrefersReducedMotion()

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

    const collage = collageRef.current

    if (!collage) {
      return
    }

    let animationFrame = 0
    let isVisible = false

    const updateLayers = () => {
      animationFrame = 0

      if (!isVisible) {
        return
      }

      const bounds = collage.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const collageCenter = bounds.top + bounds.height / 2
      const distance = viewportCenter - collageCenter
      const range = viewportCenter + bounds.height / 2
      const progress = Math.max(-1, Math.min(1, distance / range))
      const maxOffset = window.matchMedia('(min-width: 1024px)').matches
        ? 42
        : 20

      layerRefs.current.forEach((layer, index) => {
        if (!layer) {
          return
        }

        const factor = layerMotionFactors[index] ?? 0
        const offset = Math.round(progress * factor * maxOffset)

        layer.style.transform = `translate3d(0, ${offset}px, 0)`
      })
    }

    const scheduleUpdate = () => {
      if (!isVisible || animationFrame) {
        return
      }

      animationFrame = window.requestAnimationFrame(updateLayers)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false

        if (isVisible) {
          scheduleUpdate()
        } else {
          resetLayers()
        }
      },
      { rootMargin: '12% 0px' },
    )

    observer.observe(collage)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }

      resetLayers()
    }
  }, [prefersReducedMotion])

  const layerClasses = collageLayerClasses[group.id]

  return (
    <div
      ref={collageRef}
      className="relative isolate mx-auto h-[22rem] w-full max-w-[36rem] sm:h-[31rem] lg:mx-0 lg:h-[clamp(36rem,42vw,44rem)] lg:w-[110%] lg:max-w-none lg:shrink-0"
    >
      {group.images.map((image, index) => (
        <div
          key={`${group.id}-${index}`}
          ref={(element) => {
            layerRefs.current[index] = element
          }}
          className={`absolute overflow-hidden bg-cream p-3 will-change-transform sm:p-4 lg:p-5 ${layerClasses[index] ?? ''}`}
        >
          <img
            className="size-full object-cover"
            src={image.src}
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

function AmenityFeature({ group, index }: AmenityFeatureProps) {
  const collageFirst = index % 2 === 0
  const gridColumns = collageFirst
    ? 'lg:grid-cols-[minmax(0,55%)_minmax(0,35%)]'
    : 'lg:grid-cols-[minmax(0,35%)_minmax(0,55%)]'
  const textOrder = collageFirst ? 'lg:order-2' : 'lg:order-1'
  const collageOrder = collageFirst ? 'lg:order-1' : 'lg:order-2'
  const collageAlignment = collageFirst ? 'lg:justify-start' : 'lg:justify-end'

  return (
    <article className={`grid gap-14 lg:items-center lg:justify-between lg:gap-0 ${gridColumns}`}>
      <div className={textOrder}>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {`${String(index + 1).padStart(2, '0')} / ${group.category}`}
        </p>
        <h3 className="mt-6 max-w-md font-display text-4xl leading-[0.98] tracking-[-0.045em] text-ink sm:text-5xl">
          {group.title}
        </h3>
        <p className="mt-7 max-w-md text-base leading-8 text-ink/75 sm:text-lg">
          {group.description}
        </p>
      </div>
      <div className={`lg:flex ${collageOrder} ${collageAlignment}`}>
        <AmenityCollage group={group} />
      </div>
    </article>
  )
}

export function AmenitiesSection({ content }: AmenitiesSectionProps) {
  const titleId = 'amenities-title'

  return (
    <section
      id="amenidades"
      className="scroll-mt-24 bg-cream py-24 pb-28 text-ink sm:py-32 sm:pb-32 lg:py-40 lg:pb-36"
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
            className={index === 0 ? '' : 'mt-28 sm:mt-36 lg:mt-48'}
          >
            <AmenityFeature group={group} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
