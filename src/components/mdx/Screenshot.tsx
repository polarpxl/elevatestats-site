import Image from 'next/image'

export function Screenshot({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-card ring-1 ring-black/10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-brand-gray">{caption}</figcaption>
      )}
    </figure>
  )
}
