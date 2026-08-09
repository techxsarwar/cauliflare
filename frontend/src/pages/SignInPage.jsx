import React from 'react';
import { SignIn, SignedIn, SignedOut } from '../clerk';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="dot-grid" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      paddingTop: '120px',
      paddingBottom: '40px'
    }}>
      
      <Link to="/" className="font-display-xl" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '40px', marginBottom: '40px', backgroundColor: 'var(--surface)', padding: '0 16px' }}>
        CAULIFLARE
      </Link>

      <SignedOut>
        <div style={{ 
          width: '100%', 
          maxWidth: '420px', 
          border: '3px solid var(--on-surface)', 
          boxShadow: '12px 12px 0px var(--on-surface)',
          backgroundColor: 'var(--surface)',
          padding: '16px'
        }}>
          <SignIn routing="path" path="/sign-in" appearance={{
            variables: {
              colorPrimary: '#121212', 
              colorBackground: 'transparent',
              colorText: '#121212',
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
                padding: '16px'
              },
              headerTitle: {
                fontFamily: '"Space Mono", monospace',
                textTransform: 'uppercase',
                fontWeight: '900',
                fontSize: '24px',
                color: '#121212',
                textAlign: 'center',
                width: '100%'
              },
              headerSubtitle: {
                display: 'none'
              },
              socialButtonsBlockButton: {
                border: '2px solid #121212',
                borderRadius: '0px',
                backgroundColor: '#FFFFFF',
                boxShadow: '3px 3px 0px #121212',
                fontWeight: 'bold'
              },
              formFieldInput: {
                border: '2px solid #121212',
                borderRadius: '0px',
                backgroundColor: '#FFFFFF',
                padding: '12px',
                boxShadow: 'none'
              },
              formFieldLabel: {
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontFamily: '"Space Mono", monospace',
                fontSize: '12px'
              },
              primaryButton: {
                backgroundColor: '#D9FF00',
                color: '#121212',
                textTransform: 'uppercase',
                fontWeight: '900',
                fontFamily: '"Space Mono", monospace',
                border: '2px solid #121212',
                borderRadius: '0px',
                boxShadow: '4px 4px 0px #121212',
                padding: '12px',
                marginTop: '16px'
              },
              footerActionLink: {
                color: '#121212',
                fontWeight: '900',
                textDecoration: 'underline'
              }
            }
          }} />
        </div>
      </SignedOut>

      <SignedIn>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          border: '3px solid var(--on-surface)',
          boxShadow: '12px 12px 0px var(--on-surface)',
          backgroundColor: 'var(--surface)',
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 className="font-display-xl" style={{ fontSize: '24px', marginBottom: '16px' }}>ALREADY SIGNED IN</h2>
          <p className="font-body-lg text-on-surface-variant" style={{ marginBottom: '32px' }}>You are securely authenticated.</p>
          <Link to="/dashboard" className="glow-button font-label-caps" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Go to Dashboard
          </Link>
        </div>
      </SignedIn>
    </div>
  );
};

export default SignInPage;
