import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavEntry } from './navConfig'
import MegaMenu from './MegaMenu'

export default function Navbar() {
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveNav(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setActiveNav(null), 120)
  }

  const activeEntry: NavEntry | undefined = NAV_ITEMS.find((n) => n.label === activeNav)
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith('/' + href.replace(/^\//, ''))

  return (
    <header className="sticky top-0 z-50 bg-white">
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
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${activeNav === entry.label ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full" />
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
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <Link
          to="/about/contact"
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-brand text-white hover:bg-brand-dark transition-colors shrink-0 shadow-sm"
        >
          Request a Demo
        </Link>
      </div>

      {activeEntry?.sections && activeEntry.sections.length > 0 && (
        <div
          onMouseEnter={() => handleMouseEnter(activeEntry.label)}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu
            panel={activeEntry.panel}
            sections={activeEntry.sections}
            onClose={() => setActiveNav(null)}
          />
        </div>
      )}
    </header>
  )
}
