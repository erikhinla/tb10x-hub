# Reddit Intake Form Integration

## What Changed

**Before:** $97 offer included 30-min onboarding call (manual scheduling, time-intensive)

**Now:** Automated post-purchase questionnaire replaces the call

---

## File Location

**Production-ready form:** `~/PROJECTS/TRANSFORM_BY_10X/public/bizbot-intake/reddit-intake.html`

**Preview:** Open in browser to test

---

## Integration Flow

### 1. Purchase Confirmation Page

After payment success, show:

```
✅ Payment Confirmed!

🎉 Congrats! You're one step closer to being set up on REDDIT!

Next step: Complete your intake form so we can tailor your strategy.

[Complete Intake Form →]
```

Button links to: `https://transformby10x.ai/bizbot-intake/reddit-intake.html`

---

### 2. Form Submission Endpoint

Current form has placeholder JavaScript. You need to wire it to your backend.

**Replace this block** (line ~375 in reddit-intake.html):

```javascript
// TODO: Replace with actual endpoint
// fetch('/api/reddit-intake', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
// })
// .then(response => response.json())
// .then(result => {
//     window.location.href = '/thank-you';
// });
```

**With your actual API endpoint.**

---

### 3. Data Schema

Form collects these fields:

**Business Basics:**
- businessName (required)
- websiteUrl
- email (required)
- offering (required)
- targetAudience (required)

**Reddit Experience:**
- hasAccount
- redditUsername
- priorExperience

**Targeting & Goals:**
- targetSubreddits (required)
- primaryGoal (required)
- otherGoal
- successMetrics

**Content & Brand Voice:**
- voiceProfessional (boolean)
- voiceCasual (boolean)
- voiceFunny (boolean)
- voiceEducational (boolean)
- voiceInspirational (boolean)
- existingContent
- contentLinks
- audienceTopics

**Constraints & Preferences:**
- restrictions
- competitors
- involvementLevel

**Final Thoughts:**
- additionalInfo

---

### 4. Post-Submission Redirect

After successful submission, redirect to: `/reddit-onboarding-thank-you`

**Thank-you page should say:**

```
🚀 You're All Set!

Your Reddit marketing strategy is being prepared.

What happens next:
1. We'll analyze your target subreddits (24-48 hrs)
2. You'll receive your custom content calendar
3. First posts go live within 7 days

Keep an eye on your inbox: [email]
```

---

## Calendar Integration?

**You asked about calendar integration** — this form REMOVES the need for calendar booking entirely. No call = no calendar.

If you want to offer an optional call after onboarding (like a 30-day check-in), add it as a separate opt-in later.

---

## Database Schema Suggestion

Store in `reddit_intakes` table:

```sql
CREATE TABLE reddit_intakes (
  id SERIAL PRIMARY KEY,
  purchase_id VARCHAR(255), -- link to payment record
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  website_url TEXT,
  offering TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  has_account VARCHAR(50),
  reddit_username VARCHAR(255),
  prior_experience TEXT,
  target_subreddits TEXT NOT NULL,
  primary_goal VARCHAR(100) NOT NULL,
  other_goal TEXT,
  success_metrics TEXT,
  voice_tags JSONB, -- store checkbox selections
  existing_content VARCHAR(50),
  content_links TEXT,
  audience_topics TEXT,
  restrictions TEXT,
  competitors TEXT,
  involvement_level VARCHAR(50),
  additional_info TEXT,
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

---

## Next Steps

1. Deploy `reddit-intake.html` to your web host
2. Wire up the form submission endpoint
3. Update purchase confirmation page to link to the form
4. Test end-to-end flow
5. Remove "30-min onboarding call" from offer page copy

---

**Result:** Fully automated onboarding. Zero manual scheduling. All info captured upfront.
