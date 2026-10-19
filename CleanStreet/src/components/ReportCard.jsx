import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, ThumbsUp, Clock, AlertTriangle, ShieldCheck, Recycle } from 'lucide-react';

export default function ReportCard({ report, compact = false, onUpvote }) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('a, button')) return;
    navigate(`/reports/${encodeURIComponent(report.id)}`);
  };

  const handleUpvoteClick = (e) => {
    e.stopPropagation();
    if (onUpvote) onUpvote(report.id);
  };

  const urgencyClass = `urgency-${report.urgency ? report.urgency.toLowerCase() : 'medium'}`;
  const statusClass = `status-${report.status ? report.status.toLowerCase().replaceAll(' ', '-') : 'reported'}`;

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/reports/${encodeURIComponent(report.id)}`);
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`View report ${report.title}`}
      className={`report-card ${compact ? 'report-card-compact' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="report-image"
        style={{ backgroundImage: report.image ? `url(${report.image})` : undefined }}
      >
        {!report.image && (
          <div className="image-placeholder">
            <Recycle size={34} />
            <span>COMMUNITY REPORT</span>
          </div>
        )}
        <span className="image-id">{report.id}</span>
        
        {report.slaDeadline && (
          <span style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(32, 45, 40, 0.85)',
            color: '#ffffff',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(4px)'
          }}>
            <Clock size={11} /> {report.slaDeadline}
          </span>
        )}
      </div>

      <div className="report-card-body">
        <div className="report-card-tags">
          <span className={`badge ${urgencyClass}`}>{report.urgency} Urgency</span>
          <span className={`badge ${statusClass}`}>{report.status}</span>
          <span className="badge" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
            {report.category}
          </span>
        </div>

        <Link to={`/reports/${encodeURIComponent(report.id)}`} className="report-title">
          {report.title}
        </Link>

        <div className="report-location">
          <MapPin size={15} />
          <span>{report.area} · {report.landmark}</span>
        </div>

        <div className="report-card-footer">
          <button
            type="button"
            onClick={handleUpvoteClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: report.upvotedByMe ? 'var(--olive)' : 'var(--soft)',
              color: report.upvotedByMe ? '#ffffff' : 'var(--ink)',
              border: '1px solid var(--line)',
              padding: '5px 10px',
              borderRadius: '7px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Endorse this civic report to raise municipal priority"
          >
            <ThumbsUp size={12} fill={report.upvotedByMe ? '#ffffff' : 'none'} />
            <span>{report.upvotes || 0} Endorsements</span>
          </button>

          <Link to={`/reports/${encodeURIComponent(report.id)}`} className="text-link">
            Track Progress <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
