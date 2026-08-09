import React from 'react';

const SettingsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Project Settings</h1>
        <p className="font-body-lg text-on-surface-variant">Configure your project, webhooks, and team members.</p>
      </section>

      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)', maxWidth: '600px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)' }}>
          <h2 className="font-label-caps">GENERAL</h2>
        </div>
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label className="font-bold" style={{ display: 'block', marginBottom: '8px' }}>Project Name</label>
            <input type="text" defaultValue="Production Secure" style={{ padding: '12px', width: '100%', border: '2px solid var(--on-surface)', fontFamily: '"Inter", sans-serif' }} />
          </div>
          <div>
            <button className="glow-button font-label-caps" style={{ padding: '12px 24px', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', border: 'none' }}>SAVE CHANGES</button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SettingsPage;
