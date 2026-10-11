import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OFFICER } from '../data.js';
import { logout } from '../lib/auth.js';

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      className={`toggle${on ? ' on' : ''}`}
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
    >
      <span className="knob"></span>
    </button>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    confidence: true,
    autosave: false,
  });

  const set = (key) => (value) => setSettings((s) => ({ ...s, [key]: value }));

  function signOut() {
    logout();
    navigate('/login');
  }

  return (
    <div className="screen">
      <div className="topline">
        <h1>Profile / settings</h1>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar-lg">{OFFICER.initials}</div>
          <div>
            <div className="profile-name">{OFFICER.name}</div>
            <div className="profile-role">
              {OFFICER.role} · {OFFICER.zone}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div className="kv-row">
            <span className="k">Officer ID</span>
            <span>{OFFICER.officerId}</span>
          </div>
          <div className="kv-row">
            <span className="k">Email</span>
            <span>{OFFICER.email}</span>
          </div>
          <div className="kv-row">
            <span className="k">Role</span>
            <span>{OFFICER.role}</span>
          </div>
          <div className="kv-row">
            <span className="k">Zone</span>
            <span>{OFFICER.zone}</span>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="section-head">
          <h2>Preferences</h2>
        </div>
        <div className="settings-row">
          <div>
            <div className="stitle">Review notifications</div>
            <div className="ssub">Notify me when an inspection needs human review</div>
          </div>
          <Toggle on={settings.notifications} onChange={set('notifications')} />
        </div>
        <div className="settings-row">
          <div>
            <div className="stitle">Show OCR confidence</div>
            <div className="ssub">Display confidence scores on evidence screens</div>
          </div>
          <Toggle on={settings.confidence} onChange={set('confidence')} />
        </div>
        <div className="settings-row">
          <div>
            <div className="stitle">Auto-save report drafts</div>
            <div className="ssub">Keep officer remarks while editing a report</div>
          </div>
          <Toggle on={settings.autosave} onChange={set('autosave')} />
        </div>
      </div>

      <button className="btn" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
