import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ScanProduct from './pages/ScanProduct.jsx';
import UploadImages from './pages/UploadImages.jsx';
import Analysis from './pages/Analysis.jsx';
import { ResultPage, EvidencePage, ReportPage } from './pages/Standalone.jsx';
import History from './pages/History.jsx';
import InspectionDetail from './pages/InspectionDetail.jsx';
import Rules from './pages/Rules.jsx';
import Profile from './pages/Profile.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/upload" element={<UploadImages />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/inspection/:id" element={<InspectionDetail />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
