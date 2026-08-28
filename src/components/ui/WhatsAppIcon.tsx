interface WhatsAppIconProps {
  className?: string
}

export function WhatsAppIcon({ className = '' }: WhatsAppIconProps) {
  return (
    <svg
      className={`size-4 shrink-0 text-[#25D366] ${className}`}
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
