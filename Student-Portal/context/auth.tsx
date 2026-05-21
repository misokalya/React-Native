import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: (regNo: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function signIn(regNo: string, password: string) {
    // TODO: replace with your real API call
    // e.g. const res = await fetch('https://yourapi.ac.tz/auth/login', { ... })
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    // Demo: accept any non-empty credentials
    if (!regNo || !password) throw new Error('Invalid credentials.');
    setIsSignedIn(true);
  }

  function signOut() {
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
