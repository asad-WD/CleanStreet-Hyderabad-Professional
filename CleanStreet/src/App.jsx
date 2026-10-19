import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { CircleHelp } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Reports from './pages/Reports';
import ReportDetails from './pages/ReportDetails';
import ReportIssue from './pages/ReportIssue';
import MapView from './pages/MapView';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';

import { 
  loadReports, 
  saveReports, 
  resetReports, 
  getSavedTheme, 
  saveTheme, 
  getEcoPoints, 
  addEcoPoints,
  getNotifications,
  saveNotifications
} from './services/storage';

function NotFound() {
  return (
    <div className="content-page">
      <div className="empty-state">
        <CircleHelp size={40} color="var(--terracotta)" />
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="button button-primary">Return Home</Link>
      </div>
    </div>
  );
}

export default function App() {
  const [reports, setReports] = useState(loadReports);
  const [theme, setTheme] = useState(getSavedTheme);
  const [ecoPoints, setEcoPoints] = useState(getEcoPoints);
  const [notifications, setNotifications] = useState(getNotifications);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Persist reports
  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  // Apply & Persist Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Persist Notifications
  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAddReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);

    // Add notification
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Incident Logged',
        text: `Report ${newReport.id} successfully registered in ${newReport.area}.`,
        date: 'Just now',
        unread: true,
        reportId: newReport.id
      },
      ...prev.slice(0, 7)
    ]);
  };

  const handleUpvote = (id) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === id) {
          const wasUpvoted = !!r.upvotedByMe;
          const updatedUpvotes = wasUpvoted ? Math.max(0, (r.upvotes || 1) - 1) : (r.upvotes || 0) + 1;
          
          if (!wasUpvoted) {
            handleAwardPoints(10); // Award 10 points for endorsing
          }

          return {
            ...r,
            upvotes: updatedUpvotes,
            upvotedByMe: !wasUpvoted
          };
        }
        return r;
      })
    );
  };

  const handleAddComment = (reportId, comment) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          return {
            ...r,
            comments: [...(r.comments || []), comment]
          };
        }
        return r;
      })
    );
  };

  const handleUpdateReport = (id, changes) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === id) {
          return { ...r, ...changes };
        }
        return r;
      })
    );

    if (changes.status) {
      setNotifications(prev => [
        {
          id: `notif_${Date.now()}`,
          title: 'Status Update',
          text: `Report ${id} transitioned to stage: ${changes.status}.`,
          date: 'Just now',
          unread: true,
          reportId: id
        },
        ...prev.slice(0, 7)
      ]);
    }
  };

  const handleDeleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const handleResetAll = () => {
    const refreshed = resetReports();
    setReports(refreshed);
  };

  const handleAwardPoints = (points) => {
    const updated = addEcoPoints(points);
    setEcoPoints(updated);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="public-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        ecoPoints={ecoPoints}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home reports={reports} onUpvote={handleUpvote} />} />
          <Route path="/reports" element={<Reports reports={reports} onUpvote={handleUpvote} />} />
          <Route 
            path="/reports/:id" 
            element={
              <ReportDetails 
                reports={reports} 
                onUpvote={handleUpvote} 
                onAddComment={handleAddComment} 
              />
            } 
          />
          <Route 
            path="/report" 
            element={
              <ReportIssue 
                onAddReport={handleAddReport} 
                onAwardPoints={handleAwardPoints} 
              />
            } 
          />
          <Route path="/map" element={<MapView reports={reports} />} />
          <Route path="/dashboard" element={<Dashboard reports={reports} />} />
          <Route 
            path="/leaderboard" 
            element={<Leaderboard ecoPoints={ecoPoints} reports={reports} />} 
          />
          <Route 
            path="/admin" 
            element={
              <AdminDashboard 
                reports={reports} 
                onUpdateReport={handleUpdateReport} 
                onResetAll={handleResetAll} 
                onDeleteReport={handleDeleteReport} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
