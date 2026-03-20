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
    const from = 'hello@transformby10x.ai';
    const replyTo = 'erik@transformby10x.ai';

    switch (productId) {
      case 'fogkit':
        subject = 'Your Digital Fog Kit is ready.';
        body = `Hey,\n\nYour Digital Fog Kit is ready: [Download Link]\n\nHere's what you're holding: a diagnostic framework for the six symptoms that stall every growing company. Too many tools, trapped knowledge, manual dependency, missing architecture, low visibility, stalled momentum.\n\nMost people read through it and think "holy shit, that's us."\n\nIf that's you, the next step is a conversation. Not a sales pitch. A strategy session where we map your specific fog and talk about what clearing it actually looks like.\n\nBook a call here: [Calendly Link]\n\nIf you're not ready for that yet, no pressure. Sit with the diagnosis. You'll know when it's time.\n\nErik\nTransformBy10X`;
        break;
      default:
        console.log(`Unhandled product ID for TBTX webhook: ${productId}`);
        return { statusCode: 200, body: 'OK - no email triggered' };
    }

    try {
      if (body) {
        await resend.emails.send({
          from: from,
          reply_to: replyTo,
          to: customerEmail,
          subject: subject,
          text: body,
        });
        console.log(`Sent email to ${customerEmail} for product ${productId}`);
      }
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
      return { statusCode: 500, body: 'Failed to send email' };
    }
  }

  return { statusCode: 200, body: 'OK' };
};
