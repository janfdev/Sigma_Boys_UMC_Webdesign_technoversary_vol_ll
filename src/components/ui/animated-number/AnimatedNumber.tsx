'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
  as?: 'span' | 'tspan'
  fractionDigits?: number
  minimumIntegerDigits?: number
  signDisplay?: Intl.NumberFormatOptions['signDisplay']
  /** Value the first animation starts from. */
  from?: number
  /** ms per tween. */
  duration?: number
  /** ms before the first tween starts. */
  delay?: number
  format?: (value: number) => string
  /** Render the target value instantly, no tween. */
  disabled?: boolean
}

const defaultFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format

/**
 * Tweened number display. Counts up on mount, then smoothly retargets
 * from the currently displayed value whenever `value` changes.
 * Server render outputs the final value so hydration always matches.
 */
const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  ({ value, as = 'span', fractionDigits, minimumIntegerDigits = 1, signDisplay = 'auto', from = 0, duration = 900, delay = 0, format, disabled = false, className, ...props }, ref) => {
    const Tag = as as React.ElementType
    const [display, setDisplayState] = React.useState(value)
    const displayRef = React.useRef(value)
    const mountedRef = React.useRef(false)
    const frameRef = React.useRef(0)
    const timerRef = React.useRef<number | undefined>(undefined)

    const fmt = format ?? (fractionDigits === undefined && minimumIntegerDigits === 1 && signDisplay === 'auto' ? defaultFormat : new Intl.NumberFormat('id-ID', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits ?? 2, minimumIntegerDigits, signDisplay }).format)

    const setDisplay = React.useCallback((next: number) => {
      displayRef.current = next
      setDisplayState(next)
    }, [])

    React.useEffect(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      function cancel() {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
        if (timerRef.current !== undefined) {
          clearTimeout(timerRef.current)
          timerRef.current = undefined
        }
      }

      if (disabled || reduce || duration <= 0) {
        cancel()
        setDisplay(value)
        return cancel
      }

      const firstRun = !mountedRef.current
      mountedRef.current = true
      const startValue = firstRun ? from : displayRef.current
      setDisplay(startValue)

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

      const run = () => {
        const startTime = performance.now()
        const step = () => {
          const t = Math.min(1, (performance.now() - startTime) / duration)
          setDisplay(startValue + (value - startValue) * easeOutCubic(t))
          frameRef.current = t < 1 ? requestAnimationFrame(step) : 0
        }
        step()
      }

      if (firstRun && delay > 0) {
        timerRef.current = window.setTimeout(run, delay)
      } else {
        run()
      }

      return cancel
    }, [value, from, duration, delay, disabled, setDisplay])

    return (
      <Tag ref={ref as never} data-uipkge="" data-slot="animated-number" aria-label={fmt(value)} aria-live="off" className={cn('tabular-nums', as === 'span' && 'inline-block', className)} style={as === 'span' ? { minWidth: `${Math.max(fmt(value).length, fmt(value + 0.88).length, fmt(value - 0.88).length)}ch`, ...props.style } : props.style} {...props}>
        <Tag aria-hidden="true">{fmt(display)}</Tag>
      </Tag>
    )
  },
)
AnimatedNumber.displayName = 'AnimatedNumber'

export { AnimatedNumber }
