import { siteConfig } from './site.ts'

export function createWhatsAppUrl(message: string): string {
  const whatsappNumber = siteConfig.whatsappNumber.replace(/\D/g, '')

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
