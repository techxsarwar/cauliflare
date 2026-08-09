import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, Send, CheckCircle2, AlertTriangle, Save, Globe, Key, ShieldCheck } from 'lucide-react';
import { getApiUrl } from '../../api';

const SettingsPage = () => {
  const [projectName, setProjectName] = useState('Cauliflare Production Core');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookPlatform, setWebhookPlatform] = useState('discord');
  const [alertCritical, setAlertCritical] = useState(true);
  const [alertTempMail, setAlertTempMail] = useState(true);
  const [alertPhishing, setAlertPhishing] = useState(true);
  const [alertQuota, setAlertQuota] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState('0.0.0.0/0 (Global Access)');

  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Custom Domain Rules State
  const [customRules, setCustomRules] = useState([
    { domain: 'competitor-spam.com', action: 'BLOCK', note: 'Known bad actor account generator' },
    { domain: 'trusted-partner.org', action: 'ALLOW', note: 'Whitelisted enterprise partner' }
  ]);
  const [newDomainRule, setNewDomainRule] = useState('');
  const [newDomainAction, setNewDomainAction] = useState('BLOCK');
  const [newDomainNote, setNewDomainNote] = useState('');

  const handleAddCustomRule = () => {
    if (!newDomainRule.trim()) return;
    const rule = {
      domain: newDomainRule.trim().toLowerCase(),
      action: newDomainAction,
      note: newDomainNote.trim() || 'Custom override'
    };
    const updated = [rule, ...customRules.filter(r => r.domain !== rule.domain)];
    setCustomRules(updated);
    setNewDomainRule('');
    setNewDomainNote('');
    showToast(`Added custom rule for ${rule.domain} (${rule.action})`);

    // Sync with backend
    fetch(getApiUrl('/api/custom-rules'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rule)
    }).catch(() => {});
  };

  const handleDeleteCustomRule = (domain) => {
    setCustomRules(customRules.filter(r => r.domain !== domain));
    showToast(`Removed custom rule for ${domain}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cauliflare_project_settings');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.projectName) setProjectName(data.projectName);
        if (data.webhookUrl) setWebhookUrl(data.webhookUrl);
        if (data.webhookPlatform) setWebhookPlatform(data.webhookPlatform);
        if (data.alertCritical !== undefined) setAlertCritical(data.alertCritical);
        if (data.alertTempMail !== undefined) setAlertTempMail(data.alertTempMail);
        if (data.alertPhishing !== undefined) setAlertPhishing(data.alertPhishing);
        if (data.alertQuota !== undefined) setAlertQuota(data.alertQuota);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const settings = {
      projectName,
      webhookUrl,
      webhookPlatform,
      alertCritical,
      alertTempMail,
      alertPhishing,
      alertQuota,
      ipWhitelist
    };
    try {
      localStorage.setItem('cauliflare_project_settings', JSON.stringify(settings));
      showToast('Settings saved successfully!');
    } catch (e) {
      showToast('Failed to save settings to local storage.');
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl.trim()) {
      alert('Please enter a valid Discord or Slack Webhook URL first.');
      return;
    }

    setTestingWebhook(true);
    setTestResult(null);

    try {
      const res = await fetch(getApiUrl('/api/webhook/test'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhook_url: webhookUrl.trim(),
          platform: webhookPlatform
        })
      });

      const data = await res.json();
      if (data.success) {
        setTestResult({ success: true, message: data.message || 'Webhook alert delivered successfully!' });
        showToast('Webhook alert sent!');
      } else {
        setTestResult({ success: false, message: data.message || 'Webhook failed to trigger.' });
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Network error communicating with webhook API.' });
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', maxWidth: '900px', position: 'relative' }}>
      
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          padding: '12px 24px',
          border: '2px solid var(--on-surface)',
          boxShadow: '4px 4px 0px var(--on-surface)',
          zIndex: 1000,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="font-code-md">
          <ShieldCheck size={18} /> {toastMessage}
        </div>
      )}

      {/* HEADER */}
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Project Settings</h1>
        <p className="font-body-lg text-on-surface-variant" style={{ fontWeight: '600' }}>
          Configure live threat webhooks, alerting integrations, and project security parameters.
        </p>
      </section>

      <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* 1. GENERAL SETTINGS */}
        <div style={{ border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={18} />
            <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>GENERAL CONFIGURATION</h2>
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>PROJECT NAME</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="font-code-md"
                style={{ width: '100%', padding: '12px 16px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }} 
              />
            </div>

            <div>
              <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>ALLOWED IP CIDR WHITELIST</label>
              <input 
                type="text" 
                value={ipWhitelist}
                onChange={(e) => setIpWhitelist(e.target.value)}
                className="font-code-md"
                style={{ width: '100%', padding: '12px 16px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }} 
              />
              <span className="font-code-md" style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '4px', display: 'block' }}>
                Restrict API key usage to specific static IPs or leave 0.0.0.0/0 for all cloud clients.
              </span>
            </div>
          </div>
        </div>

        {/* 2. REAL-TIME THREAT WEBHOOKS (DISCORD & SLACK) */}
        <div style={{ border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={18} color="var(--primary)" />
              <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>WEBHOOK THREAT ALERTS (SLACK / DISCORD)</h2>
            </div>
            <span className="font-label-caps" style={{ backgroundColor: 'var(--primary)', color: '#ffffff', padding: '2px 8px', fontSize: '10px', border: '1px solid var(--on-surface)' }}>
              LIVE DISPATCH
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>
              Receive instant rich alert embeds directly in your engineering Discord or Slack channels whenever high-risk threats, phishing URLs, or disposable sign-up spikes are detected.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>PLATFORM TARGET</label>
                <select 
                  value={webhookPlatform}
                  onChange={(e) => setWebhookPlatform(e.target.value)}
                  className="font-code-md"
                  style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', outline: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  <option value="discord">Discord Channel Webhook</option>
                  <option value="slack">Slack Incoming Webhook</option>
                  <option value="generic">Generic HTTPS Webhook (JSON)</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>WEBHOOK URL</label>
                <input 
                  type="url" 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/... or https://hooks.slack.com/..."
                  className="font-code-md"
                  style={{ width: '100%', padding: '12px 16px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }} 
                />
              </div>
            </div>

            {/* Test Trigger Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={handleTestWebhook}
                disabled={testingWebhook}
                className="press-button font-label-caps font-bold"
                style={{ padding: '10px 20px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Send size={15} /> {testingWebhook ? 'DISPATCHING TEST PING...' : '⚡ TEST WEBHOOK PING'}
              </button>

              {testResult && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 14px', 
                  border: '1px solid var(--on-surface)',
                  backgroundColor: testResult.success ? 'var(--primary-container)' : 'var(--error-container)',
                  color: testResult.success ? 'var(--on-primary-container)' : 'var(--on-error-container)'
                }} className="font-code-md">
                  {testResult.success ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{testResult.message}</span>
                </div>
              )}
            </div>

            {/* Notification Triggers */}
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--outline-variant)', paddingTop: '16px' }}>
              <label className="font-label-caps" style={{ display: 'block', marginBottom: '12px', fontSize: '12px', fontWeight: 'bold' }}>TRIGGER EVENTS</label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} className="font-body-md">
                  <input type="checkbox" checked={alertCritical} onChange={(e) => setAlertCritical(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Critical Threat (Risk ≥ 90)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} className="font-body-md">
                  <input type="checkbox" checked={alertTempMail} onChange={(e) => setAlertTempMail(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Disposable Email Blocked</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} className="font-body-md">
                  <input type="checkbox" checked={alertPhishing} onChange={(e) => setAlertPhishing(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Phishing URL Intercepted</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} className="font-body-md">
                  <input type="checkbox" checked={alertQuota} onChange={(e) => setAlertQuota(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Monthly Quota Limit Reach (&gt;80%)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CUSTOM DOMAIN BLACKLIST & WHITELIST MANAGER */}
        <div style={{ border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--primary)" />
              <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>CUSTOM DOMAIN RULES (BLACKLIST & WHITELIST)</h2>
            </div>
            <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>Overrides global engine</span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>
              Add custom domain overrides to immediately block bad-actor competitors or whitelist trusted enterprise domains.
            </p>

            {/* ADD RULE FORM */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newDomainRule}
                onChange={(e) => setNewDomainRule(e.target.value)}
                placeholder="domain.com (e.g. competitor.com)"
                className="font-code-md"
                style={{ flex: 2, minWidth: '200px', padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }}
              />
              <select
                value={newDomainAction}
                onChange={(e) => setNewDomainAction(e.target.value)}
                className="font-code-md font-bold"
                style={{ flex: 1, minWidth: '120px', padding: '10px 14px', backgroundColor: 'var(--surface)', border: '2px solid var(--on-surface)' }}
              >
                <option value="BLOCK">⛔ BLOCK</option>
                <option value="ALLOW">✅ ALLOW</option>
              </select>
              <input
                type="text"
                value={newDomainNote}
                onChange={(e) => setNewDomainNote(e.target.value)}
                placeholder="Reason / Note (optional)"
                className="font-code-md"
                style={{ flex: 2, minWidth: '200px', padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }}
              />
              <button
                type="button"
                onClick={handleAddCustomRule}
                className="press-button font-label-caps font-bold"
                style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', cursor: 'pointer' }}
              >
                + ADD RULE
              </button>
            </div>

            {/* RULES TABLE */}
            <div style={{ border: '2px solid var(--on-surface)', maxHeight: '240px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--surface)' }} className="font-code-md">
                <thead>
                  <tr style={{ backgroundColor: 'var(--on-surface)', color: 'var(--surface)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 14px', fontSize: '11px' }}>DOMAIN</th>
                    <th style={{ padding: '8px 14px', fontSize: '11px' }}>ACTION</th>
                    <th style={{ padding: '8px 14px', fontSize: '11px' }}>NOTE</th>
                    <th style={{ padding: '8px 14px', fontSize: '11px', textAlign: 'right' }}>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {customRules.map((rule, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>{rule.domain}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', backgroundColor: rule.action === 'BLOCK' ? 'var(--error)' : 'var(--primary)', color: '#ffffff' }}>
                          {rule.action}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--on-surface-variant)', fontSize: '12px' }}>{rule.note || 'No note'}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomRule(rule.domain)}
                          style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. 1-LINE JAVASCRIPT FORM GUARD SDK GENERATOR */}
        <div style={{ border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={20} color="var(--primary)" />
              <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>1-LINE EMBEDDABLE FORM GUARD (cauliflare.js)</h2>
            </div>
            <span className="font-code-md" style={{ backgroundColor: 'var(--primary)', color: '#ffffff', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold' }}>100% FREE SDK</span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>
              Paste this single script tag into any HTML signup form or page. It automatically validates emails, blocks temporary burners, and alerts users of typos as they type!
            </p>

            <div style={{ position: 'relative' }}>
              <pre className="font-code-md" style={{ margin: 0, padding: '16px', backgroundColor: '#121212', color: '#00e676', border: '2px solid var(--on-surface)', fontSize: '13px', overflowX: 'auto' }}>
{`<script 
  src="https://cauliflare-backend.onrender.com/cauliflare.js" 
  data-key="cf_sarwar_cauliflare_live_x829a47f01b92c81d">
</script>`}
              </pre>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('<script src="https://cauliflare-backend.onrender.com/cauliflare.js" data-key="cf_sarwar_cauliflare_live_x829a47f01b92c81d"></script>');
                  showToast('📋 Embed script tag copied to clipboard!');
                }}
                className="press-button font-label-caps font-bold"
                style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '1px solid var(--on-surface)', cursor: 'pointer', fontSize: '11px' }}
              >
                COPY CODE
              </button>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div>
          <button 
            type="submit"
            className="glow-button font-label-caps font-bold" 
            style={{ padding: '14px 32px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <Save size={18} /> SAVE PROJECT SETTINGS
          </button>
        </div>

      </form>
    </div>
  );
};

export default SettingsPage;

