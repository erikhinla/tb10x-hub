# Widget Endpoint Configuration

- Endpoint provider: Same-origin API -> Webhook relay
- Public endpoint URL on each domain: `/api/lead`
- Relay destination URL: `https://webhook.site/9693d678-5bf8-4432-baa9-f5fbd95e23df`
- Capture behavior: JavaScript `fetch` POST with `Accept: application/json`
- Submission confirmation: Inline receipt confirmation message rendered on HTTP 200 response
- Fallback behavior: Inline failure message with direct mailbox fallback
- Retrieval URL: `https://webhook.site/#!/view/9693d678-5bf8-4432-baa9-f5fbd95e23df`

## Required Live Capture Paths

1. TransformBy10X
   - Domain: `transformby10x.ai`
   - Widget: `Digital Fog Diagnostic`
   - Page file: `public/launch-v1/transformby10x/index.html`
   - Hidden metadata fields:
     - `brand=TransformBy10X`
     - `widget_name=Digital Fog Diagnostic`

2. BizBuilders AI
   - Domain: `bizbuilders.ai`
   - Widget: `Infrastructure AI-Era Alignment`
   - Page file: `public/launch-v1/bizbuilders/index.html`
   - Hidden metadata fields:
     - `brand=BizBuilders AI`
     - `widget_name=Infrastructure AI-Era Alignment`

3. BizBot Marketing
   - Domain: `bizbotmarketing.ai`
   - Widget: `Lead Loss Assessment`
   - Page file: `public/launch-v1/bizbotmarketing/index.html`
   - Hidden metadata fields:
     - `brand=BizBot Marketing`
     - `widget_name=Lead Loss Assessment`

## Mandatory Field Mapping

- `name`
- `email`
- `company`
- `short problem summary`
- `urgency or timeline`
