import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { EASE, slidingLineVariants } from '@/lib/motion'

const INDUSTRIES = [
  { label: 'Retail', href: '/industries/retail' },
  { label: 'Banking', href: '/industries/banking' },
  { label: 'Insurance', href: '/industries/insurance' },
  { label: 'Airport Retail', href: '/industries/airport-retail' },
  { label: 'Logistics', href: '/industries/logistics' },
  { label: 'Telecommunications', href: '/industries/telecommunications' },
  { label: 'Tourism', href: '/industries/tourism' },
  { label: 'Real Estate', href: '/industries/real-estate' },
  { label: 'Oil & Gas', href: '/industries/oil-and-gas' },
  { label: 'Port Authority', href: '/industries/port-authority' },
  { label: 'Law Enforcement', href: '/industries/law-enforcement' },
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Agriculture', href: '/industries/agriculture' },
]

const DEPARTMENTS = [
  { label: 'Risk Management', href: '/department/risk-management' },
  { label: 'IT Services', href: '/department/it-services' },
  { label: 'HR Resources', href: '/department/hr-resources' },
  { label: 'Consulting Services', href: '/department/consulting-services' },
  { label: 'Cross and Up Selling', href: '/department/cross-and-up-selling' },
  { label: 'Energy Distribution', href: '/department/energy-distribution' },
  { label: 'Price Forecasting Retail', href: '/department/price-forecasting-retail' },
  { label: 'Mobile Dashboards', href: '/department/mobile-dashboards' },
]

const DOMAINS = [
  { label: 'Industry 4.0', href: '/domain/industry-4-0' },
  { label: 'Smart City', href: '/domain/smart-city' },
  { label: 'Smart Building', href: '/domain/smart-building' },
  { label: 'Risk Assessment Engine', href: '/domain/risk-assessment-engine' },
]

const PLATFORMS = [
  { label: 'InstaBI', href: '/platforms/instabi' },
  { label: 'Eagle Eye', href: '/platforms/eagle-eye' },
  { label: 'Reporting System', href: '/platforms/reporting-system' },
  { label: 'Globes', href: '/platforms/globes' },
  { label: 'Foresight', href: '/platforms/foresight' },
  { label: 'Falcon', href: '/platforms/falcon' },
  { label: 'EzData', href: '/platforms/ezdata' },
  { label: 'Smart Data Governance', href: '/platforms/smart-data-governance' },
  { label: 'EzSync', href: '/platforms/ezsync' },
  { label: 'Pulse', href: '/platforms/pulse' },
]

const FOOTER_COLS = [
  { heading: 'Platforms', links: PLATFORMS },
  { heading: 'Industries', links: INDUSTRIES },
  { heading: 'Department', links: DEPARTMENTS },
  { heading: 'Domain', links: DOMAINS },
]

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const socialTransition = { type: 'spring' as const, stiffness: 400, damping: 17 }

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — Logo + Socials */}
          <motion.div
            className="flex flex-col items-start gap-5 lg:w-44 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link to="/" className="inline-block">
              <img src="/Logo.webp" alt="Datamicron" className="h-8 w-auto" />
            </Link>
            <span>© {YEAR} Datamicron Systems Sdn. Bhd. All rights reserved.</span>
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/datamicron"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white"
                whileHover={{ scale: 1.15 }}
                transition={socialTransition}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@datamicron3375"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white"
                whileHover={{ scale: 1.15 }}
                transition={socialTransition}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a2744" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/datamicron/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white"
                whileHover={{ scale: 1.15 }}
                transition={socialTransition}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Link columns */}
          <motion.div
            className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {FOOTER_COLS.map((col) => (
              <motion.div
                key={col.heading}
                className="min-w-32"
                variants={colVariants}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-light mb-3">
                  {col.heading}
                </p>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <motion.div initial="rest" whileHover="hover" animate="rest">
                        <Link to={link.href} className="flex items-center gap-1.5 py-0.5">
                          <motion.span
                            className="h-px bg-gray-400 shrink-0"
                            variants={slidingLineVariants}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          />
                          <motion.span
                            className="text-sm"
                            variants={{ rest: { color: '#9ca3af' }, hover: { color: '#ffffff' } }}
                            transition={{ duration: 0.15 }}
                          >
                            {link.label}
                          </motion.span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="border-t border-brand-navy-border mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-navy-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span>© {YEAR} Datamicron. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/about/contact" className="hover:text-brand-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about/contact" className="hover:text-brand-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
