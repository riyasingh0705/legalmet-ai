import { declarationList, STATUS_LABEL } from '../data.js';
import StatusPill from '../components/StatusPill.jsx';

const PILL = { pass: 'compliant', fail: 'violation', review: 'review' };

// Content-only component: used by the standalone /result route and the inspection detail tabs.
export default function Result({ inspection, onNav }) {
  const list = declarationList(inspection);
  const fails = list.filter((d) => d.status === 'fail').length;
  const reviews = list.filter((d) => d.status === 'review').length;
  // "Not applicable" does not count against the product, so it counts as compliant.
  const passed = list.filter((d) => d.status === 'pass' || d.status === 'na').length;
  const hasFindings = fails + reviews > 0;

  return (
    <>
      <div className={`verdict-band ${inspection.status}`}>
        <div>
          <div className="verdict-title">{STATUS_LABEL[inspection.status]}</div>
          <div className="verdict-sub">
            {list.length} declarations checked · {fails} violation{fails === 1 ? '' : 's'} · {reviews} flagged for review
          </div>
        </div>
        <div className="verdict-nums">
          <div>
            <div className="n">{passed}</div>
            <div className="l">Passed</div>
          </div>
          <div>
            <div className="n">{fails}</div>
            <div className="l">Failed</div>
          </div>
          <div>
            <div className="n">{reviews}</div>
            <div className="l">Review</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-head">
          <h2>Declaration checklist</h2>
        </div>
        {list.map((d) => {
          if (d.status === 'na') {
            return (
              <div className="decl-row" key={d.key}>
                <span>{d.label}</span>
                <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>Not applicable</span>
              </div>
            );
          }
          if (d.status === 'pass') {
            return (
              <div className="decl-row" key={d.key}>
                <span>{d.label}</span>
                <StatusPill kind="compliant">Pass</StatusPill>
              </div>
            );
          }
          const text = d.status === 'fail' ? (d.missing ? 'Missing' : 'Fail') : 'Review';
          return (
            <div className="decl-row clickable" key={d.key} onClick={() => onNav('evidence')}>
              <span>{d.label}</span>
              <StatusPill kind={PILL[d.status]}>{text} — view evidence</StatusPill>
            </div>
          );
        })}
      </div>

      <div className="btn-row">
        {hasFindings && (
          <button className="btn btn-primary" onClick={() => onNav('evidence')}>
            View evidence
          </button>
        )}
        <button className={hasFindings ? 'btn' : 'btn btn-primary'} onClick={() => onNav('report')}>
          Generate report
        </button>
      </div>
    </>
  );
}
