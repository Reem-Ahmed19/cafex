import './Card.css';

export default function Card({ logo, name, category, country, booth, featured = false, description, onClick }) {
  return (
    <article
      className={`card ${featured ? 'card--featured' : ''}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : 'article'}
      aria-label={`${name} exhibitor card`}
    >
      {featured && <div className="card__badge" aria-label="Featured exhibitor">Featured</div>}

      <div className="card__logo-wrap">
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="card__logo" loading="lazy" />
        ) : (
          <div className="card__logo-placeholder">{name?.charAt(0) ?? ''}</div>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__name">{name}</h3>
        <span className="card__category">{category}</span>
        {description && <p className="card__desc">{description}</p>}
      </div>

      <div className="card__meta">
        {country && <span className="card__meta-item"><span aria-hidden="true"></span> {country}</span>}
        {booth   && <span className="card__meta-item card__booth">Booth {booth}</span>}
      </div>

      <div className="card__glow" aria-hidden="true" />
    </article>
  );
}
