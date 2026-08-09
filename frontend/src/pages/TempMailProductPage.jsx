import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, Zap, Lock, Mail, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const TempMailProductPage = () => {
  const [emailInput, setEmailInput] = useState('user@mailinator.com');
  const [loading, setLoading] = useState(false);
  const [checkResult, setCheckResult] = useState({
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

  const handleCheck = async (e) => {
    e?.preventDefault();
    if (!emailInput.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });
      const data = await res.json();
      setCheckResult(data);
    } catch (err) {
      setCheckResult({ error: 'Failed to connect to Cauliflare API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingBottom: '96px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <div className="hero-bg dot-grid"></div>
        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', marginBottom: '16px', boxShadow: '3px 3px 0px var(--on-surface)' }}>
            <Mail size={16} color="var(--primary)" />
            <span className="font-label-caps" style={{ fontSize: '12px', fontWeight: 'bold' }}>PRODUCT SPECIFICATION</span>
          </div>
          <h1 className="font-display-xl hero-headline">
            Temporary Email <br />
            <span className="text-secondary">Blocker API.</span>
          </h1>
          <p className="font-body-lg hero-description">
            Prevent fake signups and disposable email spam in real time. Detect 100+ temporary email providers with sub-10ms latency and 100% precision.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard/playground" className="press-button font-label-caps font-bold" style={{ fontSize: '18px', padding: '16px 32px', textDecoration: 'none' }}>
              Test in Playground →
            </Link>
            <Link to="/docs" className="press-button press-button-secondary font-label-caps font-bold" style={{ fontSize: '18px', padding: '16px 32px', textDecoration: 'none' }}>
              Read API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TESTER WIDGET */}
      <section style={{ maxWidth: '900px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} color="var(--primary)" />
              <h2 className="font-label-caps" style={{ fontSize: '16px', fontWeight: 'bold' }}>LIVE TEMP MAIL SCANNER DEMO</h2>
            </div>
            <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>POST /api/check-email</span>
          </div>

          <div style={{ padding: '32px' }}>
            <form onSubmit={handleCheck} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <input 
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter any email (e.g. name@mailinator.com)"
                className="font-code-md"
                style={{ flex: 1, minWidth: '280px', padding: '14px 18px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)', outline: 'none', fontSize: '15px' }}
              />
              <button 
                type="submit"
                disabled={loading}
                className="press-button font-label-caps font-bold"
                style={{ padding: '14px 28px', backgroundColor: 'var(--primary)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}
              >
                {loading ? 'CHECKING...' : <>CHECK EMAIL <ArrowRight size={18} /></>}
              </button>
            </form>

            {/* PRESET SAMPLES */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span className="font-label-caps text-on-surface-variant" style={{ fontSize: '12px' }}>TEST SAMPLES:</span>
              <button onClick={() => { setEmailInput('user@mailinator.com'); }} className="font-code-md" style={{ padding: '4px 10px', backgroundColor: 'var(--surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', fontSize: '12px' }}>🚫 Mailinator</button>
              <button onClick={() => { setEmailInput('test@temp-mail.org'); }} className="font-code-md" style={{ padding: '4px 10px', backgroundColor: 'var(--surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', fontSize: '12px' }}>🚫 TempMail</button>
              <button onClick={() => { setEmailInput('alex@guerrillamail.com'); }} className="font-code-md" style={{ padding: '4px 10px', backgroundColor: 'var(--surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', fontSize: '12px' }}>🚫 GuerrillaMail</button>
              <button onClick={() => { setEmailInput('dev@cauliflare.in'); }} className="font-code-md" style={{ padding: '4px 10px', backgroundColor: 'var(--surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', fontSize: '12px' }}>✅ Legitimate Mail</button>
            </div>

            {/* RESPONSE DISPLAY */}
            {checkResult && (
              <div style={{ padding: '24px', backgroundColor: '#0d0d0d', border: '2px solid var(--on-surface)' }} className="font-code-md">
                {checkResult.error ? (
                  <div style={{ color: 'var(--error)' }}>❌ {checkResult.error}</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {checkResult.recommendation === 'BLOCK' ? <ShieldAlert size={28} color="var(--error)" /> : <ShieldCheck size={28} color="var(--primary)" />}
                        <div>
                          <span className="font-bold" style={{ fontSize: '20px', color: checkResult.recommendation === 'BLOCK' ? 'var(--error)' : 'var(--primary)' }}>
                            ACTION: {checkResult.recommendation}
                          </span>
                          <div style={{ fontSize: '12px', color: '#888' }}>
                            {checkResult.disposable ? 'Disposable / Burner Mail Identified' : 'Verified Legitimate Domain'}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: checkResult.recommendation === 'BLOCK' ? 'var(--error)' : 'var(--primary)' }}>
                          {checkResult.risk_score}/100
                        </div>
                        <div style={{ fontSize: '11px', color: '#888' }}>Risk Score</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
                      <div><span style={{ color: '#888' }}>Email:</span> <strong style={{ color: '#fff' }}>{checkResult.email}</strong></div>
                      <div><span style={{ color: '#888' }}>Domain:</span> <strong style={{ color: '#fff' }}>{checkResult.domain}</strong></div>
                      <div><span style={{ color: '#888' }}>Provider:</span> <strong style={{ color: '#fff' }}>{checkResult.provider}</strong></div>
                      <div><span style={{ color: '#888' }}>Temporary Mail:</span> <strong style={{ color: checkResult.disposable ? 'var(--error)' : 'var(--primary)' }}>{checkResult.disposable ? 'YES (BLOCKED)' : 'NO (ALLOWED)'}</strong></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES GRID */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <h2 className="font-display-xl" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>Why Developers Choose Cauliflare</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ padding: '32px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)' }}>
            <ShieldCheck size={36} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <h3 className="font-headline-md" style={{ marginBottom: '12px' }}>100+ Known Domains</h3>
            <p className="font-body-lg text-on-surface-variant">
              Registry covering Mailinator, TempMail, GuerrillaMail, YopMail, 10MinuteMail, and hundreds of disposable providers updated continuously.
            </p>
          </div>
          <div style={{ padding: '32px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)' }}>
            <Zap size={36} color="var(--secondary)" style={{ marginBottom: '16px' }} />
            <h3 className="font-headline-md" style={{ marginBottom: '12px' }}>Sub-10ms Latency</h3>
            <p className="font-body-lg text-on-surface-variant">
              Written in Go with zero external database dependencies for ultra-fast inline signup form validation.
            </p>
          </div>
          <div style={{ padding: '32px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)' }}>
            <Lock size={36} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <h3 className="font-headline-md" style={{ marginBottom: '12px' }}>Zero False Positives</h3>
            <p className="font-body-lg text-on-surface-variant">
              Heuristic algorithms verify MX records and TLD patterns to ensure legitimate enterprise and consumer emails are never blocked.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CODE INTEGRATION EXAMPLES */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={20} color="var(--primary)" />
            <h2 className="font-label-caps" style={{ fontSize: '16px', fontWeight: 'bold' }}>INTEGRATION SNIPPET</h2>
          </div>
          <div style={{ padding: '32px', backgroundColor: '#121212' }}>
            <pre className="font-code-md" style={{ color: '#00e676', margin: 0, overflowX: 'auto' }}>
{`// Example: Express.js signup route validation
app.post('/register', async (req, res) => {
  const { email } = req.body;

  const check = await fetch('http://localhost:8000/api/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(r => r.json());

  if (check.recommendation === 'BLOCK') {
    return res.status(400).json({ error: 'Disposable email addresses are not permitted.' });
  }

  // Proceed with signup...
});`}
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TempMailProductPage;
