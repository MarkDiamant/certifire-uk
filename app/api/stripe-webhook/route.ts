import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';

export const runtime = 'nodejs';

const DESTINATION = 'certifireukltd@gmail.com';
const FROM = 'Certifire UK <website@certifireuk.co.uk>';

function verifyStripeSignature(payload: string, header: string, secret: string) {
  const parts = header.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
  const signatures = parts.filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  if (!timestamp || !signatures.length) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
  return signatures.some(sig => {
    if (sig.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  });
}

function safe(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function money(amount: number | null | undefined, currency: string | null | undefined) {
  if (typeof amount !== 'number') return 'See Stripe';
  try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: (currency || 'gbp').toUpperCase() }).format(amount / 100); }
  catch { return `£${(amount / 100).toFixed(2)}`; }
}

export async function POST(request: Request) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    const resendKey = process.env.RESEND_API_KEY;
    if (!secret || !resendKey) {
      console.error('Stripe booking webhook environment is not configured');
      return NextResponse.json({ error: 'Not configured' }, { status: 503 });
    }

    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';
    if (!verifyStripeSignature(payload, signature, secret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(payload);
    if (event.type !== 'checkout.session.completed') return NextResponse.json({ received: true });

    const session = event.data?.object ?? {};
    // Payment Links create a Checkout Session for the initial purchase/sign-up. Listening only
    // to checkout.session.completed avoids treating recurring subscription renewals as new bookings.
    if (!session.payment_link) return NextResponse.json({ received: true });

    const details = session.customer_details ?? {};
    const custom = Array.isArray(session.custom_fields) ? session.custom_fields : [];
    const customValue = (field: any) => field?.text?.value ?? field?.numeric?.value ?? field?.dropdown?.value ?? '';
    const rows = custom.map((field: any) => ({ label: field?.label?.custom || field?.key || 'Booking detail', value: customValue(field) }));

    const address = details.address;
    const addressText = address ? [address.line1, address.line2, address.city, address.postal_code, address.country].filter(Boolean).join(', ') : '';
    const customerName = details.name || session.customer_email || 'Customer';
    const amount = money(session.amount_total, session.currency);
    const paymentStatus = session.payment_status || 'completed';
    const mode = session.mode === 'subscription' ? 'Recurring service sign-up' : 'One-off booking';

    const extraHtml = rows.length ? rows.map((r: any) => `<tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>${safe(r.label)}</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(r.value) || 'Not supplied'}</td></tr>`).join('') : '<tr><td colspan="2" style="padding:10px;color:#666">No additional booking fields supplied.</td></tr>';
    const extraText = rows.length ? rows.map((r: any) => `${r.label}: ${r.value || 'Not supplied'}`).join('\n') : 'No additional booking fields supplied.';

    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from: FROM,
      to: DESTINATION,
      replyTo: details.email || undefined,
      subject: `New Certifire booking - ${customerName}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1d1d1d">
        <h2 style="margin-bottom:4px">New Certifire UK booking</h2>
        <p style="color:#666;margin-top:0">A customer has completed a booking and payment through the website.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:24px">
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(details.name) || 'Not supplied'}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(details.email || session.customer_email) || 'Not supplied'}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Phone</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(details.phone) || 'Not supplied'}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Address</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(addressText) || 'See booking details'}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Booking type</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(mode)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Amount</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(amount)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Payment</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(paymentStatus)}</td></tr>
          ${extraHtml}
        </table>
        <p style="margin-top:24px;color:#666;font-size:13px">Stripe booking reference: ${safe(session.id)}</p>
      </div>`,
      text: `New Certifire UK booking\n\nName: ${details.name || 'Not supplied'}\nEmail: ${details.email || session.customer_email || 'Not supplied'}\nPhone: ${details.phone || 'Not supplied'}\nAddress: ${addressText || 'See booking details'}\nBooking type: ${mode}\nAmount: ${amount}\nPayment: ${paymentStatus}\n\n${extraText}\n\nStripe booking reference: ${session.id}`,
    });

    if (result.error) {
      console.error('Booking email Resend error', result.error);
      return NextResponse.json({ error: 'Email failed' }, { status: 502 });
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe booking webhook error', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
