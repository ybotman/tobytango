# tobytango.com

Next.js 16 / React 19 / MUI 7 site, deployed on Vercel.

## Documentation

| Doc | What |
|---|---|
| **[docs/FESTIVAL-ARCHIVE.md](docs/FESTIVAL-ARCHIVE.md)** | **Festival Archive (Chicho 2026) — handover doc.** Architecture, Azure setup, env-var contract, blob layout, and the list of known deferrals. Read this before touching `/admin` or `/festival`. |
| [CLAUDE.md](CLAUDE.md) | Repo conventions, branch strategy, content pipeline |
| [public/tango-papers/README-CONTENT-SYSTEM.md](public/tango-papers/README-CONTENT-SYSTEM.md) | Tango timeline content system |

## Getting Started

```bash
npm install     # npm cache is on /Volumes/DEVL — that volume must be mounted
npm run dev
```

Open [http://localhost:4003](http://localhost:4003) — **port 4003**, not the
Next.js default 3000. The blob CORS rules are configured for that exact origin,
so running on another port will break media playback locally.

Environment variables are required for the API routes to function; see the
env-var contract in [docs/FESTIVAL-ARCHIVE.md](docs/FESTIVAL-ARCHIVE.md#4-environment-variable-contract).

## Branches

Work on `DEVL`. Never push `master` without approval.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
