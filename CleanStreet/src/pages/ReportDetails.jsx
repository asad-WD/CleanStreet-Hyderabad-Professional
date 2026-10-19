import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ThumbsUp, 
  Share2, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Recycle, 
  Users,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import RealMap from '../components/RealMap';
import ReportCard from '../components/ReportCard';

export default function ReportDetails({ reports, onUpvote, onAddComment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  let decodedId = id || '';
  try {
    decodedId = decodeURIComponent(decodedId);
  } catch {}

  const report = reports.find(r => String(r.id) === String(decodedId));

  if (!report) {
    return (
      <div className="content-page">
        <div className="empty-state">
          <AlertTriangle size={36} color="var(--terracotta)" />
          <h2>Report Not Found</h2>
          <p>This incident report may have been archived or the ID is incorrect.</p>
          <Link to="/reports" className="button button-primary">Back to Reports</Link>
        </div>
      </div>
    );
  }

  const timelineSteps = ['Reported', 'Under Review', 'Cleanup Scheduled', 'In Progress', 'Resolved'];
  const currentStepIndex = timelineSteps.indexOf(report.status);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (onAddComment) {
      onAddComment(report.id, {
        id: `c_${Date.now()}`,
        author: commentAuthor.trim() || 'Civic Resident',
        text: commentText.trim(),
        date: 'Just now',
        isOfficial: false
      });
    }
    setCommentText('');
  };

  const relatedReports = reports.filter(r => r.id !== report.id && r.area === report.area).slice(0, 3);

  return (
    <div className="content-page">
      <Link to="/reports" className="back-link">
        <ChevronLeft size={16} /> Back to Community Reports
      </Link>

      <div className="details-layout">
        {/* Main Details Panel */}
        <div className="details-main">
          {/* Header Photo or After Photo Banner */}
          <div className="details-hero" style={report.image ? { backgroundImage: `url(${report.image})` } : {}}>
            {!report.image && (
              <div className="image-placeholder">
                <Recycle size={56} />
                <span>CLEANSTREET VERIFIED INCIDENT</span>
              </div>
            )}
            <span className="image-id">{report.id}</span>

            {report.status === 'Resolved' && report.afterImage && (
              <div style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: '#16834a',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}>
                <CheckCircle2 size={14} /> Cleanup Verified
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="details-title-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div className="report-card-tags" style={{ marginBottom: '8px' }}>
                  <span className={`badge urgency-${report.urgency.toLowerCase()}`}>{report.urgency} Urgency</span>
                  <span className={`badge status-${report.status.toLowerCase().replaceAll(' ', '-')}`}>{report.status}</span>
                  <span className="badge" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>{report.category}</span>
                </div>
                <h1>{report.title}</h1>
                <div className="report-location" style={{ fontSize: '14px', marginTop: '4px' }}>
                  <MapPin size={16} color="var(--olive)" />
                  {report.area} · {report.landmark}
                </div>
              </div>

              {/* Endorse & Share Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => onUpvote && onUpvote(report.id)}
                  className="button"
                  style={{
                    background: report.upvotedByMe ? 'var(--olive)' : 'var(--soft)',
                    color: report.upvotedByMe ? '#ffffff' : 'var(--ink)',
                    border: '1px solid var(--line)'
                  }}
                >
                  <ThumbsUp size={15} fill={report.upvotedByMe ? '#ffffff' : 'none'} />
                  {report.upvotedByMe ? 'Endorsed' : 'Endorse'} ({report.upvotes || 0})
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="button button-outline"
                >
                  {copied ? <Check size={15} color="var(--olive)" /> : <Share2 size={15} />}
                  {copied ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <section className="detail-section">
            <h2>Incident Observation</h2>
            <p>{report.description}</p>

            <div className="detail-meta">
              <div>
                <span>Assigned Municipal Crew</span>
                <strong>{report.assignedCrew || 'Awaiting Squad Allocation'}</strong>
              </div>
              <div>
                <span>Resolution SLA</span>
                <strong style={{ color: 'var(--olive)' }}>{report.slaDeadline || 'Standard 48h SLA'}</strong>
              </div>
              <div>
                <span>Date Logged</span>
                <strong>{new Date(report.date + 'T12:00:00').toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
              </div>
            </div>
          </section>

          {/* Workflow Progress Timeline */}
          <section className="detail-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2>Municipal Resolution Pipeline</h2>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Synced with SSWMB Dispatch</span>
            </div>

            <div className="timeline">
              {timelineSteps.map((step, idx) => {
                const isComplete = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={step}
                    className={`timeline-step ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <span className="timeline-dot">
                      {idx < currentStepIndex ? <Check size={13} /> : idx + 1}
                    </span>
                    <div>
                      <strong>{step}</strong>
                      <small>
                        {idx < currentStepIndex ? 'Completed' : isCurrent ? 'Active Stage' : 'Upcoming'}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Citizen Comments & Updates Thread */}
          <section className="detail-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Users size={18} color="var(--olive)" />
              <h2>Community Feed & Verification ({report.comments?.length || 0})</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {report.comments && report.comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: c.isOfficial ? 'rgba(22, 131, 74, 0.08)' : 'var(--soft)',
                    border: c.isOfficial ? '1px solid rgba(22, 131, 74, 0.3)' : '1px solid var(--line)',
                    padding: '12px 14px',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--ink)' }}>{c.author}</strong>
                      {c.isOfficial && (
                        <span style={{ fontSize: '9px', background: 'var(--olive)', color: '#ffffff', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>
                          OFFICIAL DISPATCH
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{c.date}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink)', margin: 0, lineHeight: '1.5' }}>
                    {c.text}
                  </p>
                </div>
              ))}

              {(!report.comments || report.comments.length === 0) && (
                <div style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '14px' }}>
                  No comments yet. Have an update or verified the cleanup? Share your comment below.
                </div>
              )}
            </div>

            {/* Add Comment Box */}
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <input
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your Name (Optional)"
                  style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: '12px', color: 'var(--ink)' }}
                />
                <input
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a community remark or status update..."
                  style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: '12px', color: 'var(--ink)' }}
                />
              </div>
              <button
                type="submit"
                className="button button-primary"
                style={{ alignSelf: 'flex-end', minHeight: '38px', padding: '8px 16px', fontSize: '12px' }}
              >
                <Send size={13} /> Post Update
              </button>
            </form>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="details-side">
          {/* Status Box */}
          <div className="side-info-card">
            <h3>Municipal Status</h3>
            <span className={`badge status-${report.status.toLowerCase().replaceAll(' ', '-')}`} style={{ margin: '8px 0' }}>
              {report.status}
            </span>
            <p>
              Citizens can escalate urgency by endorsing this report. For administrative status changes and crew assignments, visit the municipal portal.
            </p>
            <Link to="/admin" className="button button-outline button-full">
              Open Admin Desk &rarr;
            </Link>
          </div>

          {/* Interactive Mini Map */}
          <div className="side-info-card" style={{ padding: '14px' }}>
            <h3 style={{ marginBottom: '10px' }}>
              <MapPin size={16} /> GPS Incident Pin
            </h3>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', marginBottom: '10px' }}>
              <RealMap
                reports={[report]}
                selectedReportId={report.id}
                singleCenter={[report.lat || 25.396, report.lng || 68.3578]}
                singleZoom={15}
                height="220px"
              />
            </div>
            <strong style={{ fontSize: '12px' }}>{report.area}</strong>
            <p style={{ margin: '4px 0 10px', fontSize: '11px' }}>{report.landmark}</p>
            <Link to="/map" className="text-link" style={{ fontSize: '11px' }}>
              View in Fullscreen City Map &rarr;
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Reports in Same Area */}
      {relatedReports.length > 0 && (
        <div>
          <div className="section-head related-head">
            <div>
              <h2>Nearby Reports in {report.area}</h2>
              <p>Other active incidents submitted in this neighborhood.</p>
            </div>
            <Link to="/reports" className="text-link">Browse All &rarr;</Link>
          </div>
          <div className="report-grid">
            {relatedReports.map(r => (
              <ReportCard key={r.id} report={r} onUpvote={onUpvote} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
