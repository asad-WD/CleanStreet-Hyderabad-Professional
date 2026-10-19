import { useState } from 'react';
import { X, User, HardHat, ShieldCheck, ArrowRight, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, loginAsRole, loginWithCredentials } = useAuth();
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' or 'custom'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('citizen');

  if (!isAuthModalOpen) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginWithCredentials(email, password, selectedRole);
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      <div
        className="modal-card"
        style={{
          width: 'min(480px, 100%)',
          background: 'var(--surface)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--line)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="icon-button"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: '800',
            color: 'var(--olive)',
            marginBottom: '6px'
          }}>
            HYDERABAD CIVIC PORTAL AUTHENTICATION
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--ink)', margin: 0 }}>
            Choose Your Access Role
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
            Sign in as a resident reporter, field cleanup worker, or municipal operations admin.
          </p>
        </div>

        {/* 1-Click Role Switcher Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {/* Citizen */}
          <button
            type="button"
            onClick={() => loginAsRole('citizen')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: user?.role === 'citizen' ? '2px solid var(--olive)' : '1px solid var(--line)',
              background: user?.role === 'citizen' ? 'var(--soft)' : 'var(--surface)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0
            }}>
              <User size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Citizen / Resident</strong>
                {user?.role === 'citizen' && (
                  <span style={{ fontSize: '10px', background: 'var(--olive)', color: '#ffffff', padding: '2px 8px', borderRadius: '100px', fontWeight: '700' }}>
                    Active
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                Submit reports with GPS, track status & earn Eco-Points
              </div>
            </div>
          </button>

          {/* Worker */}
          <button
            type="button"
            onClick={() => loginAsRole('worker')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: user?.role === 'worker' ? '2px solid #e06a3b' : '1px solid var(--line)',
              background: user?.role === 'worker' ? 'var(--soft)' : 'var(--surface)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#ffedd5',
              color: '#ea580c',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0
            }}>
              <HardHat size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Sanitation Field Crew (Worker)</strong>
                {user?.role === 'worker' && (
                  <span style={{ fontSize: '10px', background: '#e06a3b', color: '#ffffff', padding: '2px 8px', borderRadius: '100px', fontWeight: '700' }}>
                    Active
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                View assigned job orders, update progress & submit after-proof
              </div>
            </div>
          </button>

          {/* Admin */}
          <button
            type="button"
            onClick={() => loginAsRole('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: user?.role === 'admin' ? '2px solid #16834a' : '1px solid var(--line)',
              background: user?.role === 'admin' ? 'var(--soft)' : 'var(--surface)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Municipal Director (Admin)</strong>
                {user?.role === 'admin' && (
                  <span style={{ fontSize: '10px', background: '#16834a', color: '#ffffff', padding: '2px 8px', borderRadius: '100px', fontWeight: '700' }}>
                    Active
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                Assign SSWMB squads, monitor SLA deadlines & delete records
              </div>
            </div>
          </button>
        </div>

        {/* Custom Login Collapsible Form */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'custom' ? 'quick' : 'custom')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--olive)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: 0
            }}
          >
            {activeTab === 'custom' ? '− Hide Custom Login' : '+ Sign in with custom email / credentials'}
          </button>

          {activeTab === 'custom' && (
            <form onSubmit={handleCustomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              <label className="field">
                <span style={{ fontSize: '11px' }}>Role Type</span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{ minHeight: '38px', fontSize: '12px' }}
                >
                  <option value="citizen">Citizen / Resident</option>
                  <option value="worker">Sanitation Worker (SSWMB)</option>
                  <option value="admin">Municipal Administrator</option>
                </select>
              </label>

              <label className="field">
                <span style={{ fontSize: '11px' }}>Email Address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@domain.com"
                  style={{ minHeight: '38px', fontSize: '12px' }}
                />
              </label>

              <label className="field">
                <span style={{ fontSize: '11px' }}>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ minHeight: '38px', fontSize: '12px' }}
                />
              </label>

              <button
                type="submit"
                className="button button-primary"
                style={{ width: '100%', marginTop: '6px', minHeight: '40px' }}
              >
                Sign In <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
