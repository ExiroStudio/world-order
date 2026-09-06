import { NextRequest, NextResponse } from 'next/server';
import { startGame } from '@/lib/roomStore';
import { sanitizeRoomCode } from '@/lib/roomCode';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const cleanCode = sanitizeRoomCode(code);
    const body = await req.json();
    const { hostUid } = body as { hostUid?: string };

    if (!hostUid) {
      return NextResponse.json(
        { error: 'hostUid wajib diisi.' },
        { status: 400 }
      );
    }

    const room = await startGame(cleanCode, hostUid);
    return NextResponse.json({ success: true, room });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Gagal memulai permainan.',
      },
      { status: 400 }
    );
  }
}
