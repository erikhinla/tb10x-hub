# OpenClaw Handoff: TB10X Ecosystem Launch v1.2.0

## Purpose
This document summarizes exactly what was implemented in the v1.2.0 launch execution so OpenClaw can revise from the current shipped baseline without regressing design, copy hierarchy, or lead capture.

## Current Git + Deploy State
- Launch commit pushed to `main`: `32dd870`
- Commit message: `Execute v1.2.0 ecosystem launch - UI and copy locked`
- Three live domains are serving updated pages:
  - `https://transformby10x.ai`
  - `https://bizbuilders.ai`
  - `https://bizbotmarketing.ai`

## What Was Changed

### 1) Public launch pages (dark/cinematic architecture-first UI + locked messaging)
- `public/launch-v1/transformby10x/index.html`
- `public/launch-v1/bizbuilders/index.html`
- `public/launch-v1/bizbotmarketing/index.html`

Implemented:
- Cinematic dark theme and premium editorial styling
- Required section structures from launch YAML
- Locked messaging hierarchy:
  - Problem: Digital fatigue
  - TransformBy10X worldview
  - W.I.N. doctrine
  - F.L.O.W. + FLOW Agent OS
  - BizBuilders/BizBot roll-up under TB10X
- Persistent visible AIVA conversion path on all 3 sites
- No placeholder CTAs / no inert buttons

### 2) Working lead-capture routing
Added same-origin relay endpoints to avoid cross-origin form failures:
- `public/launch-v1/transformby10x/api/lead.js`
- `public/launch-v1/bizbuilders/api/lead.js`
- `public/launch-v1/bizbotmarketing/api/lead.js`

Form behavior:
- Frontend forms post to `/api/lead`
- API relays payload to webhook destination
- UI success message only on successful HTTP response
- UI failure message with fallback contact if submission fails

### 3) Centralized source-of-truth launch bundle
Created:
- `launch/ecosystem_atomic_v1_2_0/FINAL_BRAND_COPY.md`
- `launch/ecosystem_atomic_v1_2_0/WIDGET_ENDPOINT_CONFIGURATION.md`
- `launch/ecosystem_atomic_v1_2_0/ENVIRONMENT_VARIABLE_NOTES.md`
- `launch/ecosystem_atomic_v1_2_0/STORAGE_PATH_MANIFEST.md`
- `launch/ecosystem_atomic_v1_2_0/media/prompt-and-circumstance/*`
- `launch/ecosystem_atomic_v1_2_0/media/the-passenger-doesnt-speak/*`

This folder is the handoff root for copy, endpoints, and media pack outputs.

## Lead Capture Destination (Current)
- Relay destination: `https://webhook.site/9693d678-5bf8-4432-baa9-f5fbd95e23df`
- Retrieval URL: `https://webhook.site/#!/view/9693d678-5bf8-4432-baa9-f5fbd95e23df`

Notes:
- This is a working temporary capture destination used to satisfy launch functionality.
- Recommended next revision: swap webhook relay target to permanent CRM/DB endpoint, keeping `/api/lead` contract stable.

## Verified Outcomes
- All 3 domains live on HTTPS
- Mobile + desktop rendering verified
- Required form fields present on each site:
  - name
  - email
  - company
  - short problem summary
  - urgency or timeline
- Form submissions validated through browser tests and webhook logs

## Revision Guardrails for OpenClaw
Keep these intact during revision:
- Preserve dark cinematic direction (do not revert to generic white SaaS layout)
- Preserve messaging order and doctrine framing
- Preserve TransformBy10X umbrella -> BizBuilders/BizBot architecture
- Preserve persistent AIVA conversion path on all sites
- Preserve working `/api/lead` submission flow unless replacing with a verified equivalent

## Safe Revision Targets
OpenClaw can revise:
- Typography, spacing rhythm, motion polish
- Microcopy tightening (without changing hierarchy)
- Section visual treatments and diagram style
- Media asset visuals in `launch/ecosystem_atomic_v1_2_0/media/`
- Backend lead destination behind `/api/lead`

OpenClaw should avoid:
- Removing doctrine references (W.I.N., F.L.O.W., FLOW Agent OS)
- Replacing architecture stack with generic feature grid hero
- Breaking CTA paths or form confirmation behavior

## Additional Context
- Local non-launch changes were stashed to keep workspace clean.
- Stashes created:
  - `cleanup stash vercel state`
  - `cleanup stash after v1.2.0 launch`

These are unrelated to shipped launch files and do not need to be applied for revision work.
