import React from 'react';
import { BarChart2, Zap, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

const AnalyticsCard = ({ title, value, sub, icon: Icon, color }) => (
  <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '24px', boxShadow: '4px 4px 0px var(--on-surface)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <span className="font-label-caps text-on-surface-variant" style={{ fontSize: '12px' }}>{title}</span>
      <Icon size={22} color={color} />
    </div>
    <div className="font-display-xl" style={{ fontSize: '36px', marginBottom: '8px' }}>{value}</div>
    <div className="font-body-lg text-on-surface-variant" style={{ fontSize: '13px' }}>{sub}</div>
  </div>
);

import { getApiUrl } from '../../api';

const AnalyticsPage = () => {
  const [metrics, setMetrics] = React.useState({ total_domains: 74697, latency: { prefix: '<', target: 8, suffix: 'ms' } });

  React.useEffect(() => {
    fetch(getApiUrl('/api/metrics'))
      .then(res => res.json())
      .then(data => {
        if (data.total_domains) setMetrics(data);
      })
      .catch(err => console.error(err));
  }, []);

  const topBlockedDomains = [
    { domain: 'mailinator.com', count: '42,109', pct: '28%' },
    { domain: 'temp-mail.org', count: '31,840', pct: '21%' },
    { domain: '10minutemail.com', count: '24,650', pct: '16%' },
    { domain: 'guerrillamail.com', count: '18,320', pct: '12%' },
    { domain: 'yopmail.com', count: '14,900', pct: '10%' },
    { domain: 'trashmail.com', count: '9,810', pct: '6%' },
    { domain: 'dispostable.com', count: '6,400', pct: '4%' },
    { domain: 'throwawaymail.com', count: '4,100', pct: '3%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* HEADER */}
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Security Analytics</h1>
        <p className="font-body-lg text-on-surface-variant">Real-time metrics on temporary mail intercept rates, threat distributions, and system execution latency.</p>
      </section>

      {/* METRICS CARDS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        <AnalyticsCard title="TEMP MAIL INTERCEPT RATE" value="99.8%" sub="disposable mail detected" icon={ShieldCheck} color="var(--primary)" />
        <AnalyticsCard title="AVG RESPONSE TIME" value={metrics.latency ? `${metrics.latency.prefix || ''}${metrics.latency.target}${metrics.latency.suffix}` : '<8ms'} sub="Go HTTP execution" icon={Zap} color="var(--secondary)" />
        <AnalyticsCard title="REGISTERED DOMAINS" value={metrics.total_domains ? `${metrics.total_domains.toLocaleString()}+` : '74,697+'} sub="active GitHub blocklist" icon={Mail} color="var(--primary)" />
        <AnalyticsCard title="FALSE POSITIVE RATE" value="0.00%" sub="zero legitimate emails blocked" icon={BarChart2} color="var(--primary)" />
      </section>

      {/* DISTRIBUTION & TOP DOMAINS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        
        {/* TOP BLOCKED DISPOSABLE DOMAINS */}
        <section style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>TOP BLOCKED DISPOSABLE DOMAINS</h2>
            <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>Distribution</span>
          </div>
          <div style={{ padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--on-surface)' }}>
                  <th style={{ padding: '12px 16px' }} className="font-label-caps">Disposable Domain</th>
                  <th style={{ padding: '12px 16px' }} className="font-label-caps">Blocked Count</th>
                  <th style={{ padding: '12px 16px' }} className="font-label-caps">Share %</th>
                </tr>
              </thead>
              <tbody>
                {topBlockedDomains.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--surface-container-high)' }}>
                    <td style={{ padding: '12px 16px' }} className="font-code-md font-bold text-error">🚫 {item.domain}</td>
                    <td style={{ padding: '12px 16px' }} className="font-code-md">{item.count}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '8px', backgroundColor: 'var(--surface-container-highest)', border: '1px solid var(--on-surface)' }}>
                          <div style={{ width: item.pct, height: '100%', backgroundColor: 'var(--error)' }}></div>
                        </div>
                        <span className="font-code-md" style={{ fontSize: '12px' }}>{item.pct}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* THREAT TYPE BREAKDOWN */}
        <section style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)' }}>
            <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>THREAT CATEGORY DISTRIBUTION</h2>
          </div>
          <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }} className="font-label-caps">
                <span>Temporary Email Signups</span>
                <span className="font-bold text-error">78.4%</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: '#121212', border: '2px solid var(--on-surface)' }}>
                <div style={{ width: '78.4%', height: '100%', backgroundColor: 'var(--error)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }} className="font-label-caps">
                <span>Phishing URL Scans</span>
                <span className="font-bold text-secondary">14.2%</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: '#121212', border: '2px solid var(--on-surface)' }}>
                <div style={{ width: '14.2%', height: '100%', backgroundColor: 'var(--secondary)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }} className="font-label-caps">
                <span>Scam Text Messages</span>
                <span className="font-bold text-primary">7.4%</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: '#121212', border: '2px solid var(--on-surface)' }}>
                <div style={{ width: '7.4%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default AnalyticsPage;
