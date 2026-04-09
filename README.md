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

No environment variables are required for the current static/demo features (gallery uses public Wikimedia URLs; the interest form is front-end only until you connect a backend).

### Optional environment variables (future)

If you add analytics, a contact API, or CMS later, define variables in Vercel (**Settings → Environment Variables**) and locally in `.env.local` (never commit secrets). Example pattern:

```bash
# .env.local (example — not used until you wire features)
# NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

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

- Gallery images are loaded from [Wikimedia Commons](https://commons.wikimedia.org/) with credits shown in the lightbox; replace or extend with your own event photos as needed.
- Update **Contact** placeholders (phone, email, address) in `app/page.tsx` when you have final details.
- Connect the **Join** form to your email service, CRM, or API when ready (currently a demo message only).

## License

Content and branding © Telangana Bengali Cultural Association unless otherwise noted. Third-party gallery images remain under their respective Commons licenses.
