import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Terminal, Server, GitBranch, Copy, Download, Heart, ExternalLink } from 'lucide-react';

const BillingPage = () => {
  const [copiedDocker, setCopiedDocker] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyDockerCode = () => {
    navigator.clipboard.writeText(`git clone https://github.com/techxsarwar/cauliflare.git\ncd cauliflare/backend\ngo run .`);
    setCopiedDocker(true);
    showToast('Deployment commands copied to clipboard!');
    setTimeout(() => setCopiedDocker(false), 2500);
  };

  const handleDownloadLicenseReceipt = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cauliflare - Open Source License & Free Tier Certificate</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; background: #ffffff; color: #121212; padding: 40px; margin: 0; }
          .invoice-box { max-width: 700px; margin: auto; border: 3px solid #121212; padding: 32px; box-shadow: 6px 6px 0px #121212; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #121212; padding-bottom: 20px; margin-bottom: 20px; }
          .title { font-size: 26px; font-weight: 900; letter-spacing: -1px; }
          .badge { display: inline-block; background: #00e676; color: #121212; font-weight: bold; padding: 4px 10px; border: 1px solid #121212; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #121212; color: #ffffff; text-align: left; padding: 10px 14px; font-size: 12px; }
          td { padding: 12px 14px; border-bottom: 1px solid #e0e0e0; }
          .total { font-size: 22px; font-weight: bold; text-align: right; margin-top: 20px; color: #00e676; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="title">CAULIFLARE SECURITY</div>
              <div style="font-size: 13px; color: #555; margin-top: 4px;">Developer Threat Infrastructure & Fraud Defense</div>
            </div>
            <div style="text-align: right;">
              <span class="badge">100% FREE & OPEN SOURCE</span>
              <div style="font-size: 14px; font-weight: bold; margin-top: 8px;">GNU GPL-3.0</div>
              <div style="font-size: 12px; color: #666;">Date: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px;">
            <div>
              <strong>Account Holder:</strong><br>
              Cauliflare Developer Community<br>
              License: GNU General Public License v3.0<br>
              Author: Sarwar
            </div>
            <div style="text-align: right;">
              <strong>Plan Status:</strong><br>
              Permanent Free Tier<br>
              Zero Paywalls / No Credit Card<br>
              Cost: $0.00 / Forever
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>RESOURCE</th>
                <th>ACCESS LEVEL</th>
                <th>LICENSE</th>
                <th style="text-align: right;">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hosted Cloud API & Playground</strong><br><span style="font-size: 11px; color: #666;">75,000+ Disposable Signatures, Typo Engine, Phone Validator</span></td>
                <td>Global Edge Anycast</td>
                <td>GNU GPL-3.0</td>
                <td style="text-align: right;"><strong>$0.00</strong></td>
              </tr>
              <tr>
                <td><strong>Self-Hosted Docker & Go Engine</strong><br><span style="font-size: 11px; color: #666;">Unlimited Requests on Private Servers / VPS</span></td>
                <td>Self-Hosted</td>
                <td>GNU GPL-3.0</td>
                <td style="text-align: right;"><strong>$0.00</strong></td>
              </tr>
            </tbody>
          </table>

          <div class="total">Total Due: $0.00 (FREE FOREVER)</div>

          <div class="footer">
            Licensed under GNU General Public License v3.0.<br>
            Attribution required: Designed & Developed by Sarwar (https://github.com/techxsarwar/cauliflare)
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = `cauliflare_license_certificate.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
      
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          padding: '14px 28px',
          border: '2px solid var(--on-surface)',
          boxShadow: '4px 4px 0px var(--on-surface)',
          zIndex: 1200,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }} className="font-code-md">
          <ShieldCheck size={20} /> {toastMessage}
        </div>
      )}

      {/* PAGE HEADER */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', padding: '4px 12px', marginBottom: '12px' }}>
            <Heart size={14} color="var(--error)" fill="var(--error)" />
            <span className="font-label-caps font-bold" style={{ fontSize: '11px' }}>100% FREE & OPEN SOURCE FOREVER</span>
          </div>
          <h1 className="font-display-xl" style={{ fontSize: '36px', marginBottom: '8px' }}>Open Source & Self-Hosting Hub</h1>
          <p className="font-body-lg text-on-surface-variant" style={{ fontWeight: '600' }}>
            Zero paywalls. No subscription fees. Use our free hosted cloud API or self-host your own cluster.
          </p>
        </div>

        <button 
          onClick={handleDownloadLicenseReceipt}
          className="press-button font-label-caps font-bold"
          style={{ padding: '10px 18px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
        >
          <Download size={15} /> DOWNLOAD LICENSE CERTIFICATE
        </button>
      </section>

      {/* ACTIVE ZERO-PAYWALL STATUS CARD */}
      <section style={{ 
        backgroundColor: 'var(--primary)', 
        color: '#ffffff', 
        border: '3px solid var(--on-surface)', 
        boxShadow: '8px 8px 0px var(--on-surface)', 
        padding: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="font-label-caps" style={{ opacity: 0.9, letterSpacing: '0.1em', fontWeight: 'bold' }}>ACTIVE ACCOUNT TIER</div>
          <div className="font-display-xl" style={{ fontSize: '42px', marginTop: '4px' }}>PERMANENT FREE ACCESS ($0.00)</div>
          <p className="font-body-md" style={{ opacity: 0.95, marginTop: '8px', maxWidth: '600px' }}>
            Your workspace has unrestricted access to all threat detection endpoints, typo correction, phone verification, and embeddable SDKs.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="font-code-md font-bold" style={{ backgroundColor: '#121212', color: '#00e676', padding: '6px 14px', border: '2px solid #ffffff', fontSize: '13px', display: 'inline-block' }}>
            ✓ GNU GPL-3.0 COMPLIANT
          </div>
        </div>
      </section>

      {/* 2 TIERS: HOSTED CLOUD VS SELF-HOSTED */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* OPTION 1: FREE HOSTED CLOUD */}
        <div style={{ backgroundColor: 'var(--surface)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Zap size={22} color="var(--primary)" />
              <h3 className="font-display-xl" style={{ fontSize: '24px' }}>FREE HOSTED CLOUD API</h3>
            </div>
            <div className="font-display-xl" style={{ fontSize: '38px', color: 'var(--primary)', margin: '12px 0' }}>$0.00 <span className="font-code-md text-on-surface-variant" style={{ fontSize: '13px' }}>/ FOREVER</span></div>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginBottom: '20px' }}>
              Ready-to-use cloud infrastructure hosted across multi-region edge nodes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                'Instant API Key Generation',
                '75,000+ Disposable Email Blocklist',
                'Typo & Did You Mean? Engine',
                'Corporate Domain & SPF/DMARC Inspector',
                'Drop-in cauliflare.js Embed Script',
                'Zero Configuration Required'
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <Check size={15} color="var(--primary)" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--surface-container)', border: '1px solid var(--on-surface)', textAlign: 'center', fontWeight: 'bold' }} className="font-code-md">
            ⚡ CURRENTLY ACTIVE
          </div>
        </div>

        {/* OPTION 2: SELF-HOSTED DOCKER / VPS */}
        <div style={{ backgroundColor: 'var(--surface-container)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Server size={22} color="var(--on-surface)" />
              <h3 className="font-display-xl" style={{ fontSize: '24px' }}>SELF-HOSTED DOCKER / VPS</h3>
            </div>
            <div className="font-display-xl" style={{ fontSize: '38px', color: 'var(--on-surface)', margin: '12px 0' }}>$0.00 <span className="font-code-md text-on-surface-variant" style={{ fontSize: '13px' }}>/ UNLIMITED</span></div>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginBottom: '20px' }}>
              Run on your own servers, AWS, DigitalOcean, or Docker with zero rate limits and total privacy.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                'Unlimited Monthly API Requests',
                '100% Private In-Memory Execution',
                'Data Never Leaves Your Network',
                'Deploy on Docker, Linux, or Kubernetes',
                'Air-Gapped / Offline Capable',
                'GNU GPL-3.0 Open Source Freedom'
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <Check size={15} color="var(--primary)" /> {f}
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://github.com/techxsarwar/cauliflare" 
            target="_blank" 
            rel="noreferrer"
            className="press-button font-label-caps font-bold" 
            style={{ width: '100%', padding: '12px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px' }}
          >
            <GitBranch size={15} /> VIEW DOCKER & SOURCE CODE
          </a>
        </div>

      </section>

      {/* QUICK COPY COMMANDS */}
      <section style={{ backgroundColor: 'var(--surface)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 className="font-headline-md" style={{ fontSize: '20px' }}>⚡ SELF-HOST CAULIFLARE IN 10 SECONDS</h3>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginTop: '2px' }}>
              Run the Go threat engine locally or on your production VPS.
            </p>
          </div>
          <button 
            onClick={copyDockerCode}
            className="press-button font-label-caps font-bold"
            style={{ padding: '8px 16px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}
          >
            <Copy size={13} /> {copiedDocker ? 'COPIED!' : 'COPY COMMANDS'}
          </button>
        </div>

        <div style={{ backgroundColor: '#121212', color: '#00e676', padding: '16px', border: '2px solid var(--on-surface)', overflowX: 'auto' }} className="font-code-md">
          <pre style={{ margin: 0, fontSize: '13px' }}>{`git clone https://github.com/techxsarwar/cauliflare.git
cd cauliflare/backend
go run .
# 🚀 Running on http://127.0.0.1:8000 with sub-10ms Go in-memory execution`}</pre>
        </div>
      </section>

      {/* STAR & FOLLOW COMMUNITY COURTESY */}
      <section style={{ backgroundColor: 'var(--surface-container)', border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffd600', marginBottom: '6px' }}>
            <span>⭐</span>
            <span className="font-label-caps font-bold" style={{ color: 'var(--on-surface)', fontSize: '12px' }}>SUPPORT OPEN SOURCE DEVELOPMENT</span>
          </div>
          <h3 className="font-headline-md" style={{ fontSize: '20px' }}>Love Cauliflare? Star the Repo & Follow on GitHub</h3>
          <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginTop: '4px' }}>
            If you self-host or use this platform, please consider dropping a Star on GitHub and following Sarwar!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/techxsarwar/cauliflare" 
            target="_blank" 
            rel="noreferrer"
            className="glow-button font-label-caps font-bold"
            style={{ padding: '10px 18px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
          >
            ⭐ STAR REPOSITORY
          </a>
          <a 
            href="https://github.com/techxsarwar" 
            target="_blank" 
            rel="noreferrer"
            className="press-button font-label-caps font-bold"
            style={{ padding: '10px 18px', backgroundColor: 'var(--surface)', color: 'var(--on-surface)', border: '2px solid var(--on-surface)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
          >
            👤 FOLLOW @TECHXSARWAR
          </a>
        </div>
      </section>

    </div>
  );
};

export default BillingPage;
