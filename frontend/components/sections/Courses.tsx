import { prisma } from '@/lib/prisma';
import { dbCourseToPublic } from '@/lib/data/mapping';
import { CoursesClient } from './CoursesClient';
import { courses as fallbackCourses } from '@/lib/data/courses';

export async function Courses() {
  let courses = fallbackCourses;
  try {
    const rows = await prisma.course.findMany({
      where: { status: 'active' },
      orderBy: [{ order: 'asc' }, { startDate: 'asc' }],
    });
    if (rows.length > 0) courses = rows.map(dbCourseToPublic);
  } catch {
    // DB unavailable (e.g. local dev without DATABASE_URL) — fall back to seeded data.
  }
  return <CoursesClient courses={courses} />;
}
