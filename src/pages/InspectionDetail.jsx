import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Result from './Result.jsx';
import Evidence from './Evidence.jsx';
import Report from './Report.jsx';
import { RULE_SET, getInspection } from '../data.js';

const TABS = [
  { key: 'result', label: 'Result' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'report', label: 'Report' },
  { key: 'activity', label: 'Activity' },
];

function Activity({ inspection }) {
  const events = [
    { done: true, text: `Package images uploaded (3 sides) on ${inspection.dateLong}` },
    { done: true, text: 'Image quality checked and text regions detected' },
    { done: true, text: 'OCR extraction and product information extraction completed' },
    { done: true, text: `Declarations evaluated against rule version ${RULE_SET.version}` },
    { done: true, text: `Compliance result recorded: ${inspection.status === 'violation' ? 'Violation' : inspection.status === 'review' ? 'Needs review' : 'Compliant'}` },
    { done: true, text: 'Compliance report generated' },
  ];
  return (
    <div className="card">
      <div className="section-head">
        <h2>Inspection activity</h2>
      </div>
      {events.map((e) => (
        <div key={e.text} className={`timeline-row${e.done ? ' done' : ''}`}>
          <span className="tdot"></span>
          <span>{e.text}</span>
        </div>
      ))}
    </div>
  );
}

export default function InspectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inspection = getInspection(id);
  const [tab, setTab] = useState('result');

  if (!inspection) {
    return (
      <div className="screen">
        <Breadcrumb items={[{ label: 'History', to: '/history' }, { label: 'Not found' }]} />
        <div className="card cardpad">
          <div className="empty-note">No inspection found with ID {id}.</div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => navigate('/history')}>
              Back to history
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <Breadcrumb items={[{ label: 'History', to: '/history' }, { label: inspection.id }]} />

      <div className="detail-header-card">
        <div>
          <div className="wordmark" style={{ fontSize: 18 }}>
            {inspection.product}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 3 }}>
            Inspection ID: {inspection.id} · {inspection.dateLong}
          </div>
        </div>
        <StatusPill kind={inspection.status} />
      </div>

      <div className="tab-row">
        {TABS.map((t) => (
          <button key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'result' && <Result inspection={inspection} onNav={setTab} />}
      {tab === 'evidence' && <Evidence inspection={inspection} onNav={setTab} />}
      {tab === 'report' && <Report inspection={inspection} />}
      {tab === 'activity' && <Activity inspection={inspection} />}
    </div>
  );
}
