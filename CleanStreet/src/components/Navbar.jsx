import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Plus, 
  MapPin, 
  BarChart3, 
  ClipboardList, 
  Sun, 
  Moon, 
  Bell, 
  Award, 
  ShieldCheck, 
  Menu, 
  X, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import logoUrl from '../assets/logo.png';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  ecoPoints, 
  notifications = [], 
  onMarkNotificationsRead 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="public-nav wrap">
      <Link to="/" className="brand" aria-label="CleanStreet Home">
        <img className="brand-logo" src={logoUrl} alt="Clean Streets logo" />
        <span className="brand-wordmark">
          Clean<span>Street</span>
          <small>Smart Hyderabad Civic Waste Management</small>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Desktop Links */}
        <nav className={mobileMenuOpen ? 'public-links public-links-open' : 'public-links'}>
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/reports" onClick={() => setMobileMenuOpen(false)}>Explore Reports</NavLink>
          <NavLink to="/map" onClick={() => setMobileMenuOpen(false)}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> Live Map
            </span>
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <BarChart3 size={14} /> Impact Dashboard
            </span>
          </NavLink>
          <NavLink to="/leaderboard" onClick={() => setMobileMenuOpen(false)}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Award size={14} /> Eco Leaderboard
            </span>
          </NavLink>
          <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Admin Desk
            </span>
          </NavLink>

          {/* Mobile Report CTA */}
          <Link className="button button-primary nav-cta" to="/report" onClick={() => setMobileMenuOpen(false)}>
            <Plus size={17} /> Report Waste
          </Link>
        </nav>

        {/* Eco Points Pill */}
        <Link 
          to="/leaderboard" 
          title="Your Citizen Eco Points"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--soft)',
            border: '1px solid var(--line)',
            borderRadius: '100px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--olive)',
            textDecoration: 'none'
          }}
        >
          <span style={{ fontSize: '14px' }}>🌱</span>
          <span>{ecoPoints} pts</span>
        </Link>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button" 
            className="icon-button" 
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              if (unreadCount > 0 && onMarkNotificationsRead) {
                onMarkNotificationsRead();
              }
            }}
            aria-label="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '8px',
                height: '8px',
                background: '#d9381e',
                borderRadius: '50%',
                boxShadow: '0 0 0 2px var(--surface)'
              }} />
            )}
          </button>

          {notifDropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '320px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              boxShadow: 'var(--shadow)',
              zIndex: 1000,
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <strong style={{ fontSize: '13px' }}>Civic Alerts & Updates</strong>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{notifications.length} alerts</span>
              </div>

              <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: n.unread ? 'var(--soft)' : 'transparent',
                    fontSize: '11px',
                    border: '1px solid var(--line)'
                  }}>
                    <div style={{ fontWeight: '700', color: 'var(--ink)' }}>{n.title}</div>
                    <div style={{ color: 'var(--muted)', marginTop: '2px', lineHeight: '1.4' }}>{n.text}</div>
                    <div style={{ fontSize: '9px', color: 'var(--olive)', marginTop: '4px', fontWeight: '600' }}>{n.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark / Light Mode Toggle */}
        <button 
          type="button" 
          className="icon-button" 
          onClick={onToggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun size={18} color="#e0a03b" /> : <Moon size={18} />}
        </button>

        {/* Desktop CTA */}
        <Link className="button button-primary" to="/report" style={{ display: 'inline-flex' }}>
          <Plus size={16} /> Report Issue
        </Link>

        {/* Mobile Hamburger */}
        <button 
          className="icon-button mobile-menu" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
