import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  user: any | null;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
  testConnection: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => true,
  signOut: async () => {},
  testConnection: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('test').select('*').limit(1);
      if (error) {
        console.error('Connection error:', error.message);
        return false;
      }
      console.log('Connection successful:', data);
      return true;
    } catch (error) {
      console.error('Test failed:', error);
      return false;
    }
  };

  const signIn = async () => {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to Supabase');
      return false;
    }
    
    setUser({ id: '1', name: 'Demo User' });
    return true;
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, testConnection }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);