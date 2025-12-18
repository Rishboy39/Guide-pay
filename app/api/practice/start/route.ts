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

    const { scenarioId } = await request.json();

    if (!scenarioId) {
      return NextResponse.json(
        { error: 'Scenario ID is required' },
        { status: 400 }
      );
    }

    // Create practice session (simple in-memory for now)
    const session = {
      id: Date.now().toString(),
      userId,
      scenarioId,
      completed: false,
      date: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        scenarioId: session.scenarioId,
        date: session.date,
      },
    });
  } catch (error) {
    console.error('Start practice error:', error);
    return NextResponse.json(
      { error: 'Failed to start practice' },
      { status: 500 }
    );
  }
}

