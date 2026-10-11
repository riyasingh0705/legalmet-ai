import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';

export default function ScanProduct() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Food');
  const [productType, setProductType] = useState('Packaged commodity');

  return (
    <div className="screen">
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Scan product' }]} />
      <div className="topline">
        <h1>Scan product</h1>
      </div>

      <div className="card cardpad" style={{ maxWidth: 560 }}>
        <div className="dropzone">
          <div className="icon">▣</div>
          <div className="txt">Capture or upload package images</div>
          <div className="dz-btns">
            <button className="btn" onClick={() => navigate('/upload')}>
              Take photo
            </button>
            <button className="btn" onClick={() => navigate('/upload')}>
              Upload images
            </button>
          </div>
        </div>

        <div className="field">
          <label>Product category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Cosmetics</option>
            <option>Household</option>
          </select>
        </div>
        <div className="field">
          <label>Product type</label>
          <input type="text" value={productType} onChange={(e) => setProductType(e.target.value)} />
        </div>

        <button className="btn btn-primary btn-block" onClick={() => navigate('/upload')}>
          Continue to image upload
        </button>
      </div>
    </div>
  );
}
