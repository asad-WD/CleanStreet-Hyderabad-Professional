import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Cpu, RefreshCw, Zap } from 'lucide-react';

export default function AIAnalyzer({ image, onApplyPredictions, isScanning, setIsScanning }) {
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (!image) {
      setAnalysisResult(null);
      return;
    }

    // Run simulated AI Vision classification
    setIsScanning(true);
    setAnalysisResult(null);

    const timer = setTimeout(() => {
      // Generate intelligent contextual analysis
      const detectedItems = [
        { label: 'PET Plastics & Film Wrappers', confidence: 96 },
        { label: 'Accumulated Organic / Kitchen Waste', confidence: 89 },
        { label: 'Obstruction to Pedestrian Walkway', confidence: 84 }
      ];

      setAnalysisResult({
        primaryCategory: 'Overflowing garbage bin',
        suggestedUrgency: 'High',
        confidence: 94.6,
        severityScore: 82,
        detectedItems,
        estimatedVolume: '1.4 cubic meters',
        environmentalHazard: 'Moderate risk of pest infestation & drain blockage'
      });
      setIsScanning(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [image]);

  if (!image) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(22, 131, 74, 0.06), rgba(21, 152, 201, 0.08))',
      border: '1.5px solid rgba(22, 131, 74, 0.25)',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 1; }
          100% { top: 96%; opacity: 0.8; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{
            width: '32px',
            height: '32px',
            borderRadius: '9px',
            background: '#16834a',
            color: '#ffffff',
            display: 'grid',
            placeItems: 'center'
          }}>
            <Sparkles size={18} />
          </span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#16834a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              CleanStreet AI Vision Triage
              <span style={{ fontSize: '9px', background: '#e0ebd8', color: '#16834a', padding: '2px 6px', borderRadius: '4px' }}>v2.4 Neural</span>
            </div>
            <div style={{ fontSize: '11px', color: '#69766f' }}>
              Automatic waste type, severity index, and urgency estimator
            </div>
          </div>
        </div>

        {isScanning ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#1598c9' }}>
            <RefreshCw size={14} className="spin-animation" style={{ animation: 'spin 1s infinite linear' }} />
            Analyzing Image...
          </div>
        ) : (
          <span style={{ fontSize: '10px', background: '#d5edd8', color: '#16834a', padding: '3px 8px', borderRadius: '6px', fontWeight: '800' }}>
            Analysis Ready
          </span>
        )}
      </div>

      {/* Scanning Active Overlay */}
      {isScanning && (
        <div style={{
          position: 'relative',
          height: '110px',
          background: '#000000',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} alt="Scanning" />
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #22c55e, #38bdf8, transparent)',
            boxShadow: '0 0 14px #22c55e',
            animation: 'scanLaser 1.5s infinite ease-in-out'
          }} />
          <div style={{
            position: 'absolute',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Cpu size={16} /> Scanning visual features & debris density...
          </div>
        </div>
      )}

      {/* Analysis Results Ready */}
      {!isScanning && analysisResult && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            marginBottom: '14px'
          }}>
            <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e0e9df' }}>
              <div style={{ fontSize: '10px', color: '#69766f', fontWeight: '700', textTransform: 'uppercase' }}>Detected Category</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#202d28', marginTop: '2px' }}>{analysisResult.primaryCategory}</div>
              <div style={{ fontSize: '10px', color: '#16834a', fontWeight: '700', marginTop: '2px' }}>{analysisResult.confidence}% confidence</div>
            </div>

            <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e0e9df' }}>
              <div style={{ fontSize: '10px', color: '#69766f', fontWeight: '700', textTransform: 'uppercase' }}>Severity Index</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#d9381e', marginTop: '2px' }}>{analysisResult.severityScore} / 100</div>
              <div style={{ fontSize: '10px', color: '#69766f', marginTop: '2px' }}>Urgency: <b>{analysisResult.suggestedUrgency}</b></div>
            </div>

            <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e0e9df' }}>
              <div style={{ fontSize: '10px', color: '#69766f', fontWeight: '700', textTransform: 'uppercase' }}>Est. Volume</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#202d28', marginTop: '2px' }}>{analysisResult.estimatedVolume}</div>
              <div style={{ fontSize: '10px', color: '#69766f', marginTop: '2px' }}>Standard tipper size</div>
            </div>
          </div>

          {/* Classification tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {analysisResult.detectedItems.map((item, idx) => (
              <span key={idx} style={{
                fontSize: '11px',
                background: '#ffffff',
                border: '1px solid #d4ded3',
                padding: '4px 8px',
                borderRadius: '6px',
                color: '#34413b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <CheckCircle2 size={12} color="#16834a" />
                {item.label} ({item.confidence}%)
              </span>
            ))}
          </div>

          {/* Quick Apply Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '11px', color: '#4b554f', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Zap size={14} color="#e06a3b" />
              Apply AI insights to auto-fill category and urgency with one click.
            </div>
            <button
              type="button"
              onClick={() => onApplyPredictions({
                category: analysisResult.primaryCategory,
                urgency: analysisResult.suggestedUrgency,
                severity: analysisResult.severityScore
              })}
              style={{
                background: '#16834a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 3px 10px rgba(22, 131, 74, 0.25)'
              }}
            >
              <Sparkles size={14} /> Auto-Fill Report with AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
