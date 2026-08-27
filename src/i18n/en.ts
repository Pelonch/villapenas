import type { TranslationCatalog } from './types.ts'

export const en = {
  loader: {
    tagline: 'Your moment starts here',
  },
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
        heading: 'Villa Peñas',
        aerialPreviewLabel: 'Aerial view',
        openAerialDialog: 'Open expanded aerial view',
        aerialDialogTitle: 'Aerial view of Villa Peñas',
        closeAerialDialog: 'Close aerial view',
      },
      location: {
        eyebrow: 'Location',
        heading: 'Close to everything,\naway from the routine.',
        description:
          "Villa Peñas is located in Chirco, Santa Cruz, Guanacaste, Costa Rica, with convenient access from Santa Cruz and several of the area's main destinations.",
        address:
          '1 km south of the entrance to Moya,\nChirco, Santa Cruz, Guanacaste, Costa Rica.',
        openMaps: 'Open in Google Maps',
        openMapsNewTab:
          'Open Villa Peñas location in Google Maps in a new tab',
        mapTitle: 'Villa Peñas location in Google Maps',
        mapFallbackDescription:
          'View the exact location and current route in Google Maps.',
        travelTimesLabel: 'Approximate driving times',
        travelTimeLabels: {
          santaCruz: 'Santa Cruz',
          tamarindo: 'Tamarindo',
          haciendaPinilla: 'Hacienda Pinilla',
          avellanasBeach: 'Avellanas Beach',
          guanacasteAirport: 'Guanacaste Airport (LIR)',
        },
        formatTravelTime: (minutes) => `${minutes} min`,
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
