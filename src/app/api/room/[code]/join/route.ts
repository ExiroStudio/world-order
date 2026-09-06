import { NextRequest, NextResponse } from 'next/server';
import { joinRoom } from '@/lib/roomStore';
import { sanitizeRoomCode } from '@/lib/roomCode';
import { TeamId } from '@/types/game';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const cleanCode = sanitizeRoomCode(code);
    const body = await req.json();
    const { uid, name, teamId } = body as {
      uid?: string;
      name?: string;
      teamId?: TeamId;
    };

    if (!uid || !name || !teamId) {
      return NextResponse.json(
        { error: 'uid, name, dan teamId wajib diisi.' },
        { status: 400 }
      );
    }

    const room = await joinRoom(cleanCode, { uid, name, teamId });
    return NextResponse.json({ success: true, room });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Gagal bergabung dengan room.',
      },
      { status: 400 }
    );
  }
}
