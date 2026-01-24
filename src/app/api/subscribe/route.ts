import { NextRequest, NextResponse } from 'next/server';

// Kit (ConvertKit) form ID
const KIT_FORM_UID = '66f5eff770';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Submit to Kit's form endpoint
    const formData = new URLSearchParams();
    formData.append('email_address', email);

    const response = await fetch(
      `https://app.kit.com/forms/${KIT_FORM_UID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    if (response.ok || response.status === 302 || response.status === 200) {
      return NextResponse.json({ success: true });
    }

    console.error('Kit API error:', response.status, response.statusText);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
