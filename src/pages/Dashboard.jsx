import { useNavigate } from 'react-router-dom';
import { inspections, STATS } from '../data.js';
import StatusPill from '../components/StatusPill.jsx';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="topline">
        <h1>Dashboard</h1>
        <div className="meta">Monday, 7 September 2026</div>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <div className="num">{STATS.total}</div>
          <div className="lbl">Total inspections</div>
        </div>
        <div className="stat teal">
          <div className="num">{STATS.compliant}</div>
          <div className="lbl">Compliant</div>
        </div>
        <div className="stat red">
          <div className="num">{STATS.violations}</div>
          <div className="lbl">Violations</div>
        </div>
        <div className="stat amber">
          <div className="num">{STATS.review}</div>
          <div className="lbl">Needs review</div>
        </div>
      </div>

      <div className="card">
        <div className="section-head">
          <h2>Recent inspections</h2>
          <button className="btn" onClick={() => navigate('/history')}>
            View all
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inspections.slice(0, 4).map((i) => (
              <tr key={i.id} onClick={() => navigate(`/inspection/${i.id}`)}>
                <td>{i.product}</td>
                <td>{i.date}</td>
                <td>
                  <StatusPill kind={i.status} />
                </td>
                <td style={{ textAlign: 'right', color: 'var(--ink-faint)' }}>View →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => navigate('/scan')}>
          + Scan product
        </button>
      </div>
    </div>
  );
}
