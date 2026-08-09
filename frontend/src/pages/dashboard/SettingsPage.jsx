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
