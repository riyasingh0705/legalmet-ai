import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';

const INITIAL = [
  { name: 'Front', done: true },
  { name: 'Back', done: true },
  { name: 'Side', done: true },
  { name: 'Bottom', done: false },
  { name: 'Additional', done: false },
];

export default function UploadImages() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState(INITIAL);

  const captured = slots.filter((s) => s.done).length;

  function toggle(index) {
    setSlots((prev) => prev.map((s, i) => (i === index ? { ...s, done: !s.done } : s)));
  }

  // "+ Add image" fills the next empty slot.
  function addImage() {
    setSlots((prev) => {
      const next = prev.findIndex((s) => !s.done);
      if (next === -1) return prev;
      return prev.map((s, i) => (i === next ? { ...s, done: true } : s));
    });
  }

  return (
    <div className="screen">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Scan product', to: '/scan' },
          { label: 'Upload images' },
        ]}
      />
      <div className="topline">
        <h1>Upload product images</h1>
      </div>

      <div className="card cardpad" style={{ maxWidth: 640 }}>
        <label style={{ marginBottom: 12 }}>Package sides captured ({captured} of {slots.length})</label>
        <div className="img-slots">
          {slots.map((s, i) => (
            <div key={s.name} className={`img-slot${s.done ? ' done' : ''}`} onClick={() => toggle(i)}>
              <span className="ic">{s.done ? '✓' : '○'}</span>
              {s.name}
            </div>
          ))}
        </div>
        <button className="btn" style={{ marginBottom: 22 }} onClick={addImage}>
          + Add image
        </button>

        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn btn-primary" disabled={captured === 0} onClick={() => navigate('/analysis')}>
            Start compliance check
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/scan')}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
