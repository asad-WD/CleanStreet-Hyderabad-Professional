import { initialReports } from '../data/initialReports';
const KEY = 'cleanstreet-reports-v1';
export function loadReports() {
  try { const saved = localStorage.getItem(KEY); if (saved) return JSON.parse(saved); localStorage.setItem(KEY, JSON.stringify(initialReports)); }
  catch { /* use sample data when storage is unavailable */ }
  return initialReports;
}
export function saveReports(reports) { try { localStorage.setItem(KEY, JSON.stringify(reports)); } catch { /* browser storage may be disabled */ } }
export function resetReports() { try { localStorage.setItem(KEY, JSON.stringify(initialReports)); } catch {} return initialReports; }
