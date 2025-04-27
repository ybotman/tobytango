# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Run development server with turbopack
- `npm run build` - Build production bundle
- `npm run postbuild` - Generate sitemap (automatically run after build)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run full` - Run build followed by dev server

## Code Style Guidelines
- **CRITICAL**: Always fix ESLint errors immediately, especially those related to character escaping and quotes that can cause hydration issues
- **Imports**: Group imports by type - React, Next.js, MUI components, other libraries, local components, styles
- **Components**: Use functional components with "use client" directive at top of client components
- **Props**: Always validate props with PropTypes
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Files**: Follow Next.js App Router conventions - page.js for routes, layout.js for layouts
- **CSS**: Use MUI v7+ theming/styling system with sx prop for component styling
- **Error Handling**: Check for client-side operations with typeof window !== 'undefined'
- **Quotes**: ALWAYS use HTML entities for quotes in JSX text (e.g., &quot; instead of ") to prevent ESLint errors and hydration issues
- **React Hooks**: Always include all dependencies in useEffect dependency arrays
- **Analytics**: Use utility functions in src/app/utils/analytics.js for tracking