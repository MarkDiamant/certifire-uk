import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body ?? {};

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
    }

    const resend = new Resend(key);
    const destination = process.env.CONTACT_TO_EMAIL || 'certifireukltd@gmail.com';
    const from = process.env.CONTACT_FROM_EMAIL || 'Certifire UK <onboarding@resend.dev>';

    const safe = (value: unknown) => String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const result = await resend.emails.send({
      from,
      to: destination,
      replyTo: email || undefined,
      subject: `Website enquiry: ${service}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#1d1d1d">
          <h2 style="margin-bottom:4px">New Certifire UK website enquiry</h2>
          <p style="color:#666;margin-top:0">Submitted via the Certifire UK website.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:24px">
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(name)}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Phone</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(phone)}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(email) || 'Not supplied'}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>Service</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${safe(service)}</td></tr>
          </table>
          <h3 style="margin-top:26px">Property / enquiry details</h3>
          <p style="white-space:pre-wrap;line-height:1.6">${safe(message) || 'No additional details supplied.'}</p>
        </div>`,
      text: `New Certifire UK website enquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not supplied'}\nService: ${service}\n\nDetails:\n${message || 'No additional details supplied.'}`,
    });

    if (result.error) {
      console.error('Resend error', result.error);
      return NextResponse.json({ error: 'Unable to send enquiry.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact route error', error);
    return NextResponse.json({ error: 'Unable to send enquiry.' }, { status: 500 });
  }
}
