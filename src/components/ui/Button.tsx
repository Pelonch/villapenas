import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface SharedButtonProps {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonLinkProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps | 'href'> & {
    href: string
  }

type ButtonControlProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps>

type ButtonProps = ButtonLinkProps | ButtonControlProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-ink bg-ink text-paper hover:border-bark hover:bg-bark',
  secondary:
    'border-current bg-transparent text-current hover:bg-current/10',
}

function getButtonClasses(variant: ButtonVariant, className?: string): string {
  return [
    'inline-flex min-h-11 items-center justify-center border px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: ButtonProps) {
  if ('href' in props) {
    const {
      children,
      className,
      href,
      variant = 'primary',
      ...linkProps
    } = props

    return (
      <a
        className={getButtonClasses(variant, className)}
        href={href}
        {...linkProps}
      >
        {children}
      </a>
    )
  }

  const {
    children,
    className,
    type = 'button',
    variant = 'primary',
    ...buttonProps
  } = props

  return (
    <button
      className={getButtonClasses(variant, className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
