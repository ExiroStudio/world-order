import { NextRequest, NextResponse } from 'next/server';
import { executeAction } from '@/lib/roomStore';
import { sanitizeRoomCode } from '@/lib/roomCode';
import { GameAction } from '@/types/game';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const cleanCode = sanitizeRoomCode(code);
    const body = await req.json();
    const { playerUid, action } = body as {
      playerUid?: string;
      action?: GameAction;
    };

    if (!playerUid || !action) {
      return NextResponse.json(
        { error: 'playerUid dan action wajib disertakan.' },
        { status: 400 }
      );
    }

    const room = await executeAction(cleanCode, playerUid, action);
    return NextResponse.json({ success: true, room });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Gagal memproses aksi permainan.',
      },
      { status: 400 }
    );
  }
}
