'use client'
import { useRef, useEffect, useState, type ReactNode, type ElementType } from 'react'

type RevealProps = {
  children: ReactNode
  /** Delay before the reveal animation starts, in ms (used for staggered cascades). */
  delay?: number
  /** Element to render as. Defaults to a div. */
  as?: ElementType
  className?: string
  /** Any other props (e.g. href) are forwarded to the rendered element. */
  [key: string]: unknown
}

/**
 * Reveals its children with a subtle fade + slide-up once they scroll into view.
 * Animates only once, respects prefers-reduced-motion (handled in globals.css).
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
