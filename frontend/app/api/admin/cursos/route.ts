import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { courseInputSchema } from '@/lib/admin/course-schema';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const courses = await prisma.course.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = courseInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.course.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return NextResponse.json({ error: 'slug_exists' }, { status: 409 });

  const created = await prisma.course.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
