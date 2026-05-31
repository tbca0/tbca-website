# TBCA Website

Official marketing site for **Telangana Bengali Cultural Association (TBCA)** — built with [Next.js](https://nextjs.org/) (App Router) and TypeScript.

## Live site

The production deployment is hosted on **[Vercel](https://vercel.com/)**.

- After connecting this repository to Vercel, each push to the default branch triggers a new deployment.
- Custom domain (optional): add it in the Vercel project under **Settings → Domains** and follow the DNS instructions Vercel provides.

## Repository

- **GitHub:** [github.com/tbca0/tbca-website](https://github.com/tbca0/tbca-website)

## Requirements

| Tool | Version (approx.) | Notes |
|------|-------------------|--------|
| Node.js | 20.x or 22.x LTS | [nodejs.org](https://nodejs.org/) |
| npm | 10+ | Comes with Node |

### Google Sheet (Join form)

The **Submit interest** form posts to `/api/join`, which forwards rows to Google Sheets via **Google Apps Script**.

1. Create a Sheet and open **Extensions → Apps Script**.
2. Paste the code from [`scripts/google-sheets-apps-script.gs`](scripts/google-sheets-apps-script.gs).
3. In **Project settings → Script properties**, add `SECRET` (a long random string).
4. **Deploy → New deployment → Web app**: execute as **Me**, access **Anyone**.
5. Copy the Web App URL and Script secret into Vercel (or `.env.local`):

| Variable | Description |
|----------|-------------|
| `GOOGLE_SHEET_WEB_APP_URL` | Apps Script Web App URL |
| `GOOGLE_SHEET_SECRET` | Same value as Script property `SECRET` |

See [`.env.example`](.env.example). Without these, the form shows a configuration error.

### Other environment variables

Define any extra keys in Vercel (**Settings → Environment Variables**) and locally in `.env.local` (never commit secrets).

## Local development

```bash
git clone https://github.com/tbca0/tbca-website.git
cd tbca-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | ESLint |

## Deploying on Vercel

1. Sign in at [vercel.com](https://vercel.com/) (GitHub account recommended).
2. **Add New Project** → Import **tbca0/tbca-website**.
3. Framework preset: **Next.js** (auto-detected). Root directory: **.** (repository root is this app).
4. Build command: `npm run build` (default). Output: Next.js default (no static export required).
5. Deploy. Vercel assigns a URL like `tbca-website-xxxxx.vercel.app`.

To update production: push to the connected branch on GitHub; Vercel rebuilds automatically.

## Project layout (high level)

- `app/` — App Router pages, layout, global styles (`globals.css`, `tbca.css`)
- `components/` — Client components (navigation, gallery lightbox, forms, animations)
- `lib/` — Shared data (e.g. gallery image metadata)
- `public/` — Static assets (e.g. `tbca-logo.jpeg`)

## Content and compliance

- Gallery images live in `public/gallary/`; update `lib/gallery-data.ts` if you add or rename files.
- Update **Contact** placeholders (phone, email, address) in `app/page.tsx` when you have final details.
- The **Join** form appends rows to a Google Sheet when `GOOGLE_SHEET_WEB_APP_URL` and `GOOGLE_SHEET_SECRET` are set (see above).

## License

Content and branding © Telangana Bengali Cultural Association unless otherwise noted.
