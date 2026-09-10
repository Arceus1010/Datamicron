import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { NAV_ITEMS, type NavEntry } from './navConfig'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  isActive: (href: string) => boolean
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: expanded ? 180 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="w-4 h-4 shrink-0 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </motion.svg>
  )
}

function DrawerEntry({
  entry,
  isActive,
  onClose,
}: {
  entry: NavEntry
  isActive: (href: string) => boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = Boolean(entry.sections && entry.sections.length > 0)
  const active = isActive(entry.href)

  // Leaf entries navigate directly
  if (!hasChildren) {
    return (
      <li className="border-b border-gray-100">
        <Link
          to={entry.href}
          onClick={onClose}
          className={`flex items-center min-h-12 px-6 py-3 text-base font-semibold ${
            active ? 'text-brand' : 'text-gray-900'
          }`}
        >
          {entry.label}
        </Link>
      </li>
    )
  }

  const panelId = `mobile-nav-${entry.label.replace(/\W+/g, '-').toLowerCase()}`

  return (
    <li className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className={`w-full flex items-center justify-between gap-3 min-h-12 px-6 py-3 text-base font-semibold text-left ${
          active ? 'text-brand' : 'text-gray-900'
        }`}
      >
        {entry.label}
        <Chevron expanded={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="px-6 py-2 flex flex-col gap-4">
              {entry.sections?.map((section, i) => (
                <div key={section.title || i}>
                  {section.title && (
                    <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1.5 opacity-70">
                      {section.title}
                    </p>
                  )}
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className={`flex items-center min-h-11 py-2 text-sm ${
                            isActive(item.href)
                              ? 'text-brand font-semibold'
                              : 'text-gray-600 hover:text-brand'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function MobileNav({ open, onClose, isActive }: MobileNavProps) {
  // Close on Escape and lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-55 bg-white flex flex-col overflow-y-auto overscroll-contain"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <nav aria-label="Main">
            <ul className="border-t border-gray-100">
              {NAV_ITEMS.map((entry) => (
                <DrawerEntry
                  key={entry.label}
                  entry={entry}
                  isActive={isActive}
                  onClose={onClose}
                />
              ))}
            </ul>
          </nav>

          <div className="px-6 py-6 mt-auto">
            <Link
              to="/about/contact"
              onClick={onClose}
              className="flex items-center justify-center min-h-12 w-full rounded-sm text-base font-semibold bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm"
            >
              Request a Demo
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
