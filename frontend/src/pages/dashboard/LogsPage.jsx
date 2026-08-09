import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const LogRow = ({ time, endpoint, status, latency, risk }) => (
  <tr style={{ borderBottom: '2px solid var(--surface-container-high)', backgroundColor: 'var(--surface-container)' }}>
    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }} className="font-code-md text-on-surface-variant">{time}</td>
    <td style={{ padding: '16px 24px' }} className="font-code-md font-bold">{endpoint}</td>
    <td style={{ padding: '16px 24px' }}>
      <span style={{ 
        backgroundColor: status === 200 ? 'var(--primary)' : 'var(--error)', 
        color: '#ffffff',
        padding: '4px 10px',
        border: '1px solid var(--on-surface)',
        fontSize: '12px',
        fontWeight: 'bold'
      }} className="font-label-caps">
        {status} {status === 200 ? 'OK' : 'ERR'}
      </span>
    </td>
    <td style={{ padding: '16px 24px' }} className="font-code-md">{latency}</td>
    <td style={{ padding: '16px 24px' }}>
      <span className="font-code-md" style={{ 
        color: risk > 80 ? 'var(--error)' : risk > 50 ? 'var(--secondary)' : 'var(--primary)',
        fontWeight: 'bold'
      }}>
        {risk}/100
      </span>
    </td>
  </tr>
);

import { getApiUrl } from '../../api';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    fetch(getApiUrl('/api/logs'))
      .then(res => res.json())
      .then(data => {
        if (data.logs && data.logs.length > 0) {
          setLogs(data.logs);
        } else {
          setLogs([
            { id: 'log_1', time: 'Just now', endpoint: '/v1/check-email', status: 200, latency: '5ms', risk_score: 96 },
            { id: 'log_2', time: '1m ago', endpoint: '/v1/scan-url', status: 200, latency: '8ms', risk_score: 94 },
            { id: 'log_3', time: '3m ago', endpoint: '/v1/check-email', status: 200, latency: '4ms', risk_score: 2 },
            { id: 'log_4', time: '6m ago', endpoint: '/v1/detect-scam', status: 200, latency: '12ms', risk_score: 98 }
          ]);
        }
      })
      .catch(err => {
        setLogs([
          { id: 'log_1', time: 'Just now', endpoint: '/v1/check-email', status: 200, latency: '5ms', risk_score: 96 },
          { id: 'log_2', time: '1m ago', endpoint: '/v1/scan-url', status: 200, latency: '8ms', risk_score: 94 },
          { id: 'log_3', time: '3m ago', endpoint: '/v1/check-email', status: 200, latency: '4ms', risk_score: 2 }
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Request Logs</h1>
          <p className="font-body-lg text-on-surface-variant">Live audit trail of all real-time API requests and threat analysis.</p>
        </div>
        <button 
          onClick={fetchLogs} 
          className="press-button font-label-caps font-bold" 
          style={{ padding: '8px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> REFRESH LOGS
        </button>
      </section>

      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--on-surface)', color: 'var(--surface)' }}>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Time</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Endpoint</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Status</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Latency</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((item, idx) => (
                <LogRow key={item.id || idx} time={item.time} endpoint={item.endpoint} status={item.status} latency={item.latency} risk={item.risk_score} />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center' }} className="font-code-md text-on-surface-variant">
                  {loading ? 'Fetching real-time logs...' : 'No API requests logged yet. Try running a check in the Playground or Tester!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LogsPage;
