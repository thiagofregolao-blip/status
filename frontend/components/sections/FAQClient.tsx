'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { useI18n } from '@/lib/i18n';

export type FAQItem = { q: { pt: string; es: string }; a: { pt: string; es: string } };

export function FAQClient({ items }: { items?: FAQItem[] }) {
  const { t, locale } = useI18n();
  const resolved =
    items && items.length > 0
      ? items.map((it) => ({ q: it.q[locale], a: it.a[locale] }))
      : t.faq.items;

  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="section-eyebrow">{t.faq.eyebrow}</span>
          <h2 className="mt-3 text-display-lg text-slate-900">{t.faq.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-2 sm:p-4 shadow-soft"
        >
          <Accordion type="single" collapsible className="divide-y divide-slate-100">
            {resolved.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="px-4 sm:px-6 border-b-0">
                <AccordionTrigger className="text-left text-base sm:text-lg">{item.q}</AccordionTrigger>
                <AccordionContent className="text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
