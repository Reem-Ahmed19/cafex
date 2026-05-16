import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css';

const TICKET_TYPES = [
  { id:'day',  name:'Day Pass',       icon:'', pricePerDay:150, color:'#C8A97E', popular:false, features:['Access to all exhibition halls','Free welcome drink','Exhibition catalogue','Networking lounge access'] },
  { id:'full', name:'Full Access',    icon:'', pricePerDay:299, color:'#D4AF37', popular:true,  features:['All Day Pass features','Priority entry & VIP queue','Access to all workshops','Barista demo seating','Lunch included (Day 1)','Official Cafex tote bag'] },
  { id:'pro',  name:'Pro Exhibitor',  icon:'', pricePerDay:499, color:'#EDD87A', popular:false, features:['All Full Access features','Dedicated booth consultation','Lead capture app license','Private lounge access','Priority speaking slots','Post-event analytics report'] },
];

const EXHIBITION_DAYS = [
  { id:'d1', date:'Nov 15', weekday:'Saturday', label:'Opening Day',     theme:'Grand opening ceremony & keynotes' },
  { id:'d2', date:'Nov 16', weekday:'Sunday',   label:'Industry Day',    theme:'B2B networking & sourcing sessions' },
  { id:'d3', date:'Nov 17', weekday:'Monday',   label:'Competition Day', theme:'Barista & brewing championships' },
  { id:'d4', date:'Nov 18', weekday:'Tuesday',  label:'Awards Day',      theme:'Golden Bean ceremony & farewell' },
];

const PROMO_CODES = { 'CAFEX25':0.25, 'WELCOME10':0.10, 'STUDENT15':0.15 };

const fmt = n => `EGP ${n.toLocaleString('en-EG')}`;

