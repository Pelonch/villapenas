import type { TranslationCatalog } from './types.ts'
import { amenityImageSources } from '../config/amenities.ts'

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
        travelTimesLabel: 'Approximate driving times',
        travelTimeLabels: {
          santaCruz: 'Santa Cruz',
          tamarindo: 'Tamarindo',
          haciendaPinilla: 'Hacienda Pinilla',
          avellanasBeach: 'Avellanas Beach',
          guanacasteAirport: 'Guanacaste Airport (LIR)',
        },
        formatTravelTime: (minutes) => `${minutes} min`,
        illustratedMapAlt:
          'Illustrated map of Villa Peñas in Chirco, Santa Cruz, showing its proximity to Santa Cruz, Tamarindo, Hacienda Pinilla, Avellanas Beach, and Guanacaste Airport.',
      },
      amenities: {
        eyebrow: 'Amenities',
        heading: 'Spaces to enjoy together.',
        description:
          'Every space at Villa Peñas is designed so you can enjoy your event your way.',
        groups: [
          {
            id: 'rancho',
            category: 'Rancho and equipped kitchen',
            title: 'Everything ready to share.',
            description:
              'A spacious and welcoming place to gather, cook and enjoy together, with an equipped kitchen so everything you need is close at hand during your event.',
            images: [
              {
                src: amenityImageSources.rancho[0],
                alt: 'General view of the Villa Peñas rancho',
              },
              {
                src: amenityImageSources.rancho[1],
                alt: 'Villa Peñas equipped kitchen',
              },
              {
                src: amenityImageSources.rancho[2],
                alt: 'Villa Peñas dining and gathering area',
              },
            ],
          },
          {
            id: 'pool',
            category: 'Pool and playground',
            title: 'Something for everyone.',
            description:
              'A pool, outdoor areas and playground so both adults and children can find their own space to enjoy.',
            images: [
              {
                src: amenityImageSources.pool[0],
                alt: 'Villa Peñas pool area',
              },
              {
                src: amenityImageSources.pool[1],
                alt: 'Villa Peñas playground',
              },
              {
                src: amenityImageSources.pool[2],
                alt: 'Villa Peñas pool deck and outdoor area',
              },
            ],
          },
          {
            id: 'bbq',
            category: 'BBQ and entertainment',
            title: 'Let the celebration begin.',
            description:
              'BBQ area, grill, karaoke, speaker and a 75-inch screen for everything from a relaxed afternoon to a celebration with music.',
            images: [
              {
                src: amenityImageSources.bbq[0],
                alt: 'Villa Peñas BBQ rancho and grill',
              },
              {
                src: amenityImageSources.bbq[1],
                alt: 'Villa Peñas karaoke and speaker area',
              },
              {
                src: amenityImageSources.bbq[2],
                alt: 'Villa Peñas 75-inch screen and entertainment area',
              },
            ],
          },
        ],
      },
      packages: {
        eyebrow: 'Packages',
        heading: 'Choose how you want to enjoy Villa Peñas.',
        description:
          'Each package offers a different way to experience your event. Explore what each one includes and find the option that best fits your celebration.',
        priceLabel: 'Price',
        includedServices: 'Included',
        showAllServices: 'See everything included',
        showLessServices: 'Show less',
        selectPackage: 'Select package',
        loading: 'Loading packages',
        empty: 'Our packages will be available soon.',
        error: "We couldn't load the packages right now.",
        retry: 'Try again',
        packageImageAlt: (packageName) =>
          `Temporary image for the ${packageName} package`,
        formatPrice: (priceColones) =>
          new Intl.NumberFormat('en-CR', {
            currency: 'CRC',
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          }).format(priceColones),
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
