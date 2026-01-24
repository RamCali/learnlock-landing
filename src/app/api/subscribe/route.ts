import { NextRequest, NextResponse } from 'next/server';

// ConvertKit form embed ID
const CONVERTKIT_FORM_ID = '66f5eff770';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Use ConvertKit's form subscribe endpoint
    const formData = new URLSearchParams();
    formData.append('email_address', email);

    const response = await fetch(
      `https://app.convertkit.com/forms/${CONVERTKIT_FORM_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData.toString(),
      }
    );

    // ConvertKit returns 200 for success, even without JSON
    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Try to get error details
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { status: response.status, statusText: response.statusText };
    }

    console.error('ConvertKit error:', errorData);
    return NextResponse.json(
      { error: 'Failed to subscribe', details: errorData },
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
