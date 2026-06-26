export type FaqEntry = { question: string; answer: string }

export const faqs: readonly FaqEntry[] = [
  {
    question: 'What counts as a "PRO game" on the free tier?',
    answer:
      "Only finalized games count toward your 3-game PRO trial. Games you start but don't finalize don't burn a trial game, and games you delete before finalizing don't count either. The counter is per account, so creating a new team won't reset it.",
  },
  {
    question: 'What happens after my 3 PRO games?',
    answer:
      "You drop to the Free tier automatically. You can keep tracking unlimited games at the team level forever. You'll lose access to player-level stats, AI insights, opponent analysis, full game history, and CSV import/export until you upgrade. Your data stays put. Nothing is deleted.",
  },
  {
    question: 'Does PRO auto-renew?',
    answer:
      'Yes. Monthly PRO renews every month, yearly PRO renews every year, until you cancel. We send a reminder before any yearly renewal.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes, in two taps from your account settings. You'll keep PRO access until the end of your current billing period, then drop to Free. No further charges.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "No, but we make it easy to avoid needing one. The Free tier is genuinely free forever, and you get 3 full PRO games to try everything before you pay. If PRO isn't working for you, cancel anytime in two taps and you won't be charged again.",
  },
  {
    question: 'What happens to my data if I cancel?',
    answer:
      "Nothing. Your account stays active and all your game data stays in your account. You'll keep seeing team-level stats and your last 5 games. Player stats, AI insights, and full history get hidden until you re-subscribe, at which point everything reappears exactly as it was.",
  },
  {
    question: 'Why is pricing in CAD?',
    answer:
      "We're a Canadian company building for Canadian hockey first. Stripe handles the conversion automatically if your card is in another currency.",
  },
  {
    question: 'Do you have team or league plans?',
    answer:
      "Yes. If you're a club, association, or league looking to roll out Elevate Stats across multiple teams, contact us and we'll put together a plan that fits.",
  },
  {
    question: 'Can I export my data?',
    answer:
      'PRO users can export every game, roster, and stat to CSV. Free users can’t export. If you upgrade, then cancel, you can re-subscribe later to export. Your data is always there waiting.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      "Account deletion is available from your account settings. This permanently deletes all your data and can't be undone. Contact us if you need help.",
  },
] as const
