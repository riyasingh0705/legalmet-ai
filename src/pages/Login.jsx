import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/auth.js';

export default function Login() {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('R.Deshmukh');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Inspector');

  function handleSubmit(e) {
    e.preventDefault();
    login();
    navigate('/dashboard');
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="seal">LM</div>
        <div className="login-logo">
          <span className="wordmark">LegalMet AI</span>
        </div>
        <div className="login-tag">Packaged commodity compliance</div>

        <div className="field">
          <label>Email or officer ID</label>
          <input
            type="text"
            placeholder="officer@legalmetrology.gov.in"
            value={officerId}
            onChange={(e) => setOfficerId(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="field">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Inspector</option>
            <option>Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Log in
        </button>
        <div className="login-links">
          <span>Forgot password</span>
          <span>Contact administrator</span>
        </div>
      </form>
    </div>
  );
}
