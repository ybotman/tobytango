import './globals.css';
import ThemeRegistry from './components/ThemeRegistry';
import Header from './components/ui/Header';
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from './components/GoogleAnalytics';
import GoogleTagManager from './components/GoogleTagManager';

export const metadata = {
  title: 'Toby Balsley Tango',
  description: 'TobyTango Lab Site. Built by Toby Balsley for traveling and classes assistance in Argentine Tango.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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