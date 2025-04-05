import './globals.css';
import ThemeRegistry from './components/ThemeRegistry';
import Header from './components/ui/Header';
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from './components/GoogleAnalytics';
import GoogleTagManager from './components/GoogleTagManager';

export const metadata = {
  title: 'Toby Balsley Tango',
  description: 'Built by Toby for tango rhythm, musicality, and study classes .assistance in Argentine Tango.',
  keywords: 'Argentine Tango, Tango Music, Argentine Dance Rhythms, Tango Lab, Dance Classes, Toby Balsley, Tango Instruction',
  authors: [{ name: 'Toby Balsley' }],
  creator: 'Toby Balsley',
  publisher: 'Toby Balsley',
  metadataBase: new URL('https://tobytango.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Toby Balsley Tango',
    description: 'A ever chaning, and eventually comprehensive resource for Argentine Tango instruction, applied music theory, and dance technique.',
    url: 'https://tobytango.com',
    siteName: 'Toby Tango',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toby Balsley Tango',
    description: 'Argentine Tango instruction and resources for dancers of all levels.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1976d2" />
        <GoogleTagManager />
      </head>
      <body>
        <ThemeRegistry>
          <Header />
          {children}
          <Analytics />
          <GoogleAnalytics />
        </ThemeRegistry>
      </body>
    </html>
  );
}