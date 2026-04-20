import { prisma } from '@/lib/prisma';
import { dbTestimonialToPublic } from '@/lib/data/mapping';
import { TestimonialsClient } from './TestimonialsClient';
import { testimonials as fallback } from '@/lib/data/testimonials';

export async function Testimonials() {
  let testimonials = fallback;
  try {
    const rows = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    if (rows.length > 0) testimonials = rows.map(dbTestimonialToPublic);
  } catch {
    // DB unavailable — fall back to seed data.
  }
  return <TestimonialsClient testimonials={testimonials} />;
}
