import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { faqInputSchema } from '@/lib/admin/faq-schema';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await prisma.faq.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const parsed = faqInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation', issues: parsed.error.flatten() }, { status: 400 });
  }
  const created = await prisma.faq.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
