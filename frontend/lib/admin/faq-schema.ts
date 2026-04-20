import { z } from 'zod';

export const faqInputSchema = z.object({
  questionPt: z.string().trim().min(5),
  questionEs: z.string().trim().min(5),
  answerPt: z.string().trim().min(10),
  answerEs: z.string().trim().min(10),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

export type FaqInput = z.infer<typeof faqInputSchema>;
