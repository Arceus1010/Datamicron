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
      description: 'A unified AI platform powering intelligent data products across your enterprise.',
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
          { label: 'Globes (Map Engine)', href: '/platforms/globes' },
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
