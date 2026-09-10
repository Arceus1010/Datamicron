import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavEntry } from './navConfig'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes an open mega menu
  useEffect(() => {
    if (!activeNav) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveNav(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeNav])

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveNav(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setActiveNav(null), 120)
  }

  const activeEntry: NavEntry | undefined = NAV_ITEMS.find((n) => n.label === activeNav)
  const isActive = useCallback(
    (href: string) =>
      href === '/' ? location.pathname === '/' : location.pathname.startsWith(href),
    [location.pathname],
  )

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white"
      animate={{
        boxShadow: scrolled ? '0 1px 12px 0 rgba(0,0,0,0.07)' : '0 1px 0 0 rgba(0,0,0,0.06)',
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/Logo.webp" alt="Datamicron" className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV_ITEMS.map((entry) => {
            const routeActive = isActive(entry.href)
            const highlighted = routeActive || activeNav === entry.label
            const expanded = activeNav === entry.label
            return (
              <div
                key={entry.label}
                onMouseEnter={() => handleMouseEnter(entry.label)}
                onMouseLeave={handleMouseLeave}
              >
                {entry.sections && entry.sections.length > 0 ? (
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    aria-controls="mega-menu"
                    onClick={() => setActiveNav(expanded ? null : entry.label)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${
                      highlighted
                        ? 'text-brand'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {entry.label}
                    <motion.svg
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                    {routeActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={entry.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${
                      highlighted
                        ? 'text-brand'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {entry.label}
                    {routeActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/about/contact"
            className="hidden sm:inline-flex px-4 lg:px-5 py-2 rounded-sm text-sm font-semibold bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm"
          >
            Request a Demo
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden -mr-2 w-11 h-11 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />

      <AnimatePresence>
        {activeEntry?.sections && activeEntry.sections.length > 0 && (
          <motion.div
            key={activeEntry.label}
            id="mega-menu"
            className="hidden lg:block"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseEnter={() => handleMouseEnter(activeEntry.label)}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenu
              panel={activeEntry.panel}
              sections={activeEntry.sections}
              onClose={() => setActiveNav(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
