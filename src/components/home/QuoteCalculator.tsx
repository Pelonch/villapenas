import { useEffect, useRef, useState, type RefObject } from 'react'
import { quoteCapacityConfig } from '../../config/quoteCapacity.ts'
import type { Locale, QuoteContent } from '../../i18n/types.ts'
import { calculateQuote, type QuoteCalculation } from '../../quote/calculateQuote.ts'
import { useQuoteContext } from '../../quote/context.ts'
import { getGuestCapacity } from '../../quote/capacity.ts'
import {
  getQuoteCatalogDisplay,
  getQuoteExtraDisplayNames,
  getQuotePackageDisplayName,
  type QuoteAdditionalProductDisplay,
  type QuoteAdditionalProductOptionDisplay,
  type QuoteCatalogDisplay,
  type QuotePackageDisplay,
} from '../../quote/display.ts'
import {
  calculateQuoteEventSchedule,
  formatQuoteEventDate,
  formatQuoteEventEndTime,
  formatQuoteEventTime,
  getLocalTodayValue,
  type QuoteEventSchedule,
  type QuoteEventValidation,
  validateQuoteEvent,
} from '../../quote/event.ts'
import type { QuoteEventDetails, QuoteEventField } from '../../quote/types.ts'
import { createWhatsAppQuoteUrl } from '../../quote/whatsapp.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

interface QuoteCalculatorProps {
  content: QuoteContent
  locale: Locale
  onMobileVisibilityChange: (isVisible: boolean) => void
}

interface PackageSelectorProps {
  content: QuoteContent
  packages: readonly QuotePackageDisplay[]
  selectedPackageId: number | null
  onSelectPackage: (packageId: number) => void
}

interface ExtrasSelectorProps {
  content: QuoteContent
  expandedProductId: number | null
  isDisabled: boolean
  onExpandedProductIdHandled: () => void
  products: readonly QuoteAdditionalProductDisplay[]
  selectedOptionIdsByProduct: ReadonlyMap<number, number>
  selectedProductIds: ReadonlySet<number>
  onSelectOption: (productId: number, optionId: number) => void
  onToggleProduct: (productId: number, isSelected: boolean) => void
}

interface QuoteSummaryProps {
  calculation: QuoteCalculation
  content: QuoteContent
  displayCatalog: QuoteCatalogDisplay
  event: QuoteEventDetails
  eventSchedule: QuoteEventSchedule
  eventValidation: QuoteEventValidation
  isPackageDataUnavailable: boolean
  locale: Locale
  summaryRef: RefObject<HTMLElement | null>
}

interface MobileQuoteSummaryBarProps {
  calculation: QuoteCalculation
  content: QuoteContent
  displayCatalog: QuoteCatalogDisplay
  isSummaryVisible: boolean
  onViewSummary: () => void
}

interface EventDetailsFieldsProps {
  content: QuoteContent
  event: QuoteEventDetails
  locale: Locale
  minDate: string
  schedule: QuoteEventSchedule
  validation: QuoteEventValidation
  guestCapacityOptionId: number | null
  guestCountLimit: number
  canAddCapacityExtra: boolean
  onChange: (field: QuoteEventField, value: string) => void
  onAddCapacityExtra: () => void
  onGuestCountChange: (guestCount: number | null) => void
}

interface GuestCountGuidance {
  capacityOptionId: number | null
  kind: 'needs-capacity-extra' | 'maximum-reached'
  maximumGuests: number
}

function RadioIndicator() {
  return (
    <span
      className="relative size-5 shrink-0 rounded-full border border-ink/35 after:absolute after:inset-1 after:scale-0 after:rounded-full after:bg-ink after:transition-transform peer-checked:border-ink peer-checked:after:scale-100 motion-reduce:after:transition-none"
      aria-hidden="true"
    />
  )
}

function CheckboxIndicator() {
  return (
    <span
      className="flex size-5 shrink-0 items-center justify-center border border-ink/35 text-transparent transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper motion-reduce:transition-none"
      aria-hidden="true"
    >
      <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m2 6 2.5 2.5L10 3" />
      </svg>
    </span>
  )
}

function DisclosureIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      className={`size-4 transition-transform motion-reduce:transition-none ${isExpanded ? 'rotate-180' : ''}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m3 6 5 5 5-5" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M20.3 11.6a8.3 8.3 0 0 1-12.25 7.3L4 20l1.2-3.8A8.3 8.3 0 1 1 20.3 11.6Z" />
      <path d="M8.6 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.3.1.5 0l.7-.8c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.8-.5.3-1.1.4-1.7.3-1.1-.2-2.2-.7-3.1-1.5a10 10 0 0 1-2.3-2.9c-.4-.8-.6-1.6-.5-2.5Z" />
    </svg>
  )
}

function getDescription(description: string | null): string | null {
  const trimmedDescription = description?.trim()

  return trimmedDescription || null
}

function getOptionDetailLines(
  option: QuoteAdditionalProductOptionDisplay,
  content: QuoteContent,
): readonly string[] {
  const detailLines: string[] = []
  const unitOfMeasure = option.unitOfMeasure?.trim() || null

  if (option.peopleQuantity !== null) {
    detailLines.push(content.formatPeopleQuantity(option.peopleQuantity))
  }

  if (option.includedQuantity !== null) {
    detailLines.push(
      content.formatIncludedQuantity(option.includedQuantity, unitOfMeasure),
    )
  } else if (unitOfMeasure) {
    detailLines.push(unitOfMeasure)
  }

  return detailLines
}

function getEventValidationMessage(
  content: QuoteContent,
  validation: QuoteEventValidation,
): string | null {
  switch (validation.issue) {
    case 'past-date':
      return content.pastDateValidation
    case 'missing':
      return content.eventDetailsRequired
    case null:
      return null
  }
}

function EventDetailsFields({
  content,
  event,
  locale,
  minDate,
  schedule,
  validation,
  guestCapacityOptionId,
  guestCountLimit,
  canAddCapacityExtra,
  onChange,
  onAddCapacityExtra,
  onGuestCountChange,
}: EventDetailsFieldsProps) {
  const validationId = 'quote-event-validation'
  const [guestCountGuidance, setGuestCountGuidance] = useState<GuestCountGuidance | null>(
    null,
  )
  const validationMessage = getEventValidationMessage(content, validation)
  const showValidation = validation.hasValues && validationMessage !== null
  const hasDateError = validation.issue === 'past-date'
  const hasGuestCountError =
    validation.issue === 'missing' &&
    (event.guestCount === null || event.guestCount < 1)
  const endTime = formatQuoteEventEndTime(
    schedule,
    locale,
    content.formatEndDayOffset,
  )
  const isGuestCountGuidanceCurrent =
    guestCountGuidance !== null &&
    guestCountGuidance.capacityOptionId === guestCapacityOptionId &&
    guestCountGuidance.maximumGuests === guestCountLimit &&
    event.guestCount === guestCountLimit &&
    (guestCountGuidance.kind === 'needs-capacity-extra'
      ? guestCountLimit === quoteCapacityConfig.includedGuestLimit
      : guestCountLimit > quoteCapacityConfig.includedGuestLimit)

  const updateGuestCount = (guestCount: number | null) => {
    if (guestCount === null) {
      setGuestCountGuidance(null)
      onGuestCountChange(null)

      return
    }

    if (guestCount > guestCountLimit) {
      setGuestCountGuidance({
        kind:
          guestCountLimit === quoteCapacityConfig.includedGuestLimit
            ? 'needs-capacity-extra'
            : 'maximum-reached',
        capacityOptionId: guestCapacityOptionId,
        maximumGuests: guestCountLimit,
      })
      onGuestCountChange(guestCountLimit)

      return
    }

    setGuestCountGuidance(null)
    onGuestCountChange(guestCount)
  }

  const addCapacityExtra = () => {
    onAddCapacityExtra()
    setGuestCountGuidance(null)
  }

  return (
    <fieldset className="border-b border-ink/15 pb-10">
      <legend className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {content.eventLegend}
      </legend>
      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1.25fr)_minmax(12.5rem,0.75fr)]">
          <label className="block" htmlFor="quote-event-date">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
              {content.eventDateLabel}
            </span>
            <input
              id="quote-event-date"
              className="mt-3 min-h-12 w-full border border-ink/20 bg-paper px-3 font-sans text-base text-ink outline-none transition-colors focus-visible:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
              type="date"
              min={minDate}
              value={event.eventDate}
              required
              aria-describedby={showValidation ? validationId : undefined}
              aria-invalid={hasDateError || undefined}
              onChange={(inputEvent) =>
                onChange('eventDate', inputEvent.currentTarget.value)
              }
            />
          </label>
          <div>
            <label
              className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70"
              htmlFor="quote-guest-count"
            >
              {content.guestCountLabel}
            </label>
            <div className="mt-3 flex min-h-12 items-center border border-ink/20 bg-paper">
              <button
                className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center border-r border-ink/15 text-lg text-ink/70 transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:cursor-not-allowed disabled:text-ink/25 motion-reduce:transition-none"
                type="button"
                aria-label={content.decreaseGuestCount}
                disabled={event.guestCount === null || event.guestCount <= 1}
                onClick={() =>
                  updateGuestCount(Math.max(1, (event.guestCount ?? 1) - 1))
                }
              >
                <span aria-hidden="true">-</span>
              </button>
              <input
                id="quote-guest-count"
                className="min-h-11 w-12 appearance-none bg-transparent text-right text-base text-ink outline-none"
                type="number"
                inputMode="numeric"
                min="1"
                max={String(guestCountLimit)}
                step="1"
                value={event.guestCount ?? ''}
                required
                aria-describedby={showValidation ? validationId : undefined}
                aria-invalid={hasGuestCountError || undefined}
                aria-valuetext={
                  event.guestCount === null
                    ? undefined
                    : content.formatGuestCount(event.guestCount)
                }
                onChange={(inputEvent) => {
                  const value = inputEvent.currentTarget.valueAsNumber

                  updateGuestCount(
                    Number.isInteger(value) && value >= 1 ? value : null,
                  )
                }}
              />
              <span className="min-w-0 flex-1 truncate pl-2 text-sm text-ink/65">
                {event.guestCount === null
                  ? ''
                  : content.guestCountUnit(event.guestCount)}
              </span>
              <button
                className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center border-l border-ink/15 text-lg text-ink/70 transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
                type="button"
                aria-label={content.increaseGuestCount}
                onClick={() => updateGuestCount((event.guestCount ?? 0) + 1)}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            {guestCountGuidance !== null && isGuestCountGuidanceCurrent ? (
              <div className="mt-3 text-sm leading-6 text-ink/65">
                <p>
                  {guestCountGuidance.kind === 'needs-capacity-extra'
                    ? content.guestCountRequiresCapacityExtra
                    : content.guestCountMaximumReached(guestCountLimit)}
                </p>
                {guestCountGuidance.kind === 'needs-capacity-extra' &&
                canAddCapacityExtra ? (
                  <button
                    className="mt-1 min-h-11 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-clay underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                    type="button"
                    onClick={addCapacityExtra}
                  >
                    {content.addCapacityExtra}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block" htmlFor="quote-start-time">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
              {content.startTimeLabel}
            </span>
            <input
              id="quote-start-time"
              className="mt-3 min-h-12 w-full border border-ink/20 bg-paper px-3 font-sans text-base text-ink outline-none transition-colors focus-visible:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
              type="time"
              value={event.startTime}
              required
              aria-describedby={showValidation ? validationId : undefined}
              onChange={(inputEvent) =>
                onChange('startTime', inputEvent.currentTarget.value)
              }
            />
          </label>
          <div>
            <span
              id="quote-end-time-label"
              className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70"
            >
              {content.endTimeLabel}
            </span>
            <output
              className="mt-3 flex min-h-12 w-full items-center border border-ink/15 bg-ink/[0.04] px-3 font-sans text-base text-ink/80"
              aria-labelledby="quote-end-time-label"
              aria-describedby="quote-base-duration"
            >
              {endTime ?? content.endTimePlaceholder}
            </output>
            <p id="quote-base-duration" className="mt-2 text-sm leading-6 text-ink/60">
              {content.includedDuration(schedule.baseDurationHours)}
            </p>
          </div>
        </div>
      </div>
      {showValidation ? (
        <p
          id={validationId}
          className="mt-4 text-sm leading-6 text-clay"
          role="status"
        >
          {validationMessage}
        </p>
      ) : null}
    </fieldset>
  )
}

function PackageSelector({
  content,
  packages,
  selectedPackageId,
  onSelectPackage,
}: PackageSelectorProps) {
  return (
    <fieldset>
      <legend className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {content.packageLegend}
      </legend>
      <div className="mt-6 grid gap-3">
        {packages.map((venuePackage) => {
          const inputId = `quote-package-${venuePackage.id}`
          const formattedPrice = content.formatPrice(venuePackage.priceColones)

          return (
            <label
              key={venuePackage.id}
              className="flex min-h-18 cursor-pointer items-center gap-4 border border-ink/15 bg-paper px-4 py-4 transition-colors hover:border-ink/45 focus-within:outline focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-gold has-[:checked]:border-ink has-[:checked]:bg-cream motion-reduce:transition-none sm:px-5"
              htmlFor={inputId}
            >
              <input
                id={inputId}
                className="peer sr-only"
                type="radio"
                name="quote-package"
                value={venuePackage.id}
                checked={selectedPackageId === venuePackage.id}
                onChange={() => onSelectPackage(venuePackage.id)}
              />
              <RadioIndicator />
              <span className="min-w-0 flex-1 font-display text-2xl leading-none tracking-[-0.025em] text-ink sm:text-3xl">
                {venuePackage.name}
              </span>
              <data
                className="shrink-0 font-sans text-sm font-semibold text-ink"
                value={String(venuePackage.priceColones)}
                aria-label={`${content.packagePriceLabel}: ${formattedPrice}`}
              >
                {formattedPrice}
              </data>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function ExtrasSelector({
  content,
  expandedProductId,
  isDisabled,
  onExpandedProductIdHandled,
  products,
  selectedOptionIdsByProduct,
  selectedProductIds,
  onSelectOption,
  onToggleProduct,
}: ExtrasSelectorProps) {
  const guidanceId = 'quote-extras-guidance'
  const [expandedProductIds, setExpandedProductIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  )
  const [expandedProductDetailIds, setExpandedProductDetailIds] = useState<
    ReadonlySet<number>
  >(() => new Set())
  const [expandedOptionDetailIds, setExpandedOptionDetailIds] = useState<
    ReadonlySet<number>
  >(() => new Set())

  const toggleOptions = (productId: number) => {
    if (expandedProductId === productId) {
      onExpandedProductIdHandled()

      return
    }

    setExpandedProductIds((productIds) => {
      const nextProductIds = new Set(productIds)

      if (nextProductIds.has(productId)) {
        nextProductIds.delete(productId)
      } else {
        nextProductIds.add(productId)
      }

      return nextProductIds
    })
  }

  const handleProductToggle = (productId: number, isSelected: boolean) => {
    onToggleProduct(productId, isSelected)
    if (!isSelected && expandedProductId === productId) {
      onExpandedProductIdHandled()
    }
    setExpandedProductIds((productIds) => {
      const nextProductIds = new Set(productIds)

      if (isSelected) {
        nextProductIds.add(productId)
      } else {
        nextProductIds.delete(productId)
      }

      return nextProductIds
    })
  }

  const toggleProductDetails = (productId: number) => {
    setExpandedProductDetailIds((productIds) => {
      const nextProductIds = new Set(productIds)

      if (nextProductIds.has(productId)) {
        nextProductIds.delete(productId)
      } else {
        nextProductIds.add(productId)
      }

      return nextProductIds
    })
  }

  const toggleOptionDetails = (optionId: number) => {
    setExpandedOptionDetailIds((optionIds) => {
      const nextOptionIds = new Set(optionIds)

      if (nextOptionIds.has(optionId)) {
        nextOptionIds.delete(optionId)
      } else {
        nextOptionIds.add(optionId)
      }

      return nextOptionIds
    })
  }

  return (
    <fieldset
      className="mt-12 border-t border-ink/15 pt-10 disabled:opacity-60"
      disabled={isDisabled}
      aria-describedby={isDisabled ? guidanceId : undefined}
    >
      <legend className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {content.extrasLegend}
      </legend>
      {isDisabled ? (
        <p id={guidanceId} className="mt-4 text-sm leading-6 text-ink/65">
          {content.selectPackageFirst}
        </p>
      ) : null}
      <div className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
        {products.map((product) => {
          const checkboxId = `quote-product-${product.id}`
          const isSelected = selectedProductIds.has(product.id)
          const selectedOptionId = selectedOptionIdsByProduct.get(product.id)
          const selectedOption = product.options.find(
            (option) => option.id === selectedOptionId,
          )
          const isOptionsExpanded =
            isSelected &&
            (expandedProductIds.has(product.id) || expandedProductId === product.id)
          const productDescription = getDescription(product.description)
          const isProductDetailsExpanded = expandedProductDetailIds.has(product.id)
          const optionsPanelId = `quote-product-${product.id}-options`
          const productDetailsId = `quote-product-${product.id}-details`
          const optionMessageId = `quote-product-${product.id}-option-required`

          return (
            <div key={product.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <label
                  className={`flex min-h-11 min-w-0 flex-1 items-center gap-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-gold ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  htmlFor={checkboxId}
                >
                  <input
                    id={checkboxId}
                    className="peer sr-only"
                    type="checkbox"
                    checked={isSelected}
                    onChange={(event) =>
                      handleProductToggle(product.id, event.currentTarget.checked)
                    }
                    aria-describedby={
                      isSelected && selectedOption === undefined
                        ? optionMessageId
                        : undefined
                    }
                  />
                  <CheckboxIndicator />
                  <span className="font-display text-2xl leading-none tracking-[-0.025em] text-ink sm:text-3xl">
                    {product.name}
                  </span>
                </label>
                {isSelected ? (
                  <button
                    className="inline-flex size-11 shrink-0 items-center justify-center text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
                    type="button"
                    aria-controls={optionsPanelId}
                    aria-expanded={isOptionsExpanded}
                    aria-label={content.toggleOptions(product.name, isOptionsExpanded)}
                    onClick={() => toggleOptions(product.id)}
                  >
                    <DisclosureIcon isExpanded={isOptionsExpanded} />
                  </button>
                ) : null}
              </div>

              {productDescription && !isOptionsExpanded ? (
                <div className="ml-8 mt-2 sm:ml-9">
                  <button
                    className="min-h-11 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-clay underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                    type="button"
                    aria-controls={productDetailsId}
                    aria-expanded={isProductDetailsExpanded}
                    aria-label={content.toggleProductDetails(
                      product.name,
                      isProductDetailsExpanded,
                    )}
                    onClick={() => toggleProductDetails(product.id)}
                  >
                    {isProductDetailsExpanded
                      ? content.hideDetails
                      : content.viewDetails}
                  </button>
                  {isProductDetailsExpanded ? (
                    <p
                      id={productDetailsId}
                      className="pb-1 text-sm leading-6 text-ink/65"
                    >
                      {productDescription}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {isSelected && !isOptionsExpanded ? (
                <p
                  id={optionMessageId}
                  className="ml-8 mt-2 text-sm leading-6 text-ink/60 sm:ml-9"
                >
                  {selectedOption
                    ? content.selectedOptionSummary(
                        selectedOption.name,
                        content.formatPrice(selectedOption.priceColones),
                      )
                    : content.pendingOption}
                </p>
              ) : null}

              {isOptionsExpanded ? (
                <fieldset
                  id={optionsPanelId}
                  className="vp-quote-options-reveal ml-8 mt-5 border-l border-gold/60 pl-5 sm:ml-9"
                >
                  <legend className="sr-only">{content.chooseOption(product.name)}</legend>
                  {productDescription ? (
                    <p className="mb-5 text-sm leading-6 text-ink/65">
                      {productDescription}
                    </p>
                  ) : null}
                  <div className="grid gap-2">
                    {product.options.map((option) => {
                      const optionId = `quote-product-${product.id}-option-${option.id}`
                      const optionDetailsId = `quote-option-${option.id}-details`
                      const optionDescription = getDescription(option.description)
                      const optionDetailLines = getOptionDetailLines(option, content)
                      const hasOptionDetails =
                        optionDescription !== null || optionDetailLines.length > 0
                      const isOptionDetailsExpanded = expandedOptionDetailIds.has(
                        option.id,
                      )
                      const formattedPrice = content.formatPrice(option.priceColones)

                      return (
                        <div key={option.id}>
                          <label
                            className="flex min-h-12 cursor-pointer items-center gap-3 py-1 focus-within:outline focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-gold"
                            htmlFor={optionId}
                          >
                            <input
                              id={optionId}
                              className="peer sr-only"
                              type="radio"
                              name={`quote-product-${product.id}-option`}
                              value={option.id}
                              checked={selectedOptionId === option.id}
                              onChange={() => onSelectOption(product.id, option.id)}
                            />
                            <RadioIndicator />
                            <span className="min-w-0 flex-1 text-sm leading-6 text-ink/85 sm:text-base">
                              {option.name}
                            </span>
                            <data
                              className="shrink-0 text-sm font-semibold text-ink"
                              value={String(option.priceColones)}
                              aria-label={formattedPrice}
                            >
                              {formattedPrice}
                            </data>
                          </label>
                          {hasOptionDetails ? (
                            <div className="ml-8 -mt-1 sm:ml-9">
                              <button
                                className="min-h-11 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-clay underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                                type="button"
                                aria-controls={optionDetailsId}
                                aria-expanded={isOptionDetailsExpanded}
                                aria-label={content.toggleOptionDetails(
                                  option.name,
                                  isOptionDetailsExpanded,
                                )}
                                onClick={() => toggleOptionDetails(option.id)}
                              >
                                {isOptionDetailsExpanded
                                  ? content.hideDetails
                                  : content.viewDetails}
                              </button>
                              {isOptionDetailsExpanded ? (
                                <div
                                  id={optionDetailsId}
                                  className="pb-2 text-sm leading-6 text-ink/65"
                                >
                                  {optionDescription ? (
                                    <p>{optionDescription}</p>
                                  ) : null}
                                  {optionDetailLines.length > 0 ? (
                                    <ul
                                      className={`space-y-1 ${optionDescription ? 'mt-3' : ''}`}
                                    >
                                      {optionDetailLines.map((detailLine, index) => (
                                        <li key={`${option.id}-${index}`}>{detailLine}</li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                  {selectedOption === undefined ? (
                    <p
                      id={optionMessageId}
                      className="mt-3 text-sm leading-6 text-ink/60"
                    >
                      {content.optionRequired(product.name)}
                    </p>
                  ) : null}
                </fieldset>
              ) : null}
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

function QuoteStatus({
  actionLabel,
  message,
  onAction,
}: {
  actionLabel?: string
  message: string
  onAction?: () => void
}) {
  return (
    <div className="border border-ink/15 bg-paper p-6 sm:p-8" role="status">
      <p className="text-base leading-7 text-ink/75">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

function MobileQuoteSummaryBar({
  calculation,
  content,
  displayCatalog,
  isSummaryVisible,
  onViewSummary,
}: MobileQuoteSummaryBarProps) {
  if (calculation.selectedPackage === null || calculation.estimatedTotal === null) {
    return null
  }

  const packageName = getQuotePackageDisplayName(
    displayCatalog,
    calculation.selectedPackage.id,
    calculation.selectedPackage.name,
  )

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold/40 bg-bark px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-paper shadow-[0_-8px_20px_rgb(43_32_24_/_0.14)] transition-[opacity,transform] duration-200 motion-reduce:transition-none lg:hidden ${isSummaryVisible ? 'pointer-events-none translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      aria-hidden={isSummaryVisible || undefined}
    >
      <div className="mx-auto flex min-h-12 max-w-xl items-center gap-4">
        <div className="min-w-0 flex-1">
          <data
            className="block font-display text-2xl leading-none tracking-[-0.03em] text-paper"
            value={String(calculation.estimatedTotal)}
            aria-label={`${content.estimatedTotalLabel}: ${content.formatPrice(calculation.estimatedTotal)}`}
          >
            {content.formatPrice(calculation.estimatedTotal)}
          </data>
          <p className="mt-1 truncate text-xs leading-5 text-paper/70" title={packageName}>
            {packageName}
          </p>
        </div>
        <button
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border-l border-paper/20 pl-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gold transition-colors hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:transition-none"
          type="button"
          aria-label={content.summaryEyebrow}
          tabIndex={isSummaryVisible ? -1 : undefined}
          onClick={onViewSummary}
        >
          <span>{content.summaryEyebrow}</span>
          <svg
            className="size-3 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M8 13V3m-4 4 4-4 4 4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function QuoteSummary({
  calculation,
  content,
  displayCatalog,
  event,
  eventSchedule,
  eventValidation,
  isPackageDataUnavailable,
  locale,
  summaryRef,
}: QuoteSummaryProps) {
  const whatsappUrl = createWhatsAppQuoteUrl({
    calculation,
    content: content.whatsappMessage,
    displayCatalog,
    event,
    formatPrice: content.formatPrice,
    locale,
  })
  const isComplete = whatsappUrl !== null
  const eventValidationMessage = getEventValidationMessage(content, eventValidation)
  const endTime = formatQuoteEventEndTime(
    eventSchedule,
    locale,
    content.formatEndDayOffset,
  )
  const actionMessage = isPackageDataUnavailable
    ? content.packagesError
    : !eventValidation.isComplete
      ? eventValidationMessage ?? content.eventDetailsRequired
      : calculation.selectedPackage === null
      ? content.selectPackageBeforeSending
      : calculation.incompleteProducts.length > 0
        ? content.completeExtrasBeforeSending
        : null
  const packageName = calculation.selectedPackage
    ? getQuotePackageDisplayName(
        displayCatalog,
        calculation.selectedPackage.id,
        calculation.selectedPackage.name,
      )
    : null

  return (
    <aside
      ref={summaryRef}
      className="self-start bg-bark p-6 text-paper sm:p-8 lg:sticky lg:top-28"
      aria-labelledby="quote-summary-title"
    >
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {content.summaryEyebrow}
      </p>
      <h3
        id="quote-summary-title"
        className="mt-4 font-display text-4xl leading-none tracking-[-0.035em] text-paper"
      >
        {content.estimatedTotalLabel}
      </h3>

      {eventValidation.hasValues ? (
        <dl className="mt-8 space-y-6 border-y border-paper/20 py-6">
          <div className="flex items-start justify-between gap-5">
            <dt className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/65">
              {content.summaryEventLabel}
            </dt>
            <dd className="space-y-2 text-right text-sm leading-5 text-paper/90">
              {event.eventDate ? (
                <span className="block">
                  {formatQuoteEventDate(event.eventDate, locale)}
                </span>
              ) : null}
              {event.startTime ? (
                <span className="block text-paper/75">
                  {content.summaryEventStartTimeLabel}:{' '}
                  {formatQuoteEventTime(event.startTime, locale)}
                </span>
              ) : null}
              {endTime ? (
                <span className="block text-paper/75">
                  {content.summaryEventEndTimeLabel}:{' '}
                  {endTime}
                </span>
              ) : null}
              {eventSchedule.endTime ? (
                <span className="block text-paper/75">
                  {content.summaryEventDurationLabel}:{' '}
                  {content.formatDuration(eventSchedule.totalDurationHours)}
                </span>
              ) : null}
            </dd>
          </div>
          {event.guestCount !== null && event.guestCount >= 1 ? (
            <div className="flex items-start justify-between gap-5">
              <dt className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/65">
                {content.summaryGuestCountLabel}
              </dt>
              <dd className="text-right text-sm leading-5 text-paper/90">
                {content.formatGuestCount(event.guestCount)}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {calculation.selectedPackage === null ? (
        <p className="mt-8 max-w-sm text-base leading-7 text-paper/75">
          {isPackageDataUnavailable ? content.packagesError : content.summaryEmpty}
        </p>
      ) : (
        <>
          <dl className="mt-8 space-y-6 border-y border-paper/20 py-6">
            <div className="flex items-start justify-between gap-5">
              <dt className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/65">
                {content.summaryPackageLabel}
              </dt>
              <dd className="text-right">
                <span className="block font-display text-xl leading-none tracking-[-0.025em]">
                  {packageName}
                </span>
                <data
                  className="mt-2 block text-sm text-paper/75"
                  value={String(calculation.packageSubtotal)}
                >
                  {content.formatPrice(calculation.packageSubtotal)}
                </data>
              </dd>
            </div>
            {calculation.extras.length > 0 ? (
              <div className="flex items-start justify-between gap-5">
                <dt className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/65">
                  {content.summaryExtrasLabel}
                </dt>
                <dd className="space-y-3 text-right">
                  {calculation.extras.map((extra) => {
                    const displayNames = getQuoteExtraDisplayNames(
                      displayCatalog,
                      extra.productId,
                      extra.productName,
                      extra.optionId,
                      extra.optionName,
                    )

                    return (
                      <div key={extra.optionId}>
                        <span className="block text-sm leading-5 text-paper/90">
                          {displayNames.productName} - {displayNames.optionName}
                        </span>
                        <data
                          className="mt-1 block text-sm text-paper/75"
                          value={String(extra.priceColones)}
                        >
                          {content.formatPrice(extra.priceColones)}
                        </data>
                      </div>
                    )
                  })}
                </dd>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-5">
              <dt className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/65">
                {content.summarySubtotalLabel}
              </dt>
              <dd className="text-sm text-paper/90">
                {content.formatPrice(
                  calculation.packageSubtotal + calculation.additionalSubtotal,
                )}
              </dd>
            </div>
          </dl>

          <data
            className="mt-8 block font-display text-5xl leading-none tracking-[-0.045em] text-paper sm:text-6xl"
            value={String(calculation.estimatedTotal)}
            aria-label={`${content.estimatedTotalLabel}: ${content.formatPrice(calculation.estimatedTotal ?? 0)}`}
          >
            {content.formatPrice(calculation.estimatedTotal ?? 0)}
          </data>
          <p className="mt-4 text-sm leading-6 text-paper/65">
            {content.estimateDisclaimer}
          </p>
        </>
      )}

      {actionMessage ? (
        <p className="mt-8 text-sm leading-6 text-paper/70">{actionMessage}</p>
      ) : null}
      {isComplete ? (
        <Button
          href={whatsappUrl}
          className="mt-8 w-full gap-2 !border-paper !bg-paper !text-ink hover:!border-cream hover:!bg-cream hover:!text-ink focus-visible:!text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>{content.whatsappCta}</span>
        </Button>
      ) : (
        <Button
          className="mt-8 w-full cursor-not-allowed gap-2 !border-paper/40 !bg-paper/15 !text-paper/70 hover:!border-paper/40 hover:!bg-paper/15 hover:!text-paper/70"
          disabled
        >
          <WhatsAppIcon />
          <span>{content.whatsappCta}</span>
        </Button>
      )}
    </aside>
  )
}

export function QuoteCalculator({
  content,
  locale,
  onMobileVisibilityChange,
}: QuoteCalculatorProps) {
  const {
    additionalProductsState,
    packagesState,
    quoteSelection,
    retryAdditionalProducts,
    retryPackages,
    setEventField,
    setGuestCount,
    selectOption,
    selectPackage,
    toggleProduct,
  } = useQuoteContext()
  const quoteSectionRef = useRef<HTMLElement | null>(null)
  const summaryRef = useRef<HTMLElement | null>(null)
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null)
  const [isQuoteVisibleOnMobile, setIsQuoteVisibleOnMobile] = useState(false)
  const [isSummaryVisible, setIsSummaryVisible] = useState(false)
  const packages = packagesState.status === 'success' ? packagesState.packages : []
  const additionalProducts =
    additionalProductsState.status === 'success'
      ? additionalProductsState.products
      : []
  const calculation = calculateQuote(quoteSelection, packages, additionalProducts)
  const displayCatalog = getQuoteCatalogDisplay(locale, packages, additionalProducts)
  const guestCapacity = getGuestCapacity(quoteSelection, additionalProducts)
  const guestCountLimit = guestCapacity.maximumGuests
  const canAddCapacityExtra =
    calculation.selectedPackage !== null &&
    additionalProducts.some(
      (product) => product.id === quoteCapacityConfig.capacityExtraProductId,
    )
  const eventSchedule = calculateQuoteEventSchedule(
    quoteSelection.startTime,
    calculation.selectedExtraHours,
  )
  const eventValidation = validateQuoteEvent(
    quoteSelection,
    undefined,
    guestCountLimit,
  )
  const hasAdditionalProducts = additionalProducts.length > 0
  const hasMobileStickySummary =
    isQuoteVisibleOnMobile &&
    calculation.selectedPackage !== null &&
    calculation.estimatedTotal !== null &&
    !isSummaryVisible
  const sectionSpacing = hasMobileStickySummary
    ? 'pt-24 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:pt-32 sm:pb-[calc(7rem+env(safe-area-inset-bottom))] lg:py-40'
    : 'py-24 sm:py-32 lg:py-40'
  const addCapacityExtra = () => {
    if (!canAddCapacityExtra) {
      return
    }

    toggleProduct(quoteCapacityConfig.capacityExtraProductId, true)
    setExpandedProductId(quoteCapacityConfig.capacityExtraProductId)
  }

  useEffect(() => {
    const section = quoteSectionRef.current

    if (section === null || !('IntersectionObserver' in window)) {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 1023px)')
    let isIntersecting = false
    const updateVisibility = () => {
      const isVisible = mobileQuery.matches && isIntersecting

      setIsQuoteVisibleOnMobile(isVisible)
      onMobileVisibilityChange(isVisible)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false
        updateVisibility()
      },
      { threshold: 0.05 },
    )

    observer.observe(section)
    mobileQuery.addEventListener('change', updateVisibility)

    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener('change', updateVisibility)
      onMobileVisibilityChange(false)
    }
  }, [onMobileVisibilityChange])

  useEffect(() => {
    const summary = summaryRef.current

    if (summary === null || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSummaryVisible(entry?.isIntersecting ?? false),
      { rootMargin: '-20% 0px -20% 0px', threshold: 0 },
    )

    observer.observe(summary)

    return () => observer.disconnect()
  }, [])

  const scrollToSummary = () => {
    const summary = summaryRef.current

    if (summary === null) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    summary.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      ref={quoteSectionRef}
      id="cotizador"
      className={`scroll-mt-24 bg-paper text-ink ${sectionSpacing}`}
      aria-labelledby="quote-title"
      aria-busy={
        packagesState.status === 'loading' ||
        additionalProductsState.status === 'loading' ||
        undefined
      }
    >
      <Container>
        <SectionHeading
          eyebrow={`05 / ${content.eyebrow}`}
          id="quote-title"
          title={content.heading}
          description={content.description}
        />

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-start lg:gap-10 xl:gap-14">
          <form
            className="border border-ink/15 bg-cream/50 p-6 sm:p-8 lg:p-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <EventDetailsFields
              content={content}
              event={quoteSelection}
              locale={locale}
              minDate={getLocalTodayValue()}
              schedule={eventSchedule}
              validation={eventValidation}
              guestCapacityOptionId={guestCapacity.capacityOptionId}
              guestCountLimit={guestCountLimit}
              canAddCapacityExtra={canAddCapacityExtra}
              onChange={setEventField}
              onAddCapacityExtra={addCapacityExtra}
              onGuestCountChange={setGuestCount}
            />

            <div className="mt-12">
              {packagesState.status === 'loading' ? (
                <div role="status">
                  <span className="sr-only">{content.packagesLoading}</span>
                  <div className="h-4 w-40 animate-pulse bg-ink/10" aria-hidden="true" />
                  <div className="mt-6 space-y-3" aria-hidden="true">
                    <div className="h-18 animate-pulse bg-ink/10" />
                    <div className="h-18 animate-pulse bg-ink/10" />
                    <div className="h-18 animate-pulse bg-ink/10" />
                  </div>
                </div>
              ) : null}
              {packagesState.status === 'error' ? (
                <QuoteStatus
                  message={content.packagesError}
                  actionLabel={content.retry}
                  onAction={retryPackages}
                />
              ) : null}
              {packagesState.status === 'success' && packages.length === 0 ? (
                <QuoteStatus message={content.packagesEmpty} />
              ) : null}
              {packagesState.status === 'success' && packages.length > 0 ? (
                <>
                  <PackageSelector
                    content={content}
                    packages={displayCatalog.packages}
                    selectedPackageId={quoteSelection.selectedPackageId}
                    onSelectPackage={selectPackage}
                  />

                {additionalProductsState.status === 'loading' ? (
                  <section
                    className="mt-12 border-t border-ink/15 pt-10"
                    aria-label={content.extrasLegend}
                    role="status"
                  >
                    <span className="sr-only">{content.extrasLoading}</span>
                    <div className="h-4 w-52 animate-pulse bg-ink/10" aria-hidden="true" />
                    <div className="mt-6 h-16 animate-pulse bg-ink/10" aria-hidden="true" />
                  </section>
                ) : null}
                {additionalProductsState.status === 'error' ? (
                  <section className="mt-12 border-t border-ink/15 pt-10" role="status">
                    <p className="max-w-xl text-sm leading-6 text-ink/65">
                      {content.extrasUnavailable}
                    </p>
                    <Button
                      className="mt-5"
                      variant="secondary"
                      onClick={retryAdditionalProducts}
                    >
                      {content.retry}
                    </Button>
                  </section>
                ) : null}
                {additionalProductsState.status === 'success' && hasAdditionalProducts ? (
                  <ExtrasSelector
                    content={content}
                    expandedProductId={expandedProductId}
                    isDisabled={calculation.selectedPackage === null}
                    onExpandedProductIdHandled={() => setExpandedProductId(null)}
                    products={displayCatalog.additionalProducts}
                    selectedOptionIdsByProduct={quoteSelection.selectedOptionIdsByProduct}
                    selectedProductIds={quoteSelection.selectedProductIds}
                    onSelectOption={selectOption}
                    onToggleProduct={toggleProduct}
                  />
                ) : null}
                </>
              ) : null}
            </div>
          </form>

          <QuoteSummary
            calculation={calculation}
            content={content}
            displayCatalog={displayCatalog}
            event={quoteSelection}
            eventSchedule={eventSchedule}
            eventValidation={eventValidation}
            isPackageDataUnavailable={packagesState.status === 'error'}
            locale={locale}
            summaryRef={summaryRef}
          />
        </div>
      </Container>
      {isQuoteVisibleOnMobile ? (
        <MobileQuoteSummaryBar
          calculation={calculation}
          content={content}
          displayCatalog={displayCatalog}
          isSummaryVisible={isSummaryVisible}
          onViewSummary={scrollToSummary}
        />
      ) : null}
    </section>
  )
}
