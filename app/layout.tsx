import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import './refinements.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const logo = 'https://fueqkodtkzpkgyljuiui.supabase.co/storage/v1/object/public/business-logos/01c95810-24b8-42c9-b457-01d4bf4c4e28/logo-1783344661104.jpg';

export const metadata: Metadata = {
 metadataBase: new URL('https://certifire-uk.vercel.app'),
 title: { default: 'Certifire UK | Fire Safety Services in London', template: '%s | Certifire UK' },
 description: 'Fire risk assessments, fire alarm servicing, emergency lighting checks and regular fire safety logging across London and surrounding areas.',
 keywords: ['fire risk assessment London','fire alarm certificate London','emergency lighting certificate','fire safety logging','Certifire UK'],
 openGraph: { title:'Certifire UK | Fire Safety Services in London', description:'Fire risk assessments, alarm servicing, emergency lighting checks and regular fire safety logging.', type:'website', locale:'en_GB', images:[{url:logo,width:1200,height:1200,alt:'Certifire UK logo'}] },
 twitter: { card:'summary_large_image', title:'Certifire UK | Fire Safety Services in London', description:'Fire risk assessments, alarm servicing, emergency lighting checks and regular fire safety logging.', images:[logo] },
 icons: { icon:logo, shortcut:logo, apple:logo }, alternates:{canonical:'/'}
};
export const viewport: Viewport = { width:'device-width', initialScale:1, themeColor:'#17191b' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en-GB"><body className={`${inter.variable} ${oswald.variable}`}>{children}</body></html>}
