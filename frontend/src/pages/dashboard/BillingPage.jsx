import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Zap, CreditCard, Download, ExternalLink, X, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

const BillingPage = () => {
  const [currentPlan, setCurrentPlan] = useState('Free');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('cauliflare_user_plan');
      if (savedPlan) setCurrentPlan(savedPlan);

      const savedInvoices = localStorage.getItem('cauliflare_user_invoices');
      if (savedInvoices) {
        setInvoices(JSON.parse(savedInvoices));
      } else {
        // Initial real $0.00 Free Tier Registration Invoice
        const initialFreeInvoice = [
          {
            id: 'INV-FREE-001',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            plan: 'Free Developer Registration',
            amount: '$0.00',
            status: 'ACTIVE'
          }
        ];
        setInvoices(initialFreeInvoice);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCheckout = (planName) => {
    if (planName === currentPlan) return;
    setSelectedPlanForCheckout(planName);
    setIsCheckoutOpen(true);
  };

  const handleCompletePayment = (e) => {
    e.preventDefault();
    const amount = selectedPlanForCheckout === 'Developer Pro' ? '$29.00' : '$99.00';
    const now = new Date();
    const newInvoice = {
      id: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      plan: `${selectedPlanForCheckout} Plan`,
      amount: amount,
      status: 'PAID'
    };

    const updatedInvoices = [newInvoice, ...invoices];
    setInvoices(updatedInvoices);
    setCurrentPlan(selectedPlanForCheckout);
    setIsCheckoutOpen(false);

    try {
      localStorage.setItem('cauliflare_user_plan', selectedPlanForCheckout);
      localStorage.setItem('cauliflare_user_invoices', JSON.stringify(updatedInvoices));
    } catch (err) {}

    showToast(`🎉 Successfully activated ${selectedPlanForCheckout} subscription! Invoice ${newInvoice.id} generated.`);
  };

  const handleDownloadInvoice = (inv) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${inv.id} - Cauliflare Security</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; background: #ffffff; color: #121212; padding: 40px; margin: 0; }
          .invoice-box { max-width: 700px; margin: auto; border: 3px solid #121212; padding: 32px; box-shadow: 6px 6px 0px #121212; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #121212; padding-bottom: 20px; margin-bottom: 20px; }
          .title { font-size: 26px; font-weight: 900; letter-spacing: -1px; }
          .badge { display: inline-block; background: #00e676; color: #121212; font-weight: bold; padding: 4px 10px; border: 1px solid #121212; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #121212; color: #ffffff; text-align: left; padding: 10px 14px; font-size: 12px; }
          td { padding: 12px 14px; border-bottom: 1px solid #e0e0e0; }
          .total { font-size: 20px; font-weight: bold; text-align: right; margin-top: 20px; }
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
              <span class="badge">${inv.status}</span>
              <div style="font-size: 14px; font-weight: bold; margin-top: 8px;">${inv.id}</div>
              <div style="font-size: 12px; color: #666;">Date: ${inv.date}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px;">
            <div>
              <strong>Billed To:</strong><br>
              Cauliflare Developer Account<br>
              Account ID: cf_sarwar_live<br>
              API Environment: Production Live
            </div>
            <div style="text-align: right;">
              <strong>Payment Method:</strong><br>
              Stripe Verified Gateway<br>
              Card ending in •••• 4242<br>
              Currency: USD ($)
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>PERIOD</th>
                <th>RATE</th>
                <th style="text-align: right;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${inv.plan}</strong><br><span style="font-size: 11px; color: #666;">Sub-10ms Threat APIs, Disposable Mail Scanner, Real-time Webhooks</span></td>
                <td>1 Month</td>
                <td>${inv.amount}</td>
                <td style="text-align: right;"><strong>${inv.amount}</strong></td>
              </tr>
            </tbody>
          </table>

          <div class="total">Total Paid: ${inv.amount}</div>

          <div class="footer">
            Thank you for building with Cauliflare Security Infrastructure.<br>
            For support or questions regarding this invoice, contact security@cauliflare.in
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
      link.download = `cauliflare_${inv.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for prototyping, personal side projects, and local development testing.',
      limit: '10,000 requests / mo',
      features: [
        '75,000+ GitHub & Multi-source Disposable Email Signatures',
        'Live Web Threat Sniffer & Typo Engine',
        'Phishing URL & Malware Scanner',
        'Scam Text Detection Engine',
        'In-App API Playground & Embed SDK',
        '100 req / sec rate limit'
      ],
      cta: 'Current Plan',
      isCurrent: currentPlan === 'Free'
    },
    {
      name: 'Developer Pro',
      price: '$29',
      period: 'per month',
      popular: true,
      description: 'Built for production startups, SaaS applications, and high-volume user sign-ups.',
      limit: '500,000 requests / mo',
      features: [
        'Everything in Free Plan',
        'Real-time Discord & Slack Webhook Alerts',
        'IP Reputation & Tor/VPN Detection API',
        'Bulk Batch Email & CSV Cleaner Tool',
        '500 req / sec rate limit',
        '99.99% Guaranteed SLA Uptime'
      ],
      cta: currentPlan === 'Developer Pro' ? 'Current Plan' : 'Upgrade to Developer Pro',
      isCurrent: currentPlan === 'Developer Pro'
    },
    {
      name: 'Enterprise Scale',
      price: '$99',
      period: 'per month',
      description: 'Dedicated infrastructure for fintech, crypto, e-commerce, and enterprise platforms.',
      limit: '5,000,000 requests / mo',
      features: [
        'Everything in Developer Pro',
        'Custom Dedicated Domain Blocklists',
        'Multi-Region Cloud Anycast Routing',
        'Custom IP Range Whitelists',
        'Dedicated 24/7 Slack / Discord Support Channel',
        'SOC2 & GDPR Compliance Reports'
      ],
      cta: currentPlan === 'Enterprise Scale' ? 'Current Plan' : 'Upgrade to Enterprise Scale',
      isCurrent: currentPlan === 'Enterprise Scale'
    }
  ];

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

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            backgroundColor: 'var(--surface)',
            border: '3px solid var(--on-surface)',
            boxShadow: '10px 10px 0px var(--on-surface)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={22} color="var(--primary)" />
                <h3 className="font-display-xl" style={{ fontSize: '24px' }}>UPGRADE TO {selectedPlanForCheckout}</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
            </div>

            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '14px', marginBottom: '20px' }}>
              Instant activation. Your API key will immediately unlock higher rate limits, VPN detection, and webhook alerts.
            </p>

            <form onSubmit={handleCompletePayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: 'bold' }}>CARDHOLDER NAME</label>
                <input type="text" defaultValue="Sarwar (Cauliflare Developer)" required className="font-code-md" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)' }} />
              </div>

              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: 'bold' }}>CARD NUMBER</label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#121212', border: '2px solid var(--on-surface)', padding: '0 12px' }}>
                  <CreditCard size={18} color="#00e676" />
                  <input type="text" defaultValue="•••• •••• •••• 4242" required className="font-code-md" style={{ width: '100%', padding: '10px 10px', backgroundColor: 'transparent', color: '#fff', border: 'none', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="font-label-caps" style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: 'bold' }}>EXPIRY</label>
                  <input type="text" defaultValue="12/28" required className="font-code-md" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)' }} />
                </div>
                <div>
                  <label className="font-label-caps" style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: 'bold' }}>CVC</label>
                  <input type="text" defaultValue="888" required className="font-code-md" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#121212', color: '#fff', border: '2px solid var(--on-surface)' }} />
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--surface-container)', border: '1px solid var(--on-surface)', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-bold font-label-caps" style={{ fontSize: '12px' }}>Total Due Today:</span>
                <span className="font-display-xl" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  {selectedPlanForCheckout === 'Developer Pro' ? '$29.00' : '$99.00'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsCheckoutOpen(false)} className="press-button font-label-caps" style={{ flex: 1, padding: '12px', backgroundColor: 'var(--surface)', border: '2px solid var(--on-surface)', cursor: 'pointer' }}>
                  CANCEL
                </button>
                <button type="submit" className="glow-button font-label-caps font-bold" style={{ flex: 2, padding: '12px', backgroundColor: 'var(--primary)', color: '#ffffff', border: '2px solid var(--on-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  CONFIRM & ACTIVATE PLAN →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <section>
        <h1 className="font-display-xl" style={{ fontSize: '36px', marginBottom: '8px' }}>Subscription & Billing</h1>
        <p className="font-body-lg text-on-surface-variant" style={{ fontWeight: '600' }}>
          Manage your subscription tiers, monthly request limits, and official payment receipts.
        </p>
      </section>

      {/* PLAN COMPARISON CARDS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {plans.map((p, idx) => (
          <div 
            key={idx}
            style={{
              backgroundColor: p.isCurrent ? 'var(--surface)' : 'var(--surface-container)',
              border: p.isCurrent ? '4px solid var(--primary)' : '2px solid var(--on-surface)',
              boxShadow: p.isCurrent ? '8px 8px 0px var(--primary)' : '6px 6px 0px var(--on-surface)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {p.popular && (
              <div style={{ position: 'absolute', top: '-14px', right: '20px', backgroundColor: 'var(--primary)', color: '#ffffff', padding: '4px 12px', border: '2px solid var(--on-surface)', fontSize: '11px', fontWeight: '900' }} className="font-label-caps">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="font-display-xl" style={{ fontSize: '26px', marginBottom: '8px' }}>{p.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                <span className="font-display-xl" style={{ fontSize: '42px', color: 'var(--primary)' }}>{p.price}</span>
                <span className="font-code-md text-on-surface-variant" style={{ fontSize: '13px' }}>/{p.period}</span>
              </div>
              <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', marginBottom: '20px', minHeight: '40px' }}>
                {p.description}
              </p>

              <div style={{ padding: '10px 14px', backgroundColor: '#121212', color: '#00e676', border: '2px solid var(--on-surface)', marginBottom: '24px', fontWeight: 'bold' }} className="font-code-md">
                ⚡ {p.limit}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {p.features.map((feat, fidx) => (
                  <div key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span className="font-body-md" style={{ fontSize: '13px', color: 'var(--on-surface)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout(p.name)}
              disabled={p.isCurrent}
              className={p.isCurrent ? "font-label-caps" : "glow-button font-label-caps font-bold"}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: p.isCurrent ? 'var(--surface-container-highest)' : 'var(--primary)',
                color: p.isCurrent ? 'var(--on-surface)' : '#ffffff',
                border: '2px solid var(--on-surface)',
                cursor: p.isCurrent ? 'default' : 'pointer',
                fontWeight: 'bold',
                fontSize: '13px'
              }}
            >
              {p.isCurrent ? '✓ CURRENT ACTIVE PLAN' : p.cta}
            </button>
          </div>
        ))}
      </section>

      {/* INVOICES & PAYMENT RECEIPTS */}
      <section style={{ border: '3px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--primary)" />
            <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>OFFICIAL BILLING RECEIPTS & INVOICE HISTORY</h2>
          </div>
          <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>Stripe Customer Billing Ledger</span>
        </div>

        {currentPlan === 'Free' && invoices.length <= 1 && (
          <div style={{ padding: '16px 24px', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--outline-variant)' }}>
            <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px', margin: 0 }}>
              💡 <strong>Free Tier Active:</strong> You are currently using the Free Developer tier ($0.00 / mo). When you upgrade to Developer Pro or Enterprise Scale, your official paid receipts and tax invoices will generate here automatically.
            </p>
          </div>
        )}

        <div style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--surface)' }} className="font-code-md">
            <thead>
              <tr style={{ backgroundColor: 'var(--on-surface)', color: 'var(--surface)', textAlign: 'left' }}>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>INVOICE ID</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>DATE</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>PLAN DESCRIPTION</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>AMOUNT</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>STATUS</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{inv.id}</td>
                  <td style={{ padding: '14px 20px' }}>{inv.date}</td>
                  <td style={{ padding: '14px 20px' }}>{inv.plan}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{inv.amount}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: '#ffffff' }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDownloadInvoice(inv)}
                      className="press-button font-label-caps"
                      style={{ background: 'var(--surface-container)', border: '1px solid var(--on-surface)', padding: '4px 10px', color: 'var(--on-surface)', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}
                    >
                      <Download size={13} /> VIEW RECEIPT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default BillingPage;
