import { STATUS_LABEL } from '../data.js';

// kind: 'compliant' | 'review' | 'violation'. Children override the default label.
export default function StatusPill({ kind, children }) {
  return (
    <span className={`status-pill ${kind}`}>
      <span className="dot-i"></span>
      {children ?? STATUS_LABEL[kind]}
    </span>
  );
}
