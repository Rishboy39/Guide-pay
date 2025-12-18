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

    const { sessionId: practiceSessionId } = await request.json();

    if (!practiceSessionId) {
      return NextResponse.json(
        { error: 'Practice session ID is required' },
        { status: 400 }
      );
    }

    // Practice session completion (just return success for now)
    // In a real app, you'd track this in a database

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Complete practice error:', error);
    return NextResponse.json(
      { error: 'Failed to complete practice' },
      { status: 500 }
    );
  }
}

