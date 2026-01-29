# Academic Homepage Template

A modern, data-driven academic homepage built with Next.js 16 and Chakra UI. Designed for researchers and academics who want a professional web presence with easy content management through JSON files.

**Live demo**: [hyunwoopark.com](https://hyunwoopark.com)

## Features

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
```

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
