import React from 'react';
import { Download, FileCode, CheckCircle2, Copy } from 'lucide-react';

const ApiDocsPage = () => {
  return (
    <>
      <style>
        {`
          .docs-layout {
            display: flex;
            min-height: 100vh;
            background: var(--surface);
          }

          .docs-sidebar {
            width: 260px;
            position: sticky;
            top: 80px;
            height: calc(100vh - 80px);
            padding: 32px 20px;
            border-right: 3px solid var(--on-surface);
            background: var(--surface);
            overflow-y: auto;
            flex-shrink: 0;
          }

          .docs-sidebar ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .docs-sidebar > ul > li > a {
            text-decoration: none;
            color: var(--on-surface);
            display: block;
            padding: 10px 14px;
            font-weight: bold;
            border: 2px solid transparent;
            font-size: 13px;
            transition: all 0.15s ease;
          }
          
          .docs-sidebar > ul > li > a:hover {
            background-color: var(--primary);
            color: #ffffff;
            border: 2px solid var(--on-surface);
            box-shadow: 3px 3px 0px var(--on-surface);
          }

          .docs-sidebar .sub-menu {
            padding-left: 12px;
            margin-top: 4px;
            border-left: 3px solid var(--on-surface);
            margin-bottom: 12px;
            margin-left: 8px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .docs-sidebar .sub-menu a {
            text-decoration: none;
            color: var(--on-surface-variant);
            font-size: 12px;
            padding: 6px 10px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: "Space Mono", monospace;
            font-weight: 600;
          }

          .docs-sidebar .sub-menu a:hover {
            color: var(--on-surface);
            background: var(--surface-container);
          }

          .docs-content {
            flex: 1;
            padding: 48px 64px;
            max-width: 960px;
          }

          .docs-section {
            margin-bottom: 64px;
          }

          .docs-endpoint-box {
            background: var(--surface);
            border: 3px solid var(--on-surface);
            box-shadow: 6px 6px 0px var(--on-surface);
            padding: 28px;
            margin-bottom: 32px;
          }

          .method-badge {
            font-size: 10px;
            font-weight: 900;
            padding: 2px 6px;
            color: #fff;
            border: 1px solid var(--on-surface);
          }

          .method-post { background-color: var(--primary); }
          .method-get { background-color: #0088cc; }
        `}
      </style>

      <div className="docs-layout">
        {/* SIDEBAR NAVIGATION */}
        <aside className="docs-sidebar font-label-caps">
          <ul>
            <li><a href="#quickstart">1. Quickstart</a></li>
            <li><a href="#authentication">2. Authentication</a></li>
            <li><a href="#postman-export">3. Postman & OpenAPI</a></li>
            <li>
              <a href="#endpoints">4. Endpoints</a>
              <ul className="sub-menu">
                <li><a href="#check-email"><span className="method-badge method-post">POST</span> /v1/check-email</a></li>
                <li><a href="#scan-url"><span className="method-badge method-post">POST</span> /v1/scan-url</a></li>
                <li><a href="#detect-scam"><span className="method-badge method-post">POST</span> /v1/detect-scam</a></li>
                <li><a href="#check-ip"><span className="method-badge method-post">POST</span> /v1/check-ip</a></li>
                <li><a href="#batch-check-email"><span className="method-badge method-post">POST</span> /v1/batch-check-email</a></li>
                <li><a href="#metrics"><span className="method-badge method-get">GET</span> /api/metrics</a></li>
              </ul>
            </li>
            <li><a href="#sdk-examples">5. SDK Integrations</a></li>
            <li><a href="#error-codes">6. Error Handling</a></li>
          </ul>
        </aside>
        
        {/* MAIN DOCUMENTATION CONTENT */}
        <main className="docs-content">
          
          {/* 1. INTRODUCTION & HEADER */}
          <div className="docs-section" id="quickstart">
            <h1 className="font-display-xl" style={{ fontSize: '42px', marginBottom: '16px' }}>Cauliflare API Reference</h1>
            <p className="font-body-lg text-on-surface-variant" style={{ fontSize: '15px', lineHeight: '1.6' }}>
              Ultra-fast, sub-10ms security infrastructure APIs to block disposable burner emails, scan phishing URLs, detect scam fraud, and verify IP reputation across 74,697+ synced threat signatures.
            </p>

            {/* 1-CLICK POSTMAN & OPENAPI BUTTONS */}
            <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }} id="postman-export">
              <a 
                href="/cauliflare.postman_collection.json" 
                download="cauliflare.postman_collection.json"
                className="glow-button font-label-caps font-bold"
                style={{ textDecoration: 'none', padding: '12px 20px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
              >
                <Download size={16} /> DOWNLOAD POSTMAN COLLECTION
              </a>

              <a 
                href="/openapi.json" 
                download="cauliflare_openapi.json"
                className="press-button font-label-caps font-bold"
                style={{ textDecoration: 'none', padding: '12px 20px', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
              >
                <FileCode size={16} /> OPENAPI 3.0 SPEC (.JSON)
              </a>
            </div>
          </div>

          {/* 2. AUTHENTICATION */}
          <div className="docs-section" id="authentication">
            <h2 className="font-headline-md" style={{ marginBottom: '12px' }}>Authentication</h2>
            <p className="font-body-md text-on-surface-variant" style={{ marginBottom: '16px' }}>
              Authenticate all API requests by providing your secret key in the <code>Authorization</code> HTTP header:
            </p>
            <div style={{ padding: '14px 18px', backgroundColor: '#121212', border: '2px solid var(--on-surface)', color: '#00e676' }} className="font-code-md">
              Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d
            </div>
          </div>

          {/* 3. ENDPOINTS */}
          <div className="docs-section" id="endpoints">
            <h2 className="font-headline-md" style={{ marginBottom: '24px' }}>API Endpoints</h2>

            {/* ENDPOINT 1: CHECK EMAIL */}
            <div className="docs-endpoint-box" id="check-email">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 className="font-headline-md" style={{ fontSize: '20px' }}>1. Check Disposable Email</h3>
                <span className="font-code-md" style={{ backgroundColor: '#121212', color: '#fff', padding: '4px 10px', fontSize: '12px', border: '1px solid var(--on-surface)' }}>
                  POST /v1/check-email
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant" style={{ marginBottom: '16px', fontSize: '14px' }}>
                Evaluates an email address against 74,697+ disposable blocklist signatures and MX infrastructure heuristics in &lt;6ms.
              </p>

              <h4 className="font-label-caps" style={{ fontSize: '12px', marginBottom: '6px', fontWeight: 'bold' }}>cURL Request Example</h4>
              <div style={{ backgroundColor: '#121212', color: '#fff', padding: '12px', border: '2px solid var(--on-surface)', marginBottom: '16px', overflowX: 'auto' }} className="font-code-md">
                <pre>{`curl -X POST https://cauliflare-backend.onrender.com/v1/check-email \\
  -H "Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@mailinator.com"}'`}</pre>
              </div>

              <h4 className="font-label-caps" style={{ fontSize: '12px', marginBottom: '6px', fontWeight: 'bold' }}>Response (200 OK)</h4>
              <div style={{ backgroundColor: '#121212', color: '#00e676', padding: '12px', border: '2px solid var(--on-surface)', overflowX: 'auto' }} className="font-code-md">
                <pre>{`{
  "email": "user@mailinator.com",
  "domain": "mailinator.com",
  "valid": false,
  "temporary": true,
  "disposable": true,
  "provider": "Mailinator",
  "risk_score": 96,
  "recommendation": "BLOCK"
}`}</pre>
              </div>
            </div>

            {/* ENDPOINT 2: SCAN URL */}
            <div className="docs-endpoint-box" id="scan-url">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 className="font-headline-md" style={{ fontSize: '20px' }}>2. Scan Phishing URL</h3>
                <span className="font-code-md" style={{ backgroundColor: '#121212', color: '#fff', padding: '4px 10px', fontSize: '12px', border: '1px solid var(--on-surface)' }}>
                  POST /v1/scan-url
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant" style={{ marginBottom: '16px', fontSize: '14px' }}>
                Inspects redirect chains, credential phishing heuristics, and unverified SSL patterns in &lt;10ms.
              </p>

              <div style={{ backgroundColor: '#121212', color: '#fff', padding: '12px', border: '2px solid var(--on-surface)', marginBottom: '16px', overflowX: 'auto' }} className="font-code-md">
                <pre>{`curl -X POST https://cauliflare-backend.onrender.com/v1/scan-url \\
  -H "Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://bit.ly/login-verify-account"}'`}</pre>
              </div>
            </div>

            {/* ENDPOINT 3: CHECK IP (NEW) */}
            <div className="docs-endpoint-box" id="check-ip">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 className="font-headline-md" style={{ fontSize: '20px' }}>3. IP Threat, Tor & VPN Detector</h3>
                <span className="font-code-md" style={{ backgroundColor: '#121212', color: '#fff', padding: '4px 10px', fontSize: '12px', border: '1px solid var(--on-surface)' }}>
                  POST /v1/check-ip
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant" style={{ marginBottom: '16px', fontSize: '14px' }}>
                Identifies Datacenter hosting ASNs, active Tor exit relays, VPN proxy tunnels, and public proxy nodes.
              </p>

              <h4 className="font-label-caps" style={{ fontSize: '12px', marginBottom: '6px', fontWeight: 'bold' }}>cURL Request Example</h4>
              <div style={{ backgroundColor: '#121212', color: '#fff', padding: '12px', border: '2px solid var(--on-surface)', marginBottom: '16px', overflowX: 'auto' }} className="font-code-md">
                <pre>{`curl -X POST https://cauliflare-backend.onrender.com/v1/check-ip \\
  -H "Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d" \\
  -H "Content-Type: application/json" \\
  -d '{"ip": "185.220.101.5"}'`}</pre>
              </div>

              <h4 className="font-label-caps" style={{ fontSize: '12px', marginBottom: '6px', fontWeight: 'bold' }}>Response (200 OK)</h4>
              <div style={{ backgroundColor: '#121212', color: '#00e676', padding: '12px', border: '2px solid var(--on-surface)', overflowX: 'auto' }} className="font-code-md">
                <pre>{`{
  "ip": "185.220.101.5",
  "valid": true,
  "is_vpn": true,
  "is_datacenter": true,
  "is_tor": true,
  "country": "Germany",
  "asn": "AS208294",
  "org": "Tor Exit Node Network",
  "risk_score": 98,
  "recommendation": "BLOCK"
}`}</pre>
              </div>
            </div>

            {/* ENDPOINT 4: BATCH CHECK EMAIL (NEW) */}
            <div className="docs-endpoint-box" id="batch-check-email">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 className="font-headline-md" style={{ fontSize: '20px' }}>4. Bulk Batch Email Scanner</h3>
                <span className="font-code-md" style={{ backgroundColor: '#121212', color: '#fff', padding: '4px 10px', fontSize: '12px', border: '1px solid var(--on-surface)' }}>
                  POST /v1/batch-check-email
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant" style={{ marginBottom: '16px', fontSize: '14px' }}>
                Scans up to 1,000 email addresses concurrently in a single request for bulk database verification.
              </p>

              <h4 className="font-label-caps" style={{ fontSize: '12px', marginBottom: '6px', fontWeight: 'bold' }}>cURL Request Example</h4>
              <div style={{ backgroundColor: '#121212', color: '#fff', padding: '12px', border: '2px solid var(--on-surface)', marginBottom: '16px', overflowX: 'auto' }} className="font-code-md">
                <pre>{`curl -X POST https://cauliflare-backend.onrender.com/v1/batch-check-email \\
  -H "Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d" \\
  -H "Content-Type: application/json" \\
  -d '{"emails": ["user@mailinator.com", "sarwar@cauliflare.in"]}'`}</pre>
              </div>
            </div>

          </div>

          {/* 4. SDK INTEGRATIONS */}
          <div className="docs-section" id="sdk-examples">
            <h2 className="font-headline-md" style={{ marginBottom: '16px' }}>SDK Integrations</h2>
            
            <h3 className="font-label-caps font-bold" style={{ marginBottom: '8px' }}>Python Integration</h3>
            <div style={{ backgroundColor: '#121212', color: '#fff', padding: '16px', border: '2px solid var(--on-surface)', marginBottom: '24px', overflowX: 'auto' }} className="font-code-md">
              <pre>{`import requests

def verify_user_signup(email):
    res = requests.post(
        "https://cauliflare-backend.onrender.com/v1/check-email",
        headers={"Authorization": "Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d"},
        json={"email": email}
    )
    data = res.json()
    if data.get("recommendation") == "BLOCK":
        raise Exception("Disposable burner emails are not permitted.")
    return True`}</pre>
            </div>

            <h3 className="font-label-caps font-bold" style={{ marginBottom: '8px' }}>Node.js / Express Middleware</h3>
            <div style={{ backgroundColor: '#121212', color: '#fff', padding: '16px', border: '2px solid var(--on-surface)', overflowX: 'auto' }} className="font-code-md">
              <pre>{`async function cauliflareGuard(req, res, next) {
  const { email } = req.body;
  const check = await fetch("https://cauliflare-backend.onrender.com/v1/check-email", {
    method: "POST",
    headers: {
      "Authorization": "Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  }).then(r => r.json());

  if (check.recommendation === "BLOCK") {
    return res.status(400).json({ error: "Disposable email not allowed." });
  }
  next();
}`}</pre>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default ApiDocsPage;
