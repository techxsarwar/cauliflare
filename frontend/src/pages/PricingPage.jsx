import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <section className="hero-section" style={{ minHeight: '60vh', justifyContent: 'flex-start', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="hero-bg dot-grid"></div>
      <div className="hero-content" style={{ maxWidth: '1200px', width: '100%' }}>
        <h1 className="font-display-xl hero-headline">
          Simple, Transparent <span className="text-secondary">Pricing.</span>
        </h1>
        <p className="font-body-lg hero-description">
          Pay only for what you use. No hidden fees. Designed for scale.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '64px', textAlign: 'left' }}>
          
          {/* FREE */}
          <div className="feature-card press-border-lg" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="font-headline-md text-primary">FREE</h3>
            <p className="font-body-lg text-on-surface-variant" style={{ margin: '16px 0 32px 0', minHeight: '48px' }}>Because devs NEED to test before trusting.</p>
            <div className="font-display-xl" style={{ fontSize: '56px', color: 'var(--on-surface)' }}>$0<span className="font-label-caps" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>/MO</span></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', flex: 1 }} className="font-label-caps">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> 10K requests/month</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Basic scam detection</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Temp mail detection</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Community support</li>
            </ul>
            <Link to="/dashboard/keys" className="press-button font-label-caps font-bold" style={{ width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Get Started</Link>
          </div>

          {/* BUILDER */}
          <div className="feature-card press-border-lg" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)', transform: 'translateY(-8px)', boxShadow: '8px 8px 0px var(--primary)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-16px', right: '16px', background: 'var(--primary)', color: 'var(--surface)', padding: '4px 12px', fontWeight: 'bold' }} className="font-label-caps">SWEET SPOT</div>
            <h3 className="font-headline-md text-primary">BUILDER</h3>
            <p className="font-body-lg text-on-surface-variant" style={{ margin: '16px 0 32px 0', minHeight: '48px' }}>Most indie devs can afford this.</p>
            <div className="font-display-xl" style={{ fontSize: '56px', color: 'var(--primary)' }}>$9<span className="font-label-caps" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>/MO</span></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', flex: 1 }} className="font-label-caps">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> 500K requests</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Faster API</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Advanced threat scoring</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Higher rate limits</li>
            </ul>
            <Link to="/dashboard/keys" className="press-button font-label-caps font-bold" style={{ width: '100%', background: 'var(--primary)', color: 'var(--on-primary)', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Start Building</Link>
          </div>

          {/* PRO */}
          <div className="feature-card press-border-lg" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="font-headline-md text-primary">PRO</h3>
            <p className="font-body-lg text-on-surface-variant" style={{ margin: '16px 0 32px 0', minHeight: '48px' }}>For growing apps & serious projects.</p>
            <div className="font-display-xl" style={{ fontSize: '56px', color: 'var(--on-surface)' }}>$29<span className="font-label-caps" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>/MO</span></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', flex: 1 }} className="font-label-caps">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> 5M requests</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Semantic analysis</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Advanced detection</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Analytics dashboard</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-green"></div> Priority support</li>
            </ul>
            <Link to="/dashboard/billing" className="press-button font-label-caps font-bold" style={{ width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Go Pro</Link>
          </div>

          {/* SCALE */}
          <div className="feature-card press-border-lg" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="font-headline-md text-secondary">SCALE</h3>
            <p className="font-body-lg text-on-surface-variant" style={{ margin: '16px 0 32px 0', minHeight: '48px' }}>For high-volume production applications.</p>
            <div className="font-display-xl" style={{ fontSize: '56px', color: 'var(--secondary)' }}>$99<span className="font-label-caps" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>/MO</span></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', flex: 1 }} className="font-label-caps">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> 25M requests</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Dedicated infrastructure</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Custom limits</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Team access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> SLA uptime</li>
            </ul>
            <Link to="/dashboard/billing" className="press-button font-label-caps font-bold" style={{ width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Scale Up</Link>
          </div>

          {/* ENTERPRISE */}
          <div className="feature-card press-border-lg" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--on-surface)', color: 'var(--surface)' }}>
            <h3 className="font-headline-md" style={{ color: 'var(--surface)' }}>ENTERPRISE</h3>
            <p className="font-body-lg" style={{ color: 'var(--surface-variant)', margin: '16px 0 32px 0', minHeight: '48px' }}>For companies, platforms, and SaaS products.</p>
            <div className="font-display-xl" style={{ fontSize: '48px', color: 'var(--surface)' }}>CUSTOM</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', flex: 1 }} className="font-label-caps">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Custom requests</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Dedicated infrastructure</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> Advanced integrations</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="dot dot-yellow"></div> 24/7 SLA Support</li>
            </ul>
            <Link to="/company/contact" className="press-button font-label-caps font-bold" style={{ width: '100%', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Contact Sales</Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingPage;
