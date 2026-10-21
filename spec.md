# Academic Profile and Research Website

## 1. Scope

The October 21, 2026 revision implements the approved research inventory and website plan. Retain the Next.js, Chakra UI and Rmd/LaTeX toolchains. Preserve legacy routes, existing publication records and CV typography. Do not publish internal correspondence, review reports, personal data, private manuscript files or unpublished patent details.

## 2. Content

Use `src/data` as the public factual source. Keep journal papers, full conference papers, Findings, short papers, workshops, abstracts, posters and working papers distinguishable. Preserve current J/C labels when adding stable IDs. Acceptance is not publication. Proposed projects are not awarded grants. Student awards and talks are not personal awards or invited talks.

Add the verified SMS Research Methods Paper Prize. Select InteractiveKG and Faithful yet Collusive for the PDF. Add 2026 teaching, research leadership, systems and resources. Working-paper entries require verified titles and authors. Keep unverified details in the private implementation record. Use a public topic-level description when the evidence supports it.

## 3. Pages

Keep the original single-page CV layout, original navigation and footer. Update the factual content in that layout. HP rejected the added subpages on October 21. Remove Research, Publications, Teaching and About pages and redirect their old addresses to Home. Do not recreate them without a new explicit request. Preserve `/bio/`, `/bio/resume-ko/`, all static legacy projects and the current CV URL. The lab link must say exactly `Lab Homepage` on every viewport.

## 4. Shared Records

Audience boundary: hyunwoopark.com presents the scholarly career to international academic colleagues. Do not add a Korean media showcase. Remove the Bio YouTube block while retaining the existing biographies, press photos and CV downloads. hwpark.net is the planned Korean professor-identity site; its redesign is not part of this implementation.

Existing data formats remain backward compatible. `working-papers.json` has `title` and `items`. Each item has `id`, `title`, `authors`, `year`, `status`, optional `link`, and `cvSelected`. `resources.json` has `title` and `items`. Each item has `id`, `name`, `description`, `year`, `kind`, optional `link`, and `cvSelected`. Records may have `cvNote` for supported short annotations. Public records contain no internal evidence paths.

The PDF generator expands shared awards, grants, teaching, services, software/resources and selected working papers into the existing template. Never change a selected source document into a new generic CV design. Preserve existing sections and content, including content not shown on Home.

## 5. Verification and Release

Run the TypeScript compiler, production build, record validator and browser tests at mobile and desktop widths. Verify the original filters, menu, theme switching, exact lab link label, redirects and legacy routes. Verify that updated content remains present. Render the old and new CV when changing its content or generator. Inspect page layout, fonts, headers, labels and the style gate results. Release through the existing publish workflow only when the gates pass. Keep all private evidence and QA logs outside public assets.

Keep CV category labels on the same page as their first entry. Use the existing typography and the minimum page-break control needed for this.

## 6. Research Lab Website

Reconcile the DIAL author, publication-year, publication-category and project-status differences identified in the approved plan. Use authorized access only. If direct editing is unavailable, retain exact page-specific corrections and an importable draft without claiming the live lab site changed.

## Changelog

- 2026-10-21: Implement the approved research update with a CV-style Home and separate research pages. Generate shared CV sections and keep teaching labels with their first entry.
- 2026-10-21 correction: Restore the original page composition and navigation. Remove the added subpages and use the exact label `Lab Homepage`. Keep the updated factual content and PDF.
