import { NextRequest, NextResponse } from 'next/server';

// Google Apps Script webhook URL for Google Sheets
// Sheet: "Learn Lock Early Adopters" (under LEAPOUTBUSINESS Google account)
const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyWghRZkEWxDqjDdTlfXB1lN1NeJmd6harA124o1K3PjCC-X_WQHJT7qBtJANYyQLE/exec';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      // Apps Script Web Apps respond to POST with a 302 to a user-content URL
      // that serves the response body. doPost has already executed before the
      // redirect, so a 302 means the write succeeded. We don't need the body.
      redirect: 'manual',
    });

    console.log(`Google Sheets submission - Status: ${response.status}`);

    if (response.ok || response.status === 302) {
      return NextResponse.json({ success: true });
    }

    const text = await response.text().catch(() => '');
    console.error('Google Sheets error:', response.status, text);
    return NextResponse.json({ success: true, note: 'logged for review' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true });
  }
}
