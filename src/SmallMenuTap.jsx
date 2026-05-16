import './SmallMenuTap.css';

/**
 * Accepts either:
 *  - items: array of { id, label } objects  (used in Exhibitors)
 *  - tabs:  array of strings                (used in Gallery)
 */
export default function SmallMenuTap({ items, tabs, active, onChange }) {
  // Normalise: support both string arrays (tabs) and object arrays (items)
  const options = items
    ? items
    : (tabs || []).map(t => ({ id: t, label: t }));

  return (
    <div className="small-menu-tap" role="tablist">
      {options.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          className={`small-menu-tap__item ${active === id ? 'small-menu-tap__item--active' : ''}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
