import type { TranslationCatalog } from './types.ts'

export const en = {
  navigation: {
    label: 'Primary navigation',
    home: 'Home',
    policies: 'Policies',
    contact: 'Contact',
    location: 'Location',
    amenities: 'Amenities',
    packages: 'Packages',
    quote: 'Get a Quote',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languageSwitcher: {
    label: 'Change language',
  },
  footer: {
    navigationLabel: 'Villa Peñas information',
    copyright: (year) => `© ${year} Villa Peñas. All rights reserved.`,
  },
  pages: {
    home: {
      hero: {
        eyebrow: 'Santa Cruz, Guanacaste',
        heading: 'Villa Peñas',
        placeholder:
          'The cinematic Hero will be developed in a future milestone.',
        status: 'Structural foundation',
      },
      location: {
        eyebrow: 'Location',
        heading: 'A place to gather',
        placeholder:
          'The location composition and map will be developed in this section.',
        status: 'Section in development',
      },
      amenities: {
        eyebrow: 'Amenities',
        heading: 'Spaces made for sharing',
        placeholder:
          'The editorial amenities presentation will be developed in this section.',
        status: 'Section in development',
      },
      packages: {
        eyebrow: 'Packages',
        heading: 'Your celebration, your way',
        placeholder:
          'Dynamic packages and their backend-provided information will be integrated in this section.',
        status: 'Section in development',
      },
      instagram: {
        eyebrow: 'Instagram',
        heading: 'Moments at Villa Peñas',
        placeholder:
          'The curated Instagram visual selection will be added in this section.',
        status: 'Section in development',
      },
      quote: {
        eyebrow: 'Quote',
        heading: 'Get a Quote',
        placeholder:
          'The informational quote calculator will be developed here without creating reservations or confirming availability.',
        status: 'Section in development',
      },
    },
    policies: {
      heading: 'Policies',
      placeholder: 'Villa Peñas policies will be published here.',
    },
    contact: {
      heading: 'Contact',
      placeholder: 'Villa Peñas contact information will be available here.',
    },
  },
  metadata: {
    home: {
      title: 'Villa Peñas | Event Venue in Santa Cruz, Guanacaste',
      description:
        'Villa Peñas is a private event venue in Santa Cruz, Guanacaste, featuring a pool, rancho, equipped kitchen, BBQ area and more.',
      openGraph: {
        title: 'Villa Peñas | Event Venue in Santa Cruz, Guanacaste',
        description:
          'Villa Peñas is a private event venue in Santa Cruz, Guanacaste.',
      },
    },
    policies: {
      title: 'Villa Peñas | Policies',
      description:
        'Review Villa Peñas deposit, cancellation, and date-change policies.',
      openGraph: {
        title: 'Villa Peñas | Policies',
        description: 'Review Villa Peñas policies.',
      },
    },
    contact: {
      title: 'Villa Peñas | Contact',
      description:
        'Find Villa Peñas contact information in Santa Cruz, Guanacaste.',
      openGraph: {
        title: 'Villa Peñas | Contact',
        description: 'Find Villa Peñas contact information.',
      },
    },
  },
} satisfies TranslationCatalog
