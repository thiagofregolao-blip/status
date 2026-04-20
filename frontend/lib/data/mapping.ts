import type { Course as DbCourse, Testimonial as DbTestimonial, Faq as DbFaq } from '@prisma/client';
import type { Course, Testimonial } from '@/lib/types';

export function dbCourseToPublic(c: DbCourse): Course {
  return {
    id: c.id,
    slug: c.slug,
    title: { pt: c.titlePt, es: c.titleEs },
    descriptionShort: { pt: c.descriptionShortPt, es: c.descriptionShortEs },
    imageUrl: c.imageUrl,
    track: c.track as Course['track'],
    category: c.category,
    modality: c.modality as Course['modality'],
    price: c.price,
    installments: c.installments,
    installmentValue: c.installmentValue,
    workloadHours: c.workloadHours,
    startDate: c.startDate.toISOString().slice(0, 10),
    endDate: c.endDate.toISOString().slice(0, 10),
    location: { pt: c.locationPt, es: c.locationEs },
    totalSeats: c.totalSeats,
    seatsTaken: c.seatsTaken,
    status: c.status as Course['status'],
    featured: c.featured,
    nrsCovered: c.nrsCovered,
    toolsCovered: c.toolsCovered,
    includes: { pt: c.includesPt, es: c.includesEs },
    machinesUsed: c.machinesUsed,
  };
}

export function dbTestimonialToPublic(t: DbTestimonial): Testimonial {
  return {
    id: t.id,
    studentName: t.name,
    city: t.location,
    courseTitle: { pt: t.role, es: t.role },
    photoUrl: t.imageUrl ?? '',
    text: { pt: t.quotePt, es: t.quoteEs },
    rating: t.rating,
    featured: t.featured,
    track: 'tecnica',
  };
}

export type PublicFaq = {
  id: string;
  question: { pt: string; es: string };
  answer: { pt: string; es: string };
};

export function dbFaqToPublic(f: DbFaq): PublicFaq {
  return {
    id: f.id,
    question: { pt: f.questionPt, es: f.questionEs },
    answer: { pt: f.answerPt, es: f.answerEs },
  };
}
