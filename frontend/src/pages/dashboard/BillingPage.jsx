import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, CreditCard, Download, ExternalLink, X, ArrowRight } from 'lucide-react';

const BillingPage = () => {
  const [currentPlan, setCurrentPlan] = useState('Free');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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
    setCurrentPlan(selectedPlanForCheckout);
    setIsCheckoutOpen(false);
    showToast(`🎉 Successfully upgraded to the ${selectedPlanForCheckout} plan!`);
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for prototyping, personal side projects, and local development testing.',
      limit: '10,000 requests / mo',
      features: [
        '74,697+ GitHub Disposable Email Signatures',
        'Phishing URL & Malware Scanner',
        'Scam Text Detection Engine',
        'In-App API Playground',
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

  const invoices = [
    { id: 'INV-2026-0501', date: 'May 1, 2026', amount: '$29.00', status: 'PAID', plan: 'Developer Pro Plan' },
    { id: 'INV-2026-0401', date: 'Apr 1, 2026', amount: '$29.00', status: 'PAID', plan: 'Developer Pro Plan' },
    { id: 'INV-2026-0301', date: 'Mar 1, 2026', amount: '$29.00', status: 'PAID', plan: 'Developer Pro Plan' }
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
          Manage your enterprise subscription tiers, monthly request allowances, and payment methods.
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

      {/* INVOICES & PAYMENT HISTORY */}
      <section style={{ border: '2px solid var(--on-surface)', boxShadow: '6px 6px 0px var(--on-surface)', backgroundColor: 'var(--surface-container)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-label-caps" style={{ fontWeight: 'bold' }}>BILLING RECEIPTS & INVOICE HISTORY</h2>
          <span className="font-code-md text-on-surface-variant" style={{ fontSize: '12px' }}>Stripe Verified Customer Portal</span>
        </div>

        <div style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--surface)' }} className="font-code-md">
            <thead>
              <tr style={{ backgroundColor: 'var(--on-surface)', color: 'var(--surface)', textAlign: 'left' }}>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>INVOICE ID</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>DATE</th>
                <th style={{ padding: '12px 20px', fontSize: '12px' }}>PLAN</th>
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
                      onClick={() => showToast(`Downloaded invoice receipt ${inv.id}`)}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={14} /> PDF
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
