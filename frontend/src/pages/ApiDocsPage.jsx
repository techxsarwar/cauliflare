import React from 'react';

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
            width: 250px;
            position: sticky;
            top: 80px;
            height: calc(100vh - 80px);
            padding: 32px;
            border-right: 4px solid var(--on-surface);
            background: var(--surface);
            overflow-y: auto;
            flex-shrink: 0;
          }

          .docs-sidebar ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .docs-sidebar > ul > li > a {
            text-decoration: none;
            color: var(--on-surface);
            display: block;
            padding: 12px 16px;
            font-weight: bold;
            border: 2px solid transparent;
            transition: all 0.2s ease;
          }
          
          .docs-sidebar > ul > li > a:hover {
            background-color: var(--primary);
            color: var(--on-primary);
            border: 2px solid var(--on-surface);
            box-shadow: 4px 4px 0px var(--on-surface);
            transform: translate(-2px, -2px);
          }

          .docs-sidebar .sub-menu {
            padding-left: 16px;
            margin-top: 8px;
            border-left: 4px solid var(--surface-dim);
            margin-bottom: 16px;
            margin-left: 8px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .docs-sidebar .sub-menu a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            text-decoration: none;
            color: var(--on-surface-variant);
            transition: all 0.2s ease;
            border: 2px solid transparent;
          }

          .docs-sidebar .sub-menu a:hover {
            color: var(--on-surface);
            background-color: var(--surface-container-high);
            border: 2px solid var(--on-surface);
            transform: translateX(4px);
            box-shadow: 2px 2px 0px var(--on-surface);
          }

          .method-badge {
            font-size: 10px;
            padding: 2px 6px;
            font-weight: bold;
            color: var(--surface);
          }
          .method-post { background-color: var(--secondary); }
          .method-get { background-color: var(--primary); }

          .docs-content {
            flex: 1;
            padding: 48px;
            max-width: 900px;
          }

          .docs-section {
            margin-bottom: 64px;
          }

          .docs-endpoint-box {
            background: var(--surface-container);
            padding: 24px;
            margin-top: 32px;
            scroll-margin-top: 100px; /* For anchor links */
          }
        `}
      </style>
      <div className="docs-layout">
        <aside className="docs-sidebar font-label-caps">
          <ul>
            <li><a href="#introduction">1. Introduction</a></li>
            <li><a href="#authentication">2. Authentication</a></li>
            <li>
              <a href="#endpoints">3. Endpoints</a>
              <ul className="sub-menu">
                <li>
                  <a href="#scan-url">
                    <span className="method-badge method-post">POST</span>
                    /scan-url
                  </a>
                </li>
                <li>
                  <a href="#check-email">
                    <span className="method-badge method-post">POST</span>
                    /check-email
                  </a>
                </li>
                <li>
                  <a href="#detect-scam">
                    <span className="method-badge method-post">POST</span>
                    /detect-scam
                  </a>
                </li>
                <li>
                  <a href="#search">
                    <span className="method-badge method-get">GET</span>
                    /search
                  </a>
                </li>
              </ul>
            </li>
            <li><a href="#error-codes">4. Error Codes</a></li>
            <li><a href="#sdk-examples">5. SDK Examples</a></li>
          </ul>
        </aside>
        
        <main className="docs-content">
          <div className="docs-section" id="introduction">
            <h1 className="font-display-xl" style={{ fontSize: '48px' }}>API Documentation</h1>
            <p className="font-body-lg text-on-surface-variant" style={{ marginTop: '16px' }}>
              A complete guide that teaches developers how to use the Cauliflare API. Think of it as your instruction manual, API guide, and integration reference.
            </p>
            <br/>
            <h2 className="font-headline-md">What is Cauliflare?</h2>
            <p className="font-body-lg" style={{ marginTop: '8px' }}>
              Cauliflare provides infrastructure APIs for scam detection, URL intelligence, temp mail detection, and internet security. It solves the problem of modern applications facing scams, spam, phishing, fake users, and malicious links.
            </p>
          </div>

          <div className="docs-section" id="authentication">
            <h2 className="font-display-xl">Authentication</h2>
            <p className="font-body-lg" style={{ marginTop: '16px' }}>
              All API requests require an API key. Tell developers how to use API keys by including your API key in the <code>Authorization</code> header.
            </p>
            <div className="code-content font-code-md text-on-surface press-border-lg" style={{ marginTop: '16px', padding: '16px', background: 'var(--surface-container)' }}>
              <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
            </div>
          </div>

          <div className="docs-section" id="endpoints">
            <h2 className="font-display-xl">Endpoints</h2>
            <p className="font-body-lg text-on-surface-variant" style={{ marginTop: '16px' }}>The most important section.</p>
            
            <div className="docs-endpoint-box press-border-lg" id="scan-url">
              <h3 className="font-headline-md text-primary">Scan URL</h3>
              <p className="font-body-lg" style={{ marginTop: '8px' }}>Analyze suspicious URLs for phishing, scams, malware, and threats.</p>
              <br/>
              <div className="font-code-md" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--on-surface)', color: 'var(--surface)', fontWeight: 'bold' }}>POST /scan-url</div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Request Example</h4>
              <p className="font-body-lg text-on-surface-variant" style={{ marginTop: '4px', marginBottom: '8px', fontSize: '14px' }}>Show what developers send.</p>
              <div className="code-content font-code-md text-on-surface press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "url": "https://example.com"
  }`}</code></pre>
              </div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Response Example</h4>
              <p className="font-body-lg text-on-surface-variant" style={{ marginTop: '4px', marginBottom: '8px', fontSize: '14px' }}>Show what your API returns.</p>
              <div className="code-content font-code-md text-primary-fixed press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "safe": false,
    "risk_score": 92
  }`}</code></pre>
              </div>
            </div>

            <div className="docs-endpoint-box press-border-lg" id="check-email">
              <h3 className="font-headline-md text-primary">Check Email</h3>
              <p className="font-body-lg" style={{ marginTop: '8px' }}>Detect temporary and disposable email addresses.</p>
              <br/>
              <div className="font-code-md" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--on-surface)', color: 'var(--surface)', fontWeight: 'bold' }}>POST /check-email</div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Request Example</h4>
              <div className="code-content font-code-md text-on-surface press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "email": "test@mailinator.com"
  }`}</code></pre>
              </div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Response Example</h4>
              <div className="code-content font-code-md text-primary-fixed press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "valid": false,
    "temporary": true,
    "provider": "Mailinator",
    "risk_score": 87
  }`}</code></pre>
              </div>
            </div>

            <div className="docs-endpoint-box press-border-lg" id="detect-scam">
              <h3 className="font-headline-md text-primary">Detect Scam</h3>
              <p className="font-body-lg" style={{ marginTop: '8px' }}>Analyze text for scams and fraudulent intent.</p>
              <br/>
              <div className="font-code-md" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--on-surface)', color: 'var(--surface)', fontWeight: 'bold' }}>POST /detect-scam</div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Request Example</h4>
              <div className="code-content font-code-md text-on-surface press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "text": "Send OTP to claim your reward"
  }`}</code></pre>
              </div>
              
              <h4 className="font-label-caps" style={{ marginTop: '24px' }}>Response Example</h4>
              <div className="code-content font-code-md text-primary-fixed press-border" style={{ padding: '16px', background: '#fff' }}>
  <pre><code>{`{
    "scam": true,
    "risk_score": 96,
    "categories": [
      "otp_fraud",
      "social_engineering"
    ]
  }`}</code></pre>
              </div>
            </div>
            
            <div className="docs-endpoint-box press-border-lg" id="search">
              <h3 className="font-headline-md text-primary">Search Intelligence</h3>
              <p className="font-body-lg" style={{ marginTop: '8px' }}>Search threat databases.</p>
              <br/>
              <div className="font-code-md" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--on-surface)', color: 'var(--surface)', fontWeight: 'bold' }}>GET /search</div>
            </div>
          </div>

          <div className="docs-section" id="error-codes">
            <h2 className="font-display-xl">Error Codes</h2>
            <p className="font-body-lg" style={{ marginTop: '16px' }}>Tell what errors mean.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
              <li style={{ padding: '16px', borderBottom: '2px solid var(--on-surface)', display: 'flex', gap: '32px' }}>
                <strong className="font-code-md" style={{ width: '60px' }}>401</strong>
                <span className="font-body-lg">Invalid API key</span>
              </li>
              <li style={{ padding: '16px', borderBottom: '2px solid var(--on-surface)', display: 'flex', gap: '32px' }}>
                <strong className="font-code-md" style={{ width: '60px' }}>429</strong>
                <span className="font-body-lg">Too many requests</span>
              </li>
              <li style={{ padding: '16px', borderBottom: '2px solid var(--on-surface)', display: 'flex', gap: '32px' }}>
                <strong className="font-code-md" style={{ width: '60px' }}>500</strong>
                <span className="font-body-lg">Server error</span>
              </li>
            </ul>
          </div>

          <div className="docs-section" id="sdk-examples">
            <h2 className="font-display-xl">SDK Examples</h2>
            <p className="font-body-lg" style={{ marginTop: '16px' }}>Show usage in multiple languages. Developers LOVE this.</p>
            
            <h3 className="font-headline-md" style={{ marginTop: '32px' }}>JavaScript</h3>
            <div className="code-content font-code-md text-on-surface press-border-lg" style={{ padding: '16px', background: 'var(--surface-container)', marginTop: '8px' }}>
              <pre><code>{`const result = await cauliflare.scanURL(url)`}</code></pre>
            </div>
            
            <h3 className="font-headline-md" style={{ marginTop: '32px' }}>Python</h3>
            <div className="code-content font-code-md text-on-surface press-border-lg" style={{ padding: '16px', background: 'var(--surface-container)', marginTop: '8px' }}>
              <pre><code>{`result = client.scan_url(url)`}</code></pre>
            </div>
            
            <h3 className="font-headline-md" style={{ marginTop: '32px' }}>cURL</h3>
            <div className="code-content font-code-md text-on-surface press-border-lg" style={{ padding: '16px', background: 'var(--surface-container)', marginTop: '8px' }}>
              <pre><code>{`curl -X POST https://api.cauliflare.in/v1/scan-url \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`}</code></pre>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default ApiDocsPage;
