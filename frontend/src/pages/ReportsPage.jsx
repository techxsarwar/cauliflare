import React from 'react';
import { FileText, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';

const ReportCard = ({ tag, title, summary, date, author }) => (
  <div style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '32px', boxShadow: '6px 6px 0px var(--on-surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="font-label-caps" style={{ padding: '4px 10px', backgroundColor: 'var(--primary)', color: '#121212', border: '1px solid var(--on-surface)', fontWeight: 'bold', fontSize: '11px' }}>
          {tag}
        </span>
        <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>{date}</span>
      </div>
      <h3 className="font-display-xl" style={{ fontSize: '24px', marginBottom: '12px' }}>{title}</h3>
      <p className="font-body-lg text-on-surface-variant" style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
        {summary}
      </p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--surface-container-high)', paddingTop: '16px' }}>
      <span className="font-code-md" style={{ fontSize: '13px', color: '#888' }}>By {author}</span>
      <button className="press-button font-label-caps" style={{ padding: '8px 16px', fontSize: '12px', border: '2px solid var(--on-surface)', backgroundColor: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
        READ REPORT <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const ReportsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '64px' }}>
      
      {/* HERO */}
      <section className="hero-section" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <div className="hero-bg dot-grid"></div>
        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', marginBottom: '16px', boxShadow: '3px 3px 0px var(--on-surface)' }}>
            <BookOpen size={16} color="var(--primary)" />
            <span className="font-label-caps" style={{ fontSize: '12px', fontWeight: 'bold' }}>RESEARCH & PUBLICATIONS</span>
          </div>
          <h1 className="font-display-xl hero-headline">
            Threat Intelligence <br />
            <span className="text-secondary">Reports.</span>
          </h1>
          <p className="font-body-lg hero-description">
            In-depth analysis of emerging temporary email vectors, disposable MX domain networks, credential phishing, and internet fraud.
          </p>
        </div>
      </section>

      {/* REPORTS GRID */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          <ReportCard 
            tag="DISPOSABLE MAIL"
            title="Anatomy of 100+ Temporary Mail Infrastructure Providers"
            summary="A comprehensive survey of disposable email services, MX routing tricks, wildcard subdomains, and mitigation strategies for web applications."
            date="AUG 2026"
            author="Cauliflare Security Research"
          />

          <ReportCard 
            tag="CREDENTIAL PHISHING"
            title="Redirect Chain Tactics in Modern Phishing Campaigns"
            summary="Analysis of obfuscated URL shorteners, multi-hop redirect chains, and automated detection with zero false positives."
            date="JUL 2026"
            author="Cauliflare Threat Intel Lab"
          />

          <ReportCard 
            tag="FRAUD PREVENTION"
            title="Blocking Burner Signups Without Hurting Conversion"
            summary="How modern platforms prevent spam signups and trial abuse by validating disposable email addresses inline in sub-10ms."
            date="JUN 2026"
            author="Developer Infrastructure Team"
          />

        </div>
      </section>

    </div>
  );
};

export default ReportsPage;
