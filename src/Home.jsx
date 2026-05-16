import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Header      from './Header';
import SectionTitle from './SectionTitle';
import Card         from './Card';
import CenterCard   from './CenterCard';
import NewsCard     from './NewsCard';
import MainMenuTap  from './MainMenuTap';

const FEATURES = [
  { icon: '', title: 'Specialty Coffee Tasting',  description: 'Sample single-origin beans from over 40 countries, curated by world-class roasters and Q-graders.' },
  { icon: '', title: 'Barista Championship',       description: 'Watch elite baristas compete in latte art, espresso, and brewing categories judged by WCE-certified judges.' },
  { icon: '', title: 'Expert Seminars',            description: 'Attend 60+ talks and workshops covering industry trends, sustainability, supply chain, and business growth.' },
  { icon: '', title: 'B2B Networking',             description: 'Meet importers, exporters, café owners, and roasters from Egypt, Africa, and the Arab world.' },
  { icon: '', title: 'Sustainability Pavilion',    description: 'Explore green packaging, ethical sourcing, and carbon-neutral roasting innovations from leading brands.' },
  { icon: '', title: 'Tea & Beverage Hall',        description: 'Discover specialty teas, herbal blends, bubble tea, cold brew, and the latest beverage trends.' },
];

const EXHIBITORS = [
  { name: 'Lavazza Egypt',       category: 'Premium Coffee',    country: 'Italy',   booth: 'A-12', featured: true },
  { name: 'Nescafé Middle East', category: 'Instant Coffee',    country: 'Egypt',   booth: 'B-04' },
  { name: 'Breville Pro',        category: 'Coffee Equipment',  country: 'UAE',     booth: 'C-22' },
  { name: 'Ethiopian Origins',   category: 'Single Origin',     country: 'Ethiopia',booth: 'A-31' },
  { name: "De'Longhi MENA",      category: 'Espresso Machines', country: 'Egypt',   booth: 'D-07', featured: true },
  { name: 'Caffe Vergnano',      category: 'Specialty Roaster', country: 'Italy',   booth: 'B-19' },
];

const SCHEDULE_TABS = [
  { id: 'day1', label: 'Day 1 – Nov 15', icon: '1⃣' },
  { id: 'day2', label: 'Day 2 – Nov 16', icon: '2⃣' },
  { id: 'day3', label: 'Day 3 – Nov 17', icon: '3⃣' },
  { id: 'day4', label: 'Day 4 – Nov 18', icon: '4⃣' },
];

const SCHEDULE = {
  day1: [
    { time: '09:00', title: 'Opening Ceremony',           venue: 'Main Stage',        type: 'ceremony' },
    { time: '10:30', title: 'Specialty Coffee Keynote',   venue: 'Conference Hall A', type: 'talk' },
    { time: '12:00', title: 'Barista Championship – Prelims', venue: 'Arena B',       type: 'competition' },
    { time: '14:00', title: 'Sustainability Panel',        venue: 'Conference Hall B', type: 'panel' },
    { time: '16:00', title: 'Café Design Workshop',        venue: 'Workshop Room 1',   type: 'workshop' },
    { time: '18:00', title: 'Welcome Reception',           venue: 'Outdoor Terrace',   type: 'social' },
  ],
  day2: [
    { time: '10:00', title: 'Cold Brew Masterclass',       venue: 'Workshop Room 2',   type: 'workshop' },
    { time: '11:30', title: 'Egyptian Coffee Culture Talk',venue: 'Main Stage',         type: 'talk' },
    { time: '13:00', title: 'Barista Championship – Semis',venue: 'Arena B',            type: 'competition' },
    { time: '15:00', title: 'Tea & Herbal Beverage Trends',venue: 'Hall C',             type: 'talk' },
    { time: '17:00', title: 'Networking Hour',             venue: 'Lobby',              type: 'social' },
  ],
  day3: [
    { time: '10:00', title: 'Roasting Technology Expo',    venue: 'Hall D',             type: 'expo' },
    { time: '11:30', title: 'Coffee & Health Symposium',   venue: 'Conference Hall A',  type: 'talk' },
    { time: '14:00', title: 'Latte Art Finals',            venue: 'Arena B',            type: 'competition' },
    { time: '16:00', title: 'Packaging Innovation Panel',  venue: 'Conference Hall B',  type: 'panel' },
  ],
  day4: [
    { time: '10:00', title: 'Closing Keynote',             venue: 'Main Stage',         type: 'ceremony' },
    { time: '12:00', title: 'Barista Championship Finals', venue: 'Arena B',            type: 'competition' },
    { time: '14:00', title: 'Awards & Closing Ceremony',   venue: 'Main Stage',         type: 'ceremony' },
    { time: '16:00', title: 'Farewell Coffee Gathering',   venue: 'Outdoor Terrace',    type: 'social' },
  ],
};

