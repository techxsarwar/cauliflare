import React, { useState, useEffect } from 'react';

const CodeSection = () => {
  const [activeTab, setActiveTab] = useState('python');
  const [snippets, setSnippets] = useState({});

  useEffect(() => {
    fetch('/api/code-snippets')
      .then(res => res.json())
      .then(data => setSnippets(data))
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
