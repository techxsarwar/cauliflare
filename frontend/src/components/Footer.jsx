import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '4px solid var(--on-surface)', backgroundColor: 'var(--surface)', padding: '64px 32px 32px 32px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* LEFT SIDE */}
        <div style={{ flex: '1 1 300px' }}>
          <span className="font-display-xl footer-logo" style={{ fontSize: '48px', color: 'var(--on-surface)' }}>CAULIFLARE</span>
          <p className="font-label-caps" style={{ marginTop: '16px', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
            Infrastructure APIs for the modern internet.
          </p>
          
          {/* STATUS INDICATOR */}
          <div style={{ marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '2px solid var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
            <div className="dot dot-green" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
            <a href="https://status.cauliflare.in" className="font-label-caps" style={{ color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 'bold' }}>All systems operational</a>
          </div>
        </div>

        {/* LINKS CONTAINER */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', flex: '2 1 600px' }}>
          
          {/* PRODUCT SECTION */}
          <div className="footer-links-col">
            <span className="font-headline-md" style={{ color: 'var(--on-surface)' }}>Products</span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/products/scam-detection">Scam Detection</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/products/url-scanner">URL Scanner</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/products/search-api">Search API</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/products/temp-mail">Temp Mail Detection</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/products/ai-moderation">AI Moderation</Link></li>
            </ul>
          </div>

          {/* DEVELOPERS SECTION */}
          <div className="footer-links-col">
            <span className="font-headline-md" style={{ color: 'var(--on-surface)' }}>Developers</span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/docs">Documentation</Link></li>
              <li><a className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} href="/docs#endpoints">API Reference</a></li>
              <li><a className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} href="https://status.cauliflare.in">Status</a></li>
              <li><a className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} href="/docs#sdk-examples">SDKs</a></li>
              <li><a className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} href="https://github.com/techxsarwar/cauliflare">GitHub</a></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/changelog">Changelog</Link></li>
            </ul>
          </div>

          {/* COMPANY SECTION */}
          <div className="footer-links-col">
            <span className="font-headline-md" style={{ color: 'var(--on-surface)' }}>Company</span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/company/about">About</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/company/blog">Blog</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/company/careers">Careers</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/company/contact">Contact</Link></li>
            </ul>
          </div>

          {/* LEGAL SECTION */}
          <div className="footer-links-col">
            <span className="font-headline-md" style={{ color: 'var(--on-surface)' }}>Legal</span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/legal/privacy">Privacy Policy</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/legal/terms">Terms of Service</Link></li>
              <li><Link className="font-body-lg footer-link" style={{ textDecoration: 'none', color: 'var(--on-surface-variant)' }} to="/legal/security">Security</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM LINE & SOCIALS */}
      <div style={{ maxWidth: '1200px', margin: '64px auto 0', borderTop: '2px solid var(--on-surface)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span className="font-label-caps" style={{ color: 'var(--on-surface-variant)' }}>© 2026 Cauliflare. Built for developers.</span>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="https://github.com/techxsarwar/cauliflare" className="font-label-caps" style={{ color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 'bold' }}>GitHub</a>
          <a href="#" className="font-label-caps" style={{ color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 'bold' }}>Twitter/X</a>
          <a href="#" className="font-label-caps" style={{ color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 'bold' }}>Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
