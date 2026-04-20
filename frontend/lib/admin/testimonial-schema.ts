import { z } from 'zod';

export const testimonialInputSchema = z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().min(2),
  location: z.string().trim().min(2),
  quotePt: z.string().trim().min(10),
  quoteEs: z.string().trim().min(10),
  imageUrl: z.string().trim().optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  courseRef: z.string().trim().optional().nullable(),
  featured: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialInputSchema>;
