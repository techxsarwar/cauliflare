import React from 'react';
import { 
  ClerkProvider as RealClerkProvider, 
  Show as RealShow, 
  SignInButton as RealSignInButton, 
  SignUpButton as RealSignUpButton, 
  UserButton as RealUserButton, 
  useUser as realUseUser, 
  RedirectToSignIn as RealRedirectToSignIn, 
  SignIn as RealSignIn 
} from '@clerk/react';

const realKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const isValidKey = Boolean(
  realKey && 
  realKey.length > 20 && 
  (realKey.startsWith('pk_live_') || realKey.startsWith('pk_test_'))
);

export const ClerkProvider = ({ children, afterSignOutUrl = '/', ...props }) => {
  if (isValidKey) {
    return (
      <RealClerkProvider publishableKey={realKey} afterSignOutUrl={afterSignOutUrl} {...props}>
        {children}
      </RealClerkProvider>
    );
  }
  return <>{children}</>;
};

export const Show = ({ when, children }) => {
  if (isValidKey) {
    return <RealShow when={when}>{children}</RealShow>;
  }
  if (when === 'signed-in') return <>{children}</>;
  return null;
};

export const SignedIn = ({ children }) => {
  if (isValidKey) {
    return <RealShow when="signed-in">{children}</RealShow>;
  }
  return <>{children}</>;
};

export const SignedOut = ({ children }) => {
  if (isValidKey) {
    return <RealShow when="signed-out">{children}</RealShow>;
  }
  return null;
};

export const SignInButton = (props) => {
  if (isValidKey) return <RealSignInButton {...props} />;
  return <button {...props}>Sign In</button>;
};

export const SignUpButton = (props) => {
  if (isValidKey) return <RealSignUpButton {...props} />;
  return <button {...props}>Sign Up</button>;
};

export const UserButton = (props) => {
  if (isValidKey) return <RealUserButton {...props} />;
  return (
    <div style={{ 
      width: '36px', 
      height: '36px', 
      backgroundColor: 'var(--on-surface)', 
      color: '#ffffff', 
      border: '2px solid var(--on-surface)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontWeight: 'bold', 
      fontSize: '12px', 
      cursor: 'pointer' 
    }} title="Developer Mode (Signed In)">
      DEV
    </div>
  );
};

export const useUser = () => {
  if (isValidKey) {
    try {
      return realUseUser();
    } catch (e) {}
  }
  return { isLoaded: true, isSignedIn: true, user: { firstName: 'Developer', id: 'dev_123' } };
};

export const RedirectToSignIn = () => {
  if (isValidKey) return <RealRedirectToSignIn />;
  return null;
};

export const SignIn = (props) => {
  if (isValidKey) return <RealSignIn {...props} />;
  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h3 className="font-bold font-code-md" style={{ marginBottom: '12px' }}>DEVELOPMENT MODE AUTHENTICATION</h3>
      <p className="font-body-lg text-on-surface-variant">You are automatically authenticated as Developer in local environment.</p>
    </div>
  );
};
