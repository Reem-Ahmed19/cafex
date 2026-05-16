import { useState } from 'react';
import SectionTitle from './SectionTitle';
import './Contact.css';

const FAQS = [
  { q: 'How do I register as an exhibitor?',    a: 'Complete the exhibitor registration form through our Booking page or contact our sales team directly. Booth packages include setup, electricity, and Wi-Fi.' },
  { q: 'What are the exhibition dates?',         a: 'Cafex Cairo 2025 runs November 15–18 at the Cairo International Expo Center, Hall 3 & 4. Doors open daily at 9:00 AM.' },
  { q: 'Is parking available at the venue?',     a: 'Yes, ample free parking is available for visitors and exhibitors. VIP parking is included with premium passes.' },
  { q: 'Can I attend multiple days?',            a: 'Absolutely. Multi-day passes are available at discounted rates via our Booking page. Single-day tickets can be purchased at the gate.' },
  { q: 'Do you offer media credentials?',        a: 'Yes. Accredited journalists and content creators can apply for press passes by emailing press@cafex-cairo.com at least 2 weeks before the event.' },
  { q: 'How do I become a sponsor?',             a: 'Sponsorship packages are available at various tiers. Contact sponsors@cafex-cairo.com for our media kit and pricing deck.' },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-item__trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="faq-item__q">{item.q}</span>
        <span className="faq-item__chevron" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-item__body" role="region">
        <p className="faq-item__a">{item.a}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', type:'general', message:'' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1600));
    setStatus('sent');
  };

  return (
    <main className="contact-page">
      <section className="contact-hero reveal">
        <div className="contact-hero__grain" aria-hidden="true" />
        <div className="contact-hero__glow" aria-hidden="true" />
        <div className="contact-hero__content">
          <span className="contact-hero__badge"> Get In Touch</span>
          <h1>Let's Start a <em>Conversation</em></h1>
          <p>Whether you're an exhibitor, visitor, sponsor, or press — our team is ready to help.</p>
        </div>
      </section>

      <section className="contact-info-strip reveal">
        <div className="contact-info-strip__inner">
          {[
            { icon: '', label: 'Address', value: 'Cairo International Expo Center\nHalls 3 & 4, Nasr City, Cairo, Egypt' },
            { icon: '', label: 'Phone',   value: '+20 2 2555 1234\n+20 100 888 0055' },
            { icon: '', label: 'Email',   value: 'info@cafex-cairo.com\npress@cafex-cairo.com' },
            { icon: '', label: 'Hours',   value: 'Mon–Fri: 9AM – 6PM\nSat: 10AM – 3PM' },
          ].map(card => (
            <div className="contact-info-card" key={card.label}>
              <span className="contact-info-card__icon" aria-hidden="true">{card.icon}</span>
              <div>
                <h4 className="contact-info-card__label">{card.label}</h4>
                <p className="contact-info-card__value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-main__inner">
          <div className="contact-form-wrap reveal">
            <SectionTitle eyebrow="Send a Message" title="We'd Love to Hear From You" subtitle="Fill in the form and our team will respond within one business day." align="left" />

            {status === 'sent' ? (
              <div className="contact-success">
                <span className="contact-success__icon"></span>
                <h3>Message Received!</h3>
                <p>Thank you, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within one business day.</p>
                <button className="btn btn--ghost btn--md" onClick={() => { setStatus(null); setForm({ name:'',email:'',subject:'',type:'general',message:'' }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-name" className="form-label">Full Name *</label>
                    <input id="cf-name" name="name" type="text" className="form-input" placeholder="Mohamed Khaled" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email" className="form-label">Email Address *</label>
                    <input id="cf-email" name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-type" className="form-label">Inquiry Type</label>
                    <select id="cf-type" name="type" className="form-input form-select" value={form.type} onChange={handleChange}>
                      <option value="general">General Inquiry</option>
                      <option value="exhibitor">Exhibitor Registration</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="press">Press & Media</option>
                      <option value="visitor">Visitor Tickets</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject" className="form-label">Subject</label>
                    <input id="cf-subject" name="subject" type="text" className="form-input" placeholder="Brief topic" value={form.subject} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-message" className="form-label">Message *</label>
                  <textarea id="cf-message" name="message" className="form-input form-textarea" placeholder="Tell us how we can help…" rows={5} value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn--primary btn--lg contact-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Message '}
                </button>
              </form>
            )}
          </div>

          <aside className="contact-aside reveal">
            <div className="contact-map">
              <div className="contact-map__inner">
                <span className="contact-map__pin" aria-hidden="true"></span>
                <div>
                  <h4>Cairo International Expo Center</h4>
                  <p>Halls 3 & 4, Nasr City</p>
                  <a href="https://maps.google.com/?q=Cairo+International+Expo+Center" target="_blank" rel="noopener noreferrer" className="contact-map__link">Open in Google Maps →</a>
                </div>
              </div>
              <div className="contact-map__visual" aria-hidden="true">
                <div className="map-grid">{[...Array(36)].map((_, i) => <span key={i} className="map-cell" />)}</div>
                <div className="map-marker"></div>
              </div>
            </div>

            <div className="contact-social">
              <h4 className="contact-social__heading">Follow Cafex Cairo</h4>
              <div className="contact-social__links">
                {[
                  { icon: '',  label: 'Twitter / X', href: '#' },
                  { icon: '', label: 'Instagram',   href: '#' },
                  { icon: '',  label: 'YouTube',      href: '#' },
                  { icon: 'in', label: 'LinkedIn',     href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-social__link" aria-label={s.label}>
                    <span aria-hidden="true">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-faq reveal">
        <div className="contact-faq__inner">
          <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Quick answers to the questions we hear most often." align="center" />
          <div className="faq-list">
            {FAQS.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
