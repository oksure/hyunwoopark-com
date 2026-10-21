# Design: Hyunwoo Park

## Direction

A restrained academic portfolio. Home retains the original CV-style profile sidebar and chronological academic record, as explicitly requested by HP during implementation. The separate Research page uses a research index and editorial project rows. No marketing claims, decorative gradients, oversized promotional hero, nested cards or generated research imagery.

## Shared System

White paper, near-black text, forest-green links, muted gray rules. Keep the existing Roboto body font. Use Georgia sparingly for display titles. Letter spacing is zero. Use fixed rem type sizes with layout breakpoints, not viewport-scaled text. All new pages use `tokens.css` and `app/academic.css`. Keep existing components supported.

Use a compact common header with a working mobile menu, visible current route, a CV link and external DIAL link. Footer offers contact and institutional links without development-tool attribution. Provide keyboard focus states, semantic headings, reduced motion and light/dark themes.

## Images

Use the existing portrait and verified paper figures, actual system/video thumbnails and the award photo. Keep plot labels legible and use contain when cropping would change meaning. Record public asset provenance in `docs/research-assets.md`. Do not copy private data or manuscripts into public assets.

## Pages

Home remains a CV-style page with the existing Chakra headings and sidebar. Research provides the curated introduction, real research figures, theme descriptions, projects and ongoing work. Publications is a searchable compact list. Teaching and About use readable document layouts. All pages share navigation and light/dark support. Bio and historical projects retain existing URLs and functionality.
