import { siteConfig } from './site.ts'

export function createWhatsAppUrl(
  message: string,
  phoneNumber: string = siteConfig.whatsappNumber,
): string {
  const whatsappNumber = phoneNumber.replace(/\D/g, '')

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
