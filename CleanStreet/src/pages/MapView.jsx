import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Layers, Search, ChevronRight, AlertTriangle, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import RealMap from '../components/RealMap';
import { HYDERABAD_AREAS, WASTE_CATEGORIES, STATUS_LIST } from '../data/initialReports';

export default function MapView({ reports }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchArea, setSearchArea] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter((r) => {
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchArea = !searchArea || `${r.area} ${r.landmark} ${r.title}`.toLowerCase().includes(searchArea.toLowerCase());
    return matchCat && matchStatus && matchArea;
  });

  return (
    <div className="content-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> LIVE CIVIC GPS EXPLORER
          </div>
          <h1>Hyderabad Real-Time Waste Map</h1>
          <p>
            Interactive geospatial overview of waste incidents across Hyderabad neighborhoods powered by OpenStreetMap GPS coordinates.
          </p>
        </div>
        <div className="head-actions">
          <Link to="/report" className="button button-primary">
            <Plus size={16} /> Pin New Issue
          </Link>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-panel" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-box" style={{ flex: '1 1 240px' }}>
          <Search size={16} />
          <input
            value={searchArea}
            onChange={(e) => setSearchArea(e.target.value)}
            placeholder="Search neighborhood (e.g. Qasimabad, GOR, Latifabad)..."
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: '12px', color: 'var(--ink)' }}
        >
          <option value="All">All Categories ({reports.length})</option>
          {WASTE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: '12px', color: 'var(--ink)' }}
        >
          <option value="All">All Statuses</option>
          {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <div style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '700', color: 'var(--olive)' }}>
          {filteredReports.length} incidents pinned
        </div>
      </div>

      {/* Map Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '18px', marginTop: '16px' }}>
        {/* Real Leaflet Map */}
        <div style={{ minHeight: '600px', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
          <RealMap
            reports={filteredReports}
            selectedReportId={selectedReport?.id}
            onSelectReport={(report) => setSelectedReport(report)}
            height="620px"
          />
        </div>

        {/* Sidebar List */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '620px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Incident Feed ({filteredReports.length})</h2>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Click pin or item to inspect</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {filteredReports.map((r) => {
              const isSelected = selectedReport?.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReport(r)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid var(--olive)' : '1px solid var(--line)',
                    background: isSelected ? 'var(--soft)' : 'var(--surface)',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--olive)' }}>{r.id}</span>
                    <span className={`badge status-${r.status.toLowerCase().replaceAll(' ', '-')}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                      {r.status}
                    </span>
                  </div>

                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--ink)', marginBottom: '4px', lineHeight: '1.3' }}>
                    {r.title}
                  </strong>

                  <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <MapPin size={12} color="var(--olive)" />
                    {r.area} · {r.landmark}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Endorsed: {r.upvotes}</span>
                    <Link to={`/reports/${encodeURIComponent(r.id)}`} className="text-link" style={{ fontSize: '11px' }}>
                      Full Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}

            {!filteredReports.length && (
              <div style={{ textAlign: 'center', padding: '40px 15px', color: 'var(--muted)' }}>
                <MapPin size={32} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                <p style={{ fontSize: '13px', margin: 0 }}>No waste incidents found matching these filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
