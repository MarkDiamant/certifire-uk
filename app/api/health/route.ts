import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ resendConfigured: Boolean(process.env.RESEND_API_KEY) });
}
