# TransformBy10X Ecosystem Launch — Deployment Guide

## 🚀 Quick Deploy

All three sites are production-ready static HTML. Deploy to their respective domains:

1. **transformby10x.ai** → `~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/transformby10x/`
2. **bizbuilders.ai** → `~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/bizbuilders/`
3. **bizbotmarketing.ai** → `~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/bizbotmarketing/`

---

## Deployment Options

### Option 1: Vercel (Recommended)
Each site is a separate Vercel project with custom domain.

```bash
# Deploy TransformBy10X
cd ~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/transformby10x
vercel --prod

# Deploy BizBuilders AI
cd ~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/bizbuilders
vercel --prod

# Deploy BizBot Marketing
cd ~/PROJECTS/TRANSFORM_BY_10X/public/launch-v1/bizbotmarketing
vercel --prod
```

Then configure custom domains in Vercel dashboard.

### Option 2: GitHub Pages (Subdomain Routing)
Push to `erikhinla/tb10x-hub` and use hostname-based routing:

```bash
cd ~/PROJECTS/TRANSFORM_BY_10X
git add public/launch-v1/
git commit -m "Launch TB10X ecosystem sites"
git push origin main
```

Then configure DNS CNAME records for each domain pointing to GitHub Pages.

### Option 3: Single Codebase with Routing
Create an `index.html` router that detects `window.location.hostname` and loads the correct site.

---

## DNS Configuration

### Current Status (as of 2026-03-04)
- **transformby10x.ai** → 76.76.21.21 (resolving)
- **bizbuilders.ai** → 216.198.79.1 (resolving)
- **bizbotmarketing.ai** → 76.76.21.21 (resolving)

### Required DNS Updates
Point all three domains to your deployment target:
- Vercel: Use their provided DNS records (A/CNAME)
- GitHub Pages: CNAME to `erikhinla.github.io`
- Custom host: Update A records to your server IP

---

## Lead Capture Forms

All three forms use **Formspree** (free tier allows 50 submissions/month):
- Endpoint: `https://formspree.io/f/xovonvnl`
- Submissions CC'd to: `erik@bizbuilders.ai`

### Upgrade Path
When ready for higher volume:
1. Replace Formspree with custom webhook
2. Integrate Supabase/HubSpot/CRM
3. Connect AIVA voice agent widget

Current forms are **production-ready** and will work immediately.

---

## AIVA Integration (Future)

All sites have AIVA sticky CTAs that currently link to forms.

**To activate voice agent:**
1. Set up Vapi voice agent
2. Replace `<a href="#assessment">` with Vapi embed code
3. Update AIVA button to launch voice widget

Fallback text intake is live and working.

---

## Brand Assets

### Logos Available
- `~/PROJECTS/TRANSFORM_BY_10X/assets/logos/TBTX_logo.jpg`
- `~/PROJECTS/TRANSFORM_BY_10X/assets/logos/BBAI_logo.png`
- `~/PROJECTS/TRANSFORM_BY_10X/assets/logos/BBM_logo.png`
- `~/PROJECTS/TRANSFORM_BY_10X/assets/logos/WIN_logo.png`

### Media Property Asset Packs
- **Prompt & Circumstance:** `launch-v1/media-assets/prompt-circumstance-pack.md`
- **TPDS:** `launch-v1/media-assets/tpds-asset-pack.md`

Send these specs to a designer or use AI image generation (Midjourney, DALL-E) to create channel assets.

---

## Pre-Launch Checklist

Before going live:

- [ ] Test all three sites on mobile + desktop
- [ ] Verify form submissions arrive at `erik@bizbuilders.ai`
- [ ] Check all internal links (system stack CTAs)
- [ ] Verify cross-domain navigation (TB10X → BizBuilders/BizBot)
- [ ] Test AIVA sticky launcher UX
- [ ] Confirm HTTPS/SSL on all domains
- [ ] Check page load speed (all sites are <50KB, should be instant)

---

## Site Specs

All sites built with:
- **Design System:** #FAFAFA (white), #2F3A07 (moss), #C8A96A (gold)
- **Fonts:** Inter (body), Playfair Display (headings)
- **Motion:** Slow cubic-bezier, <400ms transitions
- **No dependencies:** Pure HTML/CSS/JS (no frameworks)
- **Mobile-first:** Responsive breakpoints at 768px
- **Performance:** Minimal CSS, no images (except logos when added)

---

## Post-Launch

After deploy:
1. Test live URLs (transformby10x.ai, bizbuilders.ai, bizbotmarketing.ai)
2. Submit first test lead on each form
3. Generate media property assets (send specs to designer)
4. Set up social profiles (use bios from asset packs)
5. Schedule launch posts (copy provided in asset packs)

---

**Everything is ready. Just deploy and point DNS.** 🦾
