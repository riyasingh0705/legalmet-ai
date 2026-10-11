import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';

const TAGS = [
  'Manufacturer',
  'Net quantity',
  'MRP',
  'Date of packaging',
  'Consumer care',
  'Country of origin',
];

export default function Analysis() {
  const navigate = useNavigate();
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(0); // 0: OCR done, 1: info extracted, 2: rules evaluated

  useEffect(() => {
    const timers = [
      setTimeout(() => setPct(42), 100),
      setTimeout(() => {
        setPct(78);
        setStage(1);
      }, 1200),
      setTimeout(() => {
        setPct(100);
        setStage(2);
      }, 2400),
      setTimeout(() => navigate('/result', { replace: true }), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  const step = (done, label) => (
    <li className={done ? 'done' : 'pending'}>
      <span className="ic">{done ? '✓' : '○'}</span>
      {label}
    </li>
  );

  return (
    <div className="screen">
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Analyzing' }]} />
      <div className="topline">
        <h1>Analyzing product</h1>
      </div>

      <div className="card cardpad analysis-wrap">
        <div className="analysis-preview">Product image</div>
        <div style={{ flex: 1 }}>
          <ul className="checklist">
            {step(true, 'Image quality checked')}
            {step(true, 'Text regions detected')}
            {step(true, 'OCR extraction completed')}
            {step(stage >= 1, 'Product information extracted')}
            {step(stage >= 2, 'Legal rules being evaluated')}
          </ul>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="progress-label">{pct}%</div>

          <label style={{ marginBottom: 8 }}>Extracting</label>
          <div className="tags">
            {TAGS.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
