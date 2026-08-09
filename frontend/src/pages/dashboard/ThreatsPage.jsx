import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Filter, Search, AlertOctagon, RefreshCw } from 'lucide-react';

const ThreatItemRow = ({ item }) => {
  const getBadgeStyle = () => {
    if (item.severity === 'CRITICAL') return { bg: 'var(--error)', text: 'var(--on-error)' };
    if (item.severity === 'HIGH') return { bg: 'var(--secondary)', text: 'var(--on-secondary)' };
    return { bg: 'var(--surface-container-highest)', text: 'var(--on-surface)' };
  };

  const badge = getBadgeStyle();

  return (
    <tr style={{ borderBottom: '2px solid var(--surface-container-high)', backgroundColor: 'var(--surface-container)' }}>
      <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }} className="font-code-md text-on-surface-variant">{item.time}</td>
      <td style={{ padding: '16px 24px' }}>
        <span className="font-label-caps" style={{ padding: '2px 8px', border: '1px solid var(--on-surface)', backgroundColor: 'var(--surface)', fontSize: '11px' }}>
          {item.category}
        </span>
      </td>
      <td style={{ padding: '16px 24px' }} className="font-code-md font-bold">{item.target}</td>
      <td style={{ padding: '16px 24px' }} className="font-body-lg text-on-surface-variant">{item.provider}</td>
      <td style={{ padding: '16px 24px' }}>
        <span className="font-code-md" style={{ color: item.risk_score > 80 ? 'var(--error)' : 'var(--primary)', fontWeight: 'bold' }}>
          {item.risk_score}/100
        </span>
      </td>
      <td style={{ padding: '16px 24px' }}>
        <span className="font-label-caps font-bold" style={{ backgroundColor: badge.bg, color: badge.text, padding: '4px 10px', fontSize: '11px', border: '1px solid var(--on-surface)' }}>
          {item.severity}
        </span>
      </td>
    </tr>
  );
};

const ThreatsPage = () => {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchThreats = () => {
    fetch('/api/threats')
      .then(res => res.json())
      .then(data => {
        if (data.threats) {
          setThreats(data.threats);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredThreats = threats.filter(item => {
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    const targetText = item.target || '';
    const providerText = item.provider || '';
    const matchesSearch = targetText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          providerText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* HEADER */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display-xl" style={{ fontSize: '32px', marginBottom: '8px' }}>Threat Registry</h1>
          <p className="font-body-lg text-on-surface-variant">Real-time log of blocked temporary emails, malicious URLs, and scam patterns.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={fetchThreats}
            className="press-button font-label-caps font-bold"
            style={{ padding: '8px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> REFRESH
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', boxShadow: '3px 3px 0px var(--on-surface)' }}>
            <AlertOctagon size={18} color="var(--error)" />
            <span className="font-code-md font-bold" style={{ fontSize: '13px' }}>100% Intercept Rate</span>
          </div>
        </div>
      </section>

      {/* FILTERING BAR */}
      <section style={{ backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '6px 6px 0px var(--on-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Filter size={18} color="var(--on-surface-variant)" />
          <span className="font-label-caps" style={{ fontSize: '12px', marginRight: '8px' }}>CATEGORY:</span>
          {['ALL', 'TEMP_MAIL', 'PHISHING_URL', 'SCAM_TEXT'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="font-label-caps"
              style={{ 
                padding: '6px 14px', 
                fontSize: '11px', 
                border: '2px solid var(--on-surface)', 
                cursor: 'pointer',
                backgroundColor: filterCategory === cat ? 'var(--primary)' : 'var(--surface)',
                color: filterCategory === cat ? '#ffffff' : 'var(--on-surface)',
                fontWeight: 'bold'
              }}
            >
              {cat === 'ALL' ? 'ALL THREATS' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#121212', border: '2px solid var(--on-surface)', padding: '6px 12px' }}>
          <Search size={16} color="#888" />
          <input 
            type="text"
            placeholder="Search domain or payload..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-code-md"
            style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '13px', width: '200px' }}
          />
        </div>
      </section>

      {/* THREATS TABLE */}
      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--on-surface)', color: 'var(--surface)' }}>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Time</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Category</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Threat Target / Payload</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Provider / Details</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Risk Score</th>
              <th style={{ padding: '16px 24px' }} className="font-label-caps">Severity</th>
            </tr>
          </thead>
          <tbody>
            {filteredThreats.length > 0 ? (
              filteredThreats.map((item, idx) => (
                <ThreatItemRow key={item.id || idx} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center' }} className="font-code-md text-on-surface-variant">
                  {loading ? 'Fetching live threats...' : 'No threats found matching filter criteria.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default ThreatsPage;
