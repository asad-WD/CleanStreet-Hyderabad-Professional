import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Leaf, 
  Cpu, 
  MapPin, 
  Award, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Code2
} from 'lucide-react';

export default function About() {
  return (
    <div className="public-page">
      <div className="wrap about-page">
        <div className="about-hero">
          <div className="eyebrow">ACADEMIC & CIVIC SOFTWARE ENGINEERING PROJECT</div>
          <h1>
            Cleaner Streets are a<br />
            <em>Shared Civic Responsibility.</em>
          </h1>
          <p>
            CleanStreet is a modern civic-technology web application engineered to streamline community waste reporting, automate image classification through AI vision triage, and assist municipal authorities in transparent dispatching across Hyderabad, Sindh.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/report" className="button button-primary">
              Make a Report <ArrowRight size={16} />
            </Link>
            <Link to="/map" className="button button-outline">
              Explore City Map
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="about-grid">
          <article>
            <span className="about-icon">
              <Cpu size={24} />
            </span>
            <h2>AI Vision Triage</h2>
            <p>
              Integrated client-side computer vision heuristics analyze uploaded waste photos to estimate severity index, classify material composition (PET plastics, demolition rubble, organics), and prioritize emergency municipal response.
            </p>
          </article>

          <article>
            <span className="about-icon peach">
              <MapPin size={24} />
            </span>
            <h2>Geospatial GIS Engine</h2>
            <p>
              Powered by OpenStreetMap and Leaflet, reports are plotted with sub-meter GPS accuracy across Hyderabad districts (Qasimabad, Latifabad, GOR Colony, Auto Bhan, Saddar) with satellite view switching.
            </p>
          </article>

          <article>
            <span className="about-icon olive">
              <Award size={24} />
            </span>
            <h2>Citizen Gamification</h2>
            <p>
              Citizens earn Eco-Points and community achievement badges for logging verified reports and endorsing critical neighborhood issues, driving civic accountability.
            </p>
          </article>
        </div>

        {/* System Architecture */}
        <section className="about-work">
          <div>
            <div className="eyebrow">SYSTEM ARCHITECTURE</div>
            <h2>
              Engineered for Speed,<br />
              Reliability & Scalability.
            </h2>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted)' }}>
              Built as a modern Single Page Application (SPA) leveraging client-side reactive state management, asynchronous browser storage, and modular component hierarchy.
            </p>
          </div>

          <div className="about-work-steps">
            <div>
              <b>01</b>
              <span>
                <strong>Frontend Presentation Tier</strong>
                <small>React 18 with Vite bundling, Lucide SVG iconography, and responsive design.</small>
              </span>
            </div>

            <div>
              <b>02</b>
              <span>
                <strong>Analytics & Telemetry</strong>
                <small>Recharts library rendering live Area, Donut, and Bar charts with SLA tracking.</small>
              </span>
            </div>

            <div>
              <b>03</b>
              <span>
                <strong>Geospatial Mapping</strong>
                <small>Leaflet GIS integration with real GPS coordinates, drag-and-drop location pinning, and custom status-coded markers.</small>
              </span>
            </div>
          </div>
        </section>

        {/* Academic Note */}
        <div className="limitation-note">
          <ShieldCheck size={28} />
          <div>
            <strong>Software Engineering Course Project Prototype</strong>
            <p>
              Developed as a 3rd Semester Software Engineering demonstration project for community waste monitoring in Hyderabad, Pakistan. All reports and cleanup dispatch workflows are simulated locally using browser persistence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
