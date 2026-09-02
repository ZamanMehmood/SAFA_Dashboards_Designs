import { Link } from 'react-router-dom';

function PromoBannerWide({ eyebrow, title, subtitle, ctaLabel = 'Shop now', href }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-surface-alt px-6 py-10 text-center sm:py-12">
      <span className="absolute left-[10%] top-1/2 -translate-y-1/2 text-2xl text-maroon" aria-hidden="true">
        ✦
      </span>
      <span className="absolute right-[10%] top-1/2 -translate-y-1/2 text-lg text-maroon" aria-hidden="true">
        ✦
      </span>

      {eyebrow && <span className="text-sm text-ink-secondary">{eyebrow}</span>}
      <h2 className="m-0 font-serif text-2xl font-bold text-maroon sm:text-[32px]">{title}</h2>
      {subtitle && <p className="m-0 text-sm text-ink-secondary">{subtitle}</p>}
      <Link to={href} className="mt-2 border-b border-ink pb-0.5 text-[13px] font-semibold text-ink">
        {ctaLabel}
      </Link>
    </div>
  );
}

export default PromoBannerWide;
