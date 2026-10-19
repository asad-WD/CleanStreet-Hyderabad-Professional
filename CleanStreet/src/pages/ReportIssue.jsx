import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  UploadCloud, 
  Trash2, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Navigation
} from 'lucide-react';
import RealMap from '../components/RealMap';
import AIAnalyzer from '../components/AIAnalyzer';
import { HYDERABAD_AREAS, WASTE_CATEGORIES, URGENCIES } from '../data/initialReports';

export default function ReportIssue({ onAddReport, onAwardPoints }) {
  const navigate = useNavigate();

  const emptyForm = () => ({
    title: '',
    category: WASTE_CATEGORIES[0],
    description: '',
    area: HYDERABAD_AREAS[0],
    landmark: '',
    date: new Date().toISOString().slice(0, 10),
    urgency: 'Medium',
    lat: 25.3960,
    lng: 68.3578
  });

  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState('');
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const [busy, setBusy] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file (JPG, PNG, or WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Please choose an image smaller than 5 MB.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const handleApplyAIPredictions = ({ category, urgency }) => {
    setForm(prev => ({
      ...prev,
      category: category || prev.category,
      urgency: urgency || prev.urgency
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.area.trim() || !form.landmark.trim()) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    setBusy(true);
    const newId = `CS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport = {
      id: newId,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      area: form.area,
      landmark: form.landmark.trim(),
      date: form.date,
      createdAt: Date.now(),
      urgency: form.urgency,
      status: 'Reported',
      assignedCrew: 'Unassigned (Awaiting Review)',
      slaDeadline: 'Within 24 hours',
      upvotes: 1,
      upvotedByMe: true,
      image,
      afterImage: '',
      lat: form.lat,
      lng: form.lng,
      history: [
        { status: 'Reported', date: new Date().toISOString(), note: 'Submitted by citizen via CleanStreet portal.' }
      ],
      comments: []
    };

    onAddReport(newReport);
    if (onAwardPoints) onAwardPoints(50); // Award 50 eco points

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setBusy(false);
    setSubmittedId(newId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="content-page narrow-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">CITIZEN CIVIC REPORTING</div>
          <h1>Report Waste & Clean Up Hyderabad</h1>
          <p>
            Notice waste piling up or blocking roads? Provide the details, use our AI image scanner to classify the problem, and pin the exact GPS location.
          </p>
        </div>
      </div>

      {submittedId ? (
        <div className="success-panel">
          <span className="success-icon">
            <CheckCircle2 size={40} />
          </span>
          <h2>Civic Report Logged Successfully!</h2>
          <p>
            Your report ID is <strong>{submittedId}</strong>. You just earned <strong>+50 Citizen Eco-Points</strong> 🌱! 
            The municipal sanitation team has been alerted and your report is live on the city map.
          </p>
          <div className="form-actions centered">
            <Link className="button button-primary" to={`/reports/${submittedId}`}>
              Track Report Progress <ArrowRight size={16} />
            </Link>
            <button
              className="button button-outline"
              onClick={() => {
                setSubmittedId('');
                setForm(emptyForm());
                setImage('');
                setError('');
              }}
            >
              Report Another Issue
            </button>
          </div>
        </div>
      ) : (
        <form className="form-card" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          {/* Section 1: Photo & AI Scanner */}
          <div className="form-section-title">
            <span>01</span>
            <div>
              <h2>Photo & Smart AI Triage</h2>
              <p>Upload a photo of the waste to auto-detect its category and severity level.</p>
            </div>
          </div>

          <div
            className={`upload-zone ${drag ? 'drag-active' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              handleFileSelect(e.dataTransfer.files?.[0]);
            }}
          >
            {image ? (
              <div className="upload-preview">
                <img src={image} alt="Report preview" />
                <div>
                  <strong>Photo Attached</strong>
                  <span>Ready for AI visual analysis and municipal inspection</span>
                  <button type="button" className="text-danger" onClick={() => setImage('')}>
                    <Trash2 size={15} /> Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="upload-icon">
                  <UploadCloud size={26} />
                </span>
                <strong>Drag and drop photo here, or browse</strong>
                <span>Supports JPG, PNG, WebP up to 5 MB</span>
                <label className="button button-outline browse-button">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files?.[0])}
                    hidden
                  />
                </label>
              </>
            )}
          </div>

          {/* AI Scanner Component */}
          {image && (
            <AIAnalyzer
              image={image}
              onApplyPredictions={handleApplyAIPredictions}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
            />
          )}

          {/* Section 2: Details */}
          <div className="form-section-title second">
            <span>02</span>
            <div>
              <h2>Issue Information</h2>
              <p>Describe what you observed so cleanup crews bring the right equipment.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field full">
              <span>Title / Short Summary <b>*</b></span>
              <input
                required
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Broken bin spilling commercial waste onto street"
                maxLength={100}
              />
            </label>

            <label className="field">
              <span>Waste Category <b>*</b></span>
              <select value={form.category} onChange={(e) => update('category', e.target.value)}>
                {WASTE_CATEGORIES.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="field">
              <span>Urgency Level <b>*</b></span>
              <select value={form.urgency} onChange={(e) => update('urgency', e.target.value)}>
                {URGENCIES.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="field full">
              <span>Detailed Description <b>*</b></span>
              <textarea
                required
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Mention any health hazards, foul odors, obstruction to traffic, or schools nearby..."
                rows={3}
                maxLength={800}
              />
              <small>{form.description.length}/800 characters</small>
            </label>
          </div>

          {/* Section 3: Location & Interactive Map Pinning */}
          <div className="form-section-title second">
            <span>03</span>
            <div>
              <h2>Precise Location & Interactive Map</h2>
              <p>Click on the map or drag the red pin to set the exact spot.</p>
            </div>
          </div>

          <div className="form-grid" style={{ marginBottom: '18px' }}>
            <label className="field">
              <span>Neighborhood / District <b>*</b></span>
              <select value={form.area} onChange={(e) => update('area', e.target.value)}>
                {HYDERABAD_AREAS.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="field">
              <span>Street, Block or Nearby Landmark <b>*</b></span>
              <input
                required
                value={form.landmark}
                onChange={(e) => update('landmark', e.target.value)}
                placeholder="e.g. Near Gate 2, Citizen Colony, opposite Bank"
              />
            </label>
          </div>

          {/* Map Pin Picker */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)' }}>
                GPS Coordinates: {form.lat.toFixed(4)}° N, {form.lng.toFixed(4)}° E
              </span>
            </div>

            <RealMap
              interactivePicker={true}
              pickerLocation={{ lat: form.lat, lng: form.lng }}
              onPickLocation={(lat, lng) => {
                setForm(prev => ({ ...prev, lat, lng }));
              }}
              height="340px"
              singleCenter={[form.lat, form.lng]}
              singleZoom={14}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="button button-ghost" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="button button-primary" disabled={busy || isScanning}>
              {busy ? 'Logging Report...' : 'Submit Civic Report'} <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
