import React, { useState } from 'react';
import { Play, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

const PlaygroundPage = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/check-email');
  const [requestBody, setRequestBody] = useState(`{\n  "email": "user@mailinator.com"\n}`);
  const [loading, setLoading] = useState(false);
  const [responseMeta, setResponseMeta] = useState({ status: '200 OK', latency: '12ms' });
  const [responseBody, setResponseBody] = useState(`{
  "email": "user@mailinator.com",
  "domain": "mailinator.com",
  "valid": false,
  "temporary": true,
  "disposable": true,
  "provider": "Mailinator",
  "risk_score": 96,
  "recommendation": "BLOCK",
  "reasons": [
    "Known temporary/disposable email provider: Mailinator",
    "High risk of fraud and fake account creation",
    "Disposable MX infrastructure detected"
  ]
}`);

  const samplePayloads = {
    '/api/check-email': `{\n  "email": "user@mailinator.com"\n}`,
    '/api/scan-url': `{\n  "url": "https://bit.ly/suspicious-login"\n}`,
    '/api/detect-scam': `{\n  "text": "Send OTP urgently to claim reward"\n}`
  };

  const handleEndpointChange = (endpoint) => {
    setSelectedEndpoint(endpoint);
    if (samplePayloads[endpoint]) {
      setRequestBody(samplePayloads[endpoint]);
    }
  };

  const handleRunTest = async () => {
    setLoading(true);
    setResponseMeta(null);
    try {
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        setResponseBody(JSON.stringify({ error: 'Invalid JSON formatting in request body' }, null, 2));
        setResponseMeta({ status: '400 Bad Request', latency: '0ms', isError: true });
        setLoading(false);
        return;
      }

      const startTime = performance.now();
      const res = await fetch(selectedEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedBody)
      });
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);

      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));
      setResponseMeta({
        status: `${res.status} ${res.statusText || 'OK'}`,
        latency: `${latencyMs}ms`,
        isError: !res.ok
      });
    } catch (err) {
      console.error(err);
      setResponseBody(JSON.stringify({ error: 'Failed to connect to backend server' }, null, 2));
      setResponseMeta({ status: '500 Server Error', latency: '0ms', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%' }}>
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>API Playground</h1>
        <p className="font-body-lg text-on-surface-variant">Test Cauliflare Temporary Mail & Threat Intelligence APIs in real time against the Go backend.</p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', flex: 1 }}>
        
        {/* REQUEST PANEL */}
        <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', display: 'flex', flexDirection: 'column', boxShadow: '8px 8px 0px var(--on-surface)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select 
              value={selectedEndpoint}
              onChange={(e) => handleEndpointChange(e.target.value)}
              className="font-code-md" 
              style={{ padding: '8px 12px', backgroundColor: 'var(--surface)', border: '2px solid var(--on-surface)', color: 'var(--on-surface)', flex: 1, cursor: 'pointer', fontWeight: 'bold' }}
            >
              <option value="/api/check-email">POST /api/check-email (Temp Mail Blocker)</option>
              <option value="/api/scan-url">POST /api/scan-url (URL Threat Scanner)</option>
              <option value="/api/detect-scam">POST /api/detect-scam (Scam Text Analyzer)</option>
            </select>
            <button 
              onClick={handleRunTest}
              disabled={loading}
              className="glow-button font-label-caps" 
              style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid var(--on-surface)', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? <RefreshCw size={16} className="spin" /> : <><Play size={16} /> SEND REQUEST</>}
            </button>
          </div>
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="font-code-md">Request Body (JSON)</label>
              <button 
                onClick={() => setRequestBody(samplePayloads[selectedEndpoint] || '{}')}
                className="font-code-md text-on-surface-variant"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
              >
                Reset Sample Payload
              </button>
            </div>
            <textarea 
              className="font-code-md"
              style={{ width: '100%', minHeight: '260px', backgroundColor: '#121212', color: '#fff', padding: '16px', border: '2px solid var(--on-surface)', resize: 'vertical', flex: 1, outline: 'none' }}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* RESPONSE PANEL */}
        <div style={{ backgroundColor: 'var(--surface-container-lowest)', border: '2px solid var(--on-surface)', display: 'flex', flexDirection: 'column', boxShadow: '8px 8px 0px var(--on-surface)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-label-caps" style={{ fontWeight: 'bold' }}>REAL-TIME RESPONSE</span>
            {responseMeta && (
              <span className="font-code-md" style={{ fontWeight: 'bold', color: responseMeta.isError ? 'var(--error)' : 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {responseMeta.isError ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                {responseMeta.status} • {responseMeta.latency}
              </span>
            )}
          </div>
          <div style={{ padding: '24px', flex: 1, backgroundColor: '#0d0d0d', overflow: 'auto' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)' }} className="font-code-md">
                <RefreshCw size={20} className="spin" />
                <span>Executing request against Go backend server...</span>
              </div>
            ) : (
              <pre className="font-code-md" style={{ margin: 0, color: responseMeta && responseMeta.isError ? 'var(--error)' : '#00e676', lineHeight: '1.5' }}>
                {responseBody}
              </pre>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaygroundPage;
