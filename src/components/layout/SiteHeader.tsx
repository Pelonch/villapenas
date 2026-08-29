import { useEffect, useRef, useState } from 'react'
import {
  getHomeAnchorHref,
  getLocalizedPath,
  type BrowserLocation,
  type HomeAnchorId,
  type Route,
} from '../../app/routes.ts'
import { siteConfig } from '../../config/site.ts'
import { getTranslations } from '../../i18n/translations.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

export type HeaderVisibility = 'visible' | 'hidden'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getClientRects().length > 0,
  )
}

interface SiteHeaderProps {
  route: Route
  location: BrowserLocation
  visibility?: HeaderVisibility
}

export function SiteHeader({
  location,
  route,
  visibility = 'visible',
}: SiteHeaderProps) {
  const translations = getTranslations(route.locale)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const homePath = getLocalizedPath(route.locale, 'home')
  const navigationItems: Array<{ id: HomeAnchorId; label: string }> = [
    { id: 'ubicacion', label: translations.navigation.location },
    { id: 'amenidades', label: translations.navigation.amenities },
    { id: 'paquetes', label: translations.navigation.packages },
  ]

  function closeMobileMenu(restoreFocus = false) {
    setIsMobileMenuOpen(false)

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        mobileMenuTriggerRef.current?.focus()
      })
    }
  }

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer'),
    )
    const previousInertStates = backgroundElements.map((element) => element.inert)

    backgroundElements.forEach((element) => {
      element.inert = true
    })

    const focusFrame = window.requestAnimationFrame(() => {
      const menu = mobileMenuRef.current

      if (menu) {
        getFocusableElements(menu)[0]?.focus()
      }
    })

    return () => {
      window.cancelAnimationFrame(focusFrame)
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertStates[index] ?? false
      })
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileMenu(true)

        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const menu = mobileMenuRef.current

      if (!menu) {
        return
      }

      const focusableElements = getFocusableElements(menu)

      if (focusableElements.length === 0) {
        event.preventDefault()

        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        return
      }

      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstElement || !menu.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }

        return
      }

      if (activeElement === lastElement || !menu.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia('(min-width: 1024px)')

    function closeOnDesktop(): void {
      if (desktopBreakpoint.matches) {
        closeMobileMenu()
      }
    }

    desktopBreakpoint.addEventListener('change', closeOnDesktop)

    return () => {
      desktopBreakpoint.removeEventListener('change', closeOnDesktop)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-sm transition-[opacity,transform] duration-300 ${
        visibility === 'hidden'
          ? 'pointer-events-none -translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      aria-hidden={visibility === 'hidden' ? true : undefined}
      inert={visibility === 'hidden'}
    >
      <Container
        className="relative flex min-h-20 items-center justify-between gap-6"
        role={isMobileMenuOpen ? 'dialog' : undefined}
        aria-label={isMobileMenuOpen ? translations.navigation.label : undefined}
        aria-modal={isMobileMenuOpen || undefined}
      >
        <a
          className="inline-flex shrink-0 items-center rounded-sm"
          href={homePath}
        >
          <img
            className="h-8 w-auto object-contain sm:h-10 lg:h-11"
            src="/images/brand/villa-penas-logo.png"
            alt={siteConfig.businessName}
          />
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label={translations.navigation.label}
        >
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-gold-dark"
                  href={getHomeAnchorHref(route.locale, item.id)}
                  aria-current={
                    route.page === 'home' && location.hash === `#${item.id}`
                      ? 'location'
                      : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={getHomeAnchorHref(route.locale, 'cotizador')}
            className="shrink-0"
          >
            {translations.navigation.quote}
          </Button>
          <LanguageSwitcher
            className="border-l border-ink/15 pl-5 text-ink/70"
            activeClassName="text-gold-dark"
            locale={route.locale}
            page={route.page}
            location={location}
          />
        </nav>

        <button
          ref={mobileMenuTriggerRef}
          className="inline-flex size-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-cream lg:hidden"
          type="button"
          aria-controls="mobile-site-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label={
            isMobileMenuOpen
              ? translations.navigation.closeMenu
              : translations.navigation.openMenu
          }
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="sr-only">
            {isMobileMenuOpen
              ? translations.navigation.closeMenu
              : translations.navigation.openMenu}
          </span>
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <div
          ref={mobileMenuRef}
          id="mobile-site-navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-ink/10 bg-paper shadow-lg lg:hidden"
          hidden={!isMobileMenuOpen}
        >
          <nav className="px-5 py-7 sm:px-8">
            <ul className="border-t border-ink/15">
              {navigationItems.map((item) => (
                <li key={item.id} className="border-b border-ink/15">
                  <a
                    className="flex min-h-14 items-center justify-between py-3 font-display text-2xl tracking-[-0.035em] text-ink"
                    href={getHomeAnchorHref(route.locale, item.id)}
                    onClick={() => closeMobileMenu()}
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-sans text-gold">
                      -&gt;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={getHomeAnchorHref(route.locale, 'cotizador')}
              className="mt-7 w-full"
              onClick={() => closeMobileMenu()}
            >
              {translations.navigation.quote}
            </Button>
            <LanguageSwitcher
              className="mt-7 text-ink/70"
              activeClassName="text-gold-dark"
              locale={route.locale}
              page={route.page}
              location={location}
              onNavigate={() => closeMobileMenu()}
            />
          </nav>
        </div>
      </Container>
    </header>
  )
}
