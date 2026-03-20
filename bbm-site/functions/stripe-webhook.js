const { Resend } = require('resend');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return { statusCode: 500, body: 'Webhook Secret missing' };
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return { statusCode: 400, body: 'Webhook signature verification failed' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const productId = session.metadata?.product_id;

    if (!customerEmail || !productId) {
      console.warn('Missing email or product_id in session metadata.', session.id);
      return { statusCode: 200, body: 'OK - but missing data' };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let subject = '';
    let body = '';
    const from = 'hello@bizbotmarketing.ai';
    const replyTo = 'erik@transformby10x.ai';

    switch (productId) {
      case 'reddit_bundle':
        subject = 'Your Reddit Growth Bundle is ready.';
        body = `Hey,\n\nYour bundle is ready. Here's everything:\n\nCustom Marketing Plan for Reddit — [Download Link]\nAccount Intelligence Report (AIR) — [Download Link]\nKarma Kickstarter — [Download Link]\n\nStart with the Karma Kickstarter to get your account foundation right, then use the AIR to understand your positioning, then deploy the Marketing Plan.\n\nThat order matters. Don't skip ahead.\n\nIf anything looks off with the files, reply to this email. I read every one.\n\nTalk soon,\nErik\nBizBot Marketing`;
        break;
      case 'reddit_plan':
        subject = 'Your Reddit Marketing Plan is here.';
        body = `Hey,\n\nYour Custom Marketing Plan for Reddit is ready: [Download Link]\n\nThis plan works best when you know your account's current standing. If you want the full picture, the Account Intelligence Report breaks down exactly where your account sits and what to lean into.\n\nGet the AIR here: [Stripe Link — $27]\n\nReply if you need anything.\n\nErik\nBizBot Marketing`;
        break;
      case 'reddit_air':
        subject = 'Your Account Intelligence Report is ready.';
        body = `Hey,\n\nYour AIR is ready: [Download Link]\n\nThis tells you where you stand. The next step is knowing where to go. The Custom Marketing Plan for Reddit maps your growth strategy based on exactly this kind of data.\n\nGet the Marketing Plan here: [Stripe Link — $49]\n\nReply if anything looks off.\n\nErik\nBizBot Marketing`;
        break;
      case 'reddit_karma':
        subject = 'Karma Kickstarter — let\'s go.';
        body = `Hey,\n\nYour Karma Kickstarter is ready: [Download Link]\n\nThis gets you started fast. But starting is the easy part. If you want the strategy behind sustained Reddit growth, the full bundle gives you the Kickstarter plus the AIR plus a Custom Marketing Plan, all built to work together.\n\nGet the full bundle here: [Stripe Link — $47]\n\nReply if you need anything.\n\nErik\nBizBot Marketing`;
        break;
      default:
        console.log(`Unhandled product ID for BBM webhook: ${productId}`);
        return { statusCode: 200, body: 'OK - no email triggered' };
    }

    try {
      await resend.emails.send({
        from: from,
        reply_to: replyTo,
        to: customerEmail,
        subject: subject,
        text: body,
      });
      console.log(`Sent email to ${customerEmail} for product ${productId}`);
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
      return { statusCode: 500, body: 'Failed to send email' };
    }
  }

  return { statusCode: 200, body: 'OK' };
};
