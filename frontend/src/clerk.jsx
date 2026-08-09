import React from 'react';
import * as RealClerk from '@clerk/clerk-react';

// Check if a real, valid Clerk publishable key is provided in .env
const realKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isValidKey = Boolean(realKey && realKey.startsWith('pk_live_') || (realKey && realKey.startsWith('pk_test_') && realKey.length > 50 && !realKey.includes('Y2F1bGlmbGFyZS1kZXY')));

export const ClerkProvider = ({ children, publishableKey, ...props }) => {
  if (isValidKey) {
    return <RealClerk.ClerkProvider publishableKey={publishableKey} {...props}>{children}</RealClerk.ClerkProvider>;
  }
  return <>{children}</>;
};

export const SignedIn = ({ children }) => {
  if (isValidKey) return <RealClerk.SignedIn>{children}</RealClerk.SignedIn>;
  return <>{children}</>;
};

export const SignedOut = ({ children }) => {
  if (isValidKey) return <RealClerk.SignedOut>{children}</RealClerk.SignedOut>;
  return null;
};

export const UserButton = (props) => {
  if (isValidKey) return <RealClerk.UserButton {...props} />;
  return (
    <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--primary)', color: '#121212', border: '2px solid var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }} title="Developer Mode (Signed In)">
      DEV
    </div>
  );
};

export const useUser = () => {
  if (isValidKey) {
    try {
      return RealClerk.useUser();
    } catch (e) {
      // Fallback if context fails
    }
  }
  return { isLoaded: true, isSignedIn: true, user: { firstName: 'Developer', id: 'dev_123' } };
};

export const RedirectToSignIn = () => {
  if (isValidKey) return <RealClerk.RedirectToSignIn />;
  return null;
};

export const SignIn = (props) => {
  if (isValidKey) return <RealClerk.SignIn {...props} />;
  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h3 className="font-bold font-code-md" style={{ marginBottom: '12px' }}>DEVELOPMENT MODE AUTHENTICATION</h3>
      <p className="font-body-lg text-on-surface-variant">You are automatically authenticated as Developer in local environment.</p>
    </div>
  );
};
