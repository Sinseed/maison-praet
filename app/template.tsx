'use client'
import { ReactNode } from 'react'

/**
 * Wraps every route. Because Next remounts the template on each navigation,
 * the fade/slide-up replays on every page change for a smooth, app-like feel.
 * Disabled under prefers-reduced-motion (see globals.css).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>
}
