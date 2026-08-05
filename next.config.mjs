/** @type {import('next').NextConfig} */

// Gated surfaces must never appear in a search index.
//
// X-Robots-Tag is the load-bearing instrument here, not robots.txt. A robots.txt
// `Disallow` tells a crawler not to FETCH the page, which means it can never read
// a noindex on it -- so a URL leaked in a link can still be indexed while the one
// directive that would have excluded it is unreadable. This header is a directive
// that travels with the response, and it covers the API routes and any asset
// served under these paths, not just the HTML pages.
const NOINDEX = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];

const nextConfig = {
  async headers() {
    return [
      { source: '/festival', headers: NOINDEX },
      { source: '/festival/:path*', headers: NOINDEX },
      { source: '/admin', headers: NOINDEX },
      { source: '/admin/:path*', headers: NOINDEX },
      { source: '/api/festival/:path*', headers: NOINDEX },
    ];
  },
};

export default nextConfig;
