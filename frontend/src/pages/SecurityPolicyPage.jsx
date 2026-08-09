import React from 'react';
import { ShieldCheck, Lock, Eye, Zap, CheckCircle2 } from 'lucide-react';

const SecurityPolicyPage = () => {
  return (
    <div style={{ padding: '120px 24px 96px 24px', maxWidth: '880px', margin: '0 auto', color: 'var(--on-surface)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '4px 12px', marginBottom: '16px' }}>
        <ShieldCheck size={16} color="var(--primary)" />
        <span className="font-label-caps font-bold" style={{ fontSize: '11px' }}>SECURITY & TRUST CENTER</span>
      </div>

      <h1 className="font-display-xl" style={{ fontSize: '42px', marginBottom: '8px' }}>Security & Privacy Architecture</h1>
      <p className="font-code-md text-on-surface-variant" style={{ fontSize: '13px', marginBottom: '36px' }}>
        How Cauliflare protects developer data, implements in-memory threat analysis, and enforces privacy.
      </p>

      <div className="font-body-lg" style={{ lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* HIGHLIGHT BOX */}
        <div style={{ backgroundColor: 'var(--surface-container)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '24px' }}>
          <h3 className="font-headline-md" style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--primary)' }}>⚡ Zero Persistent Raw Email Storage</h3>
          <p className="font-body-md text-on-surface-variant" style={{ margin: 0 }}>
            Cauliflare processes email reputation and threat scoring in volatile RAM memory (&lt;10ms Go execution). We do NOT store your end-users' private email messages, inbox contents, or plaintext credentials.
          </p>
        </div>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>1. Data Transmission Security (Encryption in Transit)</h2>
          <p>
            All API calls, dashboard interactions, and SDK communications are encrypted in transit using <strong>TLS 1.3 / HTTPS</strong> with modern cipher suites. Plaintext HTTP traffic is rejected automatically.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>2. Threat Signature Integrity</h2>
          <p>
            Our in-memory database of <strong>75,000+ disposable domain signatures</strong> is sanitized, deduplicated, and synchronized from verified community threat registries. We use multi-layer DNS MX and HTTP header heuristics to prevent false positives on legitimate business domains.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>3. Self-Hosted & Air-Gapped Security</h2>
          <p>
            For organizations with strict data sovereignty or compliance mandates (HIPAA, SOC2, GDPR), Cauliflare can be self-hosted entirely on your private VPC or on-premises servers. In self-hosted mode, zero data is transmitted back to external servers.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md" style={{ fontSize: '22px', marginBottom: '8px', borderBottom: '2px solid var(--outline-variant)', paddingBottom: '6px' }}>4. Vulnerability Disclosure Policy</h2>
          <p>
            We take security vulnerabilities seriously. If you discover a security issue or vulnerability in the Cauliflare codebase or infrastructure:
          </p>
          <div style={{ marginTop: '12px', padding: '16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }} className="font-code-md">
            <strong>Security Contact:</strong><br />
            Email: <a href="mailto:contact@sarwaraltaf.in" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>contact@sarwaraltaf.in</a><br />
            Subject: <code>[SECURITY VULNERABILITY] Cauliflare</code><br />
            PGP/Encrypted communications welcomed. We commit to acknowledging reports within 24 hours.
          </div>
        </section>

      </div>
    </div>
  );
};

export default SecurityPolicyPage;
