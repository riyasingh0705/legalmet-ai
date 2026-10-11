import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import Result from './Result.jsx';
import Evidence from './Evidence.jsx';
import Report from './Report.jsx';
import { CURRENT } from '../data.js';

// The result → evidence → report flow right after a new scan (uses the latest inspection).

export function ResultPage() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Compliance result' }]} />
      <div className="topline">
        <h1>{CURRENT.product}</h1>
        <div className="meta">Inspection ID: {CURRENT.id}</div>
      </div>
      <Result inspection={CURRENT} onNav={(t) => navigate('/' + t)} />
    </div>
  );
}

export function EvidencePage() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Result', to: '/result' },
          { label: 'Evidence' },
        ]}
      />
      <div className="topline">
        <h1>Evidence</h1>
        <div className="meta">Inspection ID: {CURRENT.id}</div>
      </div>
      <Evidence inspection={CURRENT} onNav={(t) => navigate('/' + t)} />
    </div>
  );
}

export function ReportPage() {
  return (
    <div className="screen">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Result', to: '/result' },
          { label: 'Report' },
        ]}
      />
      <div className="topline">
        <h1>Compliance report</h1>
      </div>
      <Report inspection={CURRENT} />
    </div>
  );
}
