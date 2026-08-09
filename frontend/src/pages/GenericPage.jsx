import React from 'react';
import { Link } from 'react-router-dom';

const GenericPage = ({ title, tag, description }) => {
  const parts = title.split(' ');
  const lastWord = parts.pop();
  const firstPart = parts.join(' ');

  return (
    <section className="hero-section" style={{ minHeight: '70vh', paddingTop: '120px', paddingBottom: '96px' }}>
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <span className="font-label-caps network-tag" style={{ margin: '0 auto 16px auto', display: 'inline-block' }}>{tag}</span>
        <h1 className="font-display-xl hero-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
          {firstPart} {firstPart ? ' ' : ''}<span className="text-secondary">{lastWord}</span>
        </h1>
        <p className="font-body-lg hero-description" style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '32px' }}>
          {description || "Cauliflare developer security infrastructure is completely open source under GNU GPL-3.0."}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/docs" className="glow-button font-label-caps font-bold" style={{ padding: '12px 24px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', textDecoration: 'none' }}>
            EXPLORE API DOCS →
          </Link>
          <a href="mailto:contact@sarwaraltaf.in" className="press-button font-label-caps font-bold" style={{ padding: '12px 24px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', textDecoration: 'none' }}>
            CONTACT SARWAR
          </a>
        </div>
      </div>
    </section>
  );
};

export default GenericPage;
