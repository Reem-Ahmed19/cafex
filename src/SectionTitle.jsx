import './SectionTitle.css';

export default function SectionTitle({
  eyebrow, title, subtitle,
  align = 'center', light = false, className = '',
}) {
  return (
    <div className={[
      'section-title',
      `section-title--${align}`,
      light ? 'section-title--light' : '',
      className,
    ].filter(Boolean).join(' ')}>

      {eyebrow && (
        <p className="section-title__eyebrow">
          <span className="section-title__dash" aria-hidden="true" />
          {eyebrow}
          <span className="section-title__dash" aria-hidden="true" />
        </p>
      )}

      <h2 className="section-title__heading">{title}</h2>

      {subtitle && (
        <p className="section-title__subtitle">{subtitle}</p>
      )}

      <div className="section-title__ornament" aria-hidden="true">
        <span />
        <span className="section-title__diamond">◆</span>
        <span />
      </div>
    </div>
  );
}
