import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { isAuthed } from '../lib/auth.js';

export default function Layout() {
  const { pathname } = useLocation();

  if (!isAuthed()) return <Navigate to="/login" replace />;

  // Scroll to top whenever the route changes (keyed remount below).
  return (
    <div id="app">
      <Sidebar />
      <div className="main" key={pathname}>
        <Outlet />
      </div>
    </div>
  );
}
