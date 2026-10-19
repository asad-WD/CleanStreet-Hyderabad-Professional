import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="public-footer">
      <div className="wrap footer-main">
        <div>
          <Link to="/" className="brand" aria-label="CleanStreet home">
            <img className="brand-logo" src={logoUrl} alt="Clean Streets logo" />
            <span className="brand-wordmark">
              Clean<span>Street</span>
              <small>Cleaner Streets. Stronger Communities.</small>
            </span>
          </Link>
          <p>
            Empowering Hyderabad citizens and municipal sanitation crews to collaborate on waste reporting, real-time GPS tracking, and verified cleanups.
          </p>
        </div>

        <div>
          <strong>Civic Modules</strong>
          <Link to="/reports">Community Reports</Link>
          <Link to="/map">Live City Map</Link>
          <Link to="/dashboard">Impact Dashboard</Link>
          <Link to="/leaderboard">Eco Leaderboard</Link>
        </div>

        <div>
          <strong>Get Involved</strong>
          <Link to="/report">Report an Issue</Link>
          <Link to="/about">System Architecture</Link>
          <Link to="/admin">Municipal Admin Desk</Link>
        </div>

        <div className="footer-disclaimer">
          <span className="demo-pill">
            <span /> Hyderabad Civic Tech
          </span>
          <p>
            CleanStreet is a 3rd Semester Software Engineering project tailored for Hyderabad, Sindh. Data is stored locally in your browser.
          </p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>&copy; {new Date().getFullYear()} CleanStreet Hyderabad. All rights reserved.</span>
        <span>Cleaner Streets. Healthier Communities.</span>
      </div>
    </footer>
  );
}
