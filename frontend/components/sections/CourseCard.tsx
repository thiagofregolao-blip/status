'use client';

import { Calendar, Clock, MapPin, Users, ArrowRight, Monitor, Tractor, BrainCircuit } from 'lucide-react';
import type { Course } from '@/lib/types';
import { useI18n, interpolate } from '@/lib/i18n';
import { waCourseLink } from '@/lib/config';
import { formatDate, formatPrice, seatsRemaining, cn } from '@/lib/utils';

export function CourseCard({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const remaining = seatsRemaining(course.totalSeats, course.seatsTaken);
  const isFull = remaining === 0;
  const isUrgent = remaining > 0 && remaining <= 3;

  const isTech = course.track === 'tecnica';
  const title = course.title[locale];
  const description = course.descriptionShort[locale];
  const location = course.location[locale];

  const startDateFormatted = formatDate(course.startDate, locale);
  const href = waCourseLink(title, startDateFormatted, locale);

  const modalityLabel = t.courses.modalityLabels[course.modality];
  const trackLabel = t.courses.trackLabels[course.track];

  const cta = isFull ? t.courses.card.ctaWaitlist : t.courses.card.cta;
  const TrackIcon = isTech ? Tractor : BrainCircuit;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500',
        'border-slate-200 shadow-soft hover:-translate-y-1.5',
        isTech ? 'hover:shadow-glow-tech hover:border-tech/30' : 'hover:shadow-glow-ai hover:border-ai/30',
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={course.imageUrl}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t to-transparent mix-blend-multiply opacity-80 transition-opacity',
            isTech ? 'from-tech/70 via-tech/10' : 'from-ai/70 via-ai/10',
          )}
        />
        {/* Top badges */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <span
            className={cn(
              'badge backdrop-blur bg-white/95 border-0 shadow-soft',
              isTech ? 'text-tech' : 'text-ai',
            )}
          >
            <TrackIcon className="h-3 w-3" />
            {trackLabel}
          </span>
          <span className="badge bg-slate-900/85 backdrop-blur text-white border-0 shadow-soft">
            {course.modality === 'online_ao_vivo' || course.modality === 'gravado' ? (
              <Monitor className="h-3 w-3" />
            ) : (
              <MapPin className="h-3 w-3" />
            )}
            {modalityLabel}
          </span>
        </div>
        {/* Urgency */}
        {isUrgent && (
          <div className="absolute bottom-3 left-3">
            <span className="badge badge-urg bg-white shadow-lifted border-0 animate-pulse-ring relative">
              🔥 {t.courses.card.seatsLast}
            </span>
          </div>
        )}
        {isFull && (
          <div className="absolute bottom-3 left-3">
            <span className="badge badge-muted bg-white shadow-soft border-0">
              {t.courses.card.full}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className={cn(
            'font-display text-lg sm:text-xl font-extrabold leading-tight text-slate-900 transition-colors',
            isTech ? 'group-hover:text-tech' : 'group-hover:text-ai',
          )}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{description}</p>

        {/* Meta */}
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {t.courses.card.startsOn}
            </dt>
            <dd className="mt-0.5 font-semibold text-slate-900">{startDateFormatted}</dd>
          </div>
          <div>
            <dt className="text-slate-500 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {t.courses.card.workload}
            </dt>
            <dd className="mt-0.5 font-semibold text-slate-900">
              {course.workloadHours}
              {t.courses.card.hours}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-slate-500 flex items-center gap-1.5">
              {course.modality === 'online_ao_vivo' || course.modality === 'gravado' ? (
                <Monitor className="h-3.5 w-3.5" />
              ) : (
                <MapPin className="h-3.5 w-3.5" />
              )}
              {t.courses.card.modality}
            </dt>
            <dd className="mt-0.5 font-semibold text-slate-900">{location}</dd>
          </div>
        </dl>

        {/* Tools / Machines chips */}
        {(course.toolsCovered.length > 0 || course.machinesUsed.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(course.toolsCovered.length > 0 ? course.toolsCovered : course.machinesUsed)
              .slice(0, 3)
              .map((item) => (
                <span
                  key={item}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[11px] font-semibold border',
                    isTech
                      ? 'bg-tech-soft/50 text-tech border-tech/15'
                      : 'bg-ai-soft/50 text-ai border-ai/20',
                  )}
                >
                  {item}
                </span>
              ))}
            {(course.toolsCovered.length > 0 ? course.toolsCovered : course.machinesUsed).length > 3 && (
              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-500 border border-slate-200">
                +{(course.toolsCovered.length > 0 ? course.toolsCovered : course.machinesUsed).length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-5 flex items-end justify-between border-t border-dashed border-slate-200 pt-4">
          <div>
            <div className="text-xs text-slate-500">{t.courses.card.price}</div>
            {course.price > 0 ? (
              <>
                <div className="font-display text-xl font-extrabold text-slate-900">
                  {formatPrice(course.price, locale)}
                </div>
                {course.installments > 1 && course.installmentValue > 0 && (
                  <div className="text-[11px] text-slate-500">
                    {interpolate(t.courses.card.installments, {
                      count: course.installments,
                      value: formatPrice(course.installmentValue, locale),
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="font-display text-xl font-extrabold text-slate-700 italic">
                {t.courses.card.priceOnRequest}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Users className="h-3.5 w-3.5" />
              {isFull
                ? '—'
                : interpolate(t.courses.card.seatsLeft, { n: remaining })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={href}
          target="_blank"
          rel="noopener"
          data-event="click_whatsapp_course"
          data-course-id={course.id}
          data-course-name={title}
          className={cn(
            'btn btn-md mt-5 w-full text-white transition-all',
            isFull
              ? 'bg-slate-700 hover:bg-slate-800'
              : isTech
                ? 'bg-tech hover:bg-green-800 shadow-glow-tech hover:-translate-y-0.5'
                : 'bg-ai hover:bg-orange-600 shadow-glow-ai hover:-translate-y-0.5',
          )}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
