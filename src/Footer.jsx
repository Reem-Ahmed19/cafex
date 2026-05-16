import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'About Cafex', path: '/about' },
  { label: 'Exhibitors',  path: '/exhibitors' },
  { label: 'Schedule',    path: '/schedule' },
  { label: 'Gallery',     path: '/gallery' },
  { label: 'Register',    path: '/booking' },
  { label: 'Contact',     path: '/contact' },
];

const VISIT_INFO = [
  'Cairo International Expo Center',
  'November 15–18, 2025',
  '10:00 AM – 7:00 PM Daily',
  'Hall A, B, C & Outdoor Pavilion',
];

const SOCIAL = [
  { icon: '',  label: 'Twitter / X', href: 'https://x.com' },
  { icon: 'in', label: 'LinkedIn',     href: 'https://linkedin.com' },
  { icon: 'f',  label: 'Facebook',     href: 'https://facebook.com' },
  { icon: '',  label: 'YouTube',      href: 'https://youtube.com' },
  { icon: '', label: 'Instagram',    href: 'https://instagram.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) alert(`Thank you! ${email} has been subscribed.`);
    e.target.reset();
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
                fill="var(--dark-roast)" opacity=".5"/>
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">

            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon"></span>
                <div>
                  <div className="footer__logo-name">CAFEX</div>
                  <div className="footer__logo-sub">Cairo · Egypt</div>
                </div>
              </div>
              <p className="footer__desc">
                The Middle East's premier platform for the coffee, tea, and specialty
                beverage industry. Connecting professionals, brands, and enthusiasts
                since 2012.
              </p>
              <div className="footer__social" role="list">
                {SOCIAL.map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     className="footer__social-btn" role="listitem" aria-label={label}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <nav className="footer__col" aria-label="Quick links">
              <h3 className="footer__col-title">Quick Links</h3>
              <ul className="footer__links">
                {QUICK_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="footer__link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer__col">
              <h3 className="footer__col-title">Visit Info</h3>
              <ul className="footer__links">
                {VISIT_INFO.map(label => (
                  <li key={label} className="footer__info-item">
                    <span className="footer__info-dot">◆</span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="footer__contact">
                <a href="mailto:info@cafex-cairo.com" className="footer__contact-item">
                   info@cafex-cairo.com
                </a>
                <a href="tel:+20225551234" className="footer__contact-item">
                   +20 2 2555 1234
                </a>
              </div>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-title">Stay Updated</h3>
              <p className="footer__newsletter-desc">
                Get exclusive exhibitor news, speaker announcements, and early-bird offers.
              </p>
              <form className="footer__newsletter" onSubmit={handleNewsletter} noValidate>
                <label htmlFor="footer-email" className="visually-hidden">Email address</label>
                <input id="footer-email" name="email" type="email"
                  placeholder="your@email.com" className="footer__input"
                  required aria-required="true" />
                <button type="submit" className="footer__subscribe-btn">Subscribe</button>
              </form>
              <p className="footer__privacy">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p> {year} Cafex Cairo. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
          <p className="footer__made-by">Made with  in Cairo</p>
        </div>
      </div>

      <a href="#top" className="footer__top-btn" aria-label="Back to top">↑</a>
    </footer>
  );
}
