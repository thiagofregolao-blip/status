import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'dark' }: { className?: string; variant?: 'dark' | 'light' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const dotFrom = variant === 'light' ? 'from-ai' : 'from-ai';
  const dotTo = variant === 'light' ? 'to-tech' : 'to-tech';

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center">
        <div className={cn('absolute inset-0 rounded-xl bg-gradient-to-br blur-md opacity-60', dotFrom, dotTo)} />
        <div className={cn('relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br shadow-lifted', dotFrom, dotTo)}>
          <span className="font-display text-lg font-black text-white">S</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-extrabold tracking-tight', textColor)}>
          Status
        </span>
        <span className={cn('text-[10px] font-semibold uppercase tracking-[0.18em]', variant === 'light' ? 'text-white/60' : 'text-slate-500')}>
          Capacitação
        </span>
      </div>
    </div>
  );
}
