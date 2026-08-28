import { createWhatsAppUrl } from '../config/whatsapp.ts'
import type { Locale, WhatsAppMessageContent } from '../i18n/types.ts'
import type { QuoteCalculation } from './calculateQuote.ts'
import { getGuestCapacityFromCalculation } from './capacity.ts'
import {
  getQuoteExtraDisplayNames,
  getQuotePackageDisplayName,
  type QuoteCatalogDisplay,
} from './display.ts'
import {
  calculateQuoteEventSchedule,
  formatQuoteEventDate,
  formatQuoteEventEndTime,
  formatQuoteEventTime,
  validateQuoteEvent,
} from './event.ts'
import type { QuoteEventDetails } from './types.ts'

interface CreateWhatsAppQuoteUrlOptions {
  calculation: QuoteCalculation
  content: WhatsAppMessageContent
  displayCatalog: QuoteCatalogDisplay
  event: QuoteEventDetails
  formatPrice: (priceColones: number) => string
  locale: Locale
}

export function createWhatsAppQuoteUrl({
  calculation,
  content,
  displayCatalog,
  event,
  formatPrice,
  locale,
}: CreateWhatsAppQuoteUrlOptions): string | null {
  const { maximumGuests } = getGuestCapacityFromCalculation(calculation)

  if (
    !validateQuoteEvent(event, undefined, maximumGuests).isComplete ||
    calculation.selectedPackage === null ||
    calculation.estimatedTotal === null ||
    calculation.incompleteProducts.length > 0
  ) {
    return null
  }

  const packageName = getQuotePackageDisplayName(
    displayCatalog,
    calculation.selectedPackage.id,
    calculation.selectedPackage.name,
  )
  const eventSchedule = calculateQuoteEventSchedule(
    event.startTime,
    calculation.selectedExtraHours,
  )
  const endTime = formatQuoteEventEndTime(
    eventSchedule,
    locale,
    content.formatEndDayOffset,
  )

  if (endTime === null) {
    return null
  }

  const lines = [
    content.greeting,
    '',
    `${content.eventDateLabel}: ${formatQuoteEventDate(event.eventDate, locale)}`,
    `${content.guestCountLabel}: ${event.guestCount}`,
    `${content.scheduleLabel}: ${formatQuoteEventTime(event.startTime, locale)} - ${endTime}`,
    `${content.durationLabel}: ${content.formatDuration(eventSchedule.totalDurationHours)}`,
    '',
    `${content.packageLabel}:`,
    `${packageName} - ${formatPrice(calculation.packageSubtotal)}`,
  ]

  if (calculation.extras.length > 0) {
    lines.push('', content.extrasLabel)

    for (const extra of calculation.extras) {
      const displayNames = getQuoteExtraDisplayNames(
        displayCatalog,
        extra.productId,
        extra.productName,
        extra.optionId,
        extra.optionName,
      )

      lines.push(
        `- ${displayNames.productName} - ${displayNames.optionName} - ${formatPrice(extra.priceColones)}`,
      )
    }
  }

  lines.push(
    '',
    `${content.estimatedTotalLabel}: ${formatPrice(calculation.estimatedTotal)}`,
  )

  return createWhatsAppUrl(lines.join('\n'))
}
