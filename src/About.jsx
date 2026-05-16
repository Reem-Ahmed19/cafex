import SectionTitle from './SectionTitle';
import './About.css';

export default function About() {
  const milestones = [
    { year: '2012', event: 'Cafex Cairo founded with 40 exhibitors and 800 visitors.' },
    { year: '2015', event: 'Expanded to Hall B & C. 5,000 visitors from 18 countries.' },
    { year: '2018', event: 'Introduced WCE-sanctioned Barista Championship.' },
    { year: '2021', event: 'Hybrid edition — first virtual coffee exhibition in Africa.' },
    { year: '2023', event: '150+ exhibitors, 10,000+ visitors, 35 countries.' },
    { year: '2025', event: 'Record 200+ exhibitors across 4 halls + outdoor pavilion.' },
  ];
  const team = [
    { name: 'Ahmed Mostafa',  role: 'Exhibition Director',    emoji: '' },
    { name: 'Sara El-Shafei', role: 'Partnerships Manager',   emoji: '' },
    { name: 'Omar Fathy',     role: 'Marketing Director',     emoji: '' },
    { name: 'Hana Ibrahim',   role: 'Operations & Logistics', emoji: '' },
  ];

  return (
    <main className="about page-main">
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Our Story</p>
          <h1 className="page-hero__title">About <em>Cafex Cairo</em></h1>
          <p className="page-hero__sub">Connecting the world of coffee since 2012</p>
        </div>
      </div>

      <section className="about__mission section-pad">
        <div className="container about__mission-inner">
          <div className="about__mission-text">
            <SectionTitle eyebrow="Our Mission" title={<>Elevating Egypt's<br/><em>Coffee Culture</em></>} align="left" />
            <p>Cafex Cairo was founded on a single belief: that great coffee connects people, cultures, and opportunities. We created Egypt's premier coffee exhibition to give the industry a stage worthy of its ambition.</p>
            <p style={{ marginTop: 16 }}>Today, Cafex is the Middle East's most prestigious coffee trade platform, officially recognized by the Specialty Coffee Association (SCA) and endorsed by Egypt's Ministry of Trade & Industry.</p>
          </div>
          <div className="about__mission-visual">
            <span className="about__mission-icon"></span>
          </div>
        </div>
      </section>

      <section className="about__timeline section-pad" style={{ background: 'var(--dark-roast)' }}>
        <div className="container">
          <SectionTitle eyebrow="Our Journey" title={<>13 Years of<br/><em>Excellence</em></>} />
          <div className="about__timeline-list">
            {milestones.map(({ year, event }) => (
              <div key={year} className="about__milestone reveal">
                <div className="about__milestone-year">{year}</div>
                <div className="about__milestone-dot" />
                <div className="about__milestone-event">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__team section-pad">
        <div className="container">
          <SectionTitle eyebrow="Our Team" title={<>The People Behind<br/><em>Cafex</em></>} />
          <div className="about__team-grid">
            {team.map(({ name, role, emoji }) => (
              <div key={name} className="about__team-card reveal">
                <div className="about__team-avatar">{emoji}</div>
                <h3 className="about__team-name">{name}</h3>
                <p className="about__team-role">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
