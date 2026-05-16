import { useState } from 'react';
import SectionTitle from './SectionTitle';
import MainMenuTap from './MainMenuTap';
import './Schedule.css';

const DAYS = [
  { id: 'day1', label: 'Day 1 – Nov 15', icon: '1⃣' },
  { id: 'day2', label: 'Day 2 – Nov 16', icon: '2⃣' },
  { id: 'day3', label: 'Day 3 – Nov 17', icon: '3⃣' },
  { id: 'day4', label: 'Day 4 – Nov 18', icon: '4⃣' },
];

const EVENTS = {
  day1: [
    { time:'09:00', end:'10:00', title:'Opening Ceremony',                   venue:'Main Stage',        type:'ceremony',    speaker:'H.E. Minister of Trade', desc:'Official inauguration with ribbon-cutting, keynote speech, and traditional Egyptian coffee ceremony.' },
    { time:'10:30', end:'11:30', title:'The Future of Specialty Coffee',      venue:'Conference Hall A', type:'talk',        speaker:'James Hoffmann',         desc:'World Barista Champion shares insights on where the global specialty coffee industry is heading.' },
    { time:'12:00', end:'14:00', title:'Barista Championship – Preliminary',  venue:'Arena B',           type:'competition', desc:'32 baristas compete in espresso, milk texturing, and creative drink categories.' },
    { time:'14:00', end:'15:30', title:'Sustainability in Coffee Chains',     venue:'Conference Hall B', type:'panel',       speaker:'Panel of 5 Experts',     desc:'How brands from Ethiopia to Egypt are building carbon-neutral, ethical supply chains.' },
    { time:'16:00', end:'17:30', title:'Café Design & Customer Experience',   venue:'Workshop Room 1',   type:'workshop',    speaker:'Design Studio Cairo',    desc:'Hands-on workshop: designing a café space that drives revenue and retention.' },
    { time:'18:00', end:'20:00', title:'Welcome Reception',                   venue:'Outdoor Terrace',   type:'social',      desc:'Network over specialty coffee cocktails and light canapés.' },
  ],
  day2: [
    { time:'10:00', end:'11:30', title:'Cold Brew Masterclass',               venue:'Workshop Room 2', type:'workshop',    speaker:'Taras Chernykh',       desc:'Step-by-step guide to crafting commercial cold brew and nitro coffee at scale.' },
    { time:'11:30', end:'12:30', title:'Egyptian Coffee Culture: Past & Future', venue:'Main Stage',   type:'talk',        speaker:'Dr. Ahmed Ramadan',    desc:"A deep dive into Egypt's rich coffeehouse (ahwa) tradition and its modern reinvention." },
    { time:'13:00', end:'16:00', title:'Barista Championship – Semifinals',   venue:'Arena B',         type:'competition', desc:'Top 16 competitors advance in this high-stakes round.' },
    { time:'15:00', end:'16:30', title:'Tea & Herbal Beverage Trends 2025',   venue:'Hall C',          type:'talk',        speaker:'Typhoo International', desc:'Market data, consumer trends, and product innovations in the tea & wellness space.' },
    { time:'17:00', end:'18:00', title:'Speed Networking Session',             venue:'Lobby',           type:'social',      desc:'Structured networking: meet 20 new contacts in 60 minutes.' },
  ],
  day3: [
    { time:'10:00', end:'12:00', title:'Roasting Technology Expo Live',       venue:'Hall D',            type:'expo',        desc:'Live roasting demonstrations from Probat, Giesen, and Diedrich.' },
    { time:'11:30', end:'13:00', title:'Coffee & Health: The Science',        venue:'Conference Hall A', type:'talk',        speaker:'Dr. Laila Hassan, MD', desc:"Evidence-based review of coffee's effects on cardiovascular health and cognition." },
    { time:'14:00', end:'17:00', title:'Latte Art World Cup Finals',          venue:'Arena B',           type:'competition', desc:'Eight finalists battle for the Cafex Latte Art Cup.' },
    { time:'16:00', end:'17:30', title:'Sustainable Packaging Innovation',    venue:'Conference Hall B', type:'panel',       desc:'Brands showcasing compostable and recyclable coffee packaging solutions.' },
  ],
  day4: [
    { time:'10:00', end:'11:00', title:'Closing Keynote: Coffee 2030',        venue:'Main Stage', type:'ceremony',    speaker:'CEO, Specialty Coffee Association', desc:"A vision for the coffee industry's next decade: climate resilience, equity, and innovation." },
    { time:'12:00', end:'15:00', title:'Barista Championship Grand Final',    venue:'Arena B',    type:'competition', desc:'The top 4 baristas compete for the Cafex Cairo Champion title.' },
    { time:'15:30', end:'16:30', title:'Awards & Closing Ceremony',           venue:'Main Stage', type:'ceremony',    desc:'Recognition for Best Stand, Innovation Award, and Barista Champion.' },
    { time:'16:30', end:'18:00', title:'Farewell Coffee Gathering',           venue:'Outdoor Terrace', type:'social', desc:'A warm send-off over the final cup.' },
  ],
};

const TYPE_META = {
  ceremony:    { color: '#D4AF37', label: 'Ceremony' },
  talk:        { color: '#C8A97E', label: 'Talk' },
  competition: { color: '#E05A44', label: 'Competition' },
  panel:       { color: '#7CBCB5', label: 'Panel' },
  workshop:    { color: '#9B8ED4', label: 'Workshop' },
  expo:        { color: '#78C27A', label: 'Expo' },
  social:      { color: '#D47878', label: 'Social' },
};

export default function Schedule() {
  const [day, setDay]           = useState('day1');
  const [expanded, setExpanded] = useState(null);

  return (
    <main className="schedule page-main">
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Event Programme</p>
          <h1 className="page-hero__title">Cafex <em>Schedule</em></h1>
          <p className="page-hero__sub">60+ events across 4 days — November 15–18, 2025</p>
        </div>
      </div>

      <section className="schedule__main section-pad">
        <div className="container">
          <div className="schedule__legend">
            {Object.entries(TYPE_META).map(([key, { color, label }]) => (
              <span key={key} className="schedule__legend-item">
                <span className="schedule__legend-dot" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>

          <div className="schedule__tabs">
            <MainMenuTap tabs={DAYS} active={day} onChange={(d) => { setDay(d); setExpanded(null); }} />
          </div>

          <div className="schedule__list">
            {EVENTS[day].map((ev, i) => {
              const { color } = TYPE_META[ev.type] || {};
              const isOpen = expanded === i;
              return (
                <div
                  key={i}
                  className={`schedule__item ${isOpen ? 'schedule__item--open' : ''}`}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setExpanded(isOpen ? null : i)}
                  role="button"
                  aria-expanded={isOpen}
                  aria-label={ev.title}
                >
                  <div className="schedule__item-main">
                    <div className="schedule__item-time">
                      <span>{ev.time}</span>
                      <span className="schedule__item-end">{ev.end}</span>
                    </div>
                    <div className="schedule__item-dot" style={{ background: color }} />
                    <div className="schedule__item-info">
                      <h3 className="schedule__item-title">{ev.title}</h3>
                      <div className="schedule__item-meta">
                        <span> {ev.venue}</span>
                        {ev.speaker && <span> {ev.speaker}</span>}
                      </div>
                    </div>
                    <div className="schedule__item-right">
                      <span className="schedule__item-type" style={{ color, borderColor: color }}>
                        {TYPE_META[ev.type]?.label}
                      </span>
                      <span className="schedule__item-chevron">{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="schedule__item-desc"><p>{ev.desc}</p></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
