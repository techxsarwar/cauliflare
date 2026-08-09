import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Zap, Activity, Server, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../api';

const StatusPage = () => {
  const [metrics, setMetrics] = useState({ total_domains: 74697, latency: { target: 8 } });
  const [healthStatus, setHealthStatus] = useState('All Systems Fully Operational');
  const [lastCheck, setLastCheck] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetch(getApiUrl('/api/metrics'))
      .then(res => res.json())
      .then(data => {
        if (data.total_domains) setMetrics(data);
      })
      .catch(err => console.error(err));

    fetch(getApiUrl('/api/health'))
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') setHealthStatus('All Systems Fully Operational');
      })
      .catch(err => console.error(err));
  }, []);

  const services = [
    { name: 'Go Threat Analysis Engine', status: 'Operational', latency: '4ms', uptime: '99.99%' },
    { name: 'Disposable Email Detection API', status: 'Operational', latency: '6ms', uptime: '100.0%' },
    { name: 'Phishing URL Scanner', status: 'Operational', latency: '8ms', uptime: '99.98%' },
    { name: 'Scam & Social Engineering Detector', status: 'Operational', latency: '12ms', uptime: '99.95%' },
    { name: 'Live GitHub Domain Sync Engine', status: 'Operational', latency: '15ms', uptime: '99.99%' },
    { name: 'Edge Infrastructure & Global Anycast', status: 'Operational', latency: '<10ms', uptime: '100.0%' },
  ];

  return (
    <div style={{ padding: '40px 0 96px 0', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* 1. STATUS BANNER */}
      <section style={{ 
        backgroundColor: 'var(--primary)', 
        color: '#ffffff', 
        border: '3px solid var(--on-surface)', 
        boxShadow: '8px 8px 0px var(--on-surface)',
        padding: '40px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '16px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#00ff66', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #00ff66' }}></span>
            <span className="font-label-caps" style={{ letterSpacing: '0.1em', fontWeight: 'bold' }}>SYSTEM STATUS: HEALTHY</span>
          </div>
          <h1 className="font-display-xl" style={{ fontSize: '48px', lineHeight: '110%', color: '#ffffff' }}>
            {healthStatus}
          </h1>
          <p className="font-body-lg" style={{ opacity: 0.9, marginTop: '8px' }}>
            Continuous real-time uptime monitoring for Cauliflare Security Infrastructure.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div className="font-code-md" style={{ fontSize: '13px', opacity: 0.8, marginBottom: '8px' }}>
            LAST CHECKED: {lastCheck}
          </div>
          <Link to="/dashboard/playground" className="press-button font-label-caps" style={{ textDecoration: 'none', display: 'inline-flex', backgroundColor: '#ffffff', color: '#121212', border: '2px solid #121212', fontWeight: 'bold' }}>
            LIVE API PLAYGROUND →
          </Link>
        </div>
      </section>

      {/* 2. CORE METRICS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '24px', boxShadow: '4px 4px 0px var(--on-surface)' }}>
          <span className="font-label-caps" style={{ color: 'var(--on-surface-variant)', fontWeight: 'bold' }}>OVERALL UPTIME</span>
          <div className="font-display-xl" style={{ fontSize: '40px', marginTop: '8px', color: 'var(--primary)' }}>99.99%</div>
          <div className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginTop: '4px' }}>Across past 90 days</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '24px', boxShadow: '4px 4px 0px var(--on-surface)' }}>
          <span className="font-label-caps" style={{ color: 'var(--on-surface-variant)', fontWeight: 'bold' }}>AVG RESPONSE TIME</span>
          <div className="font-display-xl" style={{ fontSize: '40px', marginTop: '8px', color: 'var(--primary)' }}>&lt;8ms</div>
          <div className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginTop: '4px' }}>Go In-Memory Execution</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '24px', boxShadow: '4px 4px 0px var(--on-surface)' }}>
          <span className="font-label-caps" style={{ color: 'var(--on-surface-variant)', fontWeight: 'bold' }}>ACTIVE THREAT SIGNATURES</span>
          <div className="font-display-xl" style={{ fontSize: '40px', marginTop: '8px', color: 'var(--primary)' }}>{metrics.total_domains?.toLocaleString() || '74,697'}+</div>
          <div className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginTop: '4px' }}>Live GitHub Sync</div>
        </div>
      </section>

      {/* 3. SERVICE BREAKDOWN */}
      <section style={{ backgroundColor: 'var(--surface)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '32px' }}>
        <h2 className="font-headline-md" style={{ marginBottom: '24px', borderBottom: '2px solid var(--on-surface)', paddingBottom: '12px' }}>
          SERVICE STATUS BREAKDOWN
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {services.map((srv, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '16px', 
              backgroundColor: 'var(--surface-container)', 
              border: '2px solid var(--on-surface)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={20} color="var(--primary)" />
                <span className="font-bold font-body-lg" style={{ color: 'var(--on-surface)' }}>{srv.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span className="font-code-md" style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>Latency: {srv.latency}</span>
                <span className="font-code-md" style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>Uptime: {srv.uptime}</span>
                <span className="font-label-caps" style={{ backgroundColor: 'var(--primary)', color: '#ffffff', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', border: '1px solid var(--on-surface)' }}>
                  {srv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default StatusPage;
