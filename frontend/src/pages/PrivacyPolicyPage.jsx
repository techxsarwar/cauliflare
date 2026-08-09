import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: 'var(--surface)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px' }}>
        <span className="font-label-caps network-tag">LEGAL</span>
        <h1 className="font-display-xl" style={{ fontSize: '48px', marginTop: '16px', marginBottom: '32px' }}>Privacy Policy</h1>
        
        <div className="font-body-lg text-on-surface-variant" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p><strong>Last Updated:</strong> May 27, 2026</p>
          <p>Welcome to Cauliflare.</p>
          <p>This Privacy Policy explains how Cauliflare (“we”, “our”, or “us”) collects, uses, and protects information when you use our APIs, services, website, applications, and developer tools.</p>
          <p>By using Cauliflare, you agree to this Privacy Policy.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>1. Information We Collect</h2>
          <h3 className="font-label-caps text-on-surface">Account Information</h3>
          <p>When you create an account, we may collect:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Username</li>
            <li>Billing information</li>
            <li>API usage information</li>
          </ul>

          <h3 className="font-label-caps text-on-surface" style={{ marginTop: '16px' }}>API Usage Data</h3>
          <p>When you use Cauliflare APIs, we may collect:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>Request metadata</li>
            <li>IP addresses</li>
            <li>Request timestamps</li>
            <li>Error logs</li>
            <li>Rate limit usage</li>
            <li>Device/browser information</li>
          </ul>
          <p>We use this information to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>operate services</li>
            <li>prevent abuse</li>
            <li>improve reliability</li>
            <li>monitor performance</li>
            <li>detect fraud and malicious activity</li>
          </ul>

          <h3 className="font-label-caps text-on-surface" style={{ marginTop: '16px' }}>Security & Threat Data</h3>
          <p>Cauliflare may process:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>URLs</li>
            <li>domains</li>
            <li>suspicious text</li>
            <li>temporary email addresses</li>
            <li>metadata related to scam or phishing detection</li>
          </ul>
          <p>This data is used solely for:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>threat analysis</li>
            <li>spam prevention</li>
            <li>abuse detection</li>
            <li>security research</li>
          </ul>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>2. How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>provide and maintain services</li>
            <li>authenticate users</li>
            <li>generate analytics</li>
            <li>improve API accuracy</li>
            <li>prevent fraud and abuse</li>
            <li>enforce rate limits</li>
            <li>secure infrastructure</li>
            <li>communicate service updates</li>
          </ul>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>3. Data Retention</h2>
          <p>We retain data only as long as necessary to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>provide services</li>
            <li>comply with legal obligations</li>
            <li>improve platform security</li>
            <li>resolve disputes</li>
            <li>enforce agreements</li>
          </ul>
          <p>Some logs and analytics may be retained for security and operational purposes.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>4. API Data Handling</h2>
          <p>Cauliflare does not claim ownership of customer-submitted content.</p>
          <p>We do not sell API request data to advertisers or third parties.</p>
          <p>Submitted data may be temporarily processed for:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>threat detection</li>
            <li>spam analysis</li>
            <li>security scoring</li>
            <li>infrastructure monitoring</li>
          </ul>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>5. Security</h2>
          <p>We implement industry-standard safeguards designed to protect data and infrastructure, including:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>encryption in transit</li>
            <li>access controls</li>
            <li>monitoring systems</li>
            <li>rate limiting</li>
            <li>abuse prevention mechanisms</li>
          </ul>
          <p>However, no system is completely secure.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>6. Third-Party Services</h2>
          <p>Cauliflare may use third-party providers for:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>hosting</li>
            <li>analytics</li>
            <li>billing</li>
            <li>monitoring</li>
            <li>infrastructure delivery</li>
          </ul>
          <p>These providers may process limited information necessary to provide their services.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>7. Cookies & Analytics</h2>
          <p>Our website may use cookies and analytics technologies to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>improve user experience</li>
            <li>measure traffic</li>
            <li>analyze performance</li>
            <li>maintain authentication sessions</li>
          </ul>
          <p>Users may disable cookies through browser settings.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>8. Open Source Components</h2>
          <p>Certain Cauliflare components may be open source.</p>
          <p>Open-source repositories may publicly display:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>commits</li>
            <li>usernames</li>
            <li>contributions</li>
          </ul>
          <p>Users are responsible for information voluntarily submitted to public repositories.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>9. Children’s Privacy</h2>
          <p>Cauliflare is not intended for children under 13 years of age.</p>
          <p>We do not knowingly collect personal information from children.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>10. Acceptable Use</h2>
          <p>Users may not use Cauliflare to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>conduct illegal activities</li>
            <li>distribute malware</li>
            <li>perform unauthorized attacks</li>
            <li>abuse infrastructure</li>
            <li>violate privacy rights</li>
            <li>bypass security systems</li>
          </ul>
          <p>Violation may result in suspension or termination.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>11. International Users</h2>
          <p>By using Cauliflare, you understand that information may be processed and stored in different countries where our infrastructure or providers operate.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically.</p>
          <p>Updated versions will be posted on this page with a revised “Last Updated” date.</p>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>13. Contact</h2>
          <p>For privacy or security inquiries:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li><a href="mailto:privacy@cauliflare.in" style={{ color: 'var(--primary-fixed)' }}>privacy@cauliflare.in</a></li>
            <li><a href="mailto:security@cauliflare.in" style={{ color: 'var(--primary-fixed)' }}>security@cauliflare.in</a></li>
          </ul>

          <h2 className="font-headline-md text-on-surface" style={{ marginTop: '32px' }}>14. Transparency</h2>
          <p>Cauliflare is committed to:</p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
            <li>developer trust</li>
            <li>infrastructure transparency</li>
            <li>responsible security practices</li>
            <li>privacy-conscious system design</li>
          </ul>
          
          <p className="font-display-xl" style={{ marginTop: '64px', fontSize: '24px', color: 'var(--on-surface)' }}>
            Built for developers. Designed for a safer internet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
