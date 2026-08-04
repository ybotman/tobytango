/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.tobytango.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Keep admin and gated pages out of the sitemap. Listing them would advertise
  // the admin surface to crawlers and put gated festival content in search results.
  exclude: ['/analytics-setup', '/admin', '/admin/*', '/festival/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.tobytango.com/server-sitemap.xml',
    ],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/', '/festival/'] },
    ],
  },
  // Optional: change to true if you're deploying to a subdirectory
  trailingSlash: false,
}