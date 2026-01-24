import { NextRequest, NextResponse } from 'next/server';

// Kit (ConvertKit) form ID and API key
const KIT_FORM_ID = '9008422';
const KIT_API_KEY = process.env.CONVERTKIT_API_KEY || 'kit_2f8229fec62bab9b395d85265efd9ee4';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Try Kit API v4 first
    const v4Response = await fetch(
      `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': KIT_API_KEY,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      }
    );

    if (v4Response.ok) {
      const data = await v4Response.json();
      console.log('Kit v4 success:', data);
      return NextResponse.json({ success: true, data });
    }

    // Fallback to ConvertKit v3 API
    const v3Response = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email: email,
        }),
      }
    );

    if (v3Response.ok) {
      const data = await v3Response.json();
      console.log('ConvertKit v3 success:', data);
      return NextResponse.json({ success: true, data });
    }

    const errorText = await v3Response.text();
    console.error('Both APIs failed. v3 response:', errorText);
    return NextResponse.json(
      { error: 'Failed to subscribe', details: errorText },
      { status: 500 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
