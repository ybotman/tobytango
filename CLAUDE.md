# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Run development server with turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Code Style Guidelines
- **Imports**: Group imports by type - React, Next.js, MUI components, other libraries, local components, styles
- **Components**: Use functional components with "use client" directive at top of client components
- **Props**: Always validate props with PropTypes
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Files**: Use .jsx extension for React components, .js for utility functions
- **CSS**: Use MUI theming/styling system with sx prop for component styling
- **Comments**: Use JSDoc style comments for utility functions
- **Error Handling**: Check for client-side operations with typeof window !== 'undefined'
- **Paths**: Use @/* for imports from src directory
- **Analytics**: Use utility functions in src/app/utils/analytics.js for tracking