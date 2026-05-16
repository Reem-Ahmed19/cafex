import './MainMenuTap.css';

export default function MainMenuTap({ tabs, active, onChange }) {
  return (
    <div className="main-menu-tap" role="tablist">
      {tabs.map(({ id, label, icon }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          className={`main-menu-tap__tab ${active === id ? 'main-menu-tap__tab--active' : ''}`}
          onClick={() => onChange(id)}
        >
          {icon && <span className="main-menu-tap__icon" aria-hidden="true">{icon}</span>}
          {label}
        </button>
      ))}
    </div>
  );
}
