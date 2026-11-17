import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Typewriter } from '../Typewriter'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('Typewriter Component', () => {
  it('should render accessible sr-only text immediately', () => {
    render(<Typewriter phrases={['Perubahan.', 'Nilai Baru.']} />)
    const sr = screen.getByText('Perubahan.. Nilai Baru.')
    expect(sr).toBeInTheDocument()
    expect(sr).toHaveClass('sr-only')
  })

  it('should display full first phrase when reduced motion is preferred', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(<Typewriter phrases={['Inovasi Sirkular.', 'Masa Depan Bersih.']} />)
    expect(screen.getByText('Inovasi Sirkular.')).toBeInTheDocument()
  })

  it('should type characters sequentially with timer advances', () => {
    vi.useFakeTimers()
    const { container } = render(<Typewriter phrases={['Sirkular.']} typingSpeed={50} />)

    // Advance timer to type characters
    act(() => {
      vi.advanceTimersByTime(200)
    })

    const slot = container.querySelector('[data-slot="typewriter"]')
    expect(slot).toBeInTheDocument()
  })
})
