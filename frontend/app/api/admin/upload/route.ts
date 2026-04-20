import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'no_file' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'invalid_type', allowed: ALLOWED }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'too_large', maxBytes: MAX_SIZE }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const row = await prisma.image.create({
    data: {
      data: buf,
      mimeType: file.type,
      size: buf.length,
      filename: file.name,
    },
  });

  return NextResponse.json({ id: row.id, url: `/api/images/${row.id}` }, { status: 201 });
}
