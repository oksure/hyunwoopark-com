# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Self-Maintenance

**Before ending a session**, proactively update this file and `README.md` with any new conventions, patterns, or learnings discovered during the session. This includes:
- New data format conventions
- UI rendering patterns
- Bug fixes and their solutions
- Conference locations or other reference data
- Any corrections to existing documentation

Do not wait to be asked—keep these files current.

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

This is an academic homepage built with Next.js 16 App Router, displaying professional information including publications, experience, education, and awards.

### Tech Stack
- **Next.js 16.1.1** with App Router (`/app` directory)
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
4. **Publication filtering** includes journal ranking systems (UTD24/FT50 combined, ABS)
5. **Trailing slashes** are enforced on URLs (configured in next.config.js)
6. **Dark mode images** - Avoid `useColorModeValue` for image sources (causes hydration mismatch). Instead, render both images and use CSS `_dark` pseudo-class to show/hide

## Data Conventions

### Author Format
Authors are formatted as: `LastName FirstInitial` (e.g., `Park H`, `Kim BC`, `Basole RC`)
- The owner's name `Park H` is automatically bolded in the UI

### Publication Numbering
- Journal articles: `[J1]`, `[J2]`, etc. (numbered from oldest to newest)
- Conference proceedings: `[C1]`, `[C2]`, etc.
- Numbers are fixed based on full list, consistent across filters

### Journal Rankings (`top` field in pubs.json)
- `utd24` - UTD Top 24 Business Journals
- `ft50` - Financial Times Top 50
- `abs4*`, `abs4`, `abs3`, `abs` - ABS Academic Journal Guide ratings

### Conference Proceedings (procs.json)
- AOM entries with DOI ending in `abstract` → "Academy of Management Proceedings"
- AOM entries without `abstract` in DOI → "Academy of Management Best Paper Proceedings"
- `award` field (array) displays green badges: `["Best Paper"]`, `["Best Poster"]`, `["Best Paper Finalist"]`, `["Best Student Paper"]`

### Conference Presentations (confs.json)
- Each item has a `title` and `conferences` array (name, location, year)
- Same paper can be presented at multiple conferences
- Session chair roles or executive meetings can be noted in the title (e.g., "(Session Chair)", "(Regional Ambassador for Asia)")
- Common conference locations:
  - INFORMS Annual Meeting: rotates US cities (Seattle 2024, Atlanta 2025)
  - POMS Annual Meeting: rotates US cities (Atlanta 2025)
  - AOM Annual Meeting: international (Copenhagen 2025)

### Invited Talks (talks.json)
- Each item has `institution` and `year`
- Format: "Department/School, University, Location"

### Teaching (teaching.json)
- Each institution has `courses` array with `role` and `details`
- Roles include: "Past Students", "Current Students", "Courses", "Instructor", "TA", etc.
- URLs in details are auto-linked in the UI
- Semester format: SP = Spring (1st semester), AU = Autumn/Fall (2nd semester)
- Student degree format: "Ph.D.:" and "Master's:" (with apostrophe)

### Services (servs.json)
- Types: `membership`, `conference`, `service`, `reviewer`
- Each has `details` array with `category` and `subdetails`
- Special UI rendering (one-liner with bullet): Korean memberships, Ad-hoc Reviewer journals/conferences

### Awards (awards.json)
Types: `award`, `fellowship`, `grant`
- `special: true` makes the entry bold
- Subheading for awards displays as "Awards and Honors"

### Links
- Only create clickable links when URL is provided
- If no `link` field, title displays as plain text