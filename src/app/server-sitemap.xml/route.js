import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request) {
  // Get all dynamic routes
  const rhythmPatterns = ['1-3-', '123-', '1-34', '1234', '1---', '----'];
  
  // Create sitemap entries for each dynamic route
  const fields = rhythmPatterns.map((pattern) => ({
    loc: `https://tobytango.com/rhythms/tango/${pattern}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: 'weekly',
  }));

  // Return the XML sitemap
  return getServerSideSitemap(fields);
}