import { quoteCapacityConfig } from '../config/quoteCapacity.ts'
import type { Locale } from '../i18n/types.ts'
import type { QuoteEventDetails } from './types.ts'

export const BASE_EVENT_DURATION_HOURS = 8

export type QuoteEventValidationIssue = 'missing' | 'past-date' | null

export interface QuoteEventValidation {
  hasValues: boolean
  isComplete: boolean
  issue: QuoteEventValidationIssue
}

export interface QuoteEventSchedule {
  baseDurationHours: number
  endDayOffset: number
  endTime: string | null
  selectedExtraHours: number
  totalDurationHours: number
}

function getLocalDateParts(date: Date): [number, number, number] {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

function isValidDateValue(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (match === null) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  const [actualYear, actualMonth, actualDay] = getLocalDateParts(date)

  return year === actualYear && month === actualMonth && day === actualDay
}

function isValidTimeValue(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

function getEventDate(value: string): Date | null {
  if (!isValidDateValue(value)) {
    return null
  }

  return new Date(
    Number(value.slice(0, 4)),
    Number(value.slice(5, 7)) - 1,
    Number(value.slice(8, 10)),
  )
}

function getEventTime(value: string): Date | null {
  if (!isValidTimeValue(value)) {
    return null
  }

  return new Date(2000, 0, 1, Number(value.slice(0, 2)), Number(value.slice(3, 5)))
}

function getIntlLocale(locale: Locale): string {
  return locale === 'es' ? 'es-CR' : 'en-US'
}

export function getLocalTodayValue(date = new Date()): string {
  const [year, month, day] = getLocalDateParts(date)

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function validateQuoteEvent(
  event: QuoteEventDetails,
  today = getLocalTodayValue(),
  guestCountLimit: number = quoteCapacityConfig.includedGuestLimit,
): QuoteEventValidation {
  const hasValues =
    event.eventDate.length > 0 || event.guestCount !== null || event.startTime.length > 0

  if (
    !isValidDateValue(event.eventDate) ||
    event.guestCount === null ||
    event.guestCount < 1 ||
    event.guestCount > guestCountLimit ||
    !Number.isInteger(event.guestCount) ||
    !isValidTimeValue(event.startTime)
  ) {
    return { hasValues, isComplete: false, issue: 'missing' }
  }

  if (event.eventDate < today) {
    return { hasValues, isComplete: false, issue: 'past-date' }
  }

  return { hasValues, isComplete: true, issue: null }
}

export function calculateQuoteEventSchedule(
  startTime: string,
  selectedExtraHours: number,
  baseDurationHours = BASE_EVENT_DURATION_HOURS,
): QuoteEventSchedule {
  const totalDurationHours = baseDurationHours + selectedExtraHours

  if (!isValidTimeValue(startTime)) {
    return {
      baseDurationHours,
      endDayOffset: 0,
      endTime: null,
      selectedExtraHours,
      totalDurationHours,
    }
  }

  const startMinutes = Number(startTime.slice(0, 2)) * 60 + Number(startTime.slice(3, 5))
  const endMinutes = startMinutes + totalDurationHours * 60
  const endMinutesWithinDay = endMinutes % (24 * 60)

  return {
    baseDurationHours,
    endDayOffset: Math.floor(endMinutes / (24 * 60)),
    endTime: `${String(Math.floor(endMinutesWithinDay / 60)).padStart(2, '0')}:${String(endMinutesWithinDay % 60).padStart(2, '0')}`,
    selectedExtraHours,
    totalDurationHours,
  }
}

export function formatQuoteEventDate(value: string, locale: Locale): string {
  const date = getEventDate(value)

  if (date === null) {
    return value
  }

  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    dateStyle: 'long',
  }).format(date)
}

export function formatQuoteEventTime(value: string, locale: Locale): string {
  const time = getEventTime(value)

  if (time === null) {
    return value
  }

  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    hour: 'numeric',
    minute: '2-digit',
  }).format(time)
}

export function formatQuoteEventEndTime(
  schedule: QuoteEventSchedule,
  locale: Locale,
  formatEndDayOffset: (dayOffset: number) => string,
): string | null {
  if (schedule.endTime === null) {
    return null
  }

  const formattedEndTime = formatQuoteEventTime(schedule.endTime, locale)

  return schedule.endDayOffset > 0
    ? `${formattedEndTime} · ${formatEndDayOffset(schedule.endDayOffset)}`
    : formattedEndTime
}
