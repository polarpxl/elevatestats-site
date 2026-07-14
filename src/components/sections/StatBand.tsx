import Image from 'next/image'

import boards from '../../../public/imagery/boards.jpg'

// Section-band milestone strip (design system v2): full-bleed duotone photo,
// band scrim, chunky Poppins-900 numbers with an orange accent bar. Numbers
// are real site claims, not invented stats.
const stats = [
  { value: '∞', srValue: 'Unlimited', label: 'Team games, free forever' },
  { value: '0', label: 'Setup, no install' },
  { value: '1', label: 'Tap to track a shot' },
]

export function StatBand() {
  return (
    <section
      aria-label="Elevate Stats at a glance"
      className="relative flex h-[clamp(340px,44vw,520px)] items-center justify-center overflow-hidden bg-surface-dark text-center text-white"
    >
      {/* Inline position: elevate-treatments.css is unlayered, so its
          `.duotone { position: relative }` beats Tailwind's `absolute`. */}
      <div className="duotone duotone--stats" style={{ position: 'absolute', inset: 0 }}>
        <Image src={boards} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      {/* Vertical scrim per the section-band reference — the left-heavy
          .band-scrim is for left-aligned copy, not centred stats */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(8,10,14,0.32), rgba(8,10,14,0.74))' }}
      />

      <div className="relative z-10 flex justify-center gap-[clamp(30px,7vw,110px)] px-6 md:px-20">
        {stats.map((stat) => (
          <div key={stat.label} className="relative pt-5">
            <span
              aria-hidden
              className="absolute top-0 left-1/2 h-1.5 w-11 -translate-x-1/2 rounded-full bg-brand-orange"
            />
            <strong className="block font-heading text-[clamp(3.6rem,8.5vw,7rem)] font-black leading-[0.92] tracking-[-0.04em] [text-shadow:0_6px_30px_rgba(0,0,0,0.55)]">
              {stat.srValue ? (
                <>
                  <span aria-hidden>{stat.value}</span>
                  <span className="sr-only">{stat.srValue}</span>
                </>
              ) : (
                stat.value
              )}
            </strong>
            <span className="mt-2.5 block font-heading text-sm font-bold uppercase tracking-[0.12em]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
