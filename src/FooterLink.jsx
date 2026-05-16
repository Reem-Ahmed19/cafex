import { Link } from 'react-router-dom';
import './FooterLink.css';

export default function FooterLink({ to, href, children, external = false }) {
  if (href || external) {
    return (
      <a href={href || to} className="footer-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link to={to} className="footer-link">{children}</Link>;
}
