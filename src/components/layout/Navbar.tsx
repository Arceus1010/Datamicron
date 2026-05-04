import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavEntry } from './navConfig'
import MegaMenu from './MegaMenu'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveNav(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setActiveNav(null), 120)
  }

  const activeEntry: NavEntry | undefined = NAV_ITEMS.find((n) => n.label === activeNav)
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white"
      animate={{ boxShadow: scrolled ? '0 1px 12px 0 rgba(0,0,0,0.07)' : '0 1px 0 0 rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/Logo.webp" alt="Datamicron" className="h-9 w-auto" />
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((entry) => {
            const active = isActive(entry.href) || activeNav === entry.label
            return (
              <div
                key={entry.label}
                onMouseEnter={() => handleMouseEnter(entry.label)}
                onMouseLeave={handleMouseLeave}
              >
                {entry.sections && entry.sections.length > 0 ? (
                  <button
                    type="button"
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 cursor-default ${
                      active ? 'text-brand' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {entry.label}
                    <motion.svg
                      animate={{ rotate: activeNav === entry.label ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="w-3.5 h-3.5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                    {active && (
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
                      active ? 'text-brand' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {entry.label}
                    {active && (
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

        <Link
          to="/about/contact"
          className="px-5 py-2 rounded-sm text-sm font-semibold bg-brand text-white hover:bg-brand-dark transition-colors shrink-0 shadow-sm"
        >
          Request a Demo
        </Link>
      </div>

      <AnimatePresence>
        {activeEntry?.sections && activeEntry.sections.length > 0 && (
          <motion.div
            key={activeEntry.label}
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
