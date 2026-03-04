# Launch & Stripe Verification Checklists

## Pre-Launch Checklist

- [ ] **Final Content Review**: Read through every page. Check for typos, grammatical errors, and awkward phrasing. Ensure all copy is at an 8th-grade reading level.
- [ ] **Asset Check**: Ensure all images and videos are optimized for the web. Replace all placeholder content.
- [ ] **Favicon**: Verify the favicon is present and displays correctly in browser tabs.
- [ ] **Metadata**: Check that every page has a unique, descriptive title and meta description.
- [ ] **Open Graph Tags**: Use a tool like [Open Graph Check](https://www.opengraph.xyz/) to verify that social sharing cards for Twitter and Facebook/LinkedIn look correct.
- [ ] **Responsive Test**: Test the site on multiple devices (desktop, tablet, mobile) and browsers (Chrome, Safari, Firefox). Check for layout breaks, font size issues, and touch target problems.
- [ ] **Performance Audit**: Run a Lighthouse report in Chrome DevTools. Aim for a Performance score of 90+.
- [ ] **Lead Form Test**: Submit the lead capture form on every page where it appears. Confirm that the email is successfully added to the `leads` table in Supabase.
- [ ] **Payment Link Test**: Click on the Stripe and PayPal payment links on the `/kill-kit` page. Ensure they redirect to the correct checkout pages.
- [ ] **404 Page**: Intentionally navigate to a non-existent URL to ensure the custom 404 page appears correctly.
- [ ] **Environment Variables**: Double-check that all production environment variables are set correctly in Vercel.

## Stripe Account Verification Checklist

Stripe requires a live, publicly accessible website with certain pages to approve your account for production payments. Ensure the following are complete before you request activation.

- [ ] **Website Live**: The website must be deployed and accessible at `transformby10x.ai`.
- [ ] **Business Description**: Your Stripe account profile has a clear description of what your business sells (e.g., "AI-powered business consulting and content services").
- [ ] **Terms of Service Page**: A `/terms` page is live and accessible from the site footer. It clearly outlines user agreement, payment terms, and liability limitations.
- [ ] **Privacy Policy Page**: A `/privacy` page is live and accessible from the site footer. It details what data you collect, how you use it, and how users can manage their data.
- [ ] **Contact Information**: A `/contact` page or a clear section in the footer provides a support email address (`support@transformby10x.ai`) and ideally a business address.
- [ ] **About Page**: An `/about` page gives customers information about your business and what you do.
- [ ] **Product/Service Details**: The `/kill-kit` page clearly describes the product being sold. Pricing does not have to be public, but the product itself must be detailed.
- [ ] **Secure Payments**: Your payment forms are served over HTTPS (Vercel handles this automatically).
