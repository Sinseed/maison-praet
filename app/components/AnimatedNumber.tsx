'use client'
import { useRef, useEffect, useState } from 'react'

type AnimatedNumberProps = {
  /** Target value to count up to. */
  value: number
  /** Number of decimals to display (e.g. 1 for 96.8). */
  decimals?: number
  /** Animation duration in ms. */
  duration?: number
  className?: string
}

/**
 * Counts up from 0 to `value` once it scrolls into view, with an ease-out curve.
 * Falls back to the final value immediately when reduced motion is preferred.
 */
export default function AnimatedNumber({ value, decimals = 0, duration = 1600, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Initialisé à la valeur finale : le HTML rendu côté serveur (Google, moteurs IA,
  // aperçus sans JS) affiche le vrai chiffre. L'animation démarre à 0 uniquement
  // au moment où le compteur entre dans le viewport.
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setDisplay(value)
          return
        }

        setDisplay(0)
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(value * eased)
          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  )
}
