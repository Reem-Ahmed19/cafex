import { useState, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import SmallMenuTap from './SmallMenuTap';
import './Gallery.css';

const CATEGORIES = ['All', 'Exhibition Floor', 'Brewing Demos', 'Tastings', 'Keynotes', 'Behind The Scenes', 'Awards'];

const GALLERY_ITEMS = [
  { id: 1,  cat: 'Exhibition Floor',  aspect: 'wide',   year: 2024, title: 'Grand Hall Opening',        desc: 'The iconic espresso-bar installation at the entrance of Cafex 2024.' },
  { id: 2,  cat: 'Brewing Demos',     aspect: 'tall',   year: 2024, title: 'Pour-Over Championship',    desc: 'World-class baristas compete in the precision pour-over arena.' },
  { id: 3,  cat: 'Tastings',          aspect: 'square', year: 2024, title: 'Origins Cupping Bar',       desc: 'Single-origin flights from Ethiopia, Yemen & Colombia.' },
  { id: 4,  cat: 'Keynotes',          aspect: 'wide',   year: 2024, title: 'Future of Coffee Panel',    desc: 'Industry leaders discuss sustainability and specialty trends.' },
  { id: 5,  cat: 'Exhibition Floor',  aspect: 'square', year: 2024, title: 'La Marzocco Espresso Wall', desc: '48 espresso machines running simultaneously.' },
  { id: 6,  cat: 'Awards',            aspect: 'tall',   year: 2024, title: 'Golden Bean Ceremony',      desc: 'Celebrating the best roasters and producers of the year.' },
  { id: 7,  cat: 'Behind The Scenes', aspect: 'square', year: 2023, title: 'Setup Day One',             desc: 'The magic before the doors open — booth builds in progress.' },
  { id: 8,  cat: 'Brewing Demos',     aspect: 'square', year: 2023, title: 'AeroPress Battle',          desc: '64 competitors, one champion, zero crema.' },
  { id: 9,  cat: 'Tastings',          aspect: 'wide',   year: 2023, title: 'Cold Brew Lounge',          desc: 'An immersive nitrogen cold-brew tasting experience.' },
  { id: 10, cat: 'Exhibition Floor',  aspect: 'tall',   year: 2023, title: 'Specialty Roasters Alley',  desc: 'Over 80 specialty roasters showcasing micro-lots.' },
  { id: 11, cat: 'Keynotes',          aspect: 'square', year: 2023, title: 'Climate & Coffee Summit',   desc: 'How climate change is reshaping the coffee belt.' },
  { id: 12, cat: 'Awards',            aspect: 'wide',   year: 2023, title: 'Barista of the Year',       desc: "Egypt's top barista crowned for the third consecutive year." },
];

const GRADIENTS = [
  'linear-gradient(135deg,#2e1a0d 0%,#4a2510 50%,#1e0e07 100%)',
  'linear-gradient(135deg,#1a0a04 0%,#3d2208 60%,#100a06 100%)',
  'linear-gradient(135deg,#2a1508 0%,#5c3317 50%,#1a0a04 100%)',
  'linear-gradient(160deg,#0d0602 0%,#3a1e0c 55%,#1e0e07 100%)',
  'linear-gradient(110deg,#200e06 0%,#4f2c12 60%,#100a06 100%)',
  'linear-gradient(145deg,#160a04 0%,#3b1f0a 50%,#0d0602 100%)',
];

function Lightbox({ item, onClose, onPrev, onNext }) {
  if (!item) return null;
  return (
    <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button className="lightbox__close" aria-label="Close" onClick={onClose}></button>
      <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous" onClick={e => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div className="lightbox__card" onClick={e => e.stopPropagation()}>
        <div className="lightbox__img" style={{ background: GRADIENTS[item.id % GRADIENTS.length] }}>
          <div className="lightbox__img-overlay"><span className="lightbox__cat">{item.cat}</span></div>
          <div className="lightbox__icon"></div>
        </div>
        <div className="lightbox__info">
          <h3 className="lightbox__title">{item.title}</h3>
          <p className="lightbox__desc">{item.desc}</p>
          <div className="lightbox__meta">
            <span> Cafex {item.year}</span>
            <span> Cairo Expo Center</span>
          </div>
        </div>
      </div>
      <button className="lightbox__nav lightbox__nav--next" aria-label="Next" onClick={e => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeTab === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === activeTab);

  const openLightbox = useCallback(idx => {
    setLightboxIdx(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  }, []);

  const prevItem = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);
  const nextItem = () => setLightboxIdx(i => (i + 1) % filtered.length);

  return (
    <main className="gallery-page">
      <section className="gallery-hero reveal">
        <div className="gallery-hero__bg">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="gallery-hero__particle" style={{ '--i': i }} aria-hidden="true"></span>
          ))}
        </div>
        <div className="gallery-hero__content">
          <span className="gallery-hero__badge"> Visual Archive</span>
          <h1>Moments That <em>Define</em> Coffee Culture</h1>
          <p className="gallery-hero__sub">
            Relive three years of extraordinary coffee craftsmanship, innovation, and community across Cafex Cairo's exhibition halls.
          </p>
        </div>
      </section>

      <section className="gallery-filter-bar">
        <div className="gallery-filter-bar__inner">
          <SmallMenuTap tabs={CATEGORIES} active={activeTab} onChange={setActiveTab} />
          <span className="gallery-count">{filtered.length} photos</span>
        </div>
      </section>

      <section className="gallery-grid-section">
        <div className="gallery-masonry">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              className={`gallery-tile gallery-tile--${item.aspect} reveal`}
              style={{ '--delay': `${(idx % 6) * 60}ms` }}
              onClick={() => openLightbox(idx)}
              aria-label={`Open ${item.title}`}
            >
              <div className="gallery-tile__img" style={{ background: GRADIENTS[item.id % GRADIENTS.length] }}>
                <span className="gallery-tile__icon" aria-hidden="true"></span>
              </div>
              <div className="gallery-tile__overlay">
                <span className="gallery-tile__cat">{item.cat}</span>
                <h3 className="gallery-tile__title">{item.title}</h3>
                <span className="gallery-tile__year">{item.year}</span>
              </div>
              <div className="gallery-tile__zoom" aria-hidden="true">⊕</div>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-reel reveal">
        <div className="gallery-reel__inner">
          <div className="gallery-reel__play" aria-label="Watch highlight reel" role="button" tabIndex={0}>
            <span className="reel-play-icon"></span>
            <div className="reel-pulse" aria-hidden="true" />
          </div>
          <div className="gallery-reel__text">
            <h2>Watch the <em>Highlight Reel</em></h2>
            <p>Three minutes of pure coffee magic from Cafex Cairo 2024 — featuring world-class baristas, stunning installations, and unforgettable moments.</p>
            <div className="reel-meta">
              <span> 3:24 min</span>
              <span> November 2024</span>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        item={lightboxIdx !== null ? filtered[lightboxIdx] : null}
        onClose={closeLightbox}
        onPrev={prevItem}
        onNext={nextItem}
      />
    </main>
  );
}
