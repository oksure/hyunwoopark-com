# Academic Homepage Template

A modern, data-driven academic homepage built with Next.js 16 and Chakra UI. Designed for researchers and academics who want a professional web presence with easy content management through JSON files.

**Live demo**: [hyunwoopark.com](https://hyunwoopark.com)

## Features

- **CV-style home**: The original profile sidebar and chronological CV remain the front page.
- **Original page composition**: Content updates stay on the existing CV-style homepage. The original Bio, CV, Lab Homepage and historical-page menu remain.
- **International academic audience**: Focus on research and scholarly career. Bio retains biographies, press photos and CV downloads, without the Korean YouTube showcase. Korean public-facing activities are reserved for the separate hwpark.net plan.
- **Shared PDF data**: Publications, working papers, awards, selected research funding, teaching, services, conference presentations and resources feed the existing Rmd/LaTeX CV.
- **Data-driven content**: All academic information (publications, experience, education, awards, etc.) stored in JSON files for easy updates
- **Publication filtering**: Filter by journal rankings (UTD24, FT50, ABS) with year-based grouping
- **Dark/light mode**: Automatic theme switching with next-themes
- **Responsive design**: Mobile-friendly layout with Chakra UI
- **SEO optimized**: Server-side rendering with Next.js App Router
- **Fast performance**: Optimized fonts, minimal client-side JavaScript

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [React 18](https://react.dev/)
- [Chakra UI v3](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) package manager

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/academic-homepage.git
cd academic-homepage

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── components/         # App-specific components (Navbar, Footer, Sidebar)
│   └── page.tsx           # Main homepage
├── components/ui/          # Chakra UI custom components
├── src/
│   ├── data/              # JSON data files (edit these!)
│   │   ├── pubs.json      # Journal publications
│   │   ├── procs.json     # Conference proceedings
│   │   ├── confs.json     # Conference presentations
│   │   ├── exps.json      # Professional experience
│   │   ├── edus.json      # Education history
│   │   ├── awards.json    # Awards, fellowships, grants
│   │   ├── servs.json     # Professional services
│   │   ├── talks.json     # Invited talks
│   │   └── teaching.json  # Teaching experience
│   └── types/
│       └── data.d.ts      # TypeScript type definitions
└── public/                # Static assets
```

## Customization

### 1. Update Your Information

Edit the JSON files in `/src/data/` to add your own content:

**Publications (`pubs.json`)**
```json
{
  "title": "Your Paper Title",
  "authors": "LastName F, CoAuthor AB",
  "journal": "Journal Name",
  "year": 2024,
  "top": ["utd24", "abs4*"],
  "link": "https://doi.org/..."
}
```

**Experience (`exps.json`)**
```json
{
  "title": "Assistant Professor",
  "affiliation": "Department, University",
  "period": "2024 - Present"
}
```

### 2. Customize Appearance

- **Theme colors**: Modify `/components/ui/provider.tsx`
- **Fonts**: Update font imports in `/app/layout.tsx`
- **Layout**: Edit components in `/app/components/`

### 3. Update Personal Details

- Edit the sidebar content in `/app/page.tsx`
- Replace profile images in `/public/`
- Update social links in `/app/components/Navbar.tsx` and `Footer.tsx`

## Data Format Reference

### Journal Rankings (`top` field)

| Value | Meaning |
|-------|---------|
| `utd24` | UTD Top 24 Business Journals |
| `ft50` | Financial Times Top 50 |
| `abs4*` | ABS Academic Journal Guide 4* |
| `abs4` | ABS Academic Journal Guide 4 |
| `abs3` | ABS Academic Journal Guide 3 |
| `abs` | Listed in ABS Academic Journal Guide |

### Author Formatting

Authors are formatted as `LastName FirstInitial` (e.g., `Park H`, `Kim BC`). Your own name will be automatically bolded in the UI.

### Award Types

| Type | Display |
|------|---------|
| `award` | Awards and Honors |
| `fellowship` | Fellowships |
| `grant` | Grants |

## Available Commands

```bash
pnpm dev        # Start development server
pnpm build      # Create production build
pnpm start      # Start production server
pnpm type-check # Run TypeScript type checking
node scripts/validate-data.mjs # Validate record IDs, categories, links and public asset references
python3 cv/test_generate_cv_sections.py # Test shared CV rendering
python3 cv/generate_cv_sections.py # Generate the Rmd from public records
bash cv/build.sh CV_Hyunwoo_Park_gen # Build the established CV design
python3 cv/check_style.py cv/CV_Hyunwoo_Park.pdf # Check fonts, labels and page count
```

## Research Content

Use `src/data/pubs.json` and `procs.json` for bibliographic facts. Preserve each existing `id` and `label` when editing a record. Add a new ID and the next J/C label for a new paper. Never recalculate old labels from the display order.

`recordType` distinguishes journals, conference papers, Findings, short papers, workshops, abstracts, posters and presentations. `status` records acceptance or publication state separately. `cvSelected` controls inclusion in the selected PDF sections.

`working-papers.json` contains formal working-paper citations with verified authors. `research.json` retains topic-level research records for the website, not the PDF. `resources.json` records research systems and teaching resources. The Patents section and its public summary data have been removed.

Public funding is deliberately limited to five approved NRF/FDA records under Selected Research Funding. Do not repopulate the website or PDF from a full internal project inventory. The generator tests pin this public selection.

The homepage uses its original Chakra presentation. `design.md` and `spec.md` record the content-only update constraint. The briefly added Research, Publications, Teaching and About pages redirect to the homepage. Image provenance is recorded in `docs/research-assets.md`.

The corrected CV occupies 12 pages. It includes 22 selected conference contributions, with workshops and posters explicitly identified. The PDF excludes Selected Research in Progress and the KDMS student award at the owner's request. Formal working papers remain. Times typography, the LaTeX class, ranking badges, J/C labels and page footers remain unchanged. Old presentation records and legacy routes are retained. Do not replace this build with a different CV renderer.

Run `python3 cv/render_review.py cv/CV_Hyunwoo_Park.pdf --out-dir cv/review` after compilation. Inspect `all-pages.png` and every enlarged page, including page boundaries. CI retains every page preview, not just the first three. A passing build or text-presence check does not prove that lists render correctly.

The dev and build scripts use Webpack. Production Turbopack builds reproduced a Chakra/Emotion hydration mismatch on the additional routes. This follows the [Chakra Next.js integration guidance](https://chakra-ui.com/docs/get-started/frameworks/next-app#hydration-errors-turbopack). Keep the browser console regression check when changing bundlers.

## Deployment

This site can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Self-hosted with Node.js

## License

MIT License - feel free to use this template for your own academic homepage.

## Things to Do

- [ ] Auto-generate PDF version of CV from data
- [ ] Add loading animations and transitions
