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

1. **No testing framework** is currently set up - manual testing only. CI (`.github/workflows/ci.yml`) runs `pnpm type-check && pnpm build` on push/PR.
2. **TypeScript strict mode is disabled** - type checking is lenient
3. **Data updates** should be made in the JSON files under `/src/data/`
4. **Publication filtering** includes journal ranking systems (UTD24/FT50 combined, ABS)
5. **Trailing slashes** are enforced on URLs (configured in next.config.js)
6. **Dark mode images** - Avoid `useColorModeValue` for image sources (causes hydration mismatch). Instead, render both images and use CSS `_dark` pseudo-class to show/hide
7. **Chakra UI Drawer** - `DrawerTitle` already renders an `<h2>`, so don't nest `<Heading as="h2">` inside it (causes hydration error)
8. **For loops** - Always add `key` prop to elements rendered inside Chakra's `<For>` component
9. **Heading hierarchy** - Sidebar name is the only `<h1>`; section titles (Experience, Publications, ...) are `<h2>`; sub-groups (years, degree groups) are `<h3>`. Don't reintroduce h4-under-h2 skips.
10. **OG image** - `/app/opengraph-image.tsx` generates the 1200x630 social preview at build time (next/og ImageResponse). Update it if title/affiliation changes.

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

### Awards vs. grants (awards.json)
- The 2002 presidential award (21세기를 이끌 우수인재상) is already listed as "Presidential Scholar". Do not add it again under a translated name.
- Grants use `awarder` for the role ("PI" / "Co-PI") and `special: true` for PI grants.

### Services (servs.json), Advisory and Policy
- `type: "service"` section "Advisory and Policy" holds government, industry, and Korean academic-society roles. SK hynix VPP = "Visiting Professor Collaboration Program" (not a platform).

## Bio, Korean CV, and Media (added 2026-09)

- `/bio/` (`app/bio/BioClient.tsx`) is the Speaker and Media Kit: `bios` array (`en-short`, `en-standard`, `ko-short`, `ko-standard`) with copy-to-clipboard, press photos (DO Spaces CDN), a Korean CV section, and a Media section (YouTube embed in a 16:9 `pb="56.25%"` wrapper).
- `/bio/resume-ko/` (`app/bio/resume-ko/KrCvClient.tsx`) renders the Korean CV inline and links `public/assets/cv_kr.pdf`. The route uses the language code `ko`, not the country code `kr`.
- **Korean CV source of truth** lives outside the repo: `~/Documents/Work/max-committee/이력서_박현우.html`. Update flow: edit the HTML, regenerate the PDF with `microsoft-edge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=<out> file:///.../이력서_박현우.html` (must stay 1 page, A4), copy it to `public/assets/cv_kr.pdf`, then mirror the text change in `KrCvClient.tsx`.
- Chakra UI v3 has no `sx` prop. Pass CSS custom properties with `style={{ "--x": "#..." } as React.CSSProperties}` and consume them as `var(--x)`.
- Title or affiliation changes touch: `app/layout.tsx` (metadata + JSON-LD `jobTitle`), `app/components/Sidebar.tsx`, `app/opengraph-image.tsx`, `app/bio/page.tsx`, `app/bio/BioClient.tsx`, `src/data/exps.json`, `cv/CV_template.Rmd`.
- Naming: Y-KAST = 한국차세대과학기술한림원; Park belongs to the 정책학부 (Policy Studies Division), 2024 class (announced 2023-12). INFORMS is 미국경영과학회 in Korean.
- `pnpm type-check` aborts in non-TTY shells (`ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`); run `npx tsc --noEmit` instead.