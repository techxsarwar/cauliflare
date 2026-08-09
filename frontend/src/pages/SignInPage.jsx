import React from 'react';
import { SignIn } from '../clerk';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="dot-grid" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '60px 16px'
    }}>
      
      <Link to="/" className="font-display-xl" style={{ textDecoration: 'none', color: 'var(--on-surface)', fontSize: '36px', marginBottom: '32px', backgroundColor: 'var(--surface)', padding: '4px 16px', border: '2px solid var(--on-surface)', boxShadow: '4px 4px 0px var(--on-surface)' }}>
        CAULIFLARE
      </Link>

      <div style={{ 
        width: '100%', 
        maxWidth: '460px', 
        border: '3px solid var(--on-surface)', 
        boxShadow: '10px 10px 0px var(--on-surface)',
        backgroundColor: '#ffffff',
        padding: '24px'
      }}>
        <SignIn appearance={{
          variables: {
            colorPrimary: '#004d25', 
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
              padding: '12px',
              backgroundColor: '#ffffff'
            },
            headerTitle: {
              fontFamily: '"Space Mono", monospace',
              textTransform: 'uppercase',
              fontWeight: '900',
              fontSize: '22px',
              color: '#121212',
              textAlign: 'center'
            },
            headerSubtitle: {
              color: '#2d3630',
              fontWeight: '600'
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
              padding: '12px',
              color: '#121212',
              fontWeight: '600'
            },
            formFieldLabel: {
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
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
              padding: '12px'
            },
            footerActionLink: {
              color: '#121212',
              fontWeight: '900',
              textDecoration: 'underline'
            }
          }
        }} />
      </div>

      <div style={{ marginTop: '24px' }}>
        <Link to="/dashboard" className="font-code-md" style={{ color: 'var(--on-surface)', fontWeight: 'bold' }}>
          ← Back to Dashboard
        </Link>
      </div>

    </div>
  );
};

export default SignInPage;
