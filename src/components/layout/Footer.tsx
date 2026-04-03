import { Link } from 'react-router-dom'

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

const FOOTER_COLS = [
  { heading: 'Industries', links: INDUSTRIES },
  { heading: 'Department', links: DEPARTMENTS },
  { heading: 'Domain', links: DOMAINS },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — Logo + Socials */}
          <div className="flex flex-col items-start gap-5 lg:w-48 shrink-0">
            <Link to="/" className="inline-block">
              <img src="/Logo.webp" alt="Datamicron" className="h-8 w-auto" />
            </Link>
            <span>© {new Date().getFullYear()} Datamicron Systems Sdn. Bhd. All rights reserved.</span>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/datamicron"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@datamicron3375"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a2744"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/datamicron/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Link columns */}
          <div className="flex flex-1 flex-wrap gap-8 lg:gap-0 lg:justify-between">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="w-44 shrink-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-light mb-3">
                  {col.heading}
                </p>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group flex items-center py-0.5"
                      >
                        <span className="flex items-center gap-0 group-hover:gap-2 transition-all duration-200">
                          <span className="w-0 h-px bg-gray-400 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-200 shrink-0" />
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                            {link.label}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-brand-navy-border mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-navy-muted">
          <span>© {new Date().getFullYear()} Datamicron. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/about/contact" className="hover:text-brand-light transition-colors">Privacy Policy</Link>
            <Link to="/about/contact" className="hover:text-brand-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
