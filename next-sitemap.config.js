/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.tobytango.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/analytics-setup'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.tobytango.com/server-sitemap.xml',
    ],
  },
  // Optional: change to true if you're deploying to a subdirectory
  trailingSlash: false,
}