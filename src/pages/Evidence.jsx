import { useState } from 'react';
import { findingsOf } from '../data.js';
import StatusPill from '../components/StatusPill.jsx';

export default function Evidence({ inspection, onNav }) {
  const findings = findingsOf(inspection);
  const [selected, setSelected] = useState(0);
  const [marked, setMarked] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState({});

  if (findings.length === 0) {
    return (
      <>
        <div className="card cardpad">
          <div className="empty-note">No findings recorded for this inspection. All declarations were verified.</div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => onNav('report')}>
            Generate report
          </button>
          <button className="btn btn-ghost" onClick={() => onNav('result')}>
            Back to result
          </button>
        </div>
      </>
    );
  }

  const f = findings[Math.min(selected, findings.length - 1)];
  const isFail = f.status === 'fail';

  return (
    <>
      {findings.length > 1 && (
        <div className="finding-tabs">
          {findings.map((x, i) => (
            <button
              key={x.key}
              className={`filter-chip${i === selected ? ' active' : ''}`}
              onClick={() => {
                setSelected(i);
                setShowComment(false);
              }}
            >
              {x.short}
            </button>
          ))}
        </div>
      )}

      <div className="card cardpad evidence-wrap">
        <div className="evidence-img">
          Product image
          <div className="highlight-box" style={f.box}>
            <span>{f.boxLabel}</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="kv-row">
            <span className="k">Finding</span>
            <span>{f.label}</span>
          </div>
          <div className="kv-row">
            <span className="k">Status</span>
            <StatusPill kind={isFail ? 'violation' : 'review'}>{isFail ? 'Non-compliant' : 'Needs review'}</StatusPill>
          </div>
          <div className="kv-row">
            <span className="k">Evidence ID</span>
            <span>{f.evidenceId}</span>
          </div>
          <div className="kv-row">
            <span className="k">Evidence</span>
            <span style={{ textAlign: 'right', maxWidth: 220 }}>{f.note}</span>
          </div>
          <div className="kv-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="k">OCR confidence</span>
              <span>{f.confidence}%</span>
            </div>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${f.confidence}%` }}></div>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn" onClick={() => setMarked((m) => ({ ...m, [f.key]: !m[f.key] }))}>
              {marked[f.key] ? '✓ Marked for review' : 'Mark for review'}
            </button>
            <button className="btn" onClick={() => setShowComment((s) => !s)}>
              Add comment
            </button>
          </div>

          {showComment && (
            <div className="comment-box">
              <textarea
                placeholder="Write an officer comment for this finding"
                value={comments[f.key] ?? ''}
                onChange={(e) => setComments((c) => ({ ...c, [f.key]: e.target.value }))}
              />
            </div>
          )}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => onNav('report')}>
          Generate report
        </button>
        <button className="btn btn-ghost" onClick={() => onNav('result')}>
          Back to result
        </button>
      </div>
    </>
  );
}
