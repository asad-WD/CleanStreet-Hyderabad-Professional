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
  User,
  HardHat,
  ChevronDown
} from 'lucide-react';
import logoUrl from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  ecoPoints, 
  notifications = [], 
  onMarkNotificationsRead 
}) {
  const { user, setIsAuthModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="public-nav wrap">
      {/* Brand */}
      <Link to="/" className="brand" aria-label="CleanStreet Home">
        <img className="brand-logo" src={logoUrl} alt="Clean Streets logo" />
        <span className="brand-wordmark">
          Clean<span>Street</span>
          <small>Hyderabad Civic Waste Management</small>
        </span>
      </Link>

      {/* Center Links */}
      <nav className={mobileMenuOpen ? 'public-links public-links-open' : 'public-links'}>
        <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/reports" onClick={() => setMobileMenuOpen(false)}>Reports</NavLink>
        <NavLink to="/map" onClick={() => setMobileMenuOpen(false)}>City Map</NavLink>
        <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Analytics</NavLink>
        <NavLink to="/leaderboard" onClick={() => setMobileMenuOpen(false)}>Leaderboard</NavLink>

        {/* Dynamic Role Link */}
        {user?.role === 'citizen' && (
          <NavLink to="/citizen" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0284c7' }}>
            My Citizen Portal
          </NavLink>
        )}
        {user?.role === 'worker' && (
          <NavLink to="/worker" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ea580c' }}>
            Worker Desk
          </NavLink>
        )}
        {user?.role === 'admin' && (
          <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ color: '#16834a' }}>
            Admin Desk
          </NavLink>
        )}

        <Link className="button button-primary nav-cta" to="/report" onClick={() => setMobileMenuOpen(false)}>
          <Plus size={16} /> Report Waste
        </Link>
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* User Role Switcher Pill */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--soft)',
            border: '1px solid var(--line)',
            borderRadius: '100px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--ink)',
            cursor: 'pointer'
          }}
          title="Switch User Role (Citizen / Worker / Admin)"
        >
          <span style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: user?.role === 'admin' ? '#16834a' : user?.role === 'worker' ? '#ea580c' : '#0284c7',
            color: '#ffffff',
            display: 'grid',
            placeItems: 'center',
            fontSize: '9px',
            fontWeight: '800'
          }}>
            {user?.avatar || 'AQ'}
          </span>
          <span style={{ textTransform: 'capitalize' }}>
            {user ? `${user.role}` : 'Login'}
          </span>
          <ChevronDown size={13} color="var(--muted)" />
        </button>

        {/* Eco points */}
        <Link
          to="/leaderboard"
          title="Citizen Eco Points"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--cream)',
            border: '1px solid var(--line)',
            borderRadius: '100px',
            padding: '5px 10px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--olive)'
          }}
        >
          <span>🌱</span>
          <span>{ecoPoints}</span>
        </Link>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              if (unreadCount > 0 && onMarkNotificationsRead) onMarkNotificationsRead();
            }}
            aria-label="Alerts"
            style={{ width: '36px', height: '36px', position: 'relative' }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                background: '#dc2626',
                borderRadius: '50%'
              }} />
            )}
          </button>

          {notifDropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '300px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              padding: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '8px' }}>
                <strong style={{ fontSize: '13px' }}>Civic Notifications</strong>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{notifications.length} alerts</span>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: n.unread ? 'var(--soft)' : 'transparent',
                    border: '1px solid var(--line)',
                    fontSize: '11px'
                  }}>
                    <strong style={{ display: 'block', color: 'var(--ink)' }}>{n.title}</strong>
                    <span style={{ color: 'var(--muted)', display: 'block', marginTop: '2px' }}>{n.text}</span>
                    <span style={{ fontSize: '9px', color: 'var(--olive)', marginTop: '4px', display: 'block', fontWeight: '700' }}>{n.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          style={{ width: '36px', height: '36px' }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} />}
        </button>

        {/* Report Button */}
        <Link className="button button-primary" to="/report" style={{ display: 'inline-flex', paddingInline: '14px', minHeight: '38px', fontSize: '13px' }}>
          <Plus size={15} /> Report
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="icon-button mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          style={{ width: '36px', height: '36px' }}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
