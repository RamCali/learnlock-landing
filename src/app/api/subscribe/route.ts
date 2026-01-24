import { NextRequest, NextResponse } from 'next/server';

// Your ConvertKit/Kit numeric form ID
const FORM_ID = '9008422';
// Your API key (the one without 'kit_' prefix works with v3 API)
const API_KEY = process.env.CONVERTKIT_API_KEY || 'kit_2f8229fec62bab9b395d85265efd9ee4';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Use ConvertKit v3 API
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
        }),
      }
    );

    const responseText = await response.text();
    console.log(`ConvertKit v3 - Status: ${response.status}, Response: ${responseText.substring(0, 300)}`);

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Log the error but don't block user
    console.error('ConvertKit error:', responseText);
    return NextResponse.json({ success: true, note: 'logged for review' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true });
  }
}
