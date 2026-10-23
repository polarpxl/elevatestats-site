import { cn } from '@/lib/cn'

type ProChipProps = {
  /** Dark-surface variant: near-black inner fill, white text. */
  onDark?: boolean
  size?: 'md' | 'lg'
  className?: string
}

// Elevate Sports Labs design system .chip-pro: gradient-bordered pill.
// Border gradient uses the brand orange, pink and blue tokens; the inner
// fill and text colours are the exact design-system values.
export function ProChip({ onDark = false, size = 'md', className }: ProChipProps) {
  const fill = onDark ? 'var(--color-surface-dark)' : 'var(--color-surface)'
  return (
    <span
      className={cn(
        'inline-flex box-border items-center whitespace-nowrap rounded-full border-[1.5px] border-solid border-transparent align-middle font-heading font-bold uppercase leading-none tracking-[0.12em]',
        size === 'lg' ? 'h-[26px] px-[11px] text-[12px]' : 'h-[22px] px-[9px] text-[11px]',
        onDark ? 'text-white' : 'text-[#1A1D21]',
        className,
      )}
      style={{
        background: `linear-gradient(${fill}, ${fill}) padding-box, linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-pink) 55%, var(--color-brand-blue)) border-box`,
      }}
    >
      PRO
    </span>
  )
}
