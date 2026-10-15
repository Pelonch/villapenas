import { useState, type ImgHTMLAttributes } from 'react'

type ImageWithFallbackProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'onError' | 'src'
> & {
  fallbackSrc: string
  src: string
}

export function ImageWithFallback({
  fallbackSrc,
  src,
  srcSet,
  ...imageProps
}: ImageWithFallbackProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const shouldUseFallback = failedSource === src

  return (
    <img
      {...imageProps}
      src={shouldUseFallback ? fallbackSrc : src}
      srcSet={shouldUseFallback ? undefined : srcSet}
      onError={() => {
        if (!shouldUseFallback) {
          setFailedSource(src)
        }
      }}
    />
  )
}
