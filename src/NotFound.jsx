import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found" aria-labelledby="nf-title">
      <div className="not-found__bg" aria-hidden="true" />
      <div className="not-found__content container">
        <div className="not-found__cup" aria-hidden="true"></div>
        <div className="not-found__steam" aria-hidden="true">
          {[1,2,3].map(i => <div key={i} className={`not-found__wisp not-found__wisp--${i}`} />)}
        </div>
        <p className="not-found__code">404</p>
        <h1 className="not-found__title" id="nf-title">Your Cup is Empty</h1>
        <p className="not-found__desc">
          This page seems to have wandered off like a misplaced coffee bean. Let's get you back to the good stuff.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary btn--lg">Back to Home</Link>
          <Link to="/exhibitors" className="btn btn--ghost btn--lg">Browse Exhibitors</Link>
        </div>
        <div className="not-found__links">
          <Link to="/about">About</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/booking">Register</Link>
        </div>
      </div>
    </main>
  );
}
