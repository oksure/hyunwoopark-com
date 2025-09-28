# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev        # Start development server on port 3000
pnpm build      # Create production build
pnpm start      # Start production server
pnpm type-check # Run TypeScript type checking
```

### Package Management
This project uses `pnpm` as the package manager. Always use `pnpm` commands instead of `npm` or `yarn`.

## Architecture Overview

This is an academic homepage built with Next.js 15 App Router, displaying professional information including publications, experience, education, and awards.

### Tech Stack
- **Next.js 15.1.3** with App Router (`/app` directory)
- **React 18.3.1** with TypeScript
- **Chakra UI v3.8.0** for UI components
- **next-themes** for dark/light mode support

### Data Architecture
Academic content is data-driven, stored in JSON files under `/src/data/`:
- `pubs.json` - Publications with journal rankings (UTD24, FT50, ABS)
- `exps.json` - Professional experience
- `edus.json` - Education history
- `awards.json`, `servs.json`, `talks.json`, etc.

Types are defined in `/src/types/data.d.ts` for all data structures.

### Component Structure
- `/app/components/` - App-specific components (Navbar, Footer, Sidebar)
- `/components/ui/` - Chakra UI custom components (avatar, checkbox, dialog, etc.)
- Pages use server components where possible for performance

### Routing & Legacy Support
The `next.config.js` includes extensive rewrites for legacy versions (`/v1`, `/v2`, `/v3`, `/v4`) and project pages (`/netview`, `/econsec`, `/klpga`, `/snumba`).

### Styling
- Chakra UI v3 with Emotion for CSS-in-JS
- Theme switching via next-themes
- Custom fonts: Inter, Roboto, Noto Sans KR, Lato (via next/font/google)

## Key Implementation Notes

1. **No testing framework** is currently set up - manual testing only
2. **TypeScript strict mode is disabled** - type checking is lenient
3. **Data updates** should be made in the JSON files under `/src/data/`
4. **Publication filtering** includes journal ranking systems (UTD24, FT50, ABS)
5. **Trailing slashes** are enforced on URLs (configured in next.config.js)