const NEWS = [
  { category: 'Announcement', date: 'September 12, 2025', title: 'Lavazza Confirms Flagship Pavilion at Cafex Cairo 2025', excerpt: 'Italian coffee giant Lavazza will debut its 2025 product range at a 300m² signature pavilion at the heart of Cafex.', author: 'Cafex Team', readTime: 3, slug: 'lavazza-pavilion-2025' },
  { category: 'Industry',     date: 'September 8, 2025',  title: "Egypt's Specialty Coffee Scene: A Market Ready to Boom",  excerpt: 'With over 200 new specialty cafés opening in Cairo this year alone, Egypt is emerging as the most dynamic coffee market in Africa.', author: 'Sara Khalil', readTime: 5, slug: 'egypt-specialty-coffee-market' },
  { category: 'Event',        date: 'September 1, 2025',  title: 'World Barista Champion to Judge Cafex Cairo Championship', excerpt: 'WBC champion James Hoffmann will join the judging panel, bringing international prestige to the competition.', author: 'Cafex Team', readTime: 2, slug: 'wbc-champion-judge' },
];

const STATS = [
  { icon: '', stat: '200+', statLabel: 'Exhibitors', title: 'Global Brands',          description: 'From 40 countries across Europe, Africa, Asia, and the Americas.' },
  { icon: '', stat: '12K+', statLabel: 'Visitors',   title: 'Trade & Public',          description: 'Professionals, café owners, enthusiasts, and media.' },
  { icon: '', stat: '60+',  statLabel: 'Events',     title: 'Sessions & Competitions', description: 'Talks, masterclasses, championships, and networking.' },
  { icon: '', stat: '40+',  statLabel: 'Countries',  title: 'International Reach',     description: 'The most international coffee event in the Arab world.' },
];

const TYPE_COLORS = {
  ceremony:'#D4AF37', talk:'#C8A97E', competition:'#E05A44',
  panel:'#7CBCB5', workshop:'#9B8ED4', expo:'#78C27A', social:'#D47878',
};

