# EMI3 Website — Task List

Comparison of old site (equipmentmanagement.com.au) vs new build. Last updated: 2026-03-25.

---

## Critical — Must Fix Before Launch

- [ ] **Dynamic page route** — Create `src/pages/[...slug].astro` for Contentful `page` content type entries
- [ ] **OG/Twitter meta tags** — Add `og:title`, `og:description`, `og:image`, `og:type`, `twitter:card` to `Layout.astro`
- [ ] **JSON-LD structured data** — Add `WebSite` and `LocalBusiness` schemas to `Layout.astro`
- [ ] **Google Analytics script** — `PUBLIC_GA_ID` is read but never rendered as a `<script>` tag in `Layout.astro`
- [ ] **Contact page company details** — Add ABN (45 112 360 273), location (Burnie, TAS 7320), "Proud Tasmanian company" note, Subject field to form
- [ ] **Homepage YouTube video** — Embed video (ID: `xxhrqxrrCCI`) between ValueProp and ProductGrid sections
- [ ] **Homepage secondary heading** — Add "Collecting sensory based data to integrate with sensor based data platforms" with link to `/sensory-based-data`
- [ ] **Footer missing info** — Add ABN, location, "Back to Top" link. Confirm yellow background is intentional (old site uses dark footer)

---

## Important — Should Fix Before Launch

- [ ] **Hero images on inner pages** — Wire up existing images from `/public/images/hero/` to page heroes (what-we-do.jpg, software.jpg, status-suite.jpg, sensory-data.jpg)
- [ ] **Product logos** — Use existing logo files (`/public/images/products/*-logo.*`) on software.astro, software-status-suite.astro, and product detail pages
- [ ] **iPad screenshots on product pages** — Use `zonemaintenance-ipad.jpg` and source RouteMaintenance iPad images for product pages
- [ ] **ZoneMaintenance analysis section** — Add "Graphical Analysis" and "Completed Reports" section with screenshots to zonemaintenance.astro
- [ ] **Magnom page galleries** — Add product range gallery, local installations gallery, reselling partner logos, external link to magnom.com
- [ ] **Projects page images** — Add project photos (use `projects/mining-1.jpg` and source remaining images)
- [ ] **Sensory Based Data page images** — Use `hero/sensory-data.jpg` and add diagrams (sensory data diagram, visual data diagram, analysis screenshot)
- [ ] **Migrate old blog posts** — At least 2-3 Squarespace posts to Contentful (ZoneMaintenance case study, Digital Audits guide)
- [ ] **Gold color mismatch** — `global.css` uses `#D4A012`, CLAUDE.md says `#C5960C`. Confirm correct brand color and align
- [ ] **Homepage ValueProp paragraph** — Add missing paragraph about structured guided workflows, fleet reliability, and environmental hazards
- [ ] **Contact page hero image** — Old site shows iPad in-use photo at top of contact page

---

## Nice to Have — Polish

- [ ] **`lang="en-GB"`** — Change from `lang="en"` to `lang="en-GB"` in Layout.astro (matches old site, Australian English)
- [ ] **Per-page meta descriptions** — Each page should pass a unique `description` prop to Layout (currently uses generic default)
- [ ] **Scroll-to-top button** — Add floating button or footer "Back to Top" link
- [ ] **robots.txt** — Create `public/robots.txt` (sitemap already generates via `@astrojs/sitemap`)
- [ ] **Take Action page** — Add "REQUEST a Site Review" subheading and "All photography provided by Russell Harland" credit
- [ ] **Homepage section ordering** — Old site flows: value prop → video → specialisations → products → getting started → CTA. Confirm current order is intentional
- [ ] **Mining equipment photo gallery** — Old ZoneMaintenance page has ~10 equipment photos illustrating compatible machines. Consider adding image grid

---

## Unused Assets (already in repo)

Files in `/public/images/` not referenced in any template:

| File | Intended Use |
|------|-------------|
| `hero/sensory-data.jpg` | Sensory Based Data page hero |
| `hero/software.jpg` | Software page hero |
| `hero/status-suite.jpg` | Status Suite page hero |
| `hero/what-we-do.jpg` | What We Do page hero |
| `products/zone-maintenance-logo.jpg` | ZoneMaintenance branding |
| `products/route-maintenance-logo.jpg` | RouteMaintenance branding |
| `products/component-status-logo.png` | ComponentStatus branding |
| `products/safety-status-logo.png` | SafetyStatus branding |
| `products/enviro-status-logo.png` | EnviroStatus branding |
| `products/equipment-status-logo.png` | EquipmentStatus branding |
| `products/excavator.jpg` | Equipment imagery |
| `products/zonemaintenance-ipad.jpg` | iPad software screenshot |
| `projects/mining-1.jpg` | Projects page imagery |
