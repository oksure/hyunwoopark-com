# Academic Profile and Research Website

## 1. Scope

The October 21, 2026 revision implements the approved research inventory and website plan. Retain the Next.js, Chakra UI and Rmd/LaTeX toolchains. Preserve legacy routes, existing publication records and CV typography. Do not publish internal correspondence, review reports, personal data, private manuscript files or unpublished patent details.

## 2. Content

Use `src/data` as the public factual source. Keep journal papers, full conference papers, Findings, short papers, workshops, abstracts, posters and working papers distinguishable. Preserve current J/C labels when adding stable IDs. Acceptance is not publication. Proposed projects are not awarded grants. Student awards and talks are not personal awards or invited talks.

Add the verified SMS Research Methods Paper Prize. Select InteractiveKG and Faithful yet Collusive for the PDF. Add 2026 teaching, research leadership, systems and resources. Working-paper entries require verified titles and authors. Keep unverified details in the private implementation record. Use a public topic-level description when the evidence supports it.

## 3. Pages

Home MUST retain the original CV-style layout: left profile sidebar, right sequential career, education, publications and other CV sections. HP explicitly corrected this on October 21 during implementation. New working-paper and resource sections extend that same style. Research is a separate page presenting themes, selected work with real assets, ongoing work and systems. Publications provides all records, text search, year/type filters and citation copying. Teaching provides teaching history and resources. About retains the complete existing career, education, award, service and other experience content. Preserve `/bio/`, `/bio/resume-ko/`, all static legacy projects and the current CV URL.

## 4. Shared Records

Existing data formats remain backward compatible. `working-papers.json` has `title` and `items`. Each item has `id`, `title`, `authors`, `year`, `status`, optional `link`, and `cvSelected`. `resources.json` has `title` and `items`. Each item has `id`, `name`, `description`, `year`, `kind`, optional `link`, and `cvSelected`. Records may have `cvNote` for supported short annotations. Public records contain no internal evidence paths.

The PDF generator expands shared awards, grants, teaching, services, software/resources and selected working papers into the existing template. Never change a selected source document into a new generic CV design. Preserve existing sections and content, including content not shown on Home.

## 5. Verification and Release

Run the TypeScript compiler, production build, record validator and browser tests at mobile and desktop widths. Verify search, filters, navigation, theme switching, clipboard fallback, absence of overflow and broken images, and legacy routes. Render the old and new CV. Inspect page layout, fonts, headers, labels, new text and the style gate results. Release through the existing publish workflow only when the gates pass. Keep all private evidence and QA logs outside public assets.

## 6. Research Lab Website

Reconcile the DIAL author, publication-year, publication-category and project-status differences identified in the approved plan. Use authorized access only. If direct editing is unavailable, retain exact page-specific corrections and an importable draft without claiming the live lab site changed.
