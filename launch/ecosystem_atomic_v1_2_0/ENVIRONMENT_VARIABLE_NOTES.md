# Environment Variable Notes

No runtime environment variables are required for the static launch pages in:

- `public/launch-v1/transformby10x/index.html`
- `public/launch-v1/bizbuilders/index.html`
- `public/launch-v1/bizbotmarketing/index.html`

Notes:
- Lead capture uses same-origin API route `/api/lead`, which relays to webhook destination `https://webhook.site/9693d678-5bf8-4432-baa9-f5fbd95e23df`.
- Domain attachment and SSL provisioning are managed by hosting provider configuration.
- AIVA voice path link currently points to `https://aiva-app-eta.vercel.app` as optional voice path.
