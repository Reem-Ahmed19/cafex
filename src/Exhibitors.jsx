import { useState, useMemo } from 'react';
import SectionTitle from './SectionTitle';
import Card from './Card';
import SmallMenuTap from './SmallMenuTap';
import './Exhibitors.css';

const ALL_EXHIBITORS = [
  { name: 'Lavazza Egypt',        category: 'Premium Coffee',    country: 'Italy',     booth: 'A-12', featured: true,  description: 'Iconic Italian brand bringing its finest blends and capsule technology to Cairo.' },
  { name: 'Nescafé Middle East',  category: 'Instant Coffee',    country: 'Egypt',     booth: 'B-04', description: "The world's favourite instant coffee brand, showcasing new cold-brew ranges." },
  { name: 'Breville Pro',         category: 'Coffee Equipment',  country: 'Australia', booth: 'C-22', description: 'Award-winning espresso machines, grinders, and smart brewing technology.' },
  { name: 'Ethiopian Origins',    category: 'Single Origin',     country: 'Ethiopia',  booth: 'A-31', description: 'Direct-trade Ethiopian coffees from Yirgacheffe, Harrar, and Sidamo regions.' },
  { name: "De'Longhi MENA",       category: 'Espresso Machines', country: 'UAE',       booth: 'D-07', featured: true, description: 'Premium Italian espresso machines for home and professional use.' },
  { name: 'Caffe Vergnano',       category: 'Specialty Roaster', country: 'Italy',     booth: 'B-19', description: 'Family-owned since 1882, presenting rare microlots and heritage blends.' },
  { name: 'Segafredo Zanetti',    category: 'Premium Coffee',    country: 'Italy',     booth: 'A-08', description: 'Authentic espresso experience with a wide range for café professionals.' },
  { name: 'Jebena Coffee',        category: 'Single Origin',     country: 'Egypt',     booth: 'A-41', description: "Egypt's first certified specialty roaster, sourcing direct from origin." },
  { name: 'Keurig Commercial',    category: 'Coffee Equipment',  country: 'USA',       booth: 'C-15', description: 'Brewing solutions for offices, hotels, and hospitality.' },
  { name: 'Damasco Tea House',    category: 'Tea & Herbal',      country: 'Egypt',     booth: 'E-03', description: 'Premium loose-leaf teas, herbal blends, and wellness beverages.' },
  { name: 'Typhoo International', category: 'Tea & Herbal',      country: 'UK',        booth: 'E-11', description: 'British heritage tea brand with 115 years of blending expertise.' },
  { name: 'Anfim Grinders',       category: 'Coffee Equipment',  country: 'Italy',     booth: 'C-30', description: 'Professional-grade coffee grinders used in world barista competitions.' },
  { name: 'Bubble Craze MENA',    category: 'Specialty Drinks',  country: 'UAE',       booth: 'F-02', description: 'Bubble tea ingredients, equipment, and franchise consulting.' },
  { name: 'Dallmayr Egypt',       category: 'Premium Coffee',    country: 'Germany',   booth: 'B-25', description: 'Bavarian luxury coffee house brand expanding across Egypt and North Africa.' },
  { name: 'La Marzocco Cairo',    category: 'Espresso Machines', country: 'Italy',     booth: 'D-01', featured: true, description: "The world's most prestigious espresso machine brand, live demonstrations daily." },
  { name: 'Kenco Professional',   category: 'Instant Coffee',    country: 'UK',        booth: 'B-33', description: 'Vending and instant solutions for large-scale hospitality.' },
];

const CATEGORIES = [
  { id: 'all',               label: 'All' },
  { id: 'Premium Coffee',    label: 'Premium Coffee' },
  { id: 'Single Origin',     label: 'Single Origin' },
  { id: 'Coffee Equipment',  label: 'Equipment' },
  { id: 'Espresso Machines', label: 'Espresso Machines' },
  { id: 'Tea & Herbal',      label: 'Tea & Herbal' },
  { id: 'Specialty Drinks',  label: 'Specialty Drinks' },
  { id: 'Instant Coffee',    label: 'Instant Coffee' },
  { id: 'Specialty Roaster', label: 'Specialty Roaster' },
];

export default function Exhibitors() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => ALL_EXHIBITORS.filter(ex => {
    const matchCat    = category === 'all' || ex.category === category;
    const matchSearch = !search ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.country.toLowerCase().includes(search.toLowerCase()) ||
      ex.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [search, category]);

  return (
    <main className="exhibitors page-main">
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Cafex Cairo 2025</p>
          <h1 className="page-hero__title">Meet the <em>Exhibitors</em></h1>
          <p className="page-hero__sub">200+ brands from 40+ countries under one roof</p>
        </div>
      </div>

      <section className="exhibitors__main section-pad">
        <div className="container">
          <div className="exhibitors__controls">
            <div className="exhibitors__search-wrap">
              <span className="exhibitors__search-icon" aria-hidden="true"></span>
              <input
                type="search"
                placeholder="Search by name, country, or category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="exhibitors__search"
                aria-label="Search exhibitors"
              />
            </div>
            <div className="exhibitors__filter" role="region" aria-label="Filter by category">
              <SmallMenuTap items={CATEGORIES} active={category} onChange={setCategory} />
            </div>
          </div>

          <p className="exhibitors__count">
            Showing <span>{filtered.length}</span> of {ALL_EXHIBITORS.length} exhibitors
          </p>

          {filtered.length > 0 ? (
            <div className="exhibitors__grid">
              {filtered.map((ex, i) => (
                <div key={ex.name} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                  <Card {...ex} />
                </div>
              ))}
            </div>
          ) : (
            <div className="exhibitors__empty">
              <span></span>
              <p>No exhibitors found. Try a different keyword or category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
