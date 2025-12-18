import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserIdFromSession } from '@/lib/jsonStore';

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getSession(request);
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = getUserIdFromSession(sessionId);
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // End co-pilot session (simple for prototype - just return success)

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('End co-pilot error:', error);
    return NextResponse.json(
      { error: 'Failed to end co-pilot' },
      { status: 500 }
    );
  }
}

