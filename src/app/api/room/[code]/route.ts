import { NextRequest, NextResponse } from 'next/server';
import { getRoom } from '@/lib/roomStore';
import { sanitizeRoomCode } from '@/lib/roomCode';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const cleanCode = sanitizeRoomCode(code);
    const room = await getRoom(cleanCode);

    if (!room) {
      return NextResponse.json(
        { error: 'Room tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Gagal mengambil data room.',
      },
      { status: 500 }
    );
  }
}
