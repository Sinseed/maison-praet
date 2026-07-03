'use client'
import { useEffect, useRef } from 'react'

/**
 * Thin golden reading-progress bar pinned to the top of the viewport.
 * Writes the scroll ratio to a CSS variable (--sp) and lets the GPU scale it,
 * so there is no React re-render per scroll frame. Purely decorative, hence
 * aria-hidden. The bar itself is a static line; only its scaleX changes, so it
 * stays calm under prefers-reduced-motion without needing to be disabled.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.setProperty('--sp', ratio.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
