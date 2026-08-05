/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.tobytango.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Keep admin and gated pages out of the sitemap. Listing them would advertise
  // the admin surface to crawlers and put gated festival content in search results.
  // Both the bare path and the wildcard are needed: '/festival/*' does not match
  // '/festival' itself, so the index page would otherwise be advertised here.
  exclude: ['/analytics-setup', '/admin', '/admin/*', '/festival', '/festival/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.tobytango.com/server-sitemap.xml',
    ],
    // /festival/ is deliberately NOT disallowed here. Disallow stops a crawler
    // fetching the page, which also stops it reading the `X-Robots-Tag: noindex`
    // we serve on /festival/* (see next.config.mjs) -- the weaker instrument
    // would block the stronger one, and a linked URL could still be indexed.
    // Letting crawlers fetch means they read the noindex; all they ever see is
    // the login gate anyway. /admin stays disallowed: it is only a request, but
    // it costs nothing and it also carries the noindex header.
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/'] },
    ],
  },
  // Optional: change to true if you're deploying to a subdirectory
  trailingSlash: false,
}