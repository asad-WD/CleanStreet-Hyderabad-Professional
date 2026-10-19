import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Shield, CheckCircle2, Trophy, Sparkles, TrendingUp, Users, ArrowRight, Heart } from 'lucide-react';
import { CITIZEN_ACHIEVEMENTS } from '../data/initialReports';

export default function Leaderboard({ ecoPoints, reports = [] }) {
  const [activeTab, setActiveTab] = useState('badges');

  // Calculate neighborhood rankings
  const neighborhoodStats = reports.reduce((acc, r) => {
    if (!acc[r.area]) acc[r.area] = { total: 0, resolved: 0 };
    acc[r.area].total += 1;
    if (r.status === 'Resolved') acc[r.area].resolved += 1;
    return acc;
  }, {});

  const neighborhoodRankings = Object.entries(neighborhoodStats)
    .map(([area, stats]) => ({
      area,
      total: stats.total,
      resolved: stats.resolved,
      score: Math.round(((stats.resolved * 1.5 + stats.total * 0.5) / 10) * 100) + 120
    }))
    .sort((a, b) => b.score - a.score);

  const topCitizens = [
    { rank: 1, name: 'Asad Qazi (You)', points: ecoPoints, badge: 'Eco Guardian', verifiedReports: 7, avatar: 'AQ' },
    { rank: 2, name: 'Dr. Tariq Memon', points: 420, badge: 'Canal Protector', verifiedReports: 12, avatar: 'TM' },
    { rank: 3, name: 'Farzana Baloch', points: 380, badge: 'School Zone Hero', verifiedReports: 9, avatar: 'FB' },
    { rank: 4, name: 'Bilal Khan', points: 310, badge: 'Footpath Cleaner', verifiedReports: 6, avatar: 'BK' },
    { rank: 5, name: 'Ayesha Siddiqui', points: 260, badge: 'Street Ambassador', verifiedReports: 5, avatar: 'AS' }
  ];

  return (
    <div className="content-page">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #16834a 0%, #1598c9 100%)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '36px 30px',
        marginBottom: '28px',
        boxShadow: '0 12px 30px rgba(22, 131, 74, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Trophy size={13} /> Hyderabad Citizen Civic Action
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '32px', marginBottom: '8px', lineHeight: '1.2' }}>
            Eco-Warrior Leaderboard
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Every report filed, endorsed, or verified earns you community recognition and helps the Sindh Solid Waste Management Board prioritize emergency cleanups.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          padding: '20px 24px',
          textAlign: 'center',
          minWidth: '180px'
        }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>Your Eco Score</div>
          <div style={{ fontSize: '38px', fontWeight: '800', margin: '4px 0' }}>{ecoPoints}</div>
          <div style={{ fontSize: '11px', opacity: 0.9 }}>Level 3 Community Guardian</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('badges')}
          style={{
            background: activeTab === 'badges' ? 'var(--olive)' : 'transparent',
            color: activeTab === 'badges' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '9px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          My Badges & Achievements
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('citizens')}
          style={{
            background: activeTab === 'citizens' ? 'var(--olive)' : 'transparent',
            color: activeTab === 'citizens' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '9px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Top Citizen Contributors
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('neighborhoods')}
          style={{
            background: activeTab === 'neighborhoods' ? 'var(--olive)' : 'transparent',
            color: activeTab === 'neighborhoods' ? '#ffffff' : 'var(--muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '9px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Hyderabad Neighborhood Cleanliness Index
        </button>
      </div>

      {/* Tab: Badges */}
      {activeTab === 'badges' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {CITIZEN_ACHIEVEMENTS.map((badge) => (
            <div
              key={badge.id}
              style={{
                background: 'var(--surface)',
                border: badge.unlocked ? '2px solid var(--sage)' : '1px solid var(--line)',
                borderRadius: '16px',
                padding: '22px',
                boxShadow: 'var(--shadow)',
                position: 'relative',
                opacity: badge.unlocked ? 1 : 0.65
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: badge.unlocked ? 'var(--soft)' : '#f0ecdf',
                  color: badge.unlocked ? 'var(--olive)' : 'var(--muted)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Award size={24} />
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: badge.unlocked ? '#dcfce7' : '#f1efe5',
                  color: badge.unlocked ? '#15803d' : '#827e71'
                }}>
                  {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{badge.name}</h3>
              <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--muted)', marginBottom: '16px' }}>
                {badge.description}
              </p>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--olive)' }}>
                +{badge.points} Eco Points Earned
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Citizens */}
      {activeTab === 'citizens' && (
        <div className="panel" style={{ padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', fontSize: '11px', color: 'var(--muted)' }}>
                <th style={{ padding: '12px 10px' }}>Rank</th>
                <th style={{ padding: '12px 10px' }}>Citizen</th>
                <th style={{ padding: '12px 10px' }}>Honorary Title</th>
                <th style={{ padding: '12px 10px' }}>Verified Reports</th>
                <th style={{ padding: '12px 10px' }}>Eco Points</th>
              </tr>
            </thead>
            <tbody>
              {topCitizens.map((c) => (
                <tr key={c.rank} style={{ borderBottom: '1px solid var(--line)', fontSize: '13px' }}>
                  <td style={{ padding: '14px 10px', fontWeight: '800' }}>
                    {c.rank === 1 ? '🥇 1' : c.rank === 2 ? '🥈 2' : c.rank === 3 ? '🥉 3' : `#${c.rank}`}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--olive)', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: '800' }}>
                        {c.avatar}
                      </div>
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span style={{ fontSize: '11px', background: 'var(--soft)', padding: '4px 8px', borderRadius: '6px', color: 'var(--olive)', fontWeight: '700' }}>
                      {c.badge}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>{c.verifiedReports} issues</td>
                  <td style={{ padding: '14px 10px', fontWeight: '800', color: '#16834a' }}>{c.points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Neighborhoods */}
      {activeTab === 'neighborhoods' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '14px' }}>Hyderabad Neighborhood Responsiveness Ranking</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {neighborhoodRankings.map((n, i) => (
              <div key={n.area} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', width: '28px', color: 'var(--muted)' }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    <span>{n.area}</span>
                    <span>{n.resolved} of {n.total} Resolved ({Math.round(n.total ? (n.resolved / n.total) * 100 : 0)}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--soft)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.max(10, Math.round(n.total ? (n.resolved / n.total) * 100 : 0))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #a5c934, #16834a)',
                      borderRadius: '10px'
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
