# VKUS India - vkusindia.ru

Bilingual (RU/EN) B2B catalogue for Indo Russian Trade: chicory, basmati rice, spices, superfoods and tea from India.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Sanity (products) · Zod.

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
│  ├─ proxy.ts               Locale redirect (cookie → Vercel country → Accept-Language → ru), old-URL 301s
│  ├─ actions/locale.ts      Server Action: language toggle
│  ├─ app/[lang]/            All pages, prerendered for ru and en
│  ├─ app/api/enquiry|contact  Form handlers (validate and log)
│  ├─ app/api/revalidate     Sanity publish webhook → refreshes cached product data
│  ├─ components/
│  │  ├─ layout/             Header, mobile menu, footer, language switcher, cookie notice
│  │  ├─ sections/           Page sections shared by several pages (contact band, principles)
│  │  ├─ home/               Sections used only on the home page
│  │  ├─ product/  forms/  seo/
│  │  └─ ui/                 Primitives: container, buttons, icons, headings, CMS image
│  ├─ config/                Site URL, old-URL redirect map
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

1. `src/lib/content.ts` fetches **all** products in one GROQ query, cached with `use cache` and tagged `products`.
2. Every page derives what it needs from that single cached result. During a build, Sanity is queried only a handful of times.
3. On publish, Sanity calls `POST /api/revalidate` with a signed payload. The route verifies the signature and marks the `products` tag stale: the next visitor still gets the cached page instantly, and fresh data is fetched in the background.
4. Products published after a deploy render on their first visit and are cached from then on. No rebuild is needed.
5. Images are served directly from Sanity's CDN (`src/components/ui/cms-image.tsx`), resized per screen, AVIF/WebP, never upscaled, with a blur placeholder.

## Environment variables

Website (`.env.local`, and Vercel → Settings → Environment Variables):

| Variable                   | Required                  | Notes                              |
| -------------------------- | ------------------------- | ---------------------------------- |
| `SANITY_PROJECT_ID`        | yes                       | sanity.io/manage → project         |
| `SANITY_DATASET`           | yes                       | usually `production`               |
| `SANITY_REVALIDATE_SECRET` | yes (prod)                | same value as the webhook secret   |
| `SANITY_API_READ_TOKEN`    | only for private datasets | Viewer token                       |
| `NEXT_PUBLIC_SITE_URL`     | no                        | defaults to `https://vkusindia.ru` |

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

During the demo phase `src/app/robots.ts` disallows all crawling. At launch, switch it back to the rule noted in that file. The sitemap is generated either way.

## Security headers

`next.config.ts` sets a static CSP (allows images from `cdn.sanity.io`), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` and `Permissions-Policy`. The `X-Powered-By` header is disabled.
