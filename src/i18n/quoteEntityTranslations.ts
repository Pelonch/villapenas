import type { Locale } from './types.ts'

interface QuoteEntityTranslation {
  description?: string
  name?: string
  unitOfMeasure?: string
}

interface QuoteEntityTranslations {
  additionalOptions: Readonly<Partial<Record<number, QuoteEntityTranslation>>>
  additionalProducts: Readonly<Partial<Record<number, QuoteEntityTranslation>>>
  packages: Readonly<Partial<Record<number, QuoteEntityTranslation>>>
  services: Readonly<Partial<Record<number, QuoteEntityTranslation>>>
}

export const quoteEntityTranslations: Readonly<
  Record<Locale, QuoteEntityTranslations>
> = {
  es: {
    additionalOptions: {},
    additionalProducts: {},
    packages: {},
    services: {},
  },
  en: {
    packages: {
      1: {
        name: 'Essentials Package',
        description:
          'Includes the rancho, equipped kitchen, pool, playground, trampoline, Wi-Fi, green areas, and parking.',
      },
      2: {
        name: 'Premium Package',
        description:
          'Includes all services from the Exclusive package, plus a premium gas grill, JBL PartyBox 720 sound system, wireless microphones, and a 75-inch Smart TV.',
      },
      3: {
        name: 'Villa Peñas Courtesy Package',
        description:
          'A complimentary package approved for family, friends, or special activities. Services are selected according to the event.',
      },
    },
    services: {
      1: { name: 'Rancho' },
      2: { name: 'Equipped kitchen' },
      3: { name: 'Pool' },
      4: { name: 'Premium gas grill' },
      5: { name: 'JBL PartyBox 720 sound system' },
      6: { name: 'Wireless microphones' },
      7: { name: '75-inch Smart TV' },
      8: { name: 'Playground' },
      9: { name: 'Trampoline' },
      10: { name: 'Wi-Fi' },
    },
    additionalProducts: {
      1: {
        name: 'Popcorn',
        description: 'Freshly made popcorn preparation and service during the event.',
      },
      2: {
        name: 'Cotton candy',
        description: 'Individually served cotton candy prepared during the event.',
      },
      3: {
        name: 'Chocolate fountain',
        description: 'Chocolate fountain service with marshmallow skewers for guests.',
      },
      4: {
        name: 'Additional 30+ guests',
        description: 'For events with 31 guests or more.',
      },
    },
    additionalOptions: {
      1: {
        name: 'Option 1',
        description: 'Individual popcorn portions in paper or clear plastic bags.',
        unitOfMeasure: 'portions',
      },
      2: {
        name: 'Option 2',
        description: 'Individual popcorn portions in paper or clear plastic bags.',
        unitOfMeasure: 'portions',
      },
      3: {
        name: 'Option 3',
        unitOfMeasure: 'portions',
      },
      4: {
        name: 'Option 1',
        description: 'Individual cotton candy portions in clear plastic cups.',
        unitOfMeasure: '24 oz cups',
      },
      5: {
        name: 'Option 2',
        description: 'Individual cotton candy portions in clear plastic cups.',
        unitOfMeasure: '24 oz cups',
      },
      6: {
        name: 'Option 3',
        description: 'Individual cotton candy portions in clear plastic cups.',
        unitOfMeasure: '24 oz cups',
      },
      7: {
        name: 'Option 1',
        description: 'Chocolate fountain service with marshmallow skewers for guests.',
        unitOfMeasure: 'portions',
      },
      8: {
        name: 'Option 2',
        description: 'Chocolate fountain service with marshmallow skewers for guests.',
        unitOfMeasure: 'portions',
      },
      9: {
        name: 'Option 3',
        description: 'Chocolate fountain service with marshmallow skewers for guests.',
        unitOfMeasure: 'portions',
      },
      10: {
        name: 'Option 1',
        description: 'For events with 31 guests or more.',
        unitOfMeasure: 'units',
      },
    },
  },
}
