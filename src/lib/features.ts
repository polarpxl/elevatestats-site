import { links } from '@/lib/links'

export type CategoryTheme = 'light' | 'surface' | 'dark'

export type IconName =
  | 'check'
  | 'sparkle'
  | 'map-pin'
  | 'layers'
  | 'download'
  | 'upload'
  | 'phone'
  | 'wifi-off'
  | 'lightning-bolt'
  | 'chart'
  | 'shield'
  | 'clock'

export type FeatureItem = {
  title: string
  description: string
  hero?: boolean
  icon?: IconName
  pro?: boolean
}

export type FeatureCategory = {
  id: string
  eyebrow: string
  heading: string
  lede: string
  theme: CategoryTheme
  features: FeatureItem[]
  cta: { label: string; href: string }
}

export const featureCategories: FeatureCategory[] = [
  {
    id: 'live-game-tracking',
    theme: 'light',
    eyebrow: 'Live Game Tracking',
    heading: 'Track every shift without missing the game.',
    lede:
      'Big tap targets. Zero lag. Everything happens on-device first, so the bench never has to wait for signal.',
    cta: { label: 'Start tracking your next game', href: links.appHome },
    features: [
      {
        title: 'Tap-to-track shot events on a rink visual',
        description:
          'Goals, shots on net, missed shots, blocked shots, all logged with location by tapping the ice surface.',
        hero: true,
        icon: 'map-pin',
      },
      {
        title: 'Instant event entry',
        description:
          'Dots appear on the rink the moment you tap. No network round-trip, no spinner, no waiting.',
        hero: true,
        icon: 'lightning-bolt',
      },
      {
        title: 'Player-level attribution',
        description:
          'Select scorer, assists, and involved players from your roster in two taps.',
        hero: true,
        icon: 'layers',
        pro: true,
      },
      {
        title: 'Quick Tracking mode',
        description:
          "Team-vs-opponent toggle for fast entry when you don’t need player detail. PRO can switch into full tracking with per-player attribution; Free stays in Quick mode.",
        hero: true,
        icon: 'clock',
      },
      {
        title: 'Penalty tracking',
        description: 'Log penalties as they happen during the game.',
      },
      {
        title: 'Goalie selection and mid-game switches',
        description:
          'Pick your starting goalie, pull or swap mid-game, and stats follow the right goalie automatically.',
      },
      {
        title: 'Configurable period lengths',
        description: 'Three-per-period stepper so you can match any league format.',
      },
      {
        title: 'Live scoreboard',
        description:
          'Real-time score, shot counts, and period tracking as events are logged.',
      },
      {
        title: 'One-tap undo',
        description: 'Instantly undo the last event.',
      },
      {
        title: 'Game finalization',
        description: 'Close out a game and lock in final stats. PRO games also generate AI Coaching Insights.',
      },
    ],
  },
  {
    id: 'team-season-analytics',
    theme: 'surface',
    eyebrow: 'Team & Season Analytics',
    heading: 'Turn every game into a better next game.',
    lede:
      'Post-game breakdowns, player pages, opponent history, all generated automatically the moment the final whistle blows.',
    cta: {
      label: "See what your team’s data is telling you",
      href: links.appHome,
    },
    features: [
      {
        title: 'AI Coaching Insights',
        description:
          "Swipeable carousel of AI-generated coaching tips after every finalized game, tailored to your team’s trends.",
        hero: true,
        icon: 'sparkle',
        pro: true,
      },
      {
        title: 'Team dashboard',
        description:
          'Season record (GP/W/L/T), Last 5 Games, and team card on one screen.',
        hero: true,
        icon: 'chart',
      },
      {
        title: 'Player and goalie profile pages',
        description:
          'Individual stats, shot maps, and performance trends per player. Goalie pages include SV% and GAA.',
        hero: true,
        icon: 'shield',
        pro: true,
      },
      {
        title: 'Opponent analysis',
        description:
          'Head-to-head record, shot charts, and game-by-game breakdown vs any opponent.',
        hero: true,
        icon: 'layers',
        pro: true,
      },
      {
        title: 'Team-level stats',
        description:
          'Goals, shots, missed, blocked, shooting percentage, and special teams, filterable by game type.',
      },
      {
        title: 'Roster Analysis',
        description: 'Skater leaderboards and individual performance rows.',
        pro: true,
      },
      {
        title: 'Opponent management',
        description: "Add and manage opponents you’ve played or plan to play.",
      },
      {
        title: 'Full game history',
        description: "Browse, open, and review every game you’ve tracked.",
        pro: true,
      },
      {
        title: 'Game detail pages',
        description: 'A full post-game breakdown for any individual game. Free includes detail pages for your last 5 games; PRO covers your entire history.',
        pro: true,
      },
      {
        title: 'Game scheduling',
        description:
          'Schedule games ahead of time and tap to start on game day. Roster snapshots automatically.',
      },
      {
        title: 'CSV import',
        description: 'Bulk upload rosters, opponents, and game schedules.',
        pro: true,
      },
      {
        title: 'CSV export',
        description: 'Download your stats for spreadsheets or sharing with families.',
        pro: true,
      },
    ],
  },
  {
    id: 'built-for-the-rink',
    theme: 'dark',
    eyebrow: 'Built for the Rink',
    heading: 'Built for the rink, not a boardroom.',
    lede:
      "Spreadsheets and clipboards don’t fail because they lack features. They fail because they’re slow, they forget to update, and they don’t work when signal drops. Elevate is built for the environment you actually coach in.",
    cta: { label: 'Install the app in seconds', href: links.appHome },
    features: [
      {
        title: 'Mobile-first design',
        description:
          'Built for a phone in your hand on the bench. Big buttons, zero menus in the way.',
        hero: true,
        icon: 'phone',
      },
      {
        title: 'Full offline tracking',
        description:
          "Track an entire game with no signal. Everything syncs automatically when you’re back online.",
        hero: true,
        icon: 'wifi-off',
      },
      {
        title: 'Progressive Web App',
        description:
          'Install to your home screen like a native app. No app store, no downloads, no updates to chase.',
        hero: true,
        icon: 'download',
      },
      {
        title: 'Automatic background sync',
        description: 'No save button. No lost data. No manual anything.',
      },
      {
        title: 'Pre-game data prefetch',
        description:
          "Rosters, opponents, and schedules cached before the game starts so you’re ready even if signal dies.",
      },
      {
        title: 'Duplicate-safe event logging',
        description: 'Reconnect mid-sync and nothing double-counts.',
      },
    ],
  },
]
