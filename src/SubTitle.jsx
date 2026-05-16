import './SubTitle.css';

export default function SubTitle({ children, size = 'md', muted = false, className = '' }) {
  return (
    <p className={['subtitle', `subtitle--${size}`, muted ? 'subtitle--muted' : '', className].filter(Boolean).join(' ')}>
      {children}
    </p>
  );
}
