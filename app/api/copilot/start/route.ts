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

    const { helperEmail } = await request.json();

    if (!helperEmail) {
      return NextResponse.json(
        { error: 'Helper email is required' },
        { status: 400 }
      );
    }

    // Create co-pilot session (simple for prototype)
    const session = {
      id: Date.now().toString(),
      userId,
      helperEmail,
      active: true,
      startedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        helperEmail: session.helperEmail,
        active: session.active,
        startedAt: session.startedAt,
      },
    });
  } catch (error) {
    console.error('Start co-pilot error:', error);
    return NextResponse.json(
      { error: 'Failed to start co-pilot' },
      { status: 500 }
    );
  }
}

