import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../api';

const defaultSnippets = {
  python: 'import cauliflare\n\ncf = cauliflare.Client("cf_sarwar-cauliflare_live_x829a47f01b92c81d")\n\nresponse = cf.check_email({\n    "email": "user@mailinator.com"\n})\n\nif response.recommendation == "BLOCK":\n    print(f"Blocked burner mail provider: {response.provider}")',
  node: 'const { Client } = require("cauliflare");\n\nconst cf = new Client("cf_sarwar-cauliflare_live_x829a47f01b92c81d");\n\ncf.checkEmail({\n    email: "user@mailinator.com"\n}).then(res => {\n    if (res.recommendation === "BLOCK") {\n        console.log(`Rejecting signup from ${res.provider}`);\n    }\n});',
  go: 'import "github.com/cauliflare/sdk-go"\n\ncf := cauliflare.NewClient("cf_sarwar-cauliflare_live_x829a47f01b92c81d")\n\nres, err := cf.CheckEmail(ctx, &cauliflare.EmailOpts{\n    Email: "user@mailinator.com",\n})\n\nif res.Recommendation == "BLOCK" {\n    fmt.Printf("Blocked temp mail: %s\\n", res.Provider)\n}',
  curl: 'curl -X POST https://api.cauliflare.in/v1/check-email \\\n  -H "Authorization: Bearer cf_sarwar-cauliflare_live_x829a47f01b92c81d" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "email": "user@mailinator.com" }\''
};

const CodeSection = () => {
  const [activeTab, setActiveTab] = useState('python');
  const [snippets, setSnippets] = useState(defaultSnippets);

  useEffect(() => {
    fetch(getApiUrl('/api/code-snippets'))
      .then(res => res.json())
      .then(data => {
        if (data.python) setSnippets(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="code-section">
      <div className="code-container">
        <div className="code-header">
          <h2 className="font-display-xl code-title">Integrate in Minutes.</h2>
          <div className="code-tabs">
            {['python', 'node', 'go', 'curl'].map((lang) => (
              <button 
                key={lang}
                className={`code-tab-btn font-label-caps press-border ${activeTab === lang ? 'active' : ''}`}
                onClick={() => setActiveTab(lang)}
              >
                {lang === 'node' ? 'Node.js' : lang}
              </button>
            ))}
          </div>
        </div>
        
        <div className="code-panels press-border-lg">
          <div className="code-panel code-panel-req">
            <span className="font-label-caps panel-label panel-label-req">Client Request</span>
            <div className="code-content font-code-md text-on-surface">
              <pre><code>{snippets[activeTab] || 'Loading...'}</code></pre>
            </div>
          </div>
          <div className="code-panel code-panel-res">
            <span className="font-label-caps panel-label panel-label-res">API Response</span>
            <div className="code-content font-code-md text-primary-fixed">
              <pre><code>{`{
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
    "High risk of fraud and fake account creation"
  ]
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
