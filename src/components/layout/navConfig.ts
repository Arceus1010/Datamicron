export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface NavEntry {
  label: string
  href: string
  panel?: {
    title: string
    description: string
  }
  sections?: NavSection[]
}

export const NAV_ITEMS: NavEntry[] = [
  {
    label: 'Why EDB?',
    href: '/why-edb',
  },
  {
    label: 'Phoenix AIP',
    href: '/phoenix-aip',
    panel: {
      title: 'Phoenix AIP',
      description:
        'A unified AI platform powering intelligent data products across your enterprise.',
    },
    sections: [
      {
        title: '',
        items: [
          { label: 'Phoenix Studio', href: '/phoenix-aip/phoenix-studio' },
          { label: 'Cortexus', href: '/phoenix-aip/cortexus' },
          { label: 'Phoenix Insights', href: '/phoenix-aip/phoenix-insights' },
          { label: 'Spotlight Data Fabrics', href: '/phoenix-aip/spotlight-data-fabrics' },
          { label: 'Dataforge', href: '/phoenix-aip/dataforge' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    href: '/platforms',
    panel: {
      title: 'Products',
      description: 'Scalable data and AI products built for modern enterprises.',
    },
    sections: [
      {
        title: '',
        items: [
          { label: 'InstaBI', href: '/platforms/instabi' },
          { label: 'Eagle Eye', href: '/platforms/eagle-eye' },
          { label: 'Reporting System', href: '/platforms/reporting-system' },
          { label: 'Globes', href: '/platforms/globes' },
          { label: 'Foresight', href: '/platforms/foresight' },
        ],
      },
      {
        title: '',
        items: [
          { label: 'Falcon', href: '/platforms/falcon' },
          { label: 'EzData', href: '/platforms/ezdata' },
          { label: 'Smart Data Governance', href: '/platforms/smart-data-governance' },
          { label: 'EzSync', href: '/platforms/ezsync' },
          { label: 'Pulse', href: '/platforms/pulse' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/industries/retail',
    panel: {
      title: 'Solutions',
      description:
        'Industry-specific, department-focused, and domain-driven solutions tailored to your enterprise needs.',
    },
    sections: [
      {
        title: 'By Industry',
        items: [
          { label: 'Banking', href: '/industries/banking' },
          { label: 'Retail', href: '/industries/retail' },
          { label: 'Insurance', href: '/industries/insurance' },
          { label: 'Telecommunications', href: '/industries/telecommunications' },
          { label: 'Logistics', href: '/industries/logistics' },
          { label: 'Manufacturing', href: '/industries/manufacturing' },
          { label: 'Oil & Gas', href: '/industries/oil-and-gas' },
          { label: 'Agriculture', href: '/industries/agriculture' },
          { label: 'Tourism', href: '/industries/tourism' },
          { label: 'Real Estate', href: '/industries/real-estate' },
          { label: 'Airport Retail', href: '/industries/airport-retail' },
          { label: 'Port Authority', href: '/industries/port-authority' },
          { label: 'Law Enforcement', href: '/industries/law-enforcement' },
        ],
      },
      {
        title: 'By Department',
        items: [
          { label: 'Risk Management', href: '/department/risk-management' },
          { label: 'IT Services', href: '/department/it-services' },
          { label: 'HR Resources', href: '/department/hr-resources' },
          { label: 'Consulting Services', href: '/department/consulting-services' },
          { label: 'Energy Distribution', href: '/department/energy-distribution' },
          { label: 'Mobile Dashboards', href: '/department/mobile-dashboards' },
          { label: 'Price Forecasting Retail', href: '/department/price-forecasting-retail' },
          { label: 'Cross and Up Selling', href: '/department/cross-and-up-selling' },
        ],
      },
      {
        title: 'Emerging Domains',
        items: [
          { label: 'Industry 4.0', href: '/domain/industry-4-0' },
          { label: 'Smart City', href: '/domain/smart-city' },
          { label: 'Smart Building', href: '/domain/smart-building' },
          { label: 'Risk Assessment Engine', href: '/domain/risk-assessment-engine' },
        ],
      },
    ],
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'About',
    href: '/about/contact',
  },
]
