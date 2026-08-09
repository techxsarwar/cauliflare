import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [inputVal, setInputVal] = useState('user@mailinator.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    email: 'user@mailinator.com',
    domain: 'mailinator.com',
    valid: false,
    temporary: true,
    disposable: true,
    provider: 'Mailinator',
    risk_score: 96,
    recommendation: 'BLOCK',
    reasons: [
      'Known temporary/disposable email provider: Mailinator',
      'High risk of fraud and fake account creation',
      'Disposable MX infrastructure detected'
    ]
  });

  const handleRunCheck = async (valToCheck, tabOverride) => {
    const tab = tabOverride || activeTab;
    const targetVal = valToCheck !== undefined ? valToCheck : inputVal;
    if (!targetVal.trim()) return;

    setLoading(true);
    setResult(null);

    let endpoint = '/api/check-email';
    let body = {};

    if (tab === 'email') {
      endpoint = '/api/check-email';
      body = { email: targetVal };
    } else if (tab === 'url') {
      endpoint = '/api/scan-url';
      body = { url: targetVal };
    } else {
      endpoint = '/api/detect-scam';
      body = { text: targetVal };
    }

    try {
      const startTime = performance.now();
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      const endTime = performance.now();
      data._latency = Math.round(endTime - startTime);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Failed to connect to Cauliflare API server' });
    } finally {
      setLoading(false);
    }
  };

  const setSample = (type, value) => {
    setActiveTab(type);
    setInputVal(value);
    handleRunCheck(value, type);
  };

  return (
    <section className="hero-section">
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', marginBottom: '16px', boxShadow: '3px 3px 0px var(--on-surface)' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--error)', borderRadius: '50%', display: 'inline-block' }}></span>
          <span className="font-label-caps" style={{ fontSize: '13px', fontWeight: 'bold' }}>REAL-TIME TEMP MAIL BLOCKER & THREAT INTEL</span>
        </div>
        <h1 className="font-display-xl hero-headline">
          Block Temporary Emails <br /> & Malicious Threats. <br />
          <span className="text-secondary">Zero Burner Accounts.</span>
        </h1>
        <p className="font-body-lg hero-description">
          Protect your platform from temporary disposable emails, fraud signups, phishing URLs, and scams with our high-speed Go security backend.
        </p>

        {/* SAMPLE PRESETS */}
        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <span className="font-label-caps text-on-surface-variant" style={{ fontSize: '11px', display: 'block', marginBottom: '8px' }}>TRY A LIVE DEMO:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button 
              onClick={() => setSample('email', 'user@mailinator.com')} 
              className="press-border font-code-md"
              style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}
            >
              🚫 mailinator.com
            </button>
            <button 
              onClick={() => setSample('email', 'john@temp-mail.org')} 
              className="press-border font-code-md"
              style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}
            >
              🚫 temp-mail.org
            </button>
            <button 
              onClick={() => setSample('email', 'alex@gmail.com')} 
              className="press-border font-code-md"
              style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}
            >
              ✅ gmail.com
            </button>
            <button 
              onClick={() => setSample('url', 'https://bit.ly/suspicious-login')} 
              className="press-border font-code-md"
              style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}
            >
              ⚠️ Phishing URL
            </button>
          </div>
        </div>
      </div>
      
      {/* INTERACTIVE LIVE BLOCKER SANDBOX */}
      <div className="terminal-block press-border-lg" style={{ minWidth: '340px' }}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="dot dot-red"></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
          </div>
          <span className="font-code-md terminal-title">cauliflare_live_blocker.go</span>
        </div>

        <div style={{ padding: '16px', backgroundColor: 'var(--surface-container)', borderBottom: '2px solid var(--on-surface)' }}>
          {/* TAB SELECTOR */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button 
              onClick={() => { setActiveTab('email'); setInputVal('user@mailinator.com'); }}
              className={`font-label-caps ${activeTab === 'email' ? 'press-button' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px', border: '2px solid var(--on-surface)', cursor: 'pointer', backgroundColor: activeTab === 'email' ? 'var(--primary)' : 'var(--surface)' }}
            >
              Temp Mail Check
            </button>
            <button 
              onClick={() => { setActiveTab('url'); setInputVal('https://bit.ly/login-verify'); }}
              className={`font-label-caps ${activeTab === 'url' ? 'press-button' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px', border: '2px solid var(--on-surface)', cursor: 'pointer', backgroundColor: activeTab === 'url' ? 'var(--primary)' : 'var(--surface)' }}
            >
              URL Scanner
            </button>
            <button 
              onClick={() => { setActiveTab('scam'); setInputVal('Send OTP to claim $1000 prize'); }}
              className={`font-label-caps ${activeTab === 'scam' ? 'press-button' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px', border: '2px solid var(--on-surface)', cursor: 'pointer', backgroundColor: activeTab === 'scam' ? 'var(--primary)' : 'var(--surface)' }}
            >
              Scam Detector
            </button>
          </div>

          {/* INPUT FORM */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={activeTab === 'email' ? 'e.g. name@mailinator.com' : activeTab === 'url' ? 'https://example.com' : 'Enter suspicious text'}
              className="font-code-md"
              style={{ flex: 1, padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none' }}
              onKeyDown={(e) => e.key === 'Enter' && handleRunCheck()}
            />
            <button 
              onClick={() => handleRunCheck()}
              disabled={loading}
              className="press-button font-label-caps font-bold"
              style={{ padding: '10px 18px', backgroundColor: 'var(--primary)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {loading ? <RefreshCw size={16} className="spin" /> : <>CHECK <ArrowRight size={16} /></>}
            </button>
          </div>
        </div>

        {/* RESULT CONTAINER */}
        <div className="terminal-body font-code-md" style={{ minHeight: '200px', backgroundColor: '#0d0d0d', padding: '16px' }}>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)' }}>
              <RefreshCw size={20} className="spin" />
              <span>Querying Cauliflare threat registry...</span>
            </div>
          )}

          {!loading && result && result.error && (
            <div style={{ color: 'var(--error)' }}>
              ❌ {result.error}
            </div>
          )}

          {!loading && result && !result.error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* RECOMMENDATION BADGE */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {result.recommendation === 'BLOCK' ? (
                    <ShieldAlert size={24} style={{ color: 'var(--error)' }} />
                  ) : (
                    <CheckCircle size={24} style={{ color: 'var(--primary)' }} />
                  )}
                  <span className="font-bold" style={{ fontSize: '18px', color: result.recommendation === 'BLOCK' ? 'var(--error)' : 'var(--primary)' }}>
                    ACTION: {result.recommendation || (result.safe ? 'ALLOW' : 'BLOCK')}
                  </span>
                </div>
                <div className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>
                  Risk Score: <strong style={{ color: result.recommendation === 'BLOCK' ? 'var(--error)' : 'var(--primary)' }}>{result.risk_score}/100</strong>
                  {result._latency && ` • ${result._latency}ms`}
                </div>
              </div>

              {/* DETAILS */}
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                {result.provider && (
                  <div><span style={{ color: '#888' }}>Provider:</span> <strong style={{ color: '#fff' }}>{result.provider}</strong></div>
                )}
                {result.disposable !== undefined && (
                  <div><span style={{ color: '#888' }}>Temporary Mail:</span> <strong style={{ color: result.disposable ? 'var(--error)' : 'var(--primary)' }}>{result.disposable ? 'YES (Burner)' : 'NO (Legitimate)'}</strong></div>
                )}
                {result.reasons && result.reasons.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ color: '#888', display: 'block', marginBottom: '4px' }}>Analysis Reasons:</span>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#ccc' }}>
                      {result.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
