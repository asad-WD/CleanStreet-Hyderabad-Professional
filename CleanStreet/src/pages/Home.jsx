import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  ClipboardList, 
  UploadCloud, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';
import ReportCard from '../components/ReportCard';
import RealMap from '../components/RealMap';
import { useAuth } from '../context/AuthContext';

export default function Home({ reports, onUpvote }) {
  const { user, setIsAuthModalOpen } = useAuth();
  const resolved = reports.filter(r => r.status === 'Resolved').length;
  const activeCleanups = reports.filter(r => ['In Progress', 'Cleanup Scheduled'].includes(r.status)).length;
  const resolutionPercentage = reports.length ? Math.round((resolved / reports.length) * 100) : 0;

  const featuredReports = reports.slice(0, 3);

  return (
    <div className="public-page">
      {/* Clean Modern Hero */}
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> SMART CIVIC WASTE PLATFORM · HYDERABAD
          </div>
          <h1>
            Let's Make<br />
            <em>Hyderabad Cleaner.</em>
          </h1>
          <p>
            Notice waste piling up or blocking roads in your neighborhood? Take a photo, let AI detect the waste category, and track verified municipal cleanups in real time.
          </p>

          <div className="hero-actions">
            <Link to="/report" className="button button-primary">
              <Sparkles size={16} /> Report with AI Scanner <ArrowRight size={16} />
            </Link>
            <Link to="/map" className="button button-outline">
              <MapPin size={16} /> Open City GPS Map
            </Link>
            <button
              type="button"
              className="button button-ghost"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In / Switch Role &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
            <div style={{ display: 'flex' }}>
              {['AQ', 'TM', 'RK', '+'].map((initials, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: idx === 0 ? '#0284c7' : idx === 1 ? '#ea580c' : idx === 2 ? '#16834a' : 'var(--soft)',
                    color: idx < 3 ? '#ffffff' : 'var(--ink)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '10px',
                    fontWeight: '800',
                    border: '2px solid var(--surface)',
                    marginLeft: idx > 0 ? '-8px' : 0
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <strong style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>
                Multi-Role Collaboration
              </strong>
              <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                Connecting Citizens, SSWMB Sanitation Workers & Municipal Admins
              </small>
            </div>
          </div>
        </div>

        {/* Clean Hero Visual Card */}
        <div className="hero-visual">
          <div className="hero-image" />

          {/* Clean Overlay Card */}
          <div className="hero-card-overlay">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#dcfce7',
                color: '#15803d',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0
              }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--ink)', display: 'block' }}>
                  {resolutionPercentage}% Resolved
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {resolved} verified cleanups across Hyderabad
                </span>
              </div>
            </div>

            <Link to="/dashboard" className="text-link" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
              Live Telemetry &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats Strip */}
      <section className="impact-strip wrap">
        <div>
          <span className="impact-icon">
            <ClipboardList size={20} />
          </span>
          <div>
            <strong>{reports.length}</strong>
            <span>Active Incidents Logged</span>
          </div>
        </div>

        <div>
          <span className="impact-icon peach">
            <Activity size={20} />
          </span>
          <div>
            <strong>{activeCleanups}</strong>
            <span>Sanitation Squads on Site</span>
          </div>
        </div>

        <div>
          <span className="impact-icon olive">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <strong>{resolved}</strong>
            <span>Sites Fully Restored</span>
          </div>
        </div>

        <div className="impact-note">
          <ShieldCheck size={18} color="var(--olive)" />
          Synced with Sindh Solid Waste Management Board
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>Simple, Transparent & Fast</h2>
            <p>From flagging an issue on your street to verified municipal cleanup in 3 steps.</p>
          </div>
          <Link to="/about" className="text-link">
            System Architecture &rarr;
          </Link>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">
              <UploadCloud size={24} />
            </div>
            <h3>1. Snap & AI Triage</h3>
            <p>
              Upload a waste photo. The built-in AI scanner immediately estimates waste type, debris volume, and urgency level.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon peach">
              <MapPin size={24} />
            </div>
            <h3>2. Real-Time GPS Pinning</h3>
            <p>
              Pinpoint the exact Hyderabad street or landmark on OpenStreetMap so compactor trucks navigate directly to the site.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon olive">
              <Award size={24} />
            </div>
            <h3>3. Dispatch & Verified Proof</h3>
            <p>
              Field workers clean the location, submit after-cleanup verification photos, and you earn Citizen Eco-Points!
            </p>
          </div>
        </div>
      </section>

      {/* Live Map Preview */}
      <section className="section wrap" style={{ paddingTop: '10px' }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">GEOSPATIAL INTELLIGENCE</div>
            <h2>Live Incident Map of Hyderabad</h2>
            <p>Real-time OpenStreetMap coordinates of reported and active waste hotspots.</p>
          </div>
          <Link to="/map" className="button button-outline">
            Open Fullscreen Map <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
          <RealMap reports={reports} height="400px" />
        </div>
      </section>

      {/* Recent Reports */}
      <section className="section recent-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">RECENT ACTIVITY</div>
              <h2>Community Reports from Hyderabad</h2>
              <p>Explore recent incidents and support urgent issues with your citizen endorsement.</p>
            </div>
            <Link to="/reports" className="button button-outline">
              View All {reports.length} Reports <ArrowRight size={15} />
            </Link>
          </div>

          <div className="report-grid">
            {featuredReports.map(r => (
              <ReportCard key={r.id} report={r} onUpvote={onUpvote} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
