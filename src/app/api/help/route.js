import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward to Express backend
    const response = await fetch('http://localhost:5000/api/help', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Help request submitted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: data.message || 'Failed to submit request' }, { status: 400 });
    }
  } catch (error) {
    console.error('Help API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}



