import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  ClipboardList, 
  Leaf, 
  UploadCloud, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Award,
  Layers
} from 'lucide-react';
import ReportCard from '../components/ReportCard';
import RealMap from '../components/RealMap';

export default function Home({ reports, onUpvote }) {
  const resolved = reports.filter(r => r.status === 'Resolved').length;
  const activeCleanups = reports.filter(r => ['In Progress', 'Cleanup Scheduled'].includes(r.status)).length;
  const resolutionPercentage = reports.length ? Math.round((resolved / reports.length) * 100) : 0;

  const featuredReports = reports.slice(0, 3);

  return (
    <div className="public-page">
      {/* Hero Section */}
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> AI-POWERED CIVIC WASTE PLATFORM FOR HYDERABAD
          </div>
          <h1>
            Let's make<br />
            <em>Hyderabad cleaner.</em>
          </h1>
          <p>
            Notice waste piling up in your neighborhood? Snap a photo, let our AI Vision categorize the urgency, and track live cleanup progress on our city GPS map.
          </p>

          <div className="hero-actions">
            <Link to="/report" className="button button-primary">
              <Sparkles size={16} /> Report with AI Scanner <ArrowRight size={16} />
            </Link>
            <Link to="/map" className="button button-outline">
              <MapPin size={16} /> View City GPS Map
            </Link>
            <Link to="/dashboard" className="button button-ghost">
              Civic Dashboard &rarr;
            </Link>
          </div>

          <div className="hero-proof">
            <div className="proof-avatars">
              <span>AQ</span>
              <span>TM</span>
              <span>FB</span>
              <span>+</span>
            </div>
            <div>
              <strong>Community & SSWMB Powered</strong>
              <small>Empowering citizens across Qasimabad, Latifabad & GOR Colony</small>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual">
          <div
            className="hero-image"
            role="img"
            aria-label="Clean Hyderabad green pedestrian roadway"
          />

          <div className="floating-card floating-top">
            <span className="float-icon">
              <Sparkles size={18} />
            </span>
            <div>
              <strong>AI Waste Scanner</strong>
              <small>Auto-detects category & severity</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <div className="mini-progress">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="17" />
                <circle
                  className="progress-ring"
                  cx="22"
                  cy="22"
                  r="17"
                  style={{ strokeDashoffset: Math.max(0, 107 - (107 * resolutionPercentage) / 100) }}
                />
              </svg>
              <span>{resolutionPercentage}%</span>
            </div>
            <div>
              <strong>Resolution Rate</strong>
              <small>{resolved} verified cleanups</small>
            </div>
          </div>

          <div className="hero-leaf leaf-one">
            <Leaf size={22} />
          </div>
          <div className="hero-leaf leaf-two">
            <Leaf size={16} />
          </div>
        </div>
      </section>

      {/* Live Impact Stats Strip */}
      <section className="impact-strip wrap">
        <div>
          <span className="impact-icon">
            <ClipboardList size={22} />
          </span>
          <div>
            <strong>{reports.length}</strong>
            <span>Active Incidents Logged</span>
          </div>
        </div>

        <div>
          <span className="impact-icon peach">
            <Activity size={22} />
          </span>
          <div>
            <strong>{activeCleanups}</strong>
            <span>Sanitation Crews on Site</span>
          </div>
        </div>

        <div>
          <span className="impact-icon olive">
            <CheckCircle2 size={22} />
          </span>
          <div>
            <strong>{resolved}</strong>
            <span>Streets Fully Cleaned</span>
          </div>
        </div>

        <div className="impact-note">
          <ShieldCheck size={18} color="var(--olive)" />
          Synced with Sindh Solid Waste Management Board
        </div>
      </section>

      {/* 3-Step Interactive Process */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">SMART & ACCESSIBLE CIVIC TECH</div>
            <h2>How CleanStreet Works</h2>
            <p>From spotting an issue on your street to verified municipal resolution in 3 easy steps.</p>
          </div>
          <Link to="/about" className="text-link">
            Learn More About Architecture &rarr;
          </Link>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">
              <UploadCloud size={24} />
            </div>
            <h3>1. Snap & AI Classify</h3>
            <p>
              Take a quick photo of the waste pile. Our neural vision scanner instantly detects the debris category and calculates the urgency score.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon peach">
              <MapPin size={24} />
            </div>
            <h3>2. Real-Time GPS Pinning</h3>
            <p>
              Interactive OpenStreetMap pinpointing pinpoints the exact coordinates across Hyderabad so compactor trucks navigate directly to the site.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon olive">
              <Award size={24} />
            </div>
            <h3>3. Dispatch & Eco-Points</h3>
            <p>
              Municipal squads clear the site with photo proof. You earn Citizen Eco-Points and badges on the citywide leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Live City Map Preview */}
      <section className="section wrap" style={{ paddingTop: '20px' }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">GEOSPATIAL INTELLIGENCE</div>
            <h2>Live Incident Map of Hyderabad</h2>
            <p>Real-time OpenStreetMap coordinates of reported and active waste hotspots.</p>
          </div>
          <Link to="/map" className="button button-outline">
            Open Fullscreen City Map <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
          <RealMap reports={reports} height="400px" />
        </div>
      </section>

      {/* Recent Incidents Section */}
      <section className="section recent-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">CITIZEN COLLABORATION</div>
              <h2>Recent Community Reports</h2>
              <p>Support urgent reports in your neighborhood with an endorsement upvote.</p>
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

      {/* Bottom CTA Banner */}
      <section className="cta-band wrap">
        <div className="cta-symbol">
          <Leaf size={32} />
        </div>
        <div>
          <h2>Your Neighborhood Deserves Cleaner Streets.</h2>
          <p>Join fellow Hyderabad citizens in building a healthier, greener urban environment.</p>
        </div>
        <Link to="/report" className="button button-dark">
          Report an Issue Now <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
