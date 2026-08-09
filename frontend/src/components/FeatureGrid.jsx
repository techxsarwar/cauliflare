import React from 'react';

const FeatureGrid = () => {
  return (
    <section className="feature-section">
      <div className="feature-grid press-border-lg">
        {/* Temp Mail Blocker */}
        <div className="feature-card">
          <div className="feature-header">
            <div className="feature-icon-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>mark_email_read</span>
            </div>
            <h3 className="font-headline-md">TEMP MAIL BLOCKER API</h3>
          </div>
          <p className="font-body-lg feature-desc">
            Prevent burner account spam by detecting and blocking temporary email providers in real time with 100+ domain signatures.
          </p>
          <div className="feature-code font-code-md press-border">
            <span className="text-on-tertiary-container">provider:</span> "mailinator.com",<br/>
            <span className="text-on-tertiary-container">recommendation:</span> <span className="text-error font-bold">"BLOCK"</span>
          </div>
        </div>
        {/* URL Threat Scanner */}
        <div className="feature-card">
          <div className="feature-header">
            <div className="feature-icon-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>language</span>
            </div>
            <h3 className="font-headline-md">URL THREAT SCANNER</h3>
          </div>
          <p className="font-body-lg feature-desc">
            Full-spectrum URL threat analysis including redirect chain inspection, credential phishing, and malware heuristic scoring.
          </p>
          <div className="feature-code font-code-md press-border">
            <span className="text-on-tertiary-container">phishing:</span> <span className="text-error font-bold">true</span>,<br/>
            <span className="text-on-tertiary-container">risk_score:</span> 94/100
          </div>
        </div>
        {/* Scam Detection */}
        <div className="feature-card">
          <div className="feature-header">
            <div className="feature-icon-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>security</span>
            </div>
            <h3 className="font-headline-md">SCAM DETECTION API</h3>
          </div>
          <p className="font-body-lg feature-desc">
            Analyze text messages and social engineering attempts for OTP fraud, prize scams, and phishing intent.
          </p>
          <div className="feature-code font-code-md press-border">
            <span className="text-on-tertiary-container">scam:</span> <span className="text-error font-bold">true</span>,<br/>
            <span className="text-on-tertiary-container">categories:</span> ["otp_fraud", "social_engineering"]
          </div>
        </div>
        {/* Search Intelligence */}
        <div className="feature-card">
          <div className="feature-header">
            <div className="feature-icon-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>search</span>
            </div>
            <h3 className="font-headline-md">SEARCH INTELLIGENCE API</h3>
          </div>
          <p className="font-body-lg feature-desc">
            Query across decentralized threat intelligence databases for blocked domain registries and malicious IP records.
          </p>
          <div className="feature-code font-code-md press-border">
            <span className="text-on-tertiary-container">query:</span> "tempmail",<br/>
            <span className="text-on-tertiary-container">threat_level:</span> <span className="text-secondary-fixed">"high"</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
