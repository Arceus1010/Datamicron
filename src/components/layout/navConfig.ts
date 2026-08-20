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
          { label: 'Cortexus', href: '/phoenix-aip/cortexus' },
          { label: 'Phoenix Insights', href: '/phoenix-aip/phoenix-insights' },
          { label: 'Spotlight Lakehouse', href: '/phoenix-aip/spotlight-lakehouse' },
          { label: 'Dataforge', href: '/phoenix-aip/dataforge' },
        ],
      },
    ],
  },
  {
    label: 'Platforms',
    href: '/platforms',
    panel: {
      title: 'Platforms',
      description: 'Scalable data and AI platforms built for modern enterprises.',
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
          { label: 'Falcon', href: '/platforms/falcon' },
        ],
      },
      {
        title: '',
        items: [
          { label: 'EzData', href: '/platforms/ezdata' },
          { label: 'MemDB', href: '/platforms/memdb' },
          { label: 'Smart Data Governance', href: '/platforms/smart-data-governance' },
          { label: 'Excel Automation', href: '/platforms/excel-automation' },
          { label: 'Spotlight BDA', href: '/platforms/spotlight-bda' },
          { label: 'EzSync', href: '/platforms/ezsync' },
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
    href: '/about/company',
    panel: {
      title: 'About Datamicron',
      description: 'Learn about who we are, what we do, and how to get in touch.',
    },
    sections: [
      {
        title: '',
        items: [
          { label: 'Company', href: '/about/company' },
          { label: 'Contact Us', href: '/about/contact' },
          { label: 'Services', href: '/services' },
        ],
      },
    ],
  },
]
