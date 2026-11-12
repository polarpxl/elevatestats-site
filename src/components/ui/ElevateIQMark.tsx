import { cn } from '@/lib/cn'

// ElevateIQ brand treatment. The IQ letters and the lockup tile are always
// brand orange, never Stats blue.
const IQ_ORANGE = '#FF6600'
const ELEVATE_ON_LIGHT = '#4D4D4D'
const ELEVATE_ON_DARK = '#FFFFFF'

type ElevateIQMarkProps = {
  /** wordmark: "ElevateIQ" set in Poppins. lockup: orange IQ tile + wordmark in a white pill. */
  variant?: 'wordmark' | 'lockup'
  /** Surface the wordmark sits on. Only affects the wordmark variant; the lockup is always a white pill. */
  surface?: 'light' | 'dark'
  /** Lockup only: text size in px. The tile scales from it. */
  size?: number
  className?: string
}

function Wordmark({ surface, className }: { surface: 'light' | 'dark'; className?: string }) {
  return (
    <span className={cn('whitespace-nowrap font-heading', className)}>
      <span
        className="font-medium"
        style={{ color: surface === 'dark' ? ELEVATE_ON_DARK : ELEVATE_ON_LIGHT }}
      >
        Elevate
      </span>
      <span className="font-extrabold" style={{ color: IQ_ORANGE }}>
        IQ
      </span>
    </span>
  )
}

export function ElevateIQMark({
  variant = 'wordmark',
  surface = 'light',
  size = 16,
  className,
}: ElevateIQMarkProps) {
  if (variant === 'wordmark') {
    // Inherits font size from its context so it can sit inside a heading.
    return <Wordmark surface={surface} className={className} />
  }

  const tile = Math.round(size * 1.75)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-solid bg-white leading-none',
        className,
      )}
      style={{
        borderColor: '#E0E0E0',
        gap: size / 2,
        padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.85)}px ${Math.round(size * 0.3)}px ${Math.round(size * 0.3)}px`,
        fontSize: size,
      }}
    >
      <span
        aria-hidden
        className="inline-flex shrink-0 items-center justify-center font-heading font-extrabold leading-none text-white"
        style={{
          width: tile,
          height: tile,
          borderRadius: tile * 0.28,
          backgroundColor: IQ_ORANGE,
          fontSize: tile * 0.54,
        }}
      >
        IQ
      </span>
      <Wordmark surface="light" />
    </span>
  )
}
