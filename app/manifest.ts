import type { MetadataRoute } from 'next';

const logo = 'https://fueqkodtkzpkgyljuiui.supabase.co/storage/v1/object/public/business-logos/01c95810-24b8-42c9-b457-01d4bf4c4e28/logo-1783344661104.jpg';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Certifire UK',
    short_name: 'Certifire UK',
    description: 'Fire safety services across London and surrounding areas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111315',
    theme_color: '#17191b',
    icons: [{ src: logo, sizes: '512x512', type: 'image/jpeg' }],
  };
}
