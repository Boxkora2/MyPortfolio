import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vo Thanh Phat — Frontend Developer',
    short_name: 'VTP Portfolio',
    description:
      'Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0a1e',
    theme_color: '#7c3aed',
    orientation: 'portrait-primary',
    categories: ['portfolio', 'technology', 'developer'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Vo Thanh Phat Portfolio Homepage',
      },
    ],
  }
}
