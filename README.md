# VKUS India - vkusindia.ru

Bilingual (RU/EN) B2B catalogue for Indo Russian Trade: chicory, basmati rice, spices, superfoods and tea from India.

Next.js 16 (App Router, static export on this branch) · TypeScript · Tailwind CSS v4 · Sanity (products) · Zod.

```bash
npm install
npm run dev          # http://localhost:3000  (needs .env.local - see below)
npm run build
npm run lint && npm run typecheck
```

## Structure

```
├─ public/images/
│  ├─ brand/                 Logo
│  ├─ hero/                  Home/about photography
│  └─ categories/            Category tiles
├─ src/                      Website (Next.js)
│  ├─ app/[lang]/            All pages, prerendered for ru and en
│  ├─ components/
│  │  ├─ layout/             Header, mobile menu, footer, language switcher, cookie notice
│  │  ├─ sections/           Page sections shared by several pages (contact band, principles)
│  │  ├─ home/               Sections used only on the home page
│  │  ├─ product/  forms/  seo/
│  │  └─ ui/                 Primitives: container, buttons, icons, headings, CMS image
│  ├─ config/                Public site URL and metadata settings
│  ├─ content/               Non-product content in code: categories, page copy, company, privacy
│  ├─ i18n/                  Locale config, routing helpers, en.json / ru.json UI strings
│  └─ lib/
│     ├─ content.ts          Data access layer - the only place pages get product data from
│     ├─ sanity/             Client, GROQ query, image URL helpers
│     └─ forms/  seo.ts  utils.ts
└─ studio/                   Sanity Studio (separate app, own package.json)
   └─ schemaTypes/           Product schema + localized field types
```

## Content model

| Lives in   | What                                                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sanity** | Products, mirroring the previous vkusindia.ru: name (RU + EN), slug, category, photos, description (RU + EN, paragraphs / subheadings / line breaks), "listed", sort order, old site ID |
| **Code**   | The 3 categories (`src/content/categories.ts`), page copy, company details, privacy policy, UI strings                                                                                  |

Product `category` values (`chicory`, `rice`, `superfood`) must match `CategoryId` in `src/content/types.ts` and the list in `studio/schemaTypes/product.ts`.

**Listed vs unlisted:** listed products appear in the menu, on the home page and in the catalogue. Unlisted products keep a working page that is only reachable by its link (same as the 8 hidden products of the old site).

## How product data flows

1. `src/lib/content.ts` fetches all products from Sanity in one GROQ query during the build.
2. Catalogue, product pages and sitemap are generated from that build-time result.
3. Re-run the GitHub Pages workflow after publishing product changes in Sanity.
4. Images are served directly from Sanity's CDN (`src/components/ui/cms-image.tsx`), resized per screen, AVIF/WebP, never upscaled, with a blur placeholder.
## Environment variables

Website build (`.env.local` locally; GitHub Actions secrets/variables for Pages):

| Variable                   | Required                  | Notes                              |
| -------------------------- | ------------------------- | ---------------------------------- |
| `SANITY_PROJECT_ID`        | yes                       | sanity.io/manage → project         |
| `SANITY_DATASET`           | yes                       | usually `production`               |
| `SANITY_API_READ_TOKEN`    | only for private datasets | Viewer token                       |
| `NEXT_PUBLIC_SITE_URL`     | yes for Pages             | Set by the Pages workflow           |

Studio (`studio/.env`): `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`.

The build fails with a clear message if a required variable is missing.

## Studio

```bash
cd studio
npm install
npm run dev       # http://localhost:3333
npm run deploy    # hosts the Studio at https://<name>.sanity.studio
```

## Conventions

- **Two kinds of text.** UI strings live in `src/i18n/dictionaries/*.json`. Non-product content lives in `src/content` as `{ ru, en }` fields. `ru.json` must match the shape of `en.json`, otherwise the build fails.
- **URLs.** Every page is under `/ru` or `/en`. Build links with `href(locale, "/path")` from `@/i18n/routing`.
- **Buttons.** Style links and buttons with `buttonClass()`. Don't pass `hidden`/`flex` through `className`; put visibility on a wrapper element.
- **Product images.** Always render them with `<CmsImage>`, never `next/image` directly.

## Search engines

The sitemap and `robots.txt` are generated at build time.

## GitHub Pages demo branch

The `github-pages-demo` branch exports the site into `out/` and deploys it with `.github/workflows/github-pages.yml`. In repository **Settings → Pages**, choose **GitHub Actions** as the source. Add `SANITY_PROJECT_ID` as an Actions secret. Add `SANITY_DATASET` as an Actions variable if it is not `production`, and `SANITY_API_READ_TOKEN` as a secret only for a private dataset.

Share `https://<owner>.github.io/<repository>/ru/` or `/en/`. This branch uses build-time Sanity data and demo-only form confirmations; it does not send form submissions. Re-run the workflow after content changes. Keep these static-export changes on `github-pages-demo`; Vercel production remains on its configured production branch.

GitHub Pages does not apply the runtime redirects or response headers configured for the Vercel deployment.