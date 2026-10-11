import { RULES, RULE_SET } from '../data.js';

export default function Rules() {
  return (
    <div className="screen">
      <div className="topline">
        <h1>Rules</h1>
        <div className="meta">Rule version {RULE_SET.version}</div>
      </div>

      {RULES.map((r) => (
        <div className="rule-card" key={r.code}>
          <div className="rule-head">
            <div className="rname">
              {r.code} — {r.name}
            </div>
            <div className="rcode">{r.version}</div>
          </div>
          <div className="rule-sub">{r.sub}</div>
          <ul className="rule-list">
            {r.items.map((item) => (
              <li key={item}>
                <span className="mark">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="rule-meta-row">
            <span>
              Last updated: <b>{r.lastUpdated}</b>
            </span>
            <span>
              Rule version: <b>{r.version}</b>
            </span>
          </div>
        </div>
      ))}

      <div className="rule-card">
        <div className="rule-head">
          <div className="rname">Rule engine</div>
          <div className="rcode">{RULE_SET.activeChecks} active checks</div>
        </div>
        <div className="rule-sub">{RULE_SET.engine}</div>
        <div className="rule-meta-row">
          <span>
            Last updated: <b>{RULE_SET.lastUpdated}</b>
          </span>
          <span>
            Rule version: <b>{RULE_SET.version}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
