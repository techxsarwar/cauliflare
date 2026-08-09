import React from 'react';
import { SignIn } from '@clerk/react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '40px 16px',
      backgroundImage: 'radial-gradient(rgba(28,27,27,0.08) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>
      
      <Link to="/" className="font-display-xl" style={{ 
        textDecoration: 'none', 
        color: 'var(--on-surface)', 
        fontSize: '36px', 
        marginBottom: '32px', 
        backgroundColor: 'var(--surface)', 
        padding: '4px 16px', 
        border: '2px solid var(--on-surface)', 
        boxShadow: '4px 4px 0px var(--on-surface)' 
      }}>
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
        <SignIn 
          routing="path" 
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          appearance={{
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
              formButtonPrimary: {
                backgroundColor: '#09371e',
                color: '#ffffff',
                textTransform: 'uppercase',
                fontWeight: '900',
                border: '2px solid #121212',
                borderRadius: '0px',
                boxShadow: '3px 3px 0px #121212',
                padding: '10px'
              },
              footerActionLink: {
                color: '#121212',
                fontWeight: '800',
                textDecoration: 'underline'
              }
            }
          }}
        />
      </div>

      <div style={{ marginTop: '24px', backgroundColor: 'var(--surface)', padding: '4px 12px' }}>
        <Link to="/" className="font-code-md" style={{ color: 'var(--on-surface)', fontWeight: 'bold' }}>
          ← Back to Homepage
        </Link>
      </div>

    </div>
  );
};

export default SignInPage;
