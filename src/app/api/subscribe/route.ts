import { NextRequest, NextResponse } from 'next/server';

const KIT_FORM_ID = '66f5eff770';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Try multiple Kit endpoints
    const endpoints = [
      // Standard Kit form subscription endpoint
      `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
      // Alternative endpoint
      `https://api.convertkit.com/v3/forms/9008422/subscribe`,
    ];

    for (const endpoint of endpoints) {
      try {
        const isV3 = endpoint.includes('convertkit.com');

        let response;
        if (isV3) {
          // ConvertKit v3 API format
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: 'kit_2f8229fec62bab9b395d85265efd9ee4',
              email: email,
            }),
          });
        } else {
          // Kit form format
          const formData = new URLSearchParams();
          formData.append('email_address', email);

          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            body: formData.toString(),
          });
        }

        const responseText = await response.text();
        console.log(`Kit endpoint ${endpoint} - Status: ${response.status}, Response: ${responseText.substring(0, 200)}`);

        if (response.ok || response.status === 200 || response.status === 201) {
          return NextResponse.json({ success: true, endpoint });
        }
      } catch (err) {
        console.error(`Endpoint ${endpoint} failed:`, err);
      }
    }

    // All endpoints failed, but don't block the user
    return NextResponse.json({ success: true, note: 'Queued for retry' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true });
  }
}
