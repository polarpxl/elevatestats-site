export type FaqEntry = { question: string; answer: string }

export const faqs: readonly FaqEntry[] = [
  {
    question: 'What is Elevate Stats?',
    answer:
      'Elevate Stats is a hockey stats tracking app for amateur coaches. You track shots, goals, and game events from the bench on your phone or tablet, and get shot maps, player and goalie stats, and AI coaching insights after every game.',
  },
  {
    question: 'Is Elevate Stats free?',
    answer:
      'Yes. The Free tier includes unlimited team-level game tracking, forever. Every new account also gets 3 full games of PRO features to try, with no credit card required.',
  },
  {
    question: 'How do I track shots on goal for a minor hockey team?',
    answer:
      'Open Elevate Stats during the game and tap the rink where the shot happened. Each tap records the shot location, and PRO attributes it to a player. After the game you get a shot map and shooting stats automatically.',
  },
  {
    question: 'Does Elevate Stats work for minor hockey, beer league, and youth teams?',
    answer:
      'Yes. It is built specifically for amateur hockey: minor and youth teams, junior, and adult recreational leagues. It is designed to be usable by one person on a cold bench with gloves on.',
  },
  {
    question: 'Does it work at rinks with no cell signal?',
    answer:
      'Yes. Tracking works fully offline and syncs automatically when your connection returns.',
  },
  {
    question: 'Do I need to install an app from the App Store?',
    answer:
      'No. Elevate Stats is a web app that runs in your browser at app.elevatestats.app, and you can add it to your home screen so it opens like a regular app.',
  },
  {
    question: 'What does Elevate Stats cost?',
    answer:
      'The Free tier is $0, forever. PRO is $14 CAD per month or $109 CAD per year (which saves $59 a year). Clubs, associations, and leagues can contact us for volume pricing.',
  },
  {
    question: "Can parents see their player's stats?",
    answer:
      "Yes. Coaches can share stats, and parents can also track games themselves from the stands to follow their player's progress across a season.",
  },
  {
    question: 'How is Elevate Stats different from a paper game sheet or a spreadsheet?',
    answer:
      'A paper sheet captures totals. Elevate Stats captures where and when every event happened, then turns that into shot maps, trends, and AI insights with no manual data entry after the game.',
  },
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
