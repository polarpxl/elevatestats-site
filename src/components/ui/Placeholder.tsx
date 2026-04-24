import { cn } from '@/lib/cn'

type Tone = 'orange' | 'blue' | 'gray' | 'dark'

const tones: Record<Tone, string> = {
  orange: 'bg-brand-orange/15 text-brand-orange ring-brand-orange/30',
  blue: 'bg-brand-blue/15 text-brand-blue ring-brand-blue/40',
  gray: 'bg-brand-gray/10 text-brand-gray ring-brand-gray/30',
  dark: 'bg-white/10 text-white/80 ring-white/20',
}

export function Placeholder({
  label,
  aspect = '16/9',
  tone = 'gray',
  className,
}: {
  label: string
  aspect?: string
  tone?: Tone
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-card ring-1 ring-inset px-4 text-center font-heading font-semibold tracking-tight',
        tones[tone],
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {label}
    </div>
  )
}
