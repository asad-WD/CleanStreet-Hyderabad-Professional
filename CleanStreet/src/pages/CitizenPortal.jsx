import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Award, 
  Plus, 
  ThumbsUp, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Shield 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReportCard from '../components/ReportCard';

export default function CitizenPortal({ reports, ecoPoints, onUpvote }) {
  const { user, setIsAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('my-reports'); // 'my-reports' | 'endorsed'

  // Reports submitted by citizen or upvoted by citizen
  const myReports = reports.filter(r => r.id === 'CS-1048' || r.id === 'CS-1053' || r.upvotedByMe);
  const endorsedReports = reports.filter(r => r.upvotedByMe);

  return (
    <div className="content-page">
      {/* Citizen Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '26px',
        boxShadow: '0 10px 25px rgba(2, 132, 199, 0.25)',
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
            <User size={14} /> CITIZEN CIVIC PROFILE
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '28px', margin: '0 0 6px', fontWeight: '800' }}>
            {user?.name || 'Asad Qazi'}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', margin: 0 }}>
            {user?.email || 'asad.qazi@hyderabad.pk'} · {user?.neighborhood || 'Qasimabad, Hyderabad'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '14px',
            padding: '12px 18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: '700' }}>Eco Points</div>
            <div style={{ fontSize: '24px', fontWeight: '800' }}>🌱 {ecoPoints}</div>
          </div>

          <Link to="/report" className="button button-primary" style={{ background: '#ffffff', color: '#0369a1' }}>
            <Plus size={16} /> Report Issue
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('my-reports')}
          style={{
            background: activeTab === 'my-reports' ? '#0284c7' : 'transparent',
            color: activeTab === 'my-reports' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          My Tracked Reports ({myReports.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('endorsed')}
          style={{
            background: activeTab === 'endorsed' ? '#0284c7' : 'transparent',
            color: activeTab === 'endorsed' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Endorsed by Me ({endorsedReports.length})
        </button>
      </div>

      {/* Reports Display */}
      <div className="report-grid">
        {(activeTab === 'my-reports' ? myReports : endorsedReports).map((r) => (
          <ReportCard key={r.id} report={r} onUpvote={onUpvote} />
        ))}
      </div>
    </div>
  );
}
