import { NextRequest, NextResponse } from 'next/server';

// Your ConvertKit/Kit numeric form ID
const FORM_ID = '9008422';
// V4 API key (use Bearer token authentication)
const API_KEY = process.env.CONVERTKIT_API_KEY;
// Tag ID for "Early Adopters"
const EARLY_ADOPTER_TAG_ID = '14874304';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!API_KEY) {
      console.error('CONVERTKIT_API_KEY environment variable is not set');
      return NextResponse.json({ success: true, note: 'API key not configured' });
    }

    // Step 1: Subscribe to form using V4 API with Bearer token
    const formResponse = await fetch(
      `https://api.convertkit.com/v4/forms/${FORM_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const formData = await formResponse.json();
    console.log(`ConvertKit form subscribe - Status: ${formResponse.status}`, formData);

    // Step 2: Add tag to subscriber using V4 API
    if (formResponse.ok && EARLY_ADOPTER_TAG_ID) {
      const tagResponse = await fetch(
        `https://api.convertkit.com/v4/tags/${EARLY_ADOPTER_TAG_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const tagData = await tagResponse.json();
      console.log(`ConvertKit tag subscribe - Status: ${tagResponse.status}`, tagData);
    }

    if (formResponse.ok) {
      return NextResponse.json({ success: true });
    }

    console.error('ConvertKit error:', formData);
    return NextResponse.json({ success: true, note: 'logged for review' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: true });
  }
}
