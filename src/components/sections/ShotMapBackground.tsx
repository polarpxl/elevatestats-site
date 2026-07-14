'use client'

/**
 * ShotMapBackground
 * -----------------
 * Animated "living shot-map" canvas for the Elevate Stats hero.
 *
 * A faint, regulation-proportioned hockey rink (drawn to NHL 200ft x 85ft specs)
 * sits behind the hero. Orange/blue shot dots plot themselves one at a time —
 * like shots being tapped in during a live game — clustering into a soft heat
 * bloom in front of the attacking net, then the whole "period" fades and a new
 * one begins. The entire ice plane is CSS-tilted into a broadcast-style 3D
 * perspective; the dots plot onto that same tilted plane.
 *
 * USAGE — this is a BACKGROUND LAYER only. Place it as the first child of the
 * hero's positioned container, then layer the scrim gradients (see Hero.tsx) and
 * the EXISTING live-text hero on top. It renders no text.
 *
 * Respects prefers-reduced-motion (renders a static seeded frame, no animation).
 * Colours below are raw hex/rgba on purpose so the canvas stays self-contained;
 * they match the brand tokens (--color-brand-orange #FF6600, --color-brand-blue
 * #00BFFF).
 */

import { useEffect, useRef } from 'react'

export type RinkTilt = 'Flat' | 'Tilted' | 'Broadcast'
export type MotionIntensity = 'Calm' | 'Medium' | 'Energetic'
export type ColorEmphasis = 'Orange' | 'Blue' | 'Orange + blue'

export interface ShotMapBackgroundProps {
  /** Motion pace. Default 'Medium'. */
  motionIntensity?: MotionIntensity
  /** Dot colour bias. Default 'Orange + blue'. */
  colorEmphasis?: ColorEmphasis
  /** 3D perspective of the ice plane. Default 'Tilted'. */
  rinkTilt?: RinkTilt
  /** Draw the rink markings under the dots. Default true. */
  showRink?: boolean
  /** Extra classes for the <canvas> (it is absolutely positioned to fill its parent). */
  className?: string
}

type Shot = { x: number; y: number; t0: number; color: string; r: number }
type Geo = {
  rink: { x: number; y: number; x1: number; y1: number; w: number; h: number }
  hot: { x: number; y: number }
}

const TILT_MAP: Record<RinkTilt, string> = {
  Flat: 'translateY(-8%) scale(1.04)',
  Tilted: 'translateY(-9%) perspective(1600px) rotateX(49deg) rotateZ(-6deg) scale(1.34)',
  Broadcast: 'translateY(-6%) perspective(1250px) rotateX(58deg) rotateZ(-9deg) scale(1.66)',
}

const INTENSITY: Record<
  MotionIntensity,
  { spawnMs: number; loopShots: number; holdMs: number; fadeMs: number; pingMs: number }
> = {
  Calm: { spawnMs: 680, loopShots: 20, holdMs: 1700, fadeMs: 1400, pingMs: 950 },
  Medium: { spawnMs: 380, loopShots: 28, holdMs: 1200, fadeMs: 1200, pingMs: 850 },
  Energetic: { spawnMs: 220, loopShots: 38, holdMs: 800, fadeMs: 1000, pingMs: 720 },
}

