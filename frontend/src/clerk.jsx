import React from 'react';
import {
  ClerkProvider as RealClerkProvider,
  Show as RealShow,
  SignInButton as RealSignInButton,
  SignUpButton as RealSignUpButton,
  UserButton as RealUserButton,
  useUser as realUseUser,
  useAuth as realUseAuth,
  RedirectToSignIn as RealRedirectToSignIn,
  SignIn as RealSignIn,
  SignUp as RealSignUp
} from '@clerk/react';

const realKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const isValidKey = Boolean(
  realKey &&
  realKey.length > 20 &&
  (realKey.startsWith('pk_live_') || realKey.startsWith('pk_test_'))
);

// --- Provider ---
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

// --- Auth state wrappers using Show ---
export const SignedIn = ({ children }) => {
  if (isValidKey) return <RealShow when="signed-in">{children}</RealShow>;
  return null; // Without valid key, treat as not signed in
};

export const SignedOut = ({ children }) => {
  if (isValidKey) return <RealShow when="signed-out">{children}</RealShow>;
  return <>{children}</>; // Without valid key, treat as signed out — show sign-in links
};

// --- Buttons ---
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
  return null;
};

// --- Hooks ---
export const useUser = () => {
  if (isValidKey) {
    try { return realUseUser(); } catch (e) {}
  }
  return { isLoaded: true, isSignedIn: false, user: null };
};

export const useAuth = () => {
  if (isValidKey) {
    try { return realUseAuth(); } catch (e) {}
  }
  return { isLoaded: true, isSignedIn: false, userId: null };
};

// --- Redirect ---
export const RedirectToSignIn = () => {
  if (isValidKey) return <RealRedirectToSignIn />;
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/sign-in')) {
    window.location.href = '/sign-in';
  }
  return null;
};

// --- Sign In / Sign Up components ---
export const SignIn = (props) => {
  if (isValidKey) return <RealSignIn {...props} />;
  return null;
};

export const SignUp = (props) => {
  if (isValidKey) return <RealSignUp {...props} />;
  return null;
};
