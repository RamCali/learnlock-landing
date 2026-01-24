import { NextRequest, NextResponse } from 'next/server';

// Your ConvertKit/Kit numeric form ID
const FORM_ID = '9008422';
// V3 API key (legacy)
const API_KEY = process.env.CONVERTKIT_API_KEY || 'yogQOy1FuOv_cjHm3dq1Sg';
// Tag ID for "Early Adopters"
const EARLY_ADOPTER_TAG_ID = '14874304';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Step 1: Subscribe to form
    const formResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
          first_name: firstName || undefined,
        }),
      }
    );

    const formData = await formResponse.json();
    console.log(`ConvertKit form subscribe - Status: ${formResponse.status}`);

    // Step 2: Add tag to subscriber
    if (formResponse.ok && EARLY_ADOPTER_TAG_ID) {
      const tagResponse = await fetch(
        `https://api.convertkit.com/v3/tags/${EARLY_ADOPTER_TAG_ID}/subscribe`,
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
      console.log(`ConvertKit tag subscribe - Status: ${tagResponse.status}`);
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
