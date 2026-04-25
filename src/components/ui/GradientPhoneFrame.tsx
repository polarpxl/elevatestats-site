import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/cn'

type Props = {
  src: StaticImageData
  alt: string
  sizes?: string
  className?: string
}

/** Phone frame with a brand-gradient bezel. Same proportions and inner
 *  radii as the dark-bezel hero phone — only the bezel colour treatment
 *  differs. Pulls colours from the same brand tokens as the rest of the
 *  site so a single change in @theme propagates here too. */
export function GradientPhoneFrame({ src, alt, sizes, className }: Props) {
  return (
    <div
      className={cn('rounded-[2.75rem] p-[10px] shadow-2xl', className)}
      style={{
        background:
          'linear-gradient(135deg, var(--color-brand-orange) 0%, var(--color-brand-pink) 55%, var(--color-brand-blue) 100%)',
      }}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
