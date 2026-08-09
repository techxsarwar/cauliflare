import React from 'react';
import { SignIn } from '../clerk';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Key } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dot-grid" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '40px 16px'
    }}>
      
      <Link to="/" className="font-display-xl" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '36px', marginBottom: '24px', backgroundColor: 'var(--surface)', padding: '4px 16px', border: '2px solid var(--on-surface)', boxShadow: '4px 4px 0px var(--on-surface)' }}>
        CAULIFLARE
      </Link>

      <div style={{ 
        width: '100%', 
        maxWidth: '460px', 
        border: '3px solid var(--on-surface)', 
        boxShadow: '10px 10px 0px var(--on-surface)',
        backgroundColor: '#ffffff',
        padding: '28px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 className="font-headline-md" style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Developer Sign In
          </h2>
          <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>
            Access threat intelligence console and API management
          </p>
        </div>

        {/* Quick Access / Demo Bypass */}
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'var(--surface-container)', border: '2px solid var(--on-surface)' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="press-button font-label-caps"
            style={{ 
              width: '100%', 
              backgroundColor: 'var(--primary)', 
              color: '#ffffff', 
              padding: '12px', 
              fontWeight: '900',
              fontSize: '13px',
              border: '2px solid var(--on-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>⚡ QUICK ACCESS (DEMO / DEV MODE)</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
          <span className="font-label-caps font-code-md" style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>OR SIGN IN WITH CLERK</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <SignIn appearance={{
          variables: {
            colorPrimary: '#09371e', 
            colorBackground: '#ffffff',
            colorText: '#121212',
            colorTextSecondary: '#2d3630',
            colorInputBackground: '#FFFFFF',
            colorInputText: '#121212',
            borderRadius: '0px',
            fontFamily: '"Inter", sans-serif'
          },
          elements: {
            card: {
              boxShadow: 'none',
              border: 'none',
              borderRadius: '0px',
              padding: '0px',
              backgroundColor: '#ffffff'
            },
            headerTitle: {
              display: 'none'
            },
            headerSubtitle: {
              display: 'none'
            },
            socialButtonsBlockButton: {
              border: '2px solid #121212',
              borderRadius: '0px',
              backgroundColor: '#FFFFFF',
              boxShadow: '3px 3px 0px #121212',
              fontWeight: 'bold',
              color: '#121212'
            },
            formFieldInput: {
              border: '2px solid #121212',
              borderRadius: '0px',
              backgroundColor: '#FFFFFF',
              padding: '10px',
              color: '#121212',
              fontWeight: '600'
            },
            formFieldLabel: {
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              color: '#121212'
            },
            primaryButton: {
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              textTransform: 'uppercase',
              fontWeight: '900',
              border: '2px solid #121212',
              borderRadius: '0px',
              boxShadow: '3px 3px 0px #121212',
              padding: '10px'
            }
          }
        }} />
      </div>

      <div style={{ marginTop: '24px' }}>
        <Link to="/" className="font-code-md" style={{ color: 'var(--on-surface)', fontWeight: 'bold' }}>
          ← Back to Homepage
        </Link>
      </div>

    </div>
  );
};

export default SignInPage;
