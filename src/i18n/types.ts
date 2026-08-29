import type { PageId } from '../app/types.ts'
import type { TravelTimeId } from '../config/location.ts'

export const supportedLocales = ['es', 'en'] as const

export type Locale = (typeof supportedLocales)[number]

export interface PageMetadata {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
  }
}

export interface PlaceholderPageContent {
  heading: string
  placeholder: string
}

export interface NotFoundPageContent {
  eyebrow: string
  heading: string
  description: string
  homeCta: string
  contactCta: string
}

export interface ContactPageContent {
  heroEyebrow: string
  heading: string
  description: string
  contactInformationEyebrow: string
  whatsappLabel: string
  whatsappCta: string
  whatsappNewTab: string
  whatsappMessage: string
  locationEyebrow: string
  locationHeading: string
  locationDescription: string
  address: string
  openMaps: string
  openMapsNewTab: string
  quoteEyebrow: string
  quoteHeading: string
  quoteDescription: string
  quoteCta: string
}

export interface HighlightedPolicyParagraph {
  after: string
  before: string
  emphasis: string
}

export interface PolicyContent {
  title: string
  paragraphs: readonly string[]
  highlightedParagraph?: HighlightedPolicyParagraph
}

export interface PoliciesPageContent {
  heroEyebrow: string
  heading: string
  description: string
  policies: readonly PolicyContent[]
  acknowledgementHeading: string
  acknowledgementDescription: string
  contactHeading: string
  contactDescription: string
  contactCta: string
  contactWhatsAppMessage: string
  contactWhatsAppNewTab: string
}

export type AmenityGroupId = 'rancho' | 'pool' | 'bbq'

export interface AmenityImage {
  src: string
  alt: string
}

export interface AmenityGroup {
  id: AmenityGroupId
  category: string
  title: string
  description: string
  images: readonly [AmenityImage, AmenityImage, AmenityImage]
}

export interface AmenitiesContent {
  eyebrow: string
  heading: string
  description: string
  groups: readonly AmenityGroup[]
}

export interface PackagesContent {
  eyebrow: string
  heading: string
  description: string
  priceLabel: string
  includedServices: string
  showAllServices: string
  showLessServices: string
  selectPackage: string
  loading: string
  empty: string
  error: string
  retry: string
  packageImageAlt: (packageName: string) => string
  formatPrice: (priceColones: number) => string
}

export interface SocialItemContent {
  alt: string
  caption: string
}

export interface InstagramContent {
  eyebrow: string
  heading: string
  description: string
  viewOnInstagram: string
  openPost: (caption: string) => string
  profileCta: string
  profileCtaNewTab: string
  items: Readonly<Record<string, SocialItemContent | undefined>>
}

export interface WhatsAppMessageContent {
  durationLabel: string
  eventDateLabel: string
  formatDuration: (durationHours: number) => string
  formatEndDayOffset: (dayOffset: number) => string
  greeting: string
  guestCountLabel: string
  packageLabel: string
  scheduleLabel: string
  extrasLabel: string
  estimatedTotalLabel: string
}

export interface QuoteContent {
  eyebrow: string
  heading: string
  description: string
  eventLegend: string
  eventDateLabel: string
  guestCountLabel: string
  decreaseGuestCount: string
  increaseGuestCount: string
  formatGuestCount: (guestCount: number) => string
  guestCountUnit: (guestCount: number) => string
  guestCountRequiresCapacityExtra: string
  guestCountMaximumReached: (maximumGuests: number) => string
  addCapacityExtra: string
  startTimeLabel: string
  endTimeLabel: string
  endTimePlaceholder: string
  includedDuration: (durationHours: number) => string
  eventDetailsRequired: string
  pastDateValidation: string
  packageLegend: string
  packagePriceLabel: string
  packagesLoading: string
  packagesEmpty: string
  packagesError: string
  retry: string
  extrasLegend: string
  extrasLoading: string
  extrasUnavailable: string
  chooseOption: (productName: string) => string
  optionRequired: (productName: string) => string
  pendingOption: string
  selectedOptionSummary: (optionName: string, price: string) => string
  viewDetails: string
  hideDetails: string
  formatPeopleQuantity: (quantity: number) => string
  formatIncludedQuantity: (quantity: number, unitOfMeasure: string | null) => string
  toggleProductDetails: (productName: string, isExpanded: boolean) => string
  toggleOptionDetails: (optionName: string, isExpanded: boolean) => string
  toggleOptions: (productName: string, isExpanded: boolean) => string
  selectPackageFirst: string
  summaryEyebrow: string
  summaryEmpty: string
  summaryEventLabel: string
  summaryEventStartTimeLabel: string
  summaryEventEndTimeLabel: string
  summaryEventDurationLabel: string
  summaryGuestCountLabel: string
  summaryPackageLabel: string
  summaryExtrasLabel: string
  summarySubtotalLabel: string
  estimatedTotalLabel: string
  estimateDisclaimer: string
  completeExtrasBeforeSending: string
  selectPackageBeforeSending: string
  whatsappCta: string
  formatDuration: (durationHours: number) => string
  formatEndDayOffset: (dayOffset: number) => string
  formatPrice: (priceColones: number) => string
  whatsappMessage: WhatsAppMessageContent
}

export interface HeroContent {
  heading: string
  aerialPreviewLabel: string
  openAerialDialog: string
  aerialDialogTitle: string
  closeAerialDialog: string
}

export interface LocationContent {
  eyebrow: string
  heading: string
  description: string
  address: string
  openMaps: string
  openMapsNewTab: string
  travelTimesLabel: string
  travelTimeLabels: Record<TravelTimeId, string>
  formatTravelTime: (minutes: number) => string
  illustratedMapAlt: string
}

export interface HomePageContent {
  hero: HeroContent
  location: LocationContent
  amenities: AmenitiesContent
  packages: PackagesContent
  instagram: InstagramContent
  quote: QuoteContent
}

export interface TranslationCatalog {
  loader: {
    tagline: string
  }
  navigation: {
    label: string
    location: string
    amenities: string
    packages: string
    quote: string
    openMenu: string
    closeMenu: string
  } & Record<PageId, string>
  languageSwitcher: {
    label: string
  }
  footer: {
    navigationLabel: string
    copyright: (year: number) => string
  }
  pages: {
    home: HomePageContent
    policies: PoliciesPageContent
    contact: ContactPageContent
    notFound: NotFoundPageContent
  }
  metadata: Record<PageId | 'notFound', PageMetadata>
}
