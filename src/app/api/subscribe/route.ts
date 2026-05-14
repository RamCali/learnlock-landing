import { NextRequest, NextResponse } from 'next/server';

// Google Apps Script webhook URL for Google Sheets
// Sheet: "Learn Lock Early Adopters" (under LEAPOUTBUSINESS Google account)
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyWghRZkEWxDqjDdTlfXB1lN1NeJmd6harA124o1K3PjCC-X_WQHJT7qBtJANYyQLE/exec';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send email to Google Sheets via Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    console.log(`Google Sheets submission - Status: ${response.status}`);

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    console.error('Google Sheets error:', response.statusText);
    return NextResponse.json({ success: true, note: 'logged for review' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true });
  }
}
