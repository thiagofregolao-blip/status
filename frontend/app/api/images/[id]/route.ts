import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const image = await prisma.image.findUnique({ where: { id: params.id } });
  if (!image) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const body = new Uint8Array(image.data);
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': image.mimeType,
      'Content-Length': String(image.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
