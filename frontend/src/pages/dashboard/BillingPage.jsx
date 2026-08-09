import React from 'react';

const BillingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Billing & Usage</h1>
        <p className="font-body-lg text-on-surface-variant">Manage your subscription and monitor API limits.</p>
      </section>

      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)', maxWidth: '600px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-label-caps">CURRENT PLAN: BUILDER</h2>
          <span className="font-code-md" style={{ backgroundColor: 'var(--primary)', color: '#121212', padding: '4px 8px', fontWeight: 'bold' }}>$9/month</span>
        </div>
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="font-bold">API Requests Used</span>
            <span className="font-code-md">8,420 / 500,000</span>
          </div>
          {/* Glowing progress bar */}
          <div style={{ width: '100%', height: '24px', backgroundColor: '#121212', border: '2px solid var(--on-surface)', overflow: 'hidden' }}>
            <div style={{ width: '2%', height: '100%', backgroundColor: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
          </div>
          <div style={{ marginTop: '32px' }}>
            <button className="glow-button font-label-caps" style={{ padding: '12px 24px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)' }}>UPGRADE TO PRO</button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BillingPage;
