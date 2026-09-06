import { NextRequest, NextResponse } from 'next/server';
import { createRoom } from '@/lib/roomStore';
import { generateRoomCode } from '@/lib/roomCode';
import { TeamId } from '@/types/game';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hostUid, hostName, hostTeamId } = body as {
      hostUid?: string;
      hostName?: string;
      hostTeamId?: TeamId;
    };

    if (!hostUid || !hostName || !hostTeamId) {
      return NextResponse.json(
        { error: 'hostUid, hostName, dan hostTeamId wajib diisi.' },
        { status: 400 }
      );
    }

    let code = generateRoomCode();
    let room;
    let attempts = 0;

    while (attempts < 5) {
      try {
        room = await createRoom(code, hostUid, hostName, hostTeamId);
        break;
      } catch (err: unknown) {
        attempts++;
        if (attempts >= 5) throw err;
        code = generateRoomCode();
      }
    }

    return NextResponse.json({ success: true, code, room });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Gagal membuat room.',
      },
      { status: 500 }
    );
  }
}
