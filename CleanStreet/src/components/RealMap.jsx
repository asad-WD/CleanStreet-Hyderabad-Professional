import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Layers, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

// Fix default Leaflet icon paths in bundler environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HYDERABAD_CENTER = [25.3960, 68.3578];

function getPinColor(status, urgency) {
  if (status === 'Resolved') return '#16834a'; // Olive green
  if (urgency === 'Critical') return '#d9381e'; // Red
  if (urgency === 'High') return '#e06a3b'; // Orange
  if (status === 'In Progress') return '#1598c9'; // Blue
  return '#827148'; // Earth brown
}

function createCustomPin(report) {
  const color = getPinColor(report.status, report.urgency);
  const isPulse = report.urgency === 'Critical' || report.urgency === 'High';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
      ">
        ${isPulse ? `<span style="
          position: absolute;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.35;
          animation: mapPinPulse 1.8s infinite ease-out;
        "></span>` : ''}
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          background: ${color};
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        ">
          <div style="
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ffffff;
            transform: rotate(45deg);
          "></div>
        </div>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 36],
    popupAnchor: [0, -34]
  });
}

export default function RealMap({
  reports = [],
  selectedReportId = null,
  onSelectReport = null,
  interactivePicker = false,
  pickerLocation = null,
  onPickLocation = null,
  height = '500px',
  singleCenter = null,
  singleZoom = 15
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const pickerMarkerRef = useRef(null);
  const navigate = useNavigate();
  const [mapType, setMapType] = useState('streets');
  const [locating, setLocating] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter = singleCenter || (reports.length > 0 && reports[0].lat ? [reports[0].lat, reports[0].lng] : HYDERABAD_CENTER);
      const initialZoom = singleCenter ? singleZoom : 13;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add Tile Layer
      const tileUrl = mapType === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      mapInstanceRef.current._tileLayer = tileLayer;

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      // Click to pick location
      if (interactivePicker && onPickLocation) {
        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          onPickLocation(Number(lat.toFixed(5)), Number(lng.toFixed(5)));
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle tile switch
  useEffect(() => {
    if (!mapInstanceRef.current || !mapInstanceRef.current._tileLayer) return;
    mapInstanceRef.current.removeLayer(mapInstanceRef.current._tileLayer);

    const tileUrl = mapType === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const newLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(mapInstanceRef.current);
    mapInstanceRef.current._tileLayer = newLayer;
  }, [mapType]);

  // Update Markers when reports change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    reports.forEach((report) => {
      if (!report.lat || !report.lng) return;

      const icon = createCustomPin(report);
      const marker = L.marker([report.lat, report.lng], { icon });

      // Create popup content
      const popupDiv = document.createElement('div');
      popupDiv.className = 'map-card-popup';
      popupDiv.innerHTML = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          ${report.image ? `<img src="${report.image}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" alt="${report.title}"/>` : ''}
          <div style="font-size: 10px; font-weight: 800; color: #16834a; text-transform: uppercase;">${report.id} · ${report.area}</div>
          <div style="font-size: 13px; font-weight: 700; margin: 4px 0 6px; color: #202d28; line-height: 1.3;">${report.title}</div>
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #eee9dc; font-weight: 600;">${report.category}</span>
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${getPinColor(report.status, report.urgency)}22; color: ${getPinColor(report.status, report.urgency)}; font-weight: 700;">${report.status}</span>
          </div>
          <button id="view-report-${report.id}" style="
            width: 100%;
            background: #16834a;
            color: #ffffff;
            border: 0;
            padding: 7px 10px;
            border-radius: 7px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
          ">View Full Report Details &rarr;</button>
        </div>
      `;

      popupDiv.querySelector(`#view-report-${report.id}`)?.addEventListener('click', () => {
        if (onSelectReport) {
          onSelectReport(report);
        } else {
          navigate(`/reports/${encodeURIComponent(report.id)}`);
        }
      });

      marker.bindPopup(popupDiv, { maxWidth: 260 });
      markersLayerRef.current.addLayer(marker);

      // Open selected report popup
      if (selectedReportId && report.id === selectedReportId) {
        marker.openPopup();
        mapInstanceRef.current.setView([report.lat, report.lng], 15, { animate: true });
      }
    });
  }, [reports, selectedReportId]);

  // Handle Interactive Picker Marker
  useEffect(() => {
    if (!interactivePicker || !mapInstanceRef.current) return;

    if (pickerLocation && pickerLocation.lat && pickerLocation.lng) {
      if (!pickerMarkerRef.current) {
        const pickerIcon = L.divIcon({
          className: 'custom-picker-pin',
          html: `
            <div style="
              width: 36px;
              height: 36px;
              border-radius: 50% 50% 50% 0;
              background: #d9381e;
              transform: rotate(-45deg);
              box-shadow: 0 4px 12px rgba(217, 56, 30, 0.45);
              border: 3px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffffff;"></div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 34]
        });

        pickerMarkerRef.current = L.marker([pickerLocation.lat, pickerLocation.lng], {
          icon: pickerIcon,
          draggable: true
        }).addTo(mapInstanceRef.current);

        pickerMarkerRef.current.on('dragend', (e) => {
          const { lat, lng } = e.target.getLatLng();
          if (onPickLocation) onPickLocation(Number(lat.toFixed(5)), Number(lng.toFixed(5)));
        });
      } else {
        pickerMarkerRef.current.setLatLng([pickerLocation.lat, pickerLocation.lng]);
      }
    }
  }, [pickerLocation, interactivePicker]);

  // Geolocation trigger
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16, { animate: true });
        }
        if (interactivePicker && onPickLocation) {
          onPickLocation(Number(latitude.toFixed(5)), Number(longitude.toFixed(5)));
        }
      },
      () => {
        setLocating(false);
        alert('Could not determine your GPS location. Please click on the Hyderabad map to pin.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: '16px', overflow: 'hidden' }}>
      <style>{`
        @keyframes mapPinPulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.18) !important;
          padding: 4px !important;
        }
        .leaflet-popup-content {
          margin: 10px !important;
        }
      `}</style>

      {/* Map Control Toolbar */}
      <div style={{
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '6px 8px',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
      }}>
        <button
          type="button"
          onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            padding: '5px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            color: '#16834a'
          }}
          title="Toggle Satellite / Streets view"
        >
          <Layers size={14} />
          {mapType === 'streets' ? 'Satellite View' : 'Street Map'}
        </button>

        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: '#16834a',
            color: '#ffffff',
            border: 'none',
            padding: '5px 9px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
          title="Zoom to my location"
        >
          <Navigation size={13} />
          {locating ? 'Locating...' : 'My Location'}
        </button>
      </div>

      {interactivePicker && (
        <div style={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          zIndex: 1000,
          background: 'rgba(32, 45, 40, 0.92)',
          color: '#ffffff',
          padding: '8px 14px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <MapPin size={15} color="#e06a3b" />
          Click anywhere on the map or drag the pin to set the exact waste location
        </div>
      )}

      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
