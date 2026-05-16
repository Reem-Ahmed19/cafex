import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const EVENT_DATE = new Date('2025-11-15T10:00:00');

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days:0, hours:0, minutes:0, seconds:0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Header() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  useEffect(() => {
    const hero = document.querySelector('.header__bg');
    const onScroll = () => {
      if (hero) hero.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="header" aria-label="Hero section">
      <div className="header__bg" />

      <div className="header__beans" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="header__bean" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${10 + Math.random() * 14}px`,
            opacity: 0.12 + Math.random() * 0.18,
          }}>
            {['','','','◆'][Math.floor(Math.random()*4)]}
          </div>
        ))}
      </div>

      <div className="header__steams" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`header__steam header__steam--${i+1}`} />
        ))}
      </div>

      <div className="header__content container">
        <div className="header__badge reveal">
          <span className="header__badge-dot" />
          Cairo International Expo Center · Egypt
        </div>

        <h1 className="header__title reveal reveal-delay-1">
          Where Coffee
          <br />
          <em>Meets Culture</em>
        </h1>

        <p className="header__tagline reveal reveal-delay-2">
          The Middle East's premier coffee & beverages exhibition.
          <br />
          <span className="text-caramel">November 15–18, 2025</span> — Cairo, Egypt
        </p>

        <div className="header__countdown reveal reveal-delay-3" role="timer" aria-label="Time until event">
          {[
            { val: days,    label: 'Days' },
            { val: hours,   label: 'Hours' },
            { val: minutes, label: 'Minutes' },
            { val: seconds, label: 'Seconds' },
          ].map(({ val, label }, i) => (
            <div key={label} className="header__count-block">
              <span className="header__count-num">
                {String(val).padStart(2, '0')}
              </span>
              <span className="header__count-label">{label}</span>
              {i < 3 && <span className="header__count-sep" aria-hidden="true">:</span>}
            </div>
          ))}
        </div>

        <div className="header__ctas reveal reveal-delay-4">
          <Link to="/booking" className="btn btn--primary btn--lg">
            Register Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/exhibitors" className="btn btn--ghost btn--lg">
            Explore Exhibitors
          </Link>
        </div>

        <div className="header__stats reveal reveal-delay-5">
          {[
            { num: '200+', desc: 'Exhibitors' },
            { num: '40+',  desc: 'Countries' },
            { num: '12K+', desc: 'Visitors' },
            { num: '4',    desc: 'Days' },
          ].map(({ num, desc }) => (
            <div key={desc} className="header__stat">
              <span className="header__stat-num">{num}</span>
              <span className="header__stat-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="header__scroll" aria-hidden="true">
        <div className="header__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
