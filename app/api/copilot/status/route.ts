import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserIdFromSession } from '@/lib/jsonStore';

export async function GET(request: NextRequest) {
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

    // For prototype, return no active session
    // In real app, you'd check a database for active co-pilot sessions
    return NextResponse.json({
      success: true,
      session: null,
    });
  } catch (error) {
    console.error('Get co-pilot status error:', error);
    return NextResponse.json(
      { error: 'Failed to get co-pilot status' },
      { status: 500 }
    );
  }
}

