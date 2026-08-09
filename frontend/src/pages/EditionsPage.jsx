import React from 'react';

const EditionsPage = () => {
  return (
    <section className="hero-section" style={{ minHeight: '60vh' }}>
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content">
        <span className="font-label-caps network-tag" style={{ margin: '0 auto' }}>PRINT</span>
        <h1 className="font-display-xl hero-headline">
          Physical <span className="text-secondary">Editions.</span>
        </h1>
        <p className="font-body-lg hero-description">
          Quarterly physical print runs of our threat manifesto. Delivered to your door. Pure analog.
        </p>
      </div>
    </section>
  );
};

export default EditionsPage;
