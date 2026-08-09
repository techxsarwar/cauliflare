import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Terminal, Server, GitBranch, Copy, ArrowRight, Heart } from 'lucide-react';

const PricingPage = () => {
  const [copied, setCopied] = useState(false);

  const copyDockerCmd = () => {
    navigator.clipboard.writeText(`git clone https://github.com/techxsarwar/cauliflare.git\ncd cauliflare/backend\ngo run .`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ padding: '60px 0 96px 0', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* 1. HERO HEADER */}
      <section style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '6px 16px', marginBottom: '20px', boxShadow: '3px 3px 0px var(--on-surface)' }}>
          <Heart size={16} color="var(--error)" fill="var(--error)" />
          <span className="font-label-caps font-bold" style={{ fontSize: '12px' }}>100% OPEN SOURCE & FREE FOREVER</span>
        </div>

        <h1 className="font-display-xl" style={{ fontSize: '56px', lineHeight: '105%', marginBottom: '16px' }}>
          Zero Paywalls. <span style={{ color: 'var(--primary)' }}>Everything is Free.</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant" style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Cauliflare is completely open source under the <strong>GNU General Public License v3.0 (GPL-3.0)</strong>. Use our free hosted cloud infrastructure or self-host your own dedicated cluster on your private servers with zero limits.
        </p>
      </section>

      {/* 2. FREE TIERS MATRIX */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* TIER 1: FREE HOSTED CLOUD */}
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '3px solid var(--primary)',
          boxShadow: '8px 8px 0px var(--primary)',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '-14px', right: '20px', backgroundColor: 'var(--primary)', color: '#ffffff', padding: '4px 12px', border: '2px solid var(--on-surface)', fontSize: '11px', fontWeight: 'bold' }} className="font-label-caps">
            INSTANT CLOUD API
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Zap size={24} color="var(--primary)" />
              <h3 className="font-display-xl" style={{ fontSize: '26px' }}>FREE HOSTED CLOUD</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '16px 0' }}>
              <span className="font-display-xl" style={{ fontSize: '52px', color: 'var(--primary)' }}>$0</span>
              <span className="font-code-md text-on-surface-variant" style={{ fontSize: '14px' }}>/ forever free</span>
            </div>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '14px', marginBottom: '24px' }}>
              Instant zero-setup cloud API hosted on global edge infrastructure. Perfect for indie developers and production SaaS.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                '75,000+ GitHub Disposable Signatures',
                'Typo & Did You Mean? Engine',
                'SPF & DMARC Corporate Domain Inspector',
                'Virtual VoIP Burner Phone Validator',
                'Phishing URL & Scam Text Detection',
                'Drop-in cauliflare.js Embed Script',
                'Sub-10ms Go Engine Response Speed',
                'No Credit Card Required'
              ].map((feat, fidx) => (
                <div key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-body-md" style={{ fontSize: '13px' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <Link 
            to="/dashboard/keys" 
            className="glow-button font-label-caps font-bold" 
            style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
          >
            GET FREE API KEY →
          </Link>
        </div>

        {/* TIER 2: SELF-HOSTED DOCKER / VPS */}
        <div style={{
          backgroundColor: 'var(--surface-container)',
          border: '3px solid var(--on-surface)',
          boxShadow: '8px 8px 0px var(--on-surface)',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Server size={24} color="var(--on-surface)" />
              <h3 className="font-display-xl" style={{ fontSize: '26px' }}>SELF-HOSTED / VPS</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '16px 0' }}>
              <span className="font-display-xl" style={{ fontSize: '52px', color: 'var(--on-surface)' }}>$0</span>
              <span className="font-code-md text-on-surface-variant" style={{ fontSize: '14px' }}>/ 100% private</span>
            </div>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '14px', marginBottom: '24px' }}>
              Deploy Cauliflare on your own Docker container, AWS EC2, DigitalOcean droplet, or bare-metal VPS.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Unlimited Requests / Month (Zero Rate Limits)',
                '100% Private In-Memory Execution',
                'Your Data Never Leaves Your Servers',
                'Deploy on Docker, Kubernetes, or Linux Binary',
                'Custom Domain & IP Range Overrides',
                'Air-Gapped & Offline Environment Support',
                'GNU GPL-3.0 Open Source Freedom'
              ].map((feat, fidx) => (
                <div key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-body-md" style={{ fontSize: '13px' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://github.com/techxsarwar/cauliflare" 
            target="_blank" 
            rel="noreferrer"
            className="press-button font-label-caps font-bold" 
            style={{ width: '100%', padding: '14px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
          >
            <GitBranch size={16} /> VIEW GITHUB & DOCKER
          </a>
        </div>

        {/* TIER 3: OPEN SOURCE FORK */}
        <div style={{
          backgroundColor: 'var(--on-surface)',
          color: 'var(--surface)',
          border: '3px solid var(--on-surface)',
          boxShadow: '8px 8px 0px var(--on-surface)',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Terminal size={24} color="#00e676" />
              <h3 className="font-display-xl" style={{ fontSize: '26px', color: '#ffffff' }}>FORK & CUSTOMIZE</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '16px 0' }}>
              <span className="font-display-xl" style={{ fontSize: '52px', color: '#00e676' }}>$0</span>
              <span className="font-code-md" style={{ fontSize: '14px', color: '#aaa' }}>/ open source</span>
            </div>
            <p className="font-body-md" style={{ fontSize: '14px', color: '#bbb', marginBottom: '24px' }}>
              Modify the Go detection heuristics, add proprietary threat feeds, and integrate with your internal security stack.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Full Access to Go & React Source Code',
                'Modify Detection Algorithms & Heuristics',
                'Connect Custom Threat Feeds & Datastores',
                'GNU GPL-3.0 License Protection',
                'Public Pull Requests & Contributions Welcome',
                'Attribution to Sarwar Required'
              ].map((feat, fidx) => (
                <div key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={16} color="#00e676" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-body-md" style={{ fontSize: '13px', color: '#eee' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://github.com/techxsarwar/cauliflare/fork" 
            target="_blank" 
            rel="noreferrer"
            className="press-button font-label-caps font-bold" 
            style={{ width: '100%', padding: '14px', backgroundColor: '#00e676', color: '#121212', border: '2px solid #ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
          >
            FORK ON GITHUB →
          </a>
        </div>

      </section>

      {/* 3. QUICK 10-SECOND SELF-HOST CODE */}
      <section style={{ backgroundColor: 'var(--surface-container)', border: '3px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', padding: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 className="font-headline-md" style={{ fontSize: '24px' }}>⚡ RUN LOCALLY OR SELF-HOST IN 10 SECONDS</h2>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '14px', marginTop: '4px' }}>
              Clone and launch the high-speed Go security engine on any Linux, Mac, or Windows server.
            </p>
          </div>
          <button 
            onClick={copyDockerCmd}
            className="press-button font-label-caps font-bold"
            style={{ padding: '10px 18px', backgroundColor: 'var(--surface)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
          >
            <Copy size={14} /> {copied ? 'COPIED TO CLIPBOARD!' : 'COPY COMMANDS'}
          </button>
        </div>

        <div style={{ backgroundColor: '#121212', color: '#00e676', padding: '20px', border: '2px solid var(--on-surface)', overflowX: 'auto' }} className="font-code-md">
          <pre style={{ margin: 0 }}>{`# 1. Clone the repository
git clone https://github.com/techxsarwar/cauliflare.git

# 2. Run the ultra-fast Go Threat Engine
cd cauliflare/backend
go run .

# 🚀 Server running on http://127.0.0.1:8000 (0ms latency, zero database needed)`}</pre>
        </div>
      </section>

      {/* 4. STAR & FOLLOW COMMUNITY COURTESY */}
      <section style={{ backgroundColor: 'var(--surface)', border: '3px solid var(--on-surface)', boxShadow: '8px 8px 0px var(--on-surface)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffd600', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>⭐</span>
            <span className="font-label-caps font-bold" style={{ color: 'var(--on-surface)', fontSize: '13px' }}>SELF-HOSTING COURTESY & OPEN SOURCE LOVE</span>
          </div>
          <h3 className="font-headline-md" style={{ fontSize: '22px' }}>Like Cauliflare? Give it a Star on GitHub!</h3>
          <p className="font-body-md text-on-surface-variant" style={{ fontSize: '14px', marginTop: '4px', maxWidth: '640px' }}>
            Cauliflare is completely free. If you self-host or use our API in production, please consider starring the GitHub repository and following <strong>Sarwar</strong> to support independent open-source engineering!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/techxsarwar/cauliflare" 
            target="_blank" 
            rel="noreferrer"
            className="glow-button font-label-caps font-bold"
            style={{ padding: '12px 20px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
          >
            ⭐ STAR THE REPOSITORY
          </a>
          <a 
            href="https://github.com/techxsarwar" 
            target="_blank" 
            rel="noreferrer"
            className="press-button font-label-caps font-bold"
            style={{ padding: '12px 20px', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
          >
            👤 FOLLOW @TECHXSARWAR
          </a>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
