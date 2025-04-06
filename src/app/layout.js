import './globals.css';
import ThemeRegistry from './components/ThemeRegistry';
import Header from './components/ui/Header';
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from './components/GoogleAnalytics';
import GoogleTagManager from './components/GoogleTagManager';

export const metadata = {
  title: 'Toby Balsley Tango - Interactive Tango Rhythm & Musicality',
  description: 'An interactive learning platform for Argentine Tango dancers featuring visual rhythm patterns, musical examples, and dance techniques to enhance musicality and connection.',
  keywords: 'Argentine Tango, Tango Musicality, Tango Rhythms, Interactive Dance Learning, Tango Lab, Dance Classes, Toby Balsley, Tango Instruction, Dance Visualization, Tango Music Analysis',
  authors: [{ name: 'Toby Balsley' }],
  creator: 'Toby Balsley',
  publisher: 'Toby Balsley',
  metadataBase: new URL('https://tobytango.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Toby Balsley Tango - Interactive Tango Rhythm & Musicality',
    description: 'Explore Argentine Tango through interactive rhythm visualizations, audio examples, and detailed movement analysis. Perfect for dancers looking to deepen their musical understanding and connection.',
    url: 'https://tobytango.com',
    siteName: 'Toby Tango',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toby Balsley Tango - Interactive Learning Platform',
    description: 'Visualize tango rhythms, study dance stances, and analyze musical patterns to enhance your Argentine Tango practice.',
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
        
        {/* Application icons */}
        <link rel="icon" sizes="32x32" href="/TTIcon-32.png" />
        <link rel="icon" sizes="48x48" href="/TTIcon-48.png" />
        <link rel="icon" sizes="192x192" href="/TTIcon.png" />
        <link rel="apple-touch-icon" href="/TTIcon.png" />
        <link rel="shortcut icon" type="image/png" href="/TTIcon-32.png" />
        
        {/* Preload common rhythm icons to prevent delay */}
        <link rel="preload" as="image" href="/rhythms/icons/1.png" />
        <link rel="preload" as="image" href="/rhythms/icons/2.png" />
        <link rel="preload" as="image" href="/rhythms/icons/3.png" />
        <link rel="preload" as="image" href="/rhythms/icons/4.png" />
        <link rel="preload" as="image" href="/rhythms/icons/&.png" />
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