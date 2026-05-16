import './CenterCard.css';

export default function CenterCard({ icon, title, description, stat, statLabel }) {
  return (
    <div className="center-card">
      <div className="center-card__icon">{icon}</div>
      {stat && (
        <div className="center-card__stat">
          <span className="center-card__stat-num">{stat}</span>
          {statLabel && <span className="center-card__stat-label">{statLabel}</span>}
        </div>
      )}
      <h3 className="center-card__title">{title}</h3>
      {description && <p className="center-card__desc">{description}</p>}
    </div>
  );
}
