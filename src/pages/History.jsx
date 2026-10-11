import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inspections } from '../data.js';
import StatusPill from '../components/StatusPill.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'compliant', label: 'Compliant' },
  { key: 'violation', label: 'Violation' },
  { key: 'review', label: 'Review' },
];

export default function History() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const rows = inspections.filter(
    (i) =>
      (filter === 'all' || i.status === filter) &&
      (i.product.toLowerCase().includes(query.trim().toLowerCase()) || i.id.toLowerCase().includes(query.trim().toLowerCase()))
  );

  return (
    <div className="screen">
      <div className="topline">
        <h1>Inspection history</h1>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search by product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="filter-row">
        {FILTERS.map((f) => (
          <div
            key={f.key}
            className={`filter-chip${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </div>
        ))}
      </div>

      <div className="card">
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
            {rows.map((i) => (
              <tr key={i.id} onClick={() => navigate(`/inspection/${i.id}`)}>
                <td>{i.product}</td>
                <td>{i.date}</td>
                <td>
                  <StatusPill kind={i.status} />
                </td>
                <td style={{ textAlign: 'right', color: 'var(--ink-faint)' }}>View →</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ color: 'var(--ink-faint)', cursor: 'default' }}>
                  No inspections match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
