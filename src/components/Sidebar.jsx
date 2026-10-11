import { Link, useLocation } from 'react-router-dom';
import { OFFICER } from '../data.js';

const ITEMS = [
  { to: '/dashboard', label: 'Dashboard', match: ['/dashboard', '/result', '/evidence', '/report'] },
  { to: '/scan', label: 'Scan product', match: ['/scan', '/upload', '/analysis'] },
  { to: '/history', label: 'Inspection history', match: ['/history', '/inspection'] },
  { to: '/rules', label: 'Rules', match: ['/rules'] },
  { to: '/profile', label: 'Profile / settings', match: ['/profile'] },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <div className="brand">
        <div className="wordmark">LegalMet AI</div>
        <div className="sub">Enforcement console</div>
      </div>

      {ITEMS.map((item) => {
        const active = item.match.some((m) => pathname === m || pathname.startsWith(m + '/'));
        return (
          <Link key={item.to} to={item.to} className={`navitem${active ? ' active' : ''}`}>
            <span className="dot"></span>
            {item.label}
          </Link>
        );
      })}

      <div className="footer">
        <Link to="/profile" className="officer-chip" style={{ textDecoration: 'none' }}>
          <div className="officer-avatar">{OFFICER.initials}</div>
          <div>
            <div className="officer-name">{OFFICER.name}</div>
            <div className="officer-role">
              {OFFICER.role} · {OFFICER.zone}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