export default function Booking() {
  const [ticket, setTicket]           = useState('full');
  const [days, setDays]               = useState(['d1']);
  const [step, setStep]               = useState(1);
  const [promo, setPromo]             = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoErr, setPromoErr]       = useState('');
  const [form, setForm]               = useState({ name:'', email:'', phone:'', nationality:'', company:'' });
  const [formErr, setFormErr]         = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [bookingRef, setBookingRef]   = useState('');

  const selectedTicket = TICKET_TYPES.find(t => t.id === ticket);
  const selectedDays   = EXHIBITION_DAYS.filter(d => days.includes(d.id));

  const subtotal = useMemo(() => selectedTicket.pricePerDay * days.length, [ticket, days]);
  const discount = useMemo(() => promoApplied ? Math.round(subtotal * promoApplied) : 0, [subtotal, promoApplied]);
  const total    = subtotal - discount;

  const toggleDay = d => setDays(prev =>
    prev.includes(d.id) ? (prev.length > 1 ? prev.filter(x => x !== d.id) : prev) : [...prev, d.id]
  );

  const applyPromo = () => {
    const key = promo.trim().toUpperCase();
    if (PROMO_CODES[key]) { setPromoApplied(PROMO_CODES[key]); setPromoErr(''); }
    else { setPromoApplied(null); setPromoErr('Invalid code. Try CAFEX25 for 25% off!'); }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())             errs.name  = 'Full name is required';
    if (!form.email.includes('@'))      errs.email = 'Valid email required';
    if (!form.phone.match(/^\+?[\d\s\-]{8,}/)) errs.phone = 'Valid phone required';
    setFormErr(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setBookingRef('CFX-' + Math.random().toString(36).toUpperCase().slice(2,8));
    setStep(4);
    setSubmitting(false);
  };

  return (
    <main className="booking-page">
      <section className="booking-hero reveal">
        <div className="booking-hero__glow" aria-hidden="true" />
        <div className="booking-hero__content">
          <span className="booking-hero__badge"> Reserve Your Seat</span>
          <h1>Book Your <em>Cafex Cairo</em> Experience</h1>
          <p>November 15–18, 2025 · Cairo International Expo Center · Starting from EGP 150</p>
        </div>
        <div className="booking-steps" aria-label="Booking steps">
          {['Choose Ticket','Your Details','Confirm','Done'].map((label, i) => (
            <div key={i} className={`booking-step ${step > i ? 'booking-step--done' : ''} ${step === i+1 ? 'booking-step--active' : ''}`}>
              <span className="booking-step__num">{step > i+1 ? '' : i+1}</span>
              <span className="booking-step__label">{label}</span>
              {i < 3 && <span className="booking-step__line" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section className="booking-content">
        <div className="booking-content__inner">
          <div className="booking-left">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="booking-panel reveal">
                <h2 className="booking-panel__title">1. Choose Your Ticket</h2>
                <div className="ticket-cards">
                  {TICKET_TYPES.map(t => (
                    <button key={t.id} className={`ticket-card ${ticket === t.id ? 'ticket-card--selected' : ''}`}
                            onClick={() => setTicket(t.id)} aria-pressed={ticket === t.id}
                            style={{ '--tc': t.color }}>
                      {t.popular && <span className="ticket-card__popular">Most Popular</span>}
                      <span className="ticket-card__icon" aria-hidden="true">{t.icon}</span>
                      <h3 className="ticket-card__name">{t.name}</h3>
                      <p className="ticket-card__price">
                        <span className="price-num">{fmt(t.pricePerDay)}</span>
                        <span className="price-per"> / day</span>
                      </p>
                      <ul className="ticket-card__features">
                        {t.features.map((f, i) => <li key={i}><span aria-hidden="true"></span>{f}</li>)}
                      </ul>
                    </button>
                  ))}
                </div>

                <h2 className="booking-panel__title" style={{ marginTop:'var(--space-2xl)' }}>2. Select Your Days</h2>
                <p className="booking-panel__hint">Select one or more days. Price multiplies per day.</p>
                <div className="day-grid">
                  {EXHIBITION_DAYS.map(d => (
                    <button key={d.id} className={`day-card ${days.includes(d.id) ? 'day-card--selected' : ''}`}
                            onClick={() => toggleDay(d)} aria-pressed={days.includes(d.id)}>
                      <span className="day-card__date">{d.date}</span>
                      <span className="day-card__weekday">{d.weekday}</span>
                      <span className="day-card__label">{d.label}</span>
                      <span className="day-card__theme">{d.theme}</span>
                      {days.includes(d.id) && <span className="day-card__check" aria-hidden="true"></span>}
                    </button>
                  ))}
                </div>
                <button className="btn btn--primary btn--lg booking-next" onClick={() => setStep(2)}>Continue to Details →</button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="booking-panel reveal">
                <button className="booking-back" onClick={() => setStep(1)}>← Back</button>
                <h2 className="booking-panel__title">2. Your Details</h2>
                <div className="booking-form">
                  {[
                    { id:'name',        label:'Full Name',           type:'text',  placeholder:'Mohamed Khaled' },
                    { id:'email',       label:'Email',               type:'email', placeholder:'you@example.com' },
                    { id:'phone',       label:'Phone Number',        type:'tel',   placeholder:'+20 1XX XXX XXXX' },
                    { id:'nationality', label:'Nationality',         type:'text',  placeholder:'Egyptian' },
                    { id:'company',     label:'Company (optional)',  type:'text',  placeholder:'Your company' },
                  ].map(f => (
                    <div className="form-group" key={f.id}>
                      <label htmlFor={`bk-${f.id}`} className="form-label">{f.label}</label>
                      <input id={`bk-${f.id}`} name={f.id} type={f.type}
                             className={`form-input ${formErr[f.id] ? 'form-input--error' : ''}`}
                             placeholder={f.placeholder}
                             value={form[f.id]}
                             onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} />
                      {formErr[f.id] && <span className="form-error">{formErr[f.id]}</span>}
                    </div>
                  ))}
                </div>
                <button className="btn btn--primary btn--lg booking-next" onClick={() => { if (validate()) setStep(3); }}>Review Booking →</button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="booking-panel reveal">
                <button className="booking-back" onClick={() => setStep(2)}>← Back</button>
                <h2 className="booking-panel__title">3. Confirm Your Booking</h2>
                <div className="confirm-summary">
                  {[
                    ['Ticket', `${selectedTicket.icon} ${selectedTicket.name}`],
                    ['Days',   selectedDays.map(d => d.date).join(', ')],
                    ['Name',   form.name],
                    ['Email',  form.email],
                    ...(form.company ? [['Company', form.company]] : []),
                  ].map(([k,v]) => (
                    <div className="confirm-row" key={k}>
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="promo-row">
                  <input type="text" className="form-input promo-input" placeholder="Promo code (e.g. CAFEX25)" value={promo} onChange={e => setPromo(e.target.value)} />
                  <button className="btn btn--ghost btn--md" onClick={applyPromo}>Apply</button>
                </div>
                {promoErr     && <p className="form-error">{promoErr}</p>}
                {promoApplied && <p className="promo-success"> {Math.round(promoApplied*100)}% discount applied!</p>}
                <div className="booking-totals">
                  <div className="totals-row"><span>Subtotal ({days.length} day{days.length>1?'s':''})</span><span>{fmt(subtotal)}</span></div>
                  {discount > 0 && <div className="totals-row totals-row--discount"><span>Discount</span><span>–{fmt(discount)}</span></div>}
                  <div className="totals-row totals-row--total"><span>Total</span><span>{fmt(total)}</span></div>
                </div>
                <p className="confirm-note">By completing this booking you agree to our Terms & Conditions.</p>
                <button className="btn btn--primary btn--lg booking-next" disabled={submitting} onClick={handleSubmit}>
                  {submitting ? 'Processing…' : `Pay ${fmt(total)} `}
                </button>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="booking-done reveal">
                <div className="booking-done__icon" aria-hidden="true"></div>
                <h2>Booking Confirmed!</h2>
                <p>Your reference: <strong className="booking-ref">{bookingRef}</strong></p>
                <p>Confirmation sent to <strong>{form.email}</strong>. See you at Cafex Cairo!</p>
                <div className="booking-done__actions">
                  <Link to="/" className="btn btn--primary btn--md">Back to Home</Link>
                  <Link to="/schedule" className="btn btn--ghost btn--md">View Schedule</Link>
                </div>
              </div>
            )}
          </div>

          {step < 4 && (
            <aside className="booking-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Order Summary</h3>
                <div className="sidebar-ticket">
                  <span className="sidebar-ticket__icon" style={{ color: selectedTicket.color }}>{selectedTicket.icon}</span>
                  <div>
                    <div className="sidebar-ticket__name">{selectedTicket.name}</div>
                    <div className="sidebar-ticket__price">{fmt(selectedTicket.pricePerDay)} per day</div>
                  </div>
                </div>
                <div className="sidebar-days">
                  <p className="sidebar-label">Selected Days</p>
                  {selectedDays.map(d => (
                    <div key={d.id} className="sidebar-day">
                      <span className="sidebar-day__date">{d.date}</span>
                      <span className="sidebar-day__label">{d.label}</span>
                    </div>
                  ))}
                </div>
                <div className="sidebar-divider" />
                <div className="sidebar-total-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                {discount > 0 && <div className="sidebar-total-row sidebar-total-row--discount"><span>Discount</span><span>–{fmt(discount)}</span></div>}
                <div className="sidebar-total-row sidebar-total-row--big"><span>Total</span><span>{fmt(total)}</span></div>
                <div className="sidebar-note"><span></span><span>Secure checkout · Instant e-ticket</span></div>
              </div>
              <div className="sidebar-info">
                <div className="sidebar-info__item"><span></span><span>Nov 15–18, 2025</span></div>
                <div className="sidebar-info__item"><span></span><span>Cairo International Expo Center</span></div>
                <div className="sidebar-info__item"><span></span><span>9:00 AM – 7:00 PM daily</span></div>
                <div className="sidebar-info__item"><span></span><span>E-ticket sent to your email</span></div>
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
