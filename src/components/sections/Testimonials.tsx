'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Avatar, type AvatarTone } from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'

type Testimonial = {
  quote: string
  author: string
  role: string
  initials: string
  tone: AvatarTone
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I used to track shifts on a Post-it. Now I can see who's been out too long without taking my eyes off the ice.",
    author: 'Mark D.',
    role: 'U11 head coach',
    initials: 'MD',
    tone: 'orange',
  },
  {
    quote:
      "First time I've actually understood my son's stats. Not just the goals, but where he's getting his shots from and how he's trending.",
    author: 'Sarah K.',
    role: 'Hockey parent',
    initials: 'SK',
    tone: 'blue',
  },
  {
    quote:
      "The AI picked up on a defensive pattern I'd missed for three games. That kind of read used to take me a Sunday morning of video.",
    author: 'Tom R.',
    role: 'U15 AAA head coach',
    initials: 'TR',
    tone: 'gray',
  },
  {
    quote:
      'My head coach handed me his phone five minutes before puck drop. I tracked the whole game without him explaining anything.',
    author: 'Dev P.',
    role: 'Assistant coach',
    initials: 'DP',
    tone: 'orange',
  },
  {
    quote:
      'Used to email parents a screenshot from a spreadsheet. Now they get a real recap and they actually open it.',
    author: 'Jen M.',
    role: 'U13 team manager',
    initials: 'JM',
    tone: 'blue',
  },
  {
    quote:
      "Three games into our tournament, the rink WiFi died. Everything synced when we got back to the hotel. Didn't lose a thing.",
    author: 'Mike T.',
    role: 'U18 head coach',
    initials: 'MT',
    tone: 'gray',
  },
]

const LOOP_DURATION_SECONDS = 42
const COPY_COUNT = testimonials.length

function TestimonialCard({ t, fluid = false }: { t: Testimonial; fluid?: boolean }) {
  return (
    <figure
      className={`flex flex-col gap-4 rounded-card bg-white p-6 ring-1 ring-black/5 shadow-sm ${
        fluid ? 'w-full' : 'w-[320px] shrink-0 md:w-[380px]'
      }`}
    >
      <blockquote className="text-base leading-relaxed text-ink">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <Avatar initials={t.initials} tone={t.tone} size="sm" />
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-semibold text-ink">{t.author}</span>
          <span className="text-sm text-brand-gray">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function MarqueeTrack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useMotionValue(0)
  const x = useTransform(offset, (v) => `${v}px`)
  const paused = useRef(false)
  const [copyWidth, setCopyWidth] = useState(0)
  const [copies, setCopies] = useState(4)

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const measure = () => {
      const children = track.children
      if (children.length <= COPY_COUNT) return

      // Distance from start of copy 1 to start of copy 2 = (cards + gaps) for exactly one copy.
      const first = children[0] as HTMLElement
      const boundary = children[COPY_COUNT] as HTMLElement
      const distance = boundary.offsetLeft - first.offsetLeft
      if (distance <= 0) return
      setCopyWidth(distance)

      // Ensure the rendered track extends at least one copyWidth + one viewport past the
      // reset point, so the visible area is always fully populated.
      const vw = container.clientWidth
      const needed = Math.ceil((distance + vw) / distance) + 1
      setCopies((current) => Math.max(current, needed))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (paused.current || copyWidth === 0) return
    const pxPerMs = copyWidth / (LOOP_DURATION_SECONDS * 1000)
    let next = offset.get() - delta * pxPerMs
    while (next <= -copyWidth) next += copyWidth
    offset.set(next)
  })

  const loop = Array.from({ length: copies }, () => testimonials).flat()

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div ref={trackRef} className="flex w-max gap-6 py-4" style={{ x }}>
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.author}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

type TestimonialsProps = {
  subhead?: string
  /** false renders a static row — no marquee, no autoplay, no motion. */
  autoplay?: boolean
  /** Render only the cards, without the section wrapper and heading, so the
      quotes can sit inside an existing content column. */
  embedded?: boolean
  /** Show only these authors, in this order. Defaults to all six. */
  authors?: string[]
  /** Heading rendered above an embedded static row. Without it the quotes
      read as decoration and get skipped. */
  heading?: string
}

const DEFAULT_SUBHEAD = 'The team trust we have earned, one Saturday morning rink at a time.'

export function Testimonials({
  subhead = DEFAULT_SUBHEAD,
  autoplay = true,
  embedded = false,
  authors,
  heading,
}: TestimonialsProps = {}) {
  const prefersReducedMotion = useReducedMotion()

  const selected = authors
    ? authors.flatMap((a) => testimonials.filter((t) => t.author === a))
    : testimonials

  // Static row: stacked on mobile, side by side from md up. No motion at all,
  // so there is nothing to pause and nothing to respect reduced-motion for.
  if (!autoplay) {
    const cards = (
      <div
        role="region"
        aria-label="Testimonials"
        className="flex flex-col gap-6 md:flex-row md:items-stretch"
      >
        {selected.map((t) => (
          <TestimonialCard key={t.author} t={t} fluid />
        ))}
      </div>
    )

    if (embedded) {
      if (!heading) return cards
      return (
        <div>
          <h2 className="text-center font-heading text-2xl font-bold text-ink md:text-3xl lg:text-left">
            {heading}
          </h2>
          <div className="mt-8">{cards}</div>
        </div>
      )
    }

    return (
      <section className="bg-brand-blue/5 py-20 md:py-28">
        <Container>{cards}</Container>
      </section>
    )
  }

  return (
    <section className="overflow-x-hidden bg-brand-blue/5 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            What coaches say
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Real coaches. Real benches. Real games.
          </h2>
          <p className="mt-5 text-lg text-brand-gray">{subhead}</p>
        </div>
      </Container>

      {prefersReducedMotion ? (
        <div
          role="region"
          aria-label="Testimonials"
          className="mt-12 overflow-x-auto md:mt-16"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-6 px-5 py-4 md:px-8 lg:px-12">
            {testimonials.map((t) => (
              <div key={t.author} style={{ scrollSnapAlign: 'start' }}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          role="region"
          aria-label="Testimonials"
          className="mt-12 md:mt-16"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <MarqueeTrack />
        </div>
      )}
    </section>
  )
}
