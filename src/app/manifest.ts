import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Elevate Hockey Stats',
    short_name: 'Elevate',
    description:
      'The simplest way for amateur hockey coaches and stat trackers to capture, share, and learn from pro-quality game stats.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF6600',
    categories: ['sports', 'productivity'],
    icons: [
      {
        src: '/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/brandmark.png',
        sizes: '800x800',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
