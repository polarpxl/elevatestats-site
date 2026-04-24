import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CalloutType = 'info' | 'warning' | 'success'

const toneClasses: Record<CalloutType, { wrap: string; icon: string }> = {
  info: {
    wrap: 'bg-brand-blue/5 ring-brand-blue/30',
    icon: 'text-brand-blue',
  },
  warning: {
    wrap: 'bg-amber-50 ring-amber-300/60',
    icon: 'text-amber-600',
  },
  success: {
    wrap: 'bg-emerald-50 ring-emerald-300/60',
    icon: 'text-emerald-600',
  },
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18h.01" />
    </svg>
  )
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  )
}

const icons: Record<CalloutType, (props: { className?: string }) => React.ReactElement> = {
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType
  children: ReactNode
}) {
  const tone = toneClasses[type]
  const Icon = icons[type]
  return (
    <div className={cn('my-6 flex gap-3 rounded-card p-4 ring-1 ring-inset md:p-5', tone.wrap)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', tone.icon)} />
      <div className="text-sm leading-relaxed text-ink md:text-base [&>p]:m-0">{children}</div>
    </div>
  )
}
