import React from 'react';
import { Zap, ShieldCheck, Cpu, Code2 } from 'lucide-react';

const NetworkGlobal = () => {
  return (
    <section className="network-section">
      <div className="network-container">
        <div className="network-content">
          <span className="font-label-caps network-tag">ENGINE ARCHITECTURE</span>
          <h2 className="font-display-xl network-title">Built for Sub-10ms <br/>Form Validation.</h2>
          <p className="font-body-lg network-quote">
            Cauliflare's Go backend evaluates incoming emails against a registry of 100+ temporary email providers in real time, preventing burner account creation before your database is touched.
          </p>
          <ul className="network-list font-label-caps" style={{ fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={22} color="var(--primary)" />
              <span>Compiled Go 1.22 Runtime (Sub-10ms response)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={22} color="var(--secondary)" />
              <span>100+ Disposable Provider Registry & Wildcard Heuristics</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Cpu size={22} color="var(--primary)" />
              <span>Zero False Positive Guarantee for Enterprise & Consumer Mail</span>
            </li>
          </ul>
        </div>
        <div className="network-map-wrapper">
          <div className="network-map press-border-lg" style={{ padding: '32px', backgroundColor: '#0d0d0d', border: '3px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>
              <Code2 size={24} color="var(--primary)" />
              <span className="font-code-md font-bold text-on-surface">Go Security Pipeline</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="font-code-md">
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}>
                <span className="text-secondary font-bold">1. INCOMING SIGNUP EMAIL</span>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>Input: user@mailinator.com</div>
              </div>

              <div style={{ textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>↓</div>

              <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}>
                <span className="text-primary font-bold">2. 100+ DOMAIN REGISTRY & PATTERN MATCH</span>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>Match: Mailinator registry signature found</div>
              </div>

              <div style={{ textAlign: 'center', color: 'var(--error)', fontWeight: 'bold' }}>↓</div>

              <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--error)' }}>
                <span style={{ color: 'var(--error)' }} className="font-bold">3. ACTION: BLOCK (Risk: 96/100)</span>
                <div style={{ fontSize: '12px', color: '#ccc', marginTop: '4px' }}>Reject burner email before user registration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkGlobal;
