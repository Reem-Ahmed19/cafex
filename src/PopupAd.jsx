import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PopupAd.css';

export default function PopupAd({ onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose} role="presentation">
      <div className="popup" ref={dialogRef} role="dialog" aria-modal="true"
           aria-labelledby="popup-title" tabIndex={-1}
           onClick={(e) => e.stopPropagation()}>

        <button className="popup__close" onClick={onClose} aria-label="Close popup"></button>

        <div className="popup__steam" aria-hidden="true">
          <div className="popup__steam-wisp popup__steam-wisp--1" />
          <div className="popup__steam-wisp popup__steam-wisp--2" />
          <div className="popup__steam-wisp popup__steam-wisp--3" />
        </div>

        <div className="popup__icon" aria-hidden="true"></div>

        <div className="popup__badge">
          <span className="popup__badge-dot" />
          Early Bird Registration Open
        </div>

        <h2 className="popup__title" id="popup-title">
          CAFEX Cairo <span>2025</span>
        </h2>

        <div className="popup__date">
          <div className="popup__date-block">
            <span className="popup__date-num">15</span>
            <span className="popup__date-sep">—</span>
            <span className="popup__date-num">18</span>
          </div>
          <div className="popup__date-info">
            <strong>November 2025</strong>
            <span>Cairo International Expo Center</span>
          </div>
        </div>

        <p className="popup__desc">
          Join <strong>200+ exhibitors</strong> from across the globe for the Middle East's
          largest coffee & specialty beverages exhibition.
          Register now and save <span className="popup__highlight">30%</span> with early-bird pricing!
        </p>

        <ul className="popup__features" aria-label="Event highlights">
          {[
            ' Specialty Coffee Tastings',
            ' Barista Championships',
            ' Expert Speaker Sessions',
            ' 40+ Countries Represented',
          ].map(f => <li key={f}>{f}</li>)}
        </ul>

        <div className="popup__ctas">
          <Link to="/booking" className="popup__cta-primary" onClick={onClose}>
            Register Now — Save 30%
          </Link>
          <button className="popup__cta-secondary" onClick={onClose}>
            Remind me later
          </button>
        </div>

        <p className="popup__expiry"> Early bird offer ends October 1, 2025</p>
      </div>
    </div>
  );
}
