import './globals.css';
import ThemeRegistry from './components/ThemeRegistry';

export const metadata = {
  title: 'Toby Balsley Tango',
  description: 'TobyTango Lab Site.  Built by Toby Balsley for traveling and classes assistance in Argentine Tango.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}