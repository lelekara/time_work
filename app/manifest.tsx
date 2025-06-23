import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Time Worker',
    short_name: 'TimeWorker',
    description: 'Gérez et suivez votre temps de travail facilement',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f3ff', // violet très clair (cohérent avec le design)
    theme_color: '#6366f1', // indigo-500 (cohérent avec le design)
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}