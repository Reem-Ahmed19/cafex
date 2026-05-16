import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',       labelAr: 'الرئيسية',  path: '/' },
  { label: 'About',      labelAr: 'عن المعرض',  path: '/about' },
  { label: 'Exhibitors', labelAr: 'العارضون',   path: '/exhibitors' },
  { label: 'Schedule',   labelAr: 'الجدول',     path: '/schedule' },
  { label: 'Gallery',    labelAr: 'معرض الصور', path: '/gallery' },
  { label: 'Contact',    labelAr: 'تواصل معنا', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang]         = useState('en');
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="Cafex Home">
          <span className="navbar__logo-icon"></span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">CAFEX</span>
            <span className="navbar__logo-sub">CAIRO {new Date().getFullYear()}</span>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, labelAr, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {lang === 'ar' ? labelAr : label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__lang"
            onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <Link to="/booking" className="navbar__cta">
            {lang === 'ar' ? 'سجّل الآن' : 'Register Now'}
          </Link>
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}
           role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <nav>
          {NAV_LINKS.map(({ label, labelAr, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
              }
            >
              {lang === 'ar' ? labelAr : label}
            </NavLink>
          ))}
        </nav>
        <Link to="/booking" className="navbar__cta navbar__cta--mobile">
          {lang === 'ar' ? 'سجّل الآن' : 'Register Now'}
        </Link>
      </div>

      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
