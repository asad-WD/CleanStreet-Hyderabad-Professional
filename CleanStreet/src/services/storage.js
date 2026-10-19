import { initialReports, CITIZEN_ACHIEVEMENTS } from '../data/initialReports';

const REPORTS_KEY = 'cleanstreet-reports-v2';
const THEME_KEY = 'cleanstreet-theme-v2';
const POINTS_KEY = 'cleanstreet-ecopoints-v2';
const NOTIFICATIONS_KEY = 'cleanstreet-notifications-v2';

export function loadReports() {
  try {
    const saved = localStorage.getItem(REPORTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Storage read error, falling back to initial dataset', e);
  }
  saveReports(initialReports);
  return initialReports;
}

export function saveReports(reports) {
  try {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch (e) {
    console.warn('Unable to persist reports to localStorage', e);
  }
}

export function resetReports() {
  try {
    localStorage.removeItem(REPORTS_KEY);
    saveReports(initialReports);
  } catch (e) {}
  return initialReports;
}

// Theme management
export function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

// Eco Points
export function getEcoPoints() {
  try {
    const val = localStorage.getItem(POINTS_KEY);
    return val ? parseInt(val, 10) : 250;
  } catch {
    return 250;
  }
}

export function addEcoPoints(points) {
  try {
    const current = getEcoPoints();
    const updated = current + points;
    localStorage.setItem(POINTS_KEY, String(updated));
    return updated;
  } catch {
    return 250;
  }
}

// Notifications
export function getNotifications() {
  try {
    const saved = localStorage.getItem(NOTIFICATIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [
    { id: 'n1', title: 'Crew Dispatched', text: 'SSWMB Rapid Response Squad Alpha dispatched to CS-1048 (GOR Colony).', date: '2 hours ago', unread: true, reportId: 'CS-1048' },
    { id: 'n2', title: 'Issue Resolved', text: 'Canal embankment plastic cleanup (CS-1051) verified as Resolved.', date: '1 day ago', unread: false, reportId: 'CS-1051' },
    { id: 'n3', title: 'New Community Upvote', text: '5 neighbors supported your recent report in Qasimabad.', date: '2 days ago', unread: false, reportId: 'CS-1053' }
  ];
}

export function saveNotifications(notifications) {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch {}
}
