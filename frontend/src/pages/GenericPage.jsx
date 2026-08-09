import React from 'react';

const GenericPage = ({ title, tag, description }) => {
  const parts = title.split(' ');
  const lastWord = parts.pop();
  const firstPart = parts.join(' ');

  return (
    <section className="hero-section" style={{ minHeight: '60vh' }}>
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content">
        <span className="font-label-caps network-tag" style={{ margin: '0 auto' }}>{tag}</span>
        <h1 className="font-display-xl hero-headline">
          {firstPart} {firstPart ? ' ' : ''}<span className="text-secondary">{lastWord}</span>
        </h1>
        <p className="font-body-lg hero-description">
          {description || "This page is currently under construction. Check back later for updates."}
        </p>
      </div>
    </section>
  );
};

export default GenericPage;
