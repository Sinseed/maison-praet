import type { ReactNode } from 'react'

type EyebrowProps = {
  children: ReactNode
  /** Center the label with a hairline on each side (for centered section headers). */
  center?: boolean
  className?: string
}

/**
 * Editorial section label: small uppercase gold text preceded by a thin gold
 * hairline (and flanked by two, when centered). Replaces the bare eyebrow
 * paragraphs for a more magazine-like, luxe hierarchy.
 */
export default function Eyebrow({ children, center = false, className = '' }: EyebrowProps) {
  const line = 'h-px w-8 bg-gradient-to-r from-brand-gold/70 to-transparent'
  return (
    <p
      className={`inline-flex items-center gap-3 font-body text-xs tracking-[0.3em] uppercase text-brand-gold align-middle ${className}`}
    >
      <span className={line} aria-hidden="true" />
      {children}
      {center && <span className={`${line} rotate-180`} aria-hidden="true" />}
    </p>
  )
}
