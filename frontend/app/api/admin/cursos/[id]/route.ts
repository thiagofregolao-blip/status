import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { courseInputSchema } from '@/lib/admin/course-schema';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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
  if (existing && existing.id !== params.id) {
    return NextResponse.json({ error: 'slug_exists' }, { status: 409 });
  }

  const updated = await prisma.course.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = (await req.json()) as { status?: string; featured?: boolean };
  const data: { status?: string; featured?: boolean } = {};
  if (typeof body.status === 'string') data.status = body.status;
  if (typeof body.featured === 'boolean') data.featured = body.featured;
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'no_fields' }, { status: 400 });
  }

  const updated = await prisma.course.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  await prisma.course.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
