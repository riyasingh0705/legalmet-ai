import { useState } from 'react';
import { OFFICER, RULE_SET, STATUS_LABEL, declarationList, findingsOf } from '../data.js';

const MARK = { pass: '✓', fail: '✕', review: '⚠' };
const STAMP_ICON = { compliant: '✓', review: '⚠', violation: '✕' };

export default function Report({ inspection }) {
  const [editing, setEditing] = useState(false);
  const [remarks, setRemarks] = useState('');

  // Country of origin is "not applicable" here, so only checked declarations appear in the report.
  const checked = declarationList(inspection).filter((d) => d.status !== 'na');
  const findings = findingsOf(inspection);
  const idNum = inspection.id.split('-').pop();
  const fails = checked.filter((d) => d.status === 'fail').length;
  const reviews = checked.filter((d) => d.status === 'review').length;

  function exportJson() {
    const payload = {
      inspectionId: inspection.id,
      date: inspection.dateLong,
      officer: `${OFFICER.name}, ${OFFICER.zone}`,
      product: {
        name: inspection.product,
        category: inspection.category,
        manufacturer: inspection.manufacturer,
        netQuantity: inspection.netQuantity,
        mrp: inspection.mrp,
      },
      overallStatus: STATUS_LABEL[inspection.status],
      ruleVersion: RULE_SET.version,
      declarations: checked.map((d) => ({ declaration: d.short, status: d.status })),
      findings: findings.map((d, i) => ({
        finding: i + 1,
        title: d.label,
        note: d.note,
        evidenceId: d.evidenceId,
      })),
      remarks,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inspection.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="report-doc">
        <div className="report-inner">
          <div className="report-letterhead">
            <div className="report-lh-flex">
              <div className="report-emblem">LM</div>
              <div className="report-lh-text">
                <div className="agency">LEGAL METROLOGY</div>
                <div className="doctitle">
                  PACKAGED COMMODITY
                  <br />
                  COMPLIANCE REPORT
                </div>
              </div>
            </div>
            <div className="report-lh-right">
              <div>
                <span className="lbl">Inspection ID</span>
                {inspection.id}
              </div>
              <div>
                <span className="lbl">Date</span>
                {inspection.dateLong}
              </div>
              <div>
                <span className="lbl">Officer</span>
                {OFFICER.name}, {OFFICER.zone}
              </div>
            </div>
          </div>

          <div className="report-section-title first">Product Information</div>
          <div className="report-grid">
            <div>
              <div className="k">Product</div>
              {inspection.product}
            </div>
            <div>
              <div className="k">Category</div>
              {inspection.category}
            </div>
            <div>
              <div className="k">Manufacturer</div>
              {inspection.manufacturer}
            </div>
            <div>
              <div className="k">Net Quantity</div>
              {inspection.netQuantity}
            </div>
            <div>
              <div className="k">MRP</div>
              {inspection.mrp}
            </div>
          </div>

          <div className="report-section-title">Compliance Summary</div>
          <div className={`verdict-stamp ${inspection.status}`}>
            <span>{STAMP_ICON[inspection.status]}</span>
            {STATUS_LABEL[inspection.status].toUpperCase()}
          </div>
          <div className="summary-line">
            {checked.length} declarations verified · {fails} violation{fails === 1 ? '' : 's'} · {reviews} flagged for review
          </div>

          <div className="report-section-title">Declaration Verification</div>
          <div className="decl-verify-grid">
            {checked.map((d) => (
              <div className={`decl-verify-item ${d.status}`} key={d.key}>
                <span className="mark">{MARK[d.status]}</span>
                {d.short}
              </div>
            ))}
          </div>

          <div className="report-section-title">Violations / Findings</div>
          {findings.length === 0 ? (
            <div className="viol-item">No violations or findings recorded.</div>
          ) : (
            findings.map((d, i) => (
              <div className="viol-item" key={d.key}>
                <div className={`finding-title${d.status === 'review' ? ' review' : ''}`}>
                  Finding {String(i + 1).padStart(2, '0')} — {d.label}
                </div>
                <div>{d.note}</div>
                <div className="ev-ref">Evidence: {d.evidenceId}</div>
              </div>
            ))
          )}

          {(editing || remarks) && (
            <>
              <div className="report-section-title">Officer Remarks</div>
              {editing ? (
                <textarea
                  placeholder="Add remarks to include in this report"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              ) : (
                <div className="report-remarks">{remarks}</div>
              )}
            </>
          )}

          <div className="report-footer-strip">
            <span>Rule version {RULE_SET.version}</span>
            <span>Generated by LegalMet AI · Report ref. {idNum}</span>
          </div>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Download PDF
        </button>
        <button className="btn" onClick={exportJson}>
          Export
        </button>
        <button className="btn btn-ghost" onClick={() => setEditing((e) => !e)}>
          {editing ? 'Save changes' : 'Edit report'}
        </button>
      </div>
    </>
  );
}
