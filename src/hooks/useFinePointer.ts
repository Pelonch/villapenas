import { useEffect, useState } from 'react'

const finePointerQuery = '(hover: hover) and (pointer: fine)'

function getFinePointerPreference(): boolean {
  return window.matchMedia(finePointerQuery).matches
}

export function useFinePointer(): boolean {
  const [hasFinePointer, setHasFinePointer] = useState(getFinePointerPreference)

  useEffect(() => {
    const mediaQuery = window.matchMedia(finePointerQuery)
    const updatePreference = (event: MediaQueryListEvent) => {
      setHasFinePointer(event.matches)
    }

    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  return hasFinePointer
}
