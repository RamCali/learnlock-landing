import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Submit directly to Kit form
    const formData = new URLSearchParams();
    formData.append('email_address', email);

    const response = await fetch(
      'https://hustling-knitter-8873.kit.com/66f5eff770/subscribe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    console.log('Kit response status:', response.status);

    // Kit returns 200 or redirects on success
    if (response.ok || response.status === 302 || response.status === 301) {
      return NextResponse.json({ success: true });
    }

    const text = await response.text();
    console.error('Kit error:', text);
    return NextResponse.json({ success: true }); // Still return success to not block user
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true }); // Still return success
  }
}