export default function ShotMapBackground({
  motionIntensity = 'Medium',
  colorEmphasis = 'Orange + blue',
  rinkTilt = 'Tilted',
  showRink = true,
  className,
}: ShotMapBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Apply the 3D tilt whenever it changes (cheap, style-only).
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    cv.style.transformOrigin = '50% 47%'
    cv.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)'
    // Leading translateY is screen-space — lets the hero nudge the whole rink
    // up/down responsively via the --shot-map-shift CSS var (default 0).
    cv.style.transform = `translateY(var(--shot-map-shift, 0%)) ${TILT_MAP[rinkTilt] ?? TILT_MAP.Tilted}`
  }, [rinkTilt])

  // Main animation engine. Re-initialises when pace / palette / showRink change.
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const palLower = colorEmphasis.toLowerCase()
    const palette: 'mix' | 'blue' | 'orange' =
      palLower.indexOf('+') >= 0 ? 'mix' : palLower.indexOf('blue') >= 0 ? 'blue' : 'orange'
    const cfg = { ...INTENSITY[motionIntensity], palette, showRink }

    const reduced = !!(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    let w = 0
    let h = 0
    let geo: Geo
    let shots: Shot[] = []
    let phase: 'plotting' | 'hold' | 'fade' = 'plotting'
    let phaseStart = performance.now()
    let lastSpawn = 0
    let periodAlpha = 1
    let raf = 0

    const randn = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5

    const computeGeo = (W: number, H: number): Geo => {
      // Regulation rink is 200ft x 85ft -> 2.35:1.
      const aspect = 200 / 85
      let rw = W * 0.98
      let rh = rw / aspect
      const maxH = H * 0.96
      if (rh > maxH) {
        rh = maxH
        rw = rh * aspect
      }
      const x = (W - rw) / 2
      const y = (H - rh) / 2
      return {
        rink: { x, y, x1: x + rw, y1: y + rh, w: rw, h: rh },
        hot: { x: x + rw * 0.8, y: y + rh * 0.5 }, // slot in front of attacking net
      }
    }

    const pickColor = () => {
      const orange = ['#FF6600', '#FF7A29', '#FF5719']
      const blue = ['#00BFFF', '#34CEFF']
      if (palette === 'blue') return blue[(Math.random() * blue.length) | 0]
      if (palette === 'orange') return orange[(Math.random() * orange.length) | 0]
      return Math.random() < 0.72
        ? orange[(Math.random() * orange.length) | 0]
        : blue[(Math.random() * blue.length) | 0]
    }

    const spawnShot = (now: number) => {
      const { hot, rink: r } = geo
      let x: number
      let y: number
      const roll = Math.random()
      if (roll < 0.48) {
        // offensive slot cluster
        x = hot.x + randn() * r.w * 0.085
        y = hot.y + randn() * r.h * 0.22
      } else if (roll < 0.78) {
        // attacking zone / point shots
        x = r.x + r.w * (0.62 + Math.random() * 0.28)
        y = r.y + r.h * (0.12 + Math.random() * 0.76)
      } else {
        // wide scatter (incl. neutral zone)
        x = r.x + r.w * (0.3 + Math.random() * 0.62)
        y = r.y + r.h * (0.1 + Math.random() * 0.8)
      }
      x = Math.max(r.x + 10, Math.min(r.x1 - 10, x))
      y = Math.max(r.y + 10, Math.min(r.y1 - 10, y))
      shots.push({ x, y, t0: now, color: pickColor(), r: 3 + Math.random() * 3.2 })
    }

    const roundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      ww: number,
      hh: number,
      rad: number
    ) => {
      c.beginPath()
      c.moveTo(x + rad, y)
      c.arcTo(x + ww, y, x + ww, y + hh, rad)
      c.arcTo(x + ww, y + hh, x, y + hh, rad)
      c.arcTo(x, y + hh, x, y, rad)
      c.arcTo(x, y, x + ww, y, rad)
      c.closePath()
    }

    const faceoffSpot = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: Geo['rink'],
      red: string,
      full: boolean
    ) => {
      c.fillStyle = red + '0.34)'
      c.beginPath()
      c.arc(x, y, r.h * (full ? 0.02 : 0.017), 0, Math.PI * 2)
      c.fill()
      c.strokeStyle = red + '0.28)'
      c.lineWidth = Math.max(1, r.h * 0.004)
      const gap = r.h * 0.028
      const len = r.h * (full ? 0.05 : 0.034)
      c.beginPath()
      c.moveTo(x - gap, y - len / 2)
      c.lineTo(x - gap, y + len / 2)
      c.moveTo(x + gap, y - len / 2)
      c.lineTo(x + gap, y + len / 2)
      c.stroke()
    }

    const drawRink = (c: CanvasRenderingContext2D, g: Geo) => {
      const r = g.rink
      const FX = (f: number) => r.x + r.w * f // along 200ft length
      const FY = (f: number) => r.y + r.h * f // across 85ft width
      const red = 'rgba(206,52,52,'
      const blue = 'rgba(0,150,210,'
      const cornerR = r.w * 0.135 // 28ft corner radius
      const foR = r.h * 0.176 // 15ft faceoff circle radius
      const yT = FY(0.5 - 0.259) // faceoff rows: 22ft off centre
      const yB = FY(0.5 + 0.259)

      c.save()
      roundRect(c, r.x, r.y, r.w, r.h, cornerR)
      c.clip()

      // blue lines (75ft from each end)
      c.strokeStyle = blue + '0.30)'
      c.lineWidth = Math.max(2.4, r.w * 0.011)
      ;[0.375, 0.625].forEach((f) => {
        const x = FX(f)
        c.beginPath()
        c.moveTo(x, r.y)
        c.lineTo(x, r.y1)
        c.stroke()
      })

      // centre red line
      c.strokeStyle = red + '0.28)'
      {
        const x = FX(0.5)
        c.beginPath()
        c.moveTo(x, r.y)
        c.lineTo(x, r.y1)
        c.stroke()
      }

      // goal lines (11ft from each end)
      c.strokeStyle = red + '0.22)'
      c.lineWidth = Math.max(1.3, r.h * 0.005)
      ;[0.055, 0.945].forEach((f) => {
        const x = FX(f)
        c.beginPath()
        c.moveTo(x, r.y)
        c.lineTo(x, r.y1)
        c.stroke()
      })

      // goal creases (blue half-circles at the goal lines)
      ;([
        [0.055, 1],
        [0.945, -1],
      ] as const).forEach(([f, dir]) => {
        const x = FX(f)
        const cy = FY(0.5)
        const cr = r.h * 0.075
        c.fillStyle = blue + '0.13)'
        c.strokeStyle = blue + '0.32)'
        c.lineWidth = 1.4
        c.beginPath()
        c.arc(x, cy, cr, dir > 0 ? -Math.PI / 2 : Math.PI / 2, dir > 0 ? Math.PI / 2 : Math.PI * 1.5)
        c.closePath()
        c.fill()
        c.stroke()
      })

      // centre circle (blue) + centre ice dot
      c.strokeStyle = blue + '0.30)'
      c.lineWidth = Math.max(1.5, r.h * 0.006)
      c.beginPath()
      c.arc(FX(0.5), FY(0.5), foR, 0, Math.PI * 2)
      c.stroke()
      c.fillStyle = blue + '0.42)'
      c.beginPath()
      c.arc(FX(0.5), FY(0.5), r.h * 0.014, 0, Math.PI * 2)
      c.fill()

      // end-zone faceoff circles + spot detail (red, 31ft from each end)
      c.lineWidth = Math.max(1.5, r.h * 0.006)
      ;([
        [0.155, yT],
        [0.155, yB],
        [0.845, yT],
        [0.845, yB],
      ] as const).forEach(([f, y]) => {
        const x = FX(f)
        c.strokeStyle = red + '0.26)'
        c.beginPath()
        c.arc(x, y, foR, 0, Math.PI * 2)
        c.stroke()
        faceoffSpot(c, x, y, r, red, true)
      })

      // neutral-zone faceoff dots (red, 5ft off each blue line)
      ;([
        [0.4, yT],
        [0.4, yB],
        [0.6, yT],
        [0.6, yB],
      ] as const).forEach(([f, y]) => {
        faceoffSpot(c, FX(f), y, r, red, false)
      })

      c.restore()

      // boards on top so corners stay crisp
      c.strokeStyle = 'rgba(58,58,68,0.32)'
      c.lineWidth = Math.max(2, r.h * 0.009)
      roundRect(c, r.x, r.y, r.w, r.h, cornerR)
      c.stroke()
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      if (cfg.showRink) {
        ctx.save()
        drawRink(ctx, geo)
        ctx.restore()
      }

      const dx = Math.sin(now / 3000) * 6
      const dy = Math.cos(now / 3700) * 4
      ctx.save()
      ctx.translate(dx, dy)

      // heat bloom in the slot
      const hot = geo.hot
      const hotR2 = Math.pow(Math.min(geo.rink.w, geo.rink.h) * 0.34, 2)
      let near = 0
      for (const s of shots) {
        const a = s.x - hot.x
        const b = s.y - hot.y
        if (a * a + b * b < hotR2) near++
      }
      if (near > 0) {
        const intensity = Math.min(near / (cfg.loopShots * 0.55), 1)
        const pulse = 0.5 + 0.5 * Math.sin(now / 900)
        const radius = 70 + intensity * Math.min(geo.rink.w, geo.rink.h) * 0.55
        const a = 0.2 * intensity * (0.72 + 0.28 * pulse) * periodAlpha
        const grad = ctx.createRadialGradient(hot.x, hot.y, 0, hot.x, hot.y, radius)
        grad.addColorStop(0, 'rgba(255,102,0,' + a.toFixed(3) + ')')
        grad.addColorStop(0.55, 'rgba(255,90,30,' + (a * 0.4).toFixed(3) + ')')
        grad.addColorStop(1, 'rgba(255,102,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(hot.x, hot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // shots
      for (const s of shots) {
        const age = now - s.t0
        const popP = Math.min(age / 280, 1)
        const k = 1.70158
        const scale = 1 + (k + 1) * Math.pow(popP - 1, 3) + k * Math.pow(popP - 1, 2) // back-out ease
        if (age < cfg.pingMs) {
          const rp = age / cfg.pingMs
          ctx.globalAlpha = periodAlpha * 0.5 * (1 - rp)
          ctx.strokeStyle = s.color
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r + rp * 22, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.globalAlpha = periodAlpha
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.shadowBlur = 13
        ctx.beginPath()
        ctx.arc(s.x, s.y, Math.max(0.1, s.r * scale), 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = periodAlpha * 0.55
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.beginPath()
        ctx.arc(s.x - s.r * 0.3, s.y - s.r * 0.3, Math.max(0.1, s.r * 0.32 * scale), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.restore()
    }

    const tick = (now: number) => {
      const el = now - phaseStart
      if (phase === 'plotting') {
        if (now - lastSpawn > cfg.spawnMs && shots.length < cfg.loopShots) {
          spawnShot(now)
          lastSpawn = now
        }
        if (shots.length >= cfg.loopShots) {
          phase = 'hold'
          phaseStart = now
        }
      } else if (phase === 'hold') {
        if (el > cfg.holdMs) {
          phase = 'fade'
          phaseStart = now
        }
      } else if (phase === 'fade') {
        const p = Math.min(el / cfg.fadeMs, 1)
        periodAlpha = 1 - (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
        if (p >= 1) {
          shots = []
          periodAlpha = 1
          phase = 'plotting'
          phaseStart = now
          lastSpawn = now
        }
      }
      draw(now)
      raf = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = Math.max(1, Math.round(w * dpr))
      cv.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      geo = computeGeo(w, h)
      if (reduced) draw(performance.now())
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    if (reduced) {
      const seed = performance.now() - 5000
      for (let i = 0; i < cfg.loopShots; i++) spawnShot(seed)
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [motionIntensity, colorEmphasis, showRink])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
