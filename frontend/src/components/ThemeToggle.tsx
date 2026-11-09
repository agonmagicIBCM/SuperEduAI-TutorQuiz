import { useEffect, useRef, useState, type FocusEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { themeOptions, type Theme } from '../types/theme'

type ThemeToggleProps = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

function ThemeGlyph({ theme }: { theme: Theme }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
  }

  switch (theme) {
    case 'light':
      return <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
    case 'dark':
      return <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}><path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.6 8.6 0 1 0 20.2 15.3Z" /></svg>
    case 'astral':
      return <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}><ellipse cx="12" cy="12" rx="9" ry="4.3" transform="rotate(-28 12 12)" /><circle cx="12" cy="12" r="2.1" /><path d="m18.8 3 .65 1.8L21.2 5.5l-1.75.65L18.8 8l-.65-1.85L16.3 5.5l1.85-.7z" /></svg>
    case 'abyss':
      return <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}><path d="M12.4 2.5c1.2 4-1.1 5.3.7 8.1.8-1.4 1.1-2.7 1-4.1 3.3 2.6 5.4 5.3 5.4 8.5a7.5 7.5 0 0 1-15 0c0-3.4 2.5-6.6 5.3-8.8-.2 2.1.3 3.2 1.1 4.1 1-2.2 1.1-4.8 1.5-7.8Z" /><path d="M9.4 16.3c.2-1.2 1-2.1 2.3-3.1.1 1.3.7 1.9 1.5 2.5.4.4.7.9.7 1.5a2.3 2.3 0 1 1-4.5-.9Z" /></svg>
  }
}

function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hoverTimer = useRef<number | null>(null)
  const current = themeOptions.find((option) => option.id === theme) ?? themeOptions[0]

  function cancelHoverTimer() {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  function openAfterHover(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || open) return
    cancelHoverTimer()
    hoverTimer.current = window.setTimeout(() => setOpen(true), 2000)
  }

  function leavePicker(event: ReactPointerEvent<HTMLDivElement>) {
    cancelHoverTimer()
    const relatedTarget = event.relatedTarget
    if (relatedTarget instanceof Node && containerRef.current?.contains(relatedTarget)) return
    if (!containerRef.current?.contains(document.activeElement)) setOpen(false)
  }

  function blurPicker(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && containerRef.current?.contains(nextTarget)) return
    setOpen(false)
  }

  function closeAndRestoreFocus() {
    cancelHoverTimer()
    setOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (!open) return
    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [open])

  useEffect(() => cancelHoverTimer, [])

  return (
    <div
      className="theme-picker"
      ref={containerRef}
      onPointerEnter={openAfterHover}
      onPointerLeave={leavePicker}
      onBlur={blurPicker}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          closeAndRestoreFocus()
        }
      }}
    >
      <button
        className="button button--secondary theme-toggle"
        type="button"
        ref={triggerRef}
        aria-label={`Appearance: ${current.name}. Choose a theme`}
        aria-expanded={open}
        aria-controls="theme-picker-options"
        onClick={() => {
          cancelHoverTimer()
          setOpen((isOpen) => !isOpen)
        }}
      >
        <ThemeGlyph theme={theme} />
      </button>
      {open && (
        <div className="theme-picker__popover" id="theme-picker-options" role="group" aria-label="Choose an atmosphere">
          <p className="theme-picker__heading">Choose an atmosphere</p>
          <div className="theme-picker__options">
            {themeOptions.filter((option) => option.id !== theme).map((option) => (
              <button
                className="theme-picker__option"
                type="button"
                key={option.id}
                onClick={() => {
                  onThemeChange(option.id)
                  closeAndRestoreFocus()
                }}
              >
                <span className={`theme-picker__preview theme-picker__preview--${option.id}`}><ThemeGlyph theme={option.id} /></span>
                <span className="theme-picker__option-copy"><strong>{option.name}</strong><small>{option.mood}</small></span>
                <span className="theme-picker__swatches" aria-hidden="true"><i /><i /><i /></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeToggle
