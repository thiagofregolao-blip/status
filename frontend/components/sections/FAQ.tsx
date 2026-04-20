import { prisma } from '@/lib/prisma';
import { FAQClient, type FAQItem } from './FAQClient';

export async function FAQ() {
  let items: FAQItem[] | undefined;
  try {
    const rows = await prisma.faq.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    if (rows.length > 0) {
      items = rows.map((f) => ({
        q: { pt: f.questionPt, es: f.questionEs },
        a: { pt: f.answerPt, es: f.answerEs },
      }));
    }
  } catch {
    // DB unavailable — FAQClient falls back to locale JSON.
  }
  return <FAQClient items={items} />;
}
