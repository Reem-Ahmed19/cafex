import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home       from './Home';
import About      from './About';
import Exhibitors from './Exhibitors';
import Schedule   from './Schedule';
import Gallery    from './Gallery';
import Contact    from './Contact';
import Booking    from './Booking';
import NotFound   from './NotFound';

// Layout
import Navbar  from './Navbar';
import Footer  from './Footer';

// Popup
import PopupAd from './PopupAd';

export default function App() {
  const [loading, setLoading]     = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      <div className={`preloader${loading ? '' : ' hide'}`}>
        <span className="preloader__icon"></span>
        <div className="preloader__brand">CAFEX</div>
        <div className="preloader__sub">Cairo International Coffee Exhibition</div>
        <div className="preloader__bar">
          <div className="preloader__fill" />
        </div>
      </div>

      {!loading && (
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/about"      element={<About />} />
              <Route path="/exhibitors" element={<Exhibitors />} />
              <Route path="/schedule"   element={<Schedule />} />
              <Route path="/gallery"    element={<Gallery />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="/booking"    element={<Booking />} />
              <Route path="*"           element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          {showPopup && <PopupAd onClose={() => setShowPopup(false)} />}
        </Router>
      )}
    </>
  );
}
