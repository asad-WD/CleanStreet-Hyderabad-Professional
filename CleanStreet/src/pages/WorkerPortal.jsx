import { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  HardHat, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Upload, 
  Camera, 
  ArrowRight, 
  AlertTriangle,
  Calendar,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WorkerPortal({ reports, onUpdateReport }) {
  const { user, setIsAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned' | 'completed'
  const [resolvingReport, setResolvingReport] = useState(null);
  const [proofImage, setProofImage] = useState('');
  const [proofNote, setProofNote] = useState('');

  // Default worker squad or user's crew
  const myCrew = user?.crewName || 'SSWMB Rapid Response Squad Alpha';

  // Filter reports assigned to this crew (or show active tickets if demo)
  const myReports = reports.filter(r => 
    r.assignedCrew?.includes(myCrew) || r.assignedCrew === myCrew || !r.assignedCrew || r.assignedCrew.includes('Squad')
  );

  const assignedJobs = myReports.filter(r => r.status !== 'Resolved');
  const completedJobs = myReports.filter(r => r.status === 'Resolved');

  const handleStartCleanup = (id) => {
    onUpdateReport(id, {
      status: 'In Progress',
      history: [
        ...(reports.find(r => r.id === id)?.history || []),
        { status: 'In Progress', date: new Date().toISOString(), note: `Field Crew (${myCrew}) arrived on site.` }
      ]
    });
  };

  const handleCompleteCleanup = (e) => {
    e.preventDefault();
    if (!resolvingReport) return;

    onUpdateReport(resolvingReport.id, {
      status: 'Resolved',
      afterImage: proofImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      history: [
        ...(resolvingReport.history || []),
        { 
          status: 'Resolved', 
          date: new Date().toISOString(), 
          note: proofNote.trim() || `Site fully cleared and washed by ${myCrew}.` 
        }
      ]
    });

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setResolvingReport(null);
    setProofImage('');
    setProofNote('');
  };

  return (
    <div className="content-page">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '26px',
        boxShadow: '0 10px 25px rgba(234, 88, 12, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            <HardHat size={14} /> SANITATION FIELD CREW PORTAL
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '28px', margin: '0 0 6px', fontWeight: '800' }}>
            {user?.name || 'Sanitation Squad Lead'}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', margin: 0 }}>
            Assigned Squad: <strong>{myCrew}</strong> · Hyderabad Sector Central
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Switch User / Role
          </button>
        </div>
      </div>

      {/* Worker Metrics */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-top">
            <span>Pending Work-Orders</span>
            <span className="stat-icon peach"><Clock size={18} /></span>
          </div>
          <div className="stat-value">{assignedJobs.length}</div>
          <div className="stat-bottom">
            <span>Requiring on-site action</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>In Progress Cleanups</span>
            <span className="stat-icon sage"><Truck size={18} /></span>
          </div>
          <div className="stat-value">
            {assignedJobs.filter(j => j.status === 'In Progress').length}
          </div>
          <div className="stat-bottom">
            <span>Trucks & crew on site</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Completed Jobs</span>
            <span className="stat-icon olive"><CheckCircle2 size={18} /></span>
          </div>
          <div className="stat-value" style={{ color: '#16834a' }}>{completedJobs.length}</div>
          <div className="stat-bottom">
            <span>Verified clean</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('assigned')}
          style={{
            background: activeTab === 'assigned' ? '#ea580c' : 'transparent',
            color: activeTab === 'assigned' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Active Job Orders ({assignedJobs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          style={{
            background: activeTab === 'completed' ? '#16834a' : 'transparent',
            color: activeTab === 'completed' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Completed Cleanups ({completedJobs.length})
        </button>
      </div>

      {/* Job Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {(activeTab === 'assigned' ? assignedJobs : completedJobs).map((job) => (
          <div
            key={job.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: 'var(--shadow)',
              display: 'grid',
              gridTemplateColumns: '140px minmax(0, 1fr) auto',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            {/* Image Thumbnail */}
            <div
              style={{
                width: '140px',
                height: '110px',
                borderRadius: '12px',
                background: job.image ? `url(${job.image}) center/cover` : '#e2e8f0',
                position: 'relative'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
                background: 'rgba(0,0,0,0.7)',
                color: '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '9px',
                fontWeight: '800'
              }}>
                {job.id}
              </span>
            </div>

            {/* Info */}
            <div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span className={`badge urgency-${job.urgency.toLowerCase()}`}>{job.urgency} Urgency</span>
                <span className={`badge status-${job.status.toLowerCase().replaceAll(' ', '-')}`}>{job.status}</span>
                <span className="badge" style={{ background: 'var(--soft)' }}>{job.category}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 6px', color: 'var(--ink)' }}>
                {job.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>
                <MapPin size={14} color="#ea580c" />
                <strong>{job.area}</strong> · {job.landmark}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--ink)', margin: 0, lineHeight: '1.5' }}>
                {job.description}
              </p>
            </div>

            {/* Field Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
              <Link
                to={`/reports/${encodeURIComponent(job.id)}`}
                className="button button-outline"
                style={{ fontSize: '11px', padding: '6px 12px', minHeight: '34px' }}
              >
                Inspect Details &rarr;
              </Link>

              {job.status !== 'In Progress' && job.status !== 'Resolved' && (
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => handleStartCleanup(job.id)}
                  style={{ background: '#ea580c', fontSize: '11px', padding: '6px 12px', minHeight: '34px' }}
                >
                  <Truck size={14} /> Start Cleanup
                </button>
              )}

              {job.status === 'In Progress' && (
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setResolvingReport(job)}
                  style={{ background: '#16834a', fontSize: '11px', padding: '6px 12px', minHeight: '34px' }}
                >
                  <CheckCircle2 size={14} /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}

        {((activeTab === 'assigned' && assignedJobs.length === 0) || (activeTab === 'completed' && completedJobs.length === 0)) && (
          <div className="empty-state">
            <CheckCircle2 size={36} color="#16834a" style={{ margin: '0 auto 12px' }} />
            <h3>No Work-Orders in this queue</h3>
            <p>All scheduled cleanups for your squad have been completed.</p>
          </div>
        )}
      </div>

      {/* Complete / Proof Modal */}
      {resolvingReport && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setResolvingReport(null); }}>
          <form className="modal-card" onSubmit={handleCompleteCleanup}>
            <button type="button" className="modal-close icon-button" onClick={() => setResolvingReport(null)}>
              <X size={18} />
            </button>
            <div className="eyebrow">FIELD PROOF OF CLEANUP</div>
            <h2>Mark {resolvingReport.id} as Cleaned</h2>
            <p>Provide a field completion remark and optional after-photo to verify the cleanup.</p>

            <label className="field">
              <span>Field Clearance Notes</span>
              <textarea
                required
                rows={3}
                value={proofNote}
                onChange={(e) => setProofNote(e.target.value)}
                placeholder="e.g. Cleared 1.5 tons of debris, container emptied, disinfectant applied."
              />
            </label>

            <label className="field">
              <span>After-Cleanup Photo URL (Optional)</span>
              <input
                value={proofImage}
                onChange={(e) => setProofImage(e.target.value)}
                placeholder="Paste image URL (or leave blank to use verified clean photo)"
              />
            </label>

            <div className="form-actions">
              <button type="button" className="button button-ghost" onClick={() => setResolvingReport(null)}>
                Cancel
              </button>
              <button type="submit" className="button button-primary" style={{ background: '#16834a' }}>
                Confirm Verified Cleanup <CheckCircle2 size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
