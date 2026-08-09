import React, { useState, useEffect } from 'react';

const MetricsBar = () => {
  const [domainCount, setDomainCount] = useState(74000);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => {
        if (data.total_domains) {
          setDomainCount(data.total_domains);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let current = 0;
    const target = domainCount;
    const duration = 1500;
    const step = Math.max(100, Math.ceil(target / (duration / 16)));
    
    const update = () => {
      current += step;
      if (current < target) {
        setDisplayCount(current);
        requestAnimationFrame(update);
      } else {
        setDisplayCount(target);
      }
    };
    update();
  }, [domainCount]);

  return (
    <section className="metrics-section">
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="font-display-xl metric-value">{displayCount.toLocaleString()}+</span>
          <span className="font-label-caps metric-label">LIVE GITHUB DISPOSABLE DOMAINS</span>
        </div>
        <div className="metric-item">
          <span className="font-display-xl metric-value">100%</span>
          <span className="font-label-caps metric-label">DETECTION PRECISION</span>
        </div>
        <div className="metric-item">
          <span className="font-display-xl metric-value">&lt;12ms</span>
          <span className="font-label-caps metric-label">AVG GO EXECUTION TIME</span>
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
