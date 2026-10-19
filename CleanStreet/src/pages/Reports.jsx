import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  ListFilter, 
  Plus, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import ReportCard from '../components/ReportCard';
import { WASTE_CATEGORIES, STATUS_LIST, URGENCIES } from '../data/initialReports';

export default function Reports({ reports, onUpvote }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All categories');
  const [status, setStatus] = useState('All statuses');
  const [urgency, setUrgency] = useState('All urgency');
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    return reports
      .filter((r) => {
        const query = `${r.title} ${r.id} ${r.area} ${r.landmark} ${r.description}`.toLowerCase();
        const matchesSearch = query.includes(search.toLowerCase());
        const matchesCat = cat === 'All categories' || r.category === cat;
        const matchesStatus = status === 'All statuses' || r.status === status;
        const matchesUrgency = urgency === 'All urgency' || r.urgency === urgency;
        return matchesSearch && matchesCat && matchesStatus && matchesUrgency;
      })
      .sort((a, b) => {
        if (sort === 'most-upvoted') return (b.upvotes || 0) - (a.upvotes || 0);
        if (sort === 'urgency') {
          const weights = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return (weights[b.urgency] || 0) - (weights[a.urgency] || 0);
        }
        if (sort === 'oldest') return (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0);
        return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0);
      });
  }, [reports, search, cat, status, urgency, sort]);

  const resetFilters = () => {
    setSearch('');
    setCat('All categories');
    setStatus('All statuses');
    setUrgency('All urgency');
    setSort('newest');
  };

  return (
    <div className="content-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">HYDERABAD CIVIC INTELLIGENCE</div>
          <h1>Explore Community Reports</h1>
          <p>
            Browse real-time waste incidents reported by citizens across Hyderabad, monitor municipal cleanup stages, and endorse urgent issues.
          </p>
        </div>
        <div className="head-actions">
          <Link to="/report" className="button button-primary">
            <Plus size={16} /> New Report
          </Link>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by neighborhood, report ID, street or keyword..."
            aria-label="Search reports"
          />
          {search && (
            <button onClick={() => setSearch('')} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="filters-row">
          <label>
            <span>Waste Category</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option>All categories</option>
              {WASTE_CATEGORIES.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>

          <label>
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All statuses</option>
              {STATUS_LIST.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>

          <label>
            <span>Urgency</span>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
              <option>All urgency</option>
              {URGENCIES.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>

          <label>
            <span>Sort By</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="most-upvoted">Most Endorsed</option>
              <option value="urgency">Highest Urgency</option>
              <option value="oldest">Oldest First</option>
            </select>
          </label>

          <button className="button button-ghost reset-button" onClick={resetFilters} title="Reset filters">
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="results-toolbar">
        <span>
          Showing <strong>{filtered.length}</strong> of <strong>{reports.length}</strong> incidents
        </span>
        <div className="view-toggle">
          <button
            className={view === 'grid' ? 'selected' : ''}
            onClick={() => setView('grid')}
            aria-label="Grid view"
            title="Grid view"
          >
            <SlidersHorizontal size={15} />
          </button>
          <button
            className={view === 'list' ? 'selected' : ''}
            onClick={() => setView('list')}
            aria-label="List view"
            title="List view"
          >
            <ListFilter size={15} />
          </button>
        </div>
      </div>

      {/* Reports Grid / List */}
      {filtered.length > 0 ? (
        <div className={view === 'grid' ? 'report-grid' : 'report-list'}>
          {filtered.map(r => (
            <ReportCard key={r.id} report={r} compact={view === 'list'} onUpvote={onUpvote} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={32} style={{ color: 'var(--muted)', margin: '0 auto 12px' }} />
          <h3>No matching civic reports</h3>
          <p>Try refining your search keyword or clearing the filters.</p>
          <button className="button button-outline" onClick={resetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
