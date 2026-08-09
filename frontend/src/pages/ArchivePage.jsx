import React from 'react';

const ArchivePage = () => {
  return (
    <section className="hero-section" style={{ minHeight: '60vh' }}>
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content">
        <span className="font-label-caps network-tag" style={{ margin: '0 auto' }}>DATABASE</span>
        <h1 className="font-display-xl hero-headline">
          Historical <span className="text-secondary">Archive.</span>
        </h1>
        <p className="font-body-lg hero-description">
          A fully searchable historical record of decentralized datasets and flagged infrastructure.
        </p>
      </div>
    </section>
  );
};

export default ArchivePage;
