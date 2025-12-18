import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserIdFromSession, getTransactionsByUserId } from '@/lib/jsonStore';

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

    const transactions = getTransactionsByUserId(userId);

    return NextResponse.json({
      success: true,
      transactions: transactions.map(t => ({
        id: t.id,
        recipient: t.recipient,
        amount: t.amount,
        note: t.note,
        type: t.type,
        date: t.date,
        isPractice: t.isPractice,
      })),
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to get transactions' },
      { status: 500 }
    );
  }
}

