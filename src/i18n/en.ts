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
        eyebrow: 'INSTAGRAM',
        heading: 'Moments at Villa Peñas',
        description: 'A glimpse of life at Villa Peñas.',
        loading: 'Loading moments from Villa Peñas',
        empty: 'More moments from Villa Peñas will be shared soon.',
        error: "We couldn't load the moments right now.",
        retry: 'Try again',
        viewOnInstagram: 'View on Instagram',
        videoLabel: 'VIDEO',
        carouselLabel: 'CAROUSEL',
        openPost: (caption) =>
          `Open ${caption} on Instagram in a new tab`,
        profileCta: 'Follow us on Instagram',
        profileCtaNewTab:
          'Open the Villa Peñas Instagram profile in a new tab',
        posts: {
          'pool-at-dusk': {
            alt: 'Villa Peñas pool lit at dusk',
            caption: 'Dusk by the pool',
          },
          'rancho-gathering': {
            alt: 'Rancho prepared for a celebration at Villa Peñas',
            caption: 'Spaces to share',
          },
          'bbq-after-dark': {
            alt: 'Villa Peñas illuminated BBQ area at night',
            caption: 'Nights around the BBQ',
          },
          'pool-and-gardens': {
            alt: 'Villa Peñas pool, rancho and gardens',
            caption: 'A place to enjoy',
          },
          'playground-afternoon': {
            alt: 'Playground surrounded by nature at Villa Peñas',
            caption: 'Outdoor fun',
          },
          'open-air-rancho': {
            alt: 'Outdoor view of the Villa Peñas rancho and social areas',
            caption: 'Villa Peñas outdoors',
          },
        },
      },
      quote: {
        eyebrow: 'Quote',
        heading: 'Build your event quote.',
        description:
          'Create an estimated quote for your event. Availability and final details are confirmed directly with Villa Peñas.',
        eventLegend: '1. Date and time',
        eventDateLabel: 'Event date',
        guestCountLabel: 'Number of guests',
        decreaseGuestCount: 'Decrease guest count',
        increaseGuestCount: 'Increase guest count',
        formatGuestCount: (guestCount) =>
          `${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`,
        guestCountUnit: (guestCount) =>
          guestCount === 1 ? 'guest' : 'guests',
        guestCountRequiresCapacityExtra:
          'For events with more than 30 guests, you must add the additional guest option.',
        guestCountMaximumReached: (maximumGuests) =>
          `For events with more than ${maximumGuests} guests, please contact Villa Peñas directly.`,
        addCapacityExtra: 'Add extra',
        startTimeLabel: 'Start time',
        endTimeLabel: 'End time',
        endTimePlaceholder: 'Select a start time',
        includedDuration: (durationHours) => `Includes ${durationHours} hours`,
        eventDetailsRequired:
          'Complete your event date, guest count, and time to continue.',
        pastDateValidation: 'Choose today or a future date.',
        packageLegend: '2. Choose a package',
        packagePriceLabel: 'Package price',
        packagesLoading: 'Loading packages',
        packagesEmpty: 'Packages will be available soon.',
        packagesError: "We couldn't load packages right now.",
        retry: 'Try again',
        extrasLegend: '3. Add optional extras',
        extrasLoading: 'Loading extras',
        extrasUnavailable:
          'Extras are temporarily unavailable. You can still ask about a package.',
        chooseOption: (productName) => `Choose an option for ${productName}`,
        optionRequired: (productName) => `Choose an option for ${productName}.`,
        pendingOption: 'Choose an option to continue',
        selectedOptionSummary: (optionName, price) => `${optionName} · ${price}`,
        viewDetails: 'View details',
        hideDetails: 'Hide details',
        formatPeopleQuantity: (quantity) => `${quantity} guests`,
        formatIncludedQuantity: (quantity, unitOfMeasure) =>
          unitOfMeasure ? `${quantity} ${unitOfMeasure}` : `Includes ${quantity}`,
        toggleProductDetails: (productName, isExpanded) =>
          `${isExpanded ? 'Hide' : 'View'} details for ${productName}`,
        toggleOptionDetails: (optionName, isExpanded) =>
          `${isExpanded ? 'Hide' : 'View'} details for ${optionName}`,
        toggleOptions: (productName, isExpanded) =>
          `${isExpanded ? 'Hide' : 'Show'} options for ${productName}`,
        selectPackageFirst: 'Choose a package before adding extras.',
        summaryEyebrow: 'Summary',
        summaryEmpty: 'Choose a package to see your event’s estimated total.',
        summaryEventLabel: 'Date and time',
        summaryEventStartTimeLabel: 'Start',
        summaryEventEndTimeLabel: 'End',
        summaryEventDurationLabel: 'Duration',
        summaryGuestCountLabel: 'Guests',
        summaryPackageLabel: 'Package',
        summaryExtrasLabel: 'Extras',
        summarySubtotalLabel: 'Subtotal',
        estimatedTotalLabel: 'Estimated total',
        estimateDisclaimer:
          'Estimated price. Subject to availability and confirmation.',
        completeExtrasBeforeSending:
          'Complete your extra options to continue.',
        selectPackageBeforeSending:
          'Choose a package before asking on WhatsApp.',
        whatsappCta: 'Ask on WhatsApp',
        formatDuration: (durationHours) => `${durationHours} hours`,
        formatEndDayOffset: (dayOffset) =>
          dayOffset === 1 ? 'next day' : `${dayOffset} days later`,
        formatPrice: (priceColones) =>
          new Intl.NumberFormat('en-CR', {
            currency: 'CRC',
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: 'currency',
          }).format(priceColones),
        whatsappMessage: {
          durationLabel: 'Duration',
          eventDateLabel: 'Event date',
          formatDuration: (durationHours) => `${durationHours} hours`,
          formatEndDayOffset: (dayOffset) =>
            dayOffset === 1 ? 'next day' : `${dayOffset} days later`,
          greeting: 'Hello, I would like to ask about availability at Villa Peñas.',
          guestCountLabel: 'Guests',
          packageLabel: 'Package',
          scheduleLabel: 'Schedule',
          extrasLabel: 'Extras:',
          estimatedTotalLabel: 'Estimated total',
        },
      },
    },
    policies: {
      heroEyebrow: 'Policies',
      heading: 'Reservation and\nrefund policies.',
      description:
        'We want every reservation to be clear from the start. Here you’ll find the conditions that apply to booking, cancelling, and rescheduling your event at Villa Peñas.',
      policies: [
        {
          title: 'Reservation',
          paragraphs: [],
          highlightedParagraph: {
            before: 'The date is confirmed only after a ',
            emphasis: '₡20,000',
            after: ' deposit has been paid.',
          },
        },
        {
          title: 'Cancellations',
          paragraphs: [
            'If the reservation is cancelled 7 or more days in advance, 100% of the deposit will be refunded.',
            'If the reservation is cancelled less than 7 days in advance, the deposit is non-refundable.',
          ],
        },
        {
          title: 'Date change',
          paragraphs: [
            'One date change is permitted, subject to availability and with at least 7 days’ notice.',
          ],
        },
        {
          title: 'No-show',
          paragraphs: [
            'If the client does not attend on the reserved date, the reservation will be considered automatically cancelled and the deposit will not be refunded.',
          ],
        },
        {
          title: 'Remaining balance',
          paragraphs: ['The remaining balance must be paid one day before the event.'],
        },
        {
          title: 'Damage to the property',
          paragraphs: [
            'The client is responsible for any damage caused to the facilities, furniture, or equipment during the event and must cover the cost of repair or replacement.',
          ],
        },
        {
          title: 'Force majeure',
          paragraphs: [
            'If Villa Peñas must cancel the reservation due to an unforeseen event or force majeure, the client may choose between a full refund of the deposit or rescheduling the event at no additional cost.',
          ],
        },
      ],
      acknowledgementHeading: 'Clear from the moment you book.',
      acknowledgementDescription:
        'By confirming a reservation at Villa Peñas, the client acknowledges the reservation and refund policies outlined on this page.',
      contactHeading: 'Have a question?',
      contactDescription:
        'We’re here to help before you confirm your reservation.',
      contactCta: 'Ask us on WhatsApp',
      contactWhatsAppMessage:
        'Hello, I have a question about Villa Peñas reservation policies.',
      contactWhatsAppNewTab:
        'Open a WhatsApp conversation about Villa Peñas policies in a new tab',
    },
    contact: {
      heroEyebrow: 'Contact',
      heading: 'Let’s talk about your next event.',
      description:
        'Have a date in mind or want to know more about Villa Peñas? Send us a message and we’ll be happy to help you plan your event.',
      contactInformationEyebrow: 'Contact information',
      whatsappLabel: 'WhatsApp / Phone',
      whatsappCta: 'Message us on WhatsApp',
      whatsappNewTab: 'Open a WhatsApp conversation with Villa Peñas in a new tab',
      whatsappMessage: 'Hello, I would like more information about Villa Peñas.',
      locationEyebrow: 'Location',
      locationHeading: 'Close to your next celebration.',
      locationDescription:
        'Villa Peñas is in Chirco, Santa Cruz, Guanacaste, in a setting made for gathering and celebrating.',
      address: 'Chirco, Santa Cruz,\nGuanacaste, Costa Rica',
      openMaps: 'Open in Google Maps',
      openMapsNewTab:
        'Open the Villa Peñas location in Google Maps in a new tab',
      quoteEyebrow: 'Quote',
      quoteHeading: 'Already have an event in mind?',
      quoteDescription:
        'Build an estimated quotation with our packages and optional extras.',
      quoteCta: 'Get a Quote',
    },
    notFound: {
      eyebrow: '404',
      heading: 'This page is not available.',
      description:
        'The link you opened does not exist or is no longer available. Return home to continue exploring Villa Peñas.',
      homeCta: 'Return home',
      contactCta: 'Go to contact',
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
      title: 'Reservation & Refund Policies | Villa Peñas',
      description:
        'Review Villa Peñas reservation, cancellation, rescheduling, and refund policies.',
      openGraph: {
        title: 'Reservation & Refund Policies | Villa Peñas',
        description: 'Review Villa Peñas reservation and refund policies.',
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
    notFound: {
      title: 'Page not found | Villa Peñas',
      description: 'The requested Villa Peñas page is not available.',
      openGraph: {
        title: 'Page not found | Villa Peñas',
        description: 'The requested Villa Peñas page is not available.',
      },
    },
  },
} satisfies TranslationCatalog
