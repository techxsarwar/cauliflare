import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  return (
    <div style={{ padding: '120px 24px 96px 24px', maxWidth: '880px', margin: '0 auto', color: 'var(--on-surface)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '4px 12px', marginBottom: '16px' }}>
        <span className="font-label-caps font-bold" style={{ fontSize: '11px' }}>LEGAL & OPEN SOURCE TERMS</span>
      </div>

      <h1 className="font-display-xl" style={{ fontSize: '42px', marginBottom: '8px' }}>Terms of Service</h1>
      <p className="font-code-md text-on-surface-variant" style={{ fontSize: '13px', marginBottom: '36px' }}>
        Last Updated: August 2026 • Governed by the GNU General Public License v3.0
      </p>

      <div className="font-body-lg" style={{ lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>1. Agreement to Terms</h2>
          <p>
            By accessing or using Cauliflare (the "Platform", "API", or "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use our services.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>2. Open Source & License</h2>
          <p>
            Cauliflare is an open-source developer security project licensed under the <strong>GNU General Public License v3.0 (GPL-3.0)</strong>.
          </p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square', marginTop: '8px' }}>
            <li><strong>Freedom to Use & Modify:</strong> You are free to run, study, modify, and self-host the source code on your private servers.</li>
            <li><strong>Copyleft Requirement:</strong> Any public distribution, modification, or fork of Cauliflare must remain 100% open source under the exact same GPL-3.0 license.</li>
            <li><strong>Attribution:</strong> Prominent attribution to <strong>Sarwar</strong> (https://github.com/techxsarwar/cauliflare) must be retained.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>3. Permitted & Acceptable Use</h2>
          <p>
            Cauliflare APIs and SDKs are provided for legitimate security defense, bot prevention, fraud risk scoring, and spam protection. You agree NOT to:
          </p>
          <ul style={{ paddingLeft: '24px', listStyleType: 'square', marginTop: '8px' }}>
            <li>Conduct Denial of Service (DoS/DDoS) attacks against Cauliflare hosted edge nodes.</li>
            <li>Use the detection engine to reverse-engineer spam evasion techniques for malicious spam campaigns.</li>
            <li>Bypass rate limits or attempt unauthorized intrusion into administrative cloud infrastructure.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>4. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THREAT DETECTION WILL BE 100% ACCURATE OR UNINTERRUPTED.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>5. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL THE AUTHORS, CONTRIBUTORS, OR SARWAR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THIS PLATFORM.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>6. Contact & Legal Inquiries</h2>
          <p>
            For questions regarding these Terms or licensing permissions, please contact:
          </p>
          <div style={{ marginTop: '8px', padding: '16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }} className="font-code-md">
            <strong>Sarwar Altaf</strong><br />
            Email: <a href="mailto:contact@sarwaraltaf.in" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>contact@sarwaraltaf.in</a><br />
            GitHub: <a href="https://github.com/techxsarwar/cauliflare" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>https://github.com/techxsarwar/cauliflare</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
