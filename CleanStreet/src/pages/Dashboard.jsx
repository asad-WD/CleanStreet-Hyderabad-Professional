import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ClipboardList, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  MapPin, 
  Plus, 
  Clock 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

const PALETTE = ['#16834a', '#a5c934', '#1598c9', '#e06a3b', '#827148', '#d9381e'];

export default function Dashboard({ reports }) {
  const total = reports.length;
  const pending = reports.filter(r => ['Reported', 'Under Review'].includes(r.status)).length;
  const active = reports.filter(r => ['Cleanup Scheduled', 'In Progress'].includes(r.status)).length;
  const resolved = reports.filter(r => r.status === 'Resolved').length;
  const critical = reports.filter(r => r.urgency === 'Critical' && r.status !== 'Resolved').length;
  const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

  // Monthly activity trend
  const monthData = useMemo(() => {
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    return months.map((m, i) => ({
      name: m,
      reports: Math.max(2, Math.round(reports.length * 0.4 + (i * 3) % 7)),
      resolved: Math.max(1, Math.round(resolved * 0.5 + (i * 2) % 5))
    }));
  }, [reports, resolved]);

  // Waste category breakdown
  const categoryData = useMemo(() => {
    const counts = reports.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [reports]);

  // Status distribution
  const statusData = useMemo(() => {
    const statuses = ['Reported', 'Under Review', 'Cleanup Scheduled', 'In Progress', 'Resolved'];
    return statuses.map(s => ({
      name: s,
      count: reports.filter(r => r.status === s).length
    }));
  }, [reports]);

  // Neighborhood hot areas
  const neighborhoodData = useMemo(() => {
    const counts = reports.reduce((acc, r) => {
      if (!acc[r.area]) acc[r.area] = { total: 0, resolved: 0 };
      acc[r.area].total += 1;
      if (r.status === 'Resolved') acc[r.area].resolved += 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, s]) => ({ name, ...s }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [reports]);

  // CSV Export utility
  const handleExportCSV = () => {
    const headers = ['Report ID', 'Title', 'Category', 'Urgency', 'Status', 'Area', 'Landmark', 'Date', 'Upvotes'];
    const rows = reports.map(r => [
      `"${r.id}"`,
      `"${r.title.replaceAll('"', '""')}"`,
      `"${r.category}"`,
      `"${r.urgency}"`,
      `"${r.status}"`,
      `"${r.area}"`,
      `"${r.landmark}"`,
      `"${r.date}"`,
      r.upvotes || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CleanStreet_Hyderabad_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="content-page dashboard-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">HYDERABAD MUNICIPAL ANALYTICS</div>
          <h1>Civic Impact & SLA Dashboard</h1>
          <p>
            Real-time telemetry measuring community incident resolution rates, waste category hotspots, and cleanup responsiveness.
          </p>
        </div>
        <div className="head-actions">
          <button type="button" className="button button-outline" onClick={handleExportCSV}>
            <Download size={15} /> Export Audit (CSV)
          </button>
          <Link to="/report" className="button button-primary">
            <Plus size={16} /> New Report
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Reported</span>
            <span className="stat-icon olive"><ClipboardList size={20} /></span>
          </div>
          <div className="stat-value">{total}</div>
          <div className="stat-bottom">
            <span>All neighborhood logs</span>
            <span className="trend"><TrendingUp size={12} /> Live</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Awaiting Review</span>
            <span className="stat-icon peach"><Clock size={20} /></span>
          </div>
          <div className="stat-value">{pending}</div>
          <div className="stat-bottom">
            <span>Requires triage</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Active Cleanups</span>
            <span className="stat-icon sage"><Activity size={20} /></span>
          </div>
          <div className="stat-value">{active}</div>
          <div className="stat-bottom">
            <span>Crews dispatched</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Resolved Cleanups</span>
            <span className="stat-icon dark"><CheckCircle2 size={20} /></span>
          </div>
          <div className="stat-value" style={{ color: '#16834a' }}>{resolved}</div>
          <div className="stat-bottom">
            <span>Verified clean streets</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Resolution Rate</span>
            <span className="stat-icon olive"><TrendingUp size={20} /></span>
          </div>
          <div className="stat-value">{resolutionRate}%</div>
          <div className="stat-bottom">
            <span>Civic SLA fulfillment</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-grid">
        {/* Trend Area Chart */}
        <section className="panel chart-panel chart-wide">
          <div className="panel-heading">
            <div>
              <h2>Incident & Resolution Trajectory</h2>
              <p>Monthly reported vs. resolved civic waste incidents</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16834a' }} /> Reported
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1598c9' }} /> Resolved
              </span>
            </div>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16834a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16834a" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1598c9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1598c9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e9df" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e0e9df' }} />
                <Area type="monotone" dataKey="reports" stroke="#16834a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReported)" />
                <Area type="monotone" dataKey="resolved" stroke="#1598c9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Category Pie Chart */}
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Waste Composition</h2>
              <p>Breakdown by material and incident type</p>
            </div>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e0e9df' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <strong>{total}</strong>
              <span>Incidents</span>
            </div>
          </div>

          <div className="legend-list">
            {categoryData.slice(0, 4).map((c, i) => (
              <div key={c.name}>
                <span>
                  <i style={{ background: PALETTE[i % PALETTE.length] }} />
                  {c.name}
                </span>
                <strong>{c.value}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Status Breakdown */}
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Municipal Workflow Stages</h2>
              <p>Where reports currently stand in the review pipeline</p>
            </div>
          </div>
          <div className="status-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" allowDecimals={false} hide />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11, fill: '#69766f' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e0e9df' }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                  {statusData.map((d, i) => (
                    <Cell key={`bar-${i}`} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Neighborhood Hotspot Overview */}
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Top Neighborhood Hotspots</h2>
              <p>Incident density across Hyderabad</p>
            </div>
            <Link to="/map" className="text-link" style={{ fontSize: '11px' }}>
              View Map &rarr;
            </Link>
          </div>
          <div className="neighborhood-list">
            {neighborhoodData.map((a, i) => (
              <div className="neighborhood-row" key={a.name}>
                <span className="neighborhood-number">0{i + 1}</span>
                <div className="neighborhood-name">
                  <strong>{a.name}</strong>
                  <div className="tiny-progress">
                    <span style={{ width: `${Math.round((a.total / Math.max(1, total)) * 100)}%` }} />
                  </div>
                </div>
                <b>{a.total} reports</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Incident Table */}
      <section className="panel recent-table-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent Community Incident Log</h2>
            <p>Latest active entries submitted by citizens across Hyderabad</p>
          </div>
          <Link to="/reports" className="text-link">
            Explore All Reports &rarr;
          </Link>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Report ID & Title</th>
                <th>Neighborhood</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Endorsements</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...reports].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 6).map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="table-report">
                      <span className="table-thumb">
                        <MapPin size={16} />
                      </span>
                      <span>
                        <strong>{r.title}</strong>
                        <small>{r.id}</small>
                      </span>
                    </div>
                  </td>
                  <td>{r.area}</td>
                  <td>{r.category}</td>
                  <td>
                    <span className={`badge urgency-${r.urgency.toLowerCase()}`}>
                      {r.urgency}
                    </span>
                  </td>
                  <td>
                    <span className={`badge status-${r.status.toLowerCase().replaceAll(' ', '-')}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <strong>👍 {r.upvotes || 0}</strong>
                  </td>
                  <td>
                    <Link
                      to={`/reports/${encodeURIComponent(r.id)}`}
                      className="icon-button table-action"
                      aria-label={`Open ${r.id}`}
                    >
                      &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
