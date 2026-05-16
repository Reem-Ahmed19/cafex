import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children, variant = 'primary', size = 'md',
  href, to, icon, iconLeft, loading = false,
  disabled = false, className = '', onClick,
  type = 'button', ariaLabel, ...rest
}) {
  const cls = [
    'cafex-btn', `cafex-btn--${variant}`, `cafex-btn--${size}`,
    loading ? 'cafex-btn--loading' : '',
    disabled ? 'cafex-btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className="cafex-btn__spinner" aria-hidden="true" />}
      {iconLeft && !loading && <span className="cafex-btn__icon cafex-btn__icon--left">{iconLeft}</span>}
      <span className="cafex-btn__label">{children}</span>
      {icon && <span className="cafex-btn__icon cafex-btn__icon--right">{icon}</span>}
    </>
  );

  if (href) return <a href={href} className={cls} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" {...rest}>{content}</a>;
  if (to)   return <Link to={to} className={cls} aria-label={ariaLabel} {...rest}>{content}</Link>;
  return (
    <button type={type} className={cls} onClick={onClick}
      disabled={disabled || loading} aria-label={ariaLabel} aria-busy={loading} {...rest}>
      {content}
    </button>
  );
}
