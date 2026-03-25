# EMI3 Website — Task List

Comparison of old site (equipmentmanagement.com.au) vs new build. Last updated: 2026-03-25.

---

## Critical — Must Fix Before Launch

- [x] **Dynamic page route** — `src/pages/[...slug].astro` for Contentful `page` content type entries
- [x] **OG/Twitter meta tags** — `og:title`, `og:description`, `og:image`, `og:type`, `twitter:card` in `Layout.astro`
- [x] **JSON-LD structured data** — `WebSite` and `LocalBusiness` schemas in `Layout.astro`
- [x] **Google Analytics script** — GA script renders when `PUBLIC_GA_ID` is set
- [x] **Contact page company details** — ABN, location, Subject field, First/Last name split
- [x] **Homepage YouTube video** — Embedded with heading + description
- [x] **Homepage secondary heading** — "Collecting sensory based data" link in hero
- [x] **Footer** — Dark footer with gold accent bar, ABN, location, Back to Top link

---

## Important — Should Fix Before Launch

- [x] **Hero images on inner pages** — what-we-do, software, status-suite, sensory-data all have background hero images
- [x] **Product logos** — Wired up in product page heroes and software suite cards
- [x] **iPad screenshots on product pages** — ZoneMaintenance iPad image used
- [ ] **ZoneMaintenance analysis section** — Add "Graphical Analysis" and "Completed Reports" section with screenshots
- [ ] **Magnom page galleries** — Add product range gallery, local installations gallery, reselling partner logos
- [ ] **Projects page images** — Need more project photos (Cat 789C, workshop, R2900G)
- [ ] **Sensory Based Data diagrams** — Add sensory data diagram, visual data diagram, analysis screenshots
- [ ] **Migrate old blog posts** — 2-3 Squarespace posts to Contentful (ZoneMaintenance case study, Digital Audits guide)
- [ ] **Gold color mismatch** — `global.css` uses `#D4A012`, CLAUDE.md says `#C5960C`. Confirm with Russell
- [x] **Homepage ValueProp** — Restructured as 3 benefit cards + testimonial (replaces wall of text)
- [ ] **Contact page hero image** — Old site shows iPad in-use photo at top
- [x] **Magnom external link** — Links to magnom.com added
- [x] **DaisyUI integration** — Custom EMI theme, all pages converted to DaisyUI components
- [x] **Consistent design language** — `section-heading`, `section-subheading`, `prose-body` classes
- [x] **Mega-menu navigation** — Software mega-menu with both suites + all products, Company dropdown, slide-out mobile menu

---

## Nice to Have — Polish

- [x] **`lang="en-GB"`** — Set in Layout.astro
- [ ] **Per-page meta descriptions** — Each page should pass a unique `description` prop to Layout
- [x] **Scroll-to-top** — "Back to Top" link in footer
- [x] **robots.txt** — Created at `public/robots.txt` with sitemap reference
- [ ] **Take Action page** — Add "REQUEST a Site Review" subheading and photography credit
- [x] **Homepage section ordering** — value prop → video → specialisations → products → steps → CTA
- [ ] **Mining equipment photo gallery** — ZoneMaintenance page could use equipment photo grid
- [ ] **Contentful `page` content type** — Create in Contentful so `[...slug].astro` generates pages
- [ ] **Netlify deployment** — Connect repo, add env vars, set up Contentful webhook for auto-rebuild
- [ ] **Custom favicon** — Generate from EMI logo (current is Squarespace placeholder)
- [ ] **Client logos section** — Add recognisable mining company logos for credibility

---

## Unused Assets

Most images now wired up. Remaining:

| File | Status |
|------|--------|
| `products/excavator.jpg` | Unused — could go on ZoneMaintenance |
| `products/equipment-status-logo.png` | Unused — no dedicated EquipmentStatus page |
| `products/enviro-status-logo.png` | Unused — no dedicated EnviroStatus page |
