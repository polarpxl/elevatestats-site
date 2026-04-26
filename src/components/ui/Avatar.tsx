import Image from 'next/image'
import { cn } from '@/lib/cn'

export type AvatarTone = 'orange' | 'blue' | 'gray'
export type AvatarSize = 'sm' | 'lg'

type AvatarProps = {
  initials: string
  tone?: AvatarTone
  size?: AvatarSize
  src?: string
  alt?: string
  className?: string
}

const tones: Record<AvatarTone, string> = {
  orange: 'bg-brand-orange/15 text-brand-orange',
  blue: 'bg-brand-blue/15 text-brand-blue',
  gray: 'bg-brand-gray/15 text-brand-gray',
}

const sizes: Record<AvatarSize, { box: string; text: string; px: number }> = {
  sm: { box: 'h-11 w-11', text: 'text-sm', px: 44 },
  lg: { box: 'h-24 w-24', text: 'text-2xl', px: 96 },
}

export function Avatar({
  initials,
  tone = 'orange',
  size = 'sm',
  src,
  alt,
  className,
}: AvatarProps) {
  const s = sizes[size]

  if (src) {
    return (
      <span
        className={cn(
          'relative inline-block overflow-hidden rounded-full ring-1 ring-black/5',
          s.box,
          className,
        )}
      >
        <Image src={src} alt={alt ?? ''} fill sizes={`${s.px}px`} className="object-cover" />
      </span>
    )
  }

  return (
    <span
      aria-hidden={alt ? undefined : true}
      aria-label={alt}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-heading font-semibold',
        s.box,
        s.text,
        tones[tone],
        className,
      )}
    >
      {initials}
    </span>
  )
}