export default function Home() {
  const [activeDay, setActiveDay] = useState('day1');

  return (
    <div className="home">
      {/* 1. Hero */}
      <Header />

      {/* 2. Features */}
      <section className="home__features section-pad" id="features" aria-labelledby="features-title">
        <div className="container">
          <SectionTitle
            id="features-title"
            eyebrow="What Awaits You"
            title={<>Experience the World<br/>of <em>Coffee & Craft</em></>}
            subtitle="Six immersive zones designed for discovery, learning, and meaningful connections."
          />
          <div className="home__features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <CenterCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Banner */}
      <section className="home__stats-banner" aria-label="Exhibition statistics">
        <div className="container">
          <div className="home__stats-grid">
            {STATS.map((s, i) => (
              <div key={s.title} className={`home__stat-item reveal reveal-delay-${i + 1}`}>
                <span className="home__stat-icon" aria-hidden="true">{s.icon}</span>
                <span className="home__stat-num">{s.stat}</span>
                <span className="home__stat-label">{s.statLabel}</span>
                <span className="home__stat-title">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About */}
      <section className="home__about section-pad" id="about" aria-labelledby="about-title">
        <div className="container home__about-inner">
          <div className="home__about-visual reveal">
            <div className="home__about-circle home__about-circle--1" />
            <div className="home__about-circle home__about-circle--2" />
            <div className="home__about-cup" aria-hidden="true"></div>
            <div className="home__about-text-art" aria-hidden="true">CAFEX<br/>CAIRO<br/>2025</div>
          </div>
          <div className="home__about-content">
            <SectionTitle eyebrow="About Cafex" title={<>Egypt's Premier<br/><em>Coffee Exhibition</em></>} align="left" subtitle="" />
            <p className="home__about-p reveal reveal-delay-1">
              Cafex Cairo is Egypt's leading international trade exhibition dedicated to coffee, tea, and specialty beverages. Held annually at the Cairo International Expo Center, the event connects global producers, roasters, equipment manufacturers, and café entrepreneurs.
            </p>
            <p className="home__about-p reveal reveal-delay-2">
              Founded in 2012, Cafex has grown into the Middle East's most prestigious coffee industry platform, attracting delegations from over <strong>40 countries</strong> and generating billions in bilateral trade agreements.
            </p>
            <div className="home__about-points reveal reveal-delay-3">
              {[
                'Official partner of the Specialty Coffee Association (SCA)',
                "Endorsed by Egypt's Ministry of Trade & Industry",
                'Featuring WCE-sanctioned barista competitions',
                'Supporting Egyptian coffee entrepreneurs since 2012',
              ].map(p => (
                <div key={p} className="home__about-point">
                  <span className="home__about-point-dot" aria-hidden="true">◆</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn btn--outline btn--lg home__about-cta reveal reveal-delay-4">
              Learn More About Cafex
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Exhibitors Preview */}
      <section className="home__exhibitors section-pad" id="exhibitors" aria-labelledby="exhibitors-title">
        <div className="container">
          <SectionTitle
            id="exhibitors-title"
            eyebrow="Featured Exhibitors"
            title={<>World-Class Brands,<br/><em>One Destination</em></>}
            subtitle="Discover 200+ exhibitors from premium coffee roasters to cutting-edge equipment makers."
          />
          <div className="home__exhibitors-grid">
            {EXHIBITORS.map((ex, i) => (
              <div key={ex.name} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                <Card {...ex} />
              </div>
            ))}
          </div>
          <div className="home__exhibitors-cta reveal">
            <Link to="/exhibitors" className="btn btn--primary btn--lg">
              View All 200+ Exhibitors
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Schedule */}
      <section className="home__schedule section-pad" id="schedule" aria-labelledby="schedule-title">
        <div className="container">
          <SectionTitle
            id="schedule-title"
            eyebrow="Event Programme"
            title={<>4 Days of<br/><em>Coffee Excellence</em></>}
            subtitle="Over 60 events, masterclasses, and competitions across 4 action-packed days."
          />
          <div className="home__schedule-tabs reveal">
            <MainMenuTap tabs={SCHEDULE_TABS} active={activeDay} onChange={setActiveDay} />
          </div>
          <div className="home__schedule-list" role="list" aria-label={`Schedule for ${activeDay}`}>
            {SCHEDULE[activeDay].map((item, i) => (
              <div key={`${activeDay}-${i}`} className={`home__schedule-item reveal reveal-delay-${Math.min(i + 1, 5)}`} role="listitem">
                <div className="home__schedule-time">{item.time}</div>
                <div className="home__schedule-dot" style={{ background: TYPE_COLORS[item.type] || 'var(--caramel)' }} aria-hidden="true" />
                <div className="home__schedule-content">
                  <h4 className="home__schedule-title">{item.title}</h4>
                  <span className="home__schedule-venue"> {item.venue}</span>
                </div>
                <span className="home__schedule-type"
                  style={{ color: TYPE_COLORS[item.type] || 'var(--caramel)', borderColor: TYPE_COLORS[item.type] || 'var(--caramel)' }}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
          <div className="home__schedule-cta reveal">
            <Link to="/schedule" className="btn btn--ghost btn--md">Full Programme →</Link>
          </div>
        </div>
      </section>

      {/* 7. Gallery Teaser */}
      <section className="home__gallery section-pad" id="gallery" aria-labelledby="gallery-title">
        <div className="container">
          <SectionTitle eyebrow="Gallery" id="gallery-title" title={<>Moments from<br/><em>Cafex 2024</em></>} />
          <div className="home__gallery-grid">
            {[
              { emoji: '', label: 'Specialty coffee showcase' },
              { emoji: '', label: 'Barista championship finals' },
              { emoji: '', label: 'Keynote speaker session' },
              { emoji: '', label: 'B2B networking event' },
              { emoji: '', label: 'Sustainability pavilion' },
              { emoji: '', label: 'Tea & beverages hall' },
            ].map(({ emoji, label }, i) => (
              <div key={label} className={`home__gallery-item reveal reveal-delay-${(i % 3) + 1}`} role="img" aria-label={label}>
                <span className="home__gallery-emoji" aria-hidden="true">{emoji}</span>
                <span className="home__gallery-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="home__gallery-cta reveal">
            <Link to="/gallery" className="btn btn--outline btn--md">Browse Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* 8. News */}
      <section className="home__news section-pad" id="news" aria-labelledby="news-title">
        <div className="container">
          <SectionTitle id="news-title" eyebrow="Latest News" title={<>Stay in the<br/><em>Loop</em></>} subtitle="Industry insights, exhibitor spotlights, and event announcements." />
          <div className="home__news-grid">
            {NEWS.map((n, i) => (
              <div key={n.slug} className={`reveal reveal-delay-${i + 1}`}>
                <NewsCard {...n} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Partners */}
      <section className="home__partners section-pad" aria-label="Our sponsors and partners">
        <div className="container">
          <p className="home__partners-label">Trusted by world-leading coffee brands</p>
          <div className="home__partners-strip">
            {["Lavazza","Nescafé","De'Longhi","Breville","Illy","Kenco","Jacobs","Starbucks Reserve","Peet's Coffee","Segafredo"].map(p => (
              <div key={p} className="home__partner-logo"><span>{p}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="home__cta" id="register" aria-labelledby="cta-title">
        <div className="home__cta-bg" aria-hidden="true" />
        <div className="container home__cta-inner">
          <div className="home__cta-steams" aria-hidden="true">
            {[1,2,3,4].map(i => <div key={i} className={`home__cta-steam home__cta-steam--${i}`} />)}
          </div>
          <span className="home__cta-icon" aria-hidden="true"></span>
          <h2 className="home__cta-title" id="cta-title">
            Your Invitation to the<br/><em>World of Coffee</em>
          </h2>
          <p className="home__cta-desc">
            Join 12,000+ coffee professionals at Cafex Cairo 2025. Early bird tickets available — save up to 30%.
          </p>
          <div className="home__cta-actions">
            <Link to="/booking" className="btn btn--primary btn--lg">Register Now</Link>
            <Link to="/exhibitors" className="btn btn--ghost btn--lg">Exhibitor Enquiry</Link>
          </div>
          <div className="home__cta-meta">
            <span> November 15–18, 2025</span>
            <span> Cairo International Expo Center</span>
            <span> From EGP 150 / Day</span>
          </div>
        </div>
      </section>
    </div>
  );
}
