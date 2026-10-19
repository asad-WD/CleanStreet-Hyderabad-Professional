import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Trash2, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Clock, 
  X, 
  Truck,
  Plus
} from 'lucide-react';
import { CREWS, STATUS_LIST, URGENCIES } from '../data/initialReports';

export default function AdminDashboard({ reports, onUpdateReport, onResetAll, onDeleteReport }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmModal, setConfirmModal] = useState(null);
  const [toast, setToast] = useState('');
  const [activities, setActivities] = useState([
    { id: 1, text: 'Admin reviewed incident CS-1048 and set priority to High', time: '10 mins ago' },
    { id: 2, text: 'SSWMB Rapid Response Squad dispatched to GOR Colony', time: '25 mins ago' }
  ]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const visibleReports = reports.filter((r) => {
    const matchesSearch = `${r.id} ${r.title} ${r.area} ${r.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handlePatch = (id, changes) => {
    const report = reports.find(r => r.id === id);
    if (!report) return;

    if (changes.status === 'Resolved' && report.status !== 'Resolved') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }

    const updatedHistory = [...(report.history || [])];
    if (changes.status && changes.status !== report.status) {
      updatedHistory.push({
        status: changes.status,
        date: new Date().toISOString(),
        note: `Status updated to ${changes.status} by Municipal Sanitation Dispatch.`
      });
    }

    onUpdateReport(id, {
      ...changes,
      history: updatedHistory
    });

    const actionText = changes.status 
      ? `Updated ${id} status to ${changes.status}`
      : changes.assignedCrew
      ? `Assigned crew to ${id}`
      : `Modified ${id} parameters`;

    setActivities(prev => [{ id: Date.now(), text: actionText, time: 'Just now' }, ...prev.slice(0, 5)]);
    setToast('Municipal record updated.');
  };

  const handleOpenEdit = (r) => {
    setEditingId(r.id);
    setEditForm({
      title: r.title,
      area: r.area,
      landmark: r.landmark,
      description: r.description,
      assignedCrew: r.assignedCrew || CREWS[0]
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingId) return;
    handlePatch(editingId, editForm);
    setEditingId(null);
  };

  return (
    <div className="content-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> MUNICIPAL CONTROL CENTER
          </div>
          <h1>Sanitation Dispatch & Admin Desk</h1>
          <p>
            Manage citizen waste incidents, allocate Sindh Solid Waste Management Board response crews, and progress cleanup work-orders.
          </p>
        </div>
        <div className="head-actions">
          <button type="button" className="button button-outline" onClick={() => setConfirmModal('reset')}>
            <RotateCcw size={15} /> Reset Demo Dataset
          </button>
        </div>
      </div>

      {/* Admin Notice */}
      <div className="admin-warning">
        <ShieldCheck size={22} />
        <div>
          <strong>Operational Dispatch Interface</strong>
          <p>
            You are operating the CleanStreet municipal supervisor portal. Changes directly synchronize with citizen dashboards and geospatial feeds.
          </p>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="stats-grid admin-stats">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Active Tickets</span>
            <span className="stat-icon olive"><Activity size={20} /></span>
          </div>
          <div className="stat-value">{reports.length}</div>
          <div className="stat-bottom">
            <span>Logged citywide</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Awaiting Review</span>
            <span className="stat-icon peach"><Clock size={20} /></span>
          </div>
          <div className="stat-value">
            {reports.filter(r => ['Reported', 'Under Review'].includes(r.status)).length}
          </div>
          <div className="stat-bottom">
            <span>Requires triage</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Resolved Cleanups</span>
            <span className="stat-icon sage"><CheckCircle2 size={20} /></span>
          </div>
          <div className="stat-value" style={{ color: '#16834a' }}>
            {reports.filter(r => r.status === 'Resolved').length}
          </div>
          <div className="stat-bottom">
            <span>Closed & verified</span>
          </div>
        </div>
      </div>

      {/* Admin Table Panel */}
      <section className="panel admin-panel">
        <div className="panel-heading">
          <div>
            <h2>Manage Incident Work-Orders ({visibleReports.length})</h2>
            <p>Assign sanitation teams, escalate urgency, and track status</p>
          </div>
        </div>

        <div className="admin-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, keyword, neighborhood..."
            />
          </div>

          <label className="inline-select">
            <Filter size={14} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Report ID & Summary</th>
                <th>Area</th>
                <th>Assigned Crew</th>
                <th>Urgency</th>
                <th>Municipal Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleReports.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="table-report">
                      <span className="table-thumb">
                        <Truck size={16} />
                      </span>
                      <span>
                        <strong>{r.title}</strong>
                        <small>{r.id} · {r.category}</small>
                      </span>
                    </div>
                  </td>
                  <td>{r.area}</td>
                  <td>
                    <select
                      className="table-select"
                      value={r.assignedCrew || CREWS[0]}
                      onChange={(e) => handlePatch(r.id, { assignedCrew: e.target.value })}
                    >
                      {CREWS.map(crew => <option key={crew} value={crew}>{crew}</option>)}
                    </select>
                  </td>
                  <td>
                    <select
                      className="table-select"
                      value={r.urgency}
                      onChange={(e) => handlePatch(r.id, { urgency: e.target.value })}
                    >
                      {URGENCIES.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </td>
                  <td>
                    <select
                      className="table-select"
                      style={{ fontWeight: '700', color: r.status === 'Resolved' ? '#16834a' : 'inherit' }}
                      value={r.status}
                      onChange={(e) => handlePatch(r.id, { status: e.target.value })}
                    >
                      {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => handleOpenEdit(r)}
                        title="Edit Details"
                      >
                        <SlidersHorizontal size={15} />
                      </button>
                      <Link
                        to={`/reports/${encodeURIComponent(r.id)}`}
                        className="icon-button"
                        title="View Incident Page"
                      >
                        <ArrowRight size={15} />
                      </Link>
                      <button
                        type="button"
                        className="icon-button danger-icon"
                        onClick={() => setConfirmModal(r.id)}
                        title="Delete Incident"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!visibleReports.length && (
            <div className="empty-mini">No reports match your current search criteria.</div>
          )}
        </div>
      </section>

      {/* Activity Stream */}
      <div className="admin-bottom-grid">
        <section className="panel" style={{ padding: '20px' }}>
          <div className="panel-heading">
            <div>
              <h2>Audit & Activity Log</h2>
              <p>Recent administrative actions recorded this session</p>
            </div>
            <Activity size={18} className="muted" />
          </div>
          <div className="activity-list">
            {activities.map(a => (
              <div key={a.id}>
                <span className="activity-dot" />
                <div>
                  <strong>{a.text}</strong>
                  <small>{a.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel reset-panel">
          <span className="reset-illustration">
            <RotateCcw size={24} />
          </span>
          <h2>Restore Seed Data</h2>
          <p>Reset all incidents back to the default Hyderabad dataset. Locally modified records will be refreshed.</p>
          <button type="button" className="button button-outline" onClick={() => setConfirmModal('reset')}>
            Reset All Records
          </button>
        </section>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditingId(null); }}>
          <form className="modal-card" onSubmit={handleSaveEdit}>
            <button type="button" className="modal-close icon-button" onClick={() => setEditingId(null)}>
              <X size={18} />
            </button>
            <div className="eyebrow">EDIT MUNICIPAL WORK-ORDER</div>
            <h2>Update Incident {editingId}</h2>
            <p>Modify incident metadata or assign specialized machinery.</p>

            <label className="field">
              <span>Incident Title</span>
              <input
                required
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </label>

            <label className="field">
              <span>Neighborhood / Area</span>
              <input
                required
                value={editForm.area || ''}
                onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
              />
            </label>

            <label className="field">
              <span>Street / Landmark</span>
              <input
                required
                value={editForm.landmark || ''}
                onChange={(e) => setEditForm({ ...editForm, landmark: e.target.value })}
              />
            </label>

            <label className="field">
              <span>Description / Inspection Notes</span>
              <textarea
                rows={3}
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </label>

            <div className="form-actions">
              <button type="button" className="button button-ghost" onClick={() => setEditingId(null)}>
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Save Work-Order Changes <Check size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="modal-backdrop">
          <div className="modal-card confirm-card">
            <span className="confirm-icon">
              <AlertTriangle size={24} />
            </span>
            <h2>{confirmModal === 'reset' ? 'Reset All Data?' : 'Delete Incident Record?'}</h2>
            <p>
              {confirmModal === 'reset'
                ? 'This will restore the original Hyderabad dataset and clear newly created reports.'
                : 'This incident will be permanently deleted from the active municipal database.'}
            </p>
            <div className="form-actions">
              <button type="button" className="button button-ghost" onClick={() => setConfirmModal(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  if (confirmModal === 'reset') {
                    onResetAll();
                    setToast('Default Hyderabad dataset restored.');
                  } else {
                    onDeleteReport(confirmModal);
                    setToast('Incident record removed.');
                  }
                  setConfirmModal(null);
                }}
              >
                {confirmModal === 'reset' ? 'Confirm Reset' : 'Confirm Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
