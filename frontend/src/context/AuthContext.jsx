import { createContext, useState, useEffect } from 'react';
import { getProfile, loginUser as loginRequest } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest({ email, password });
    setUser(res.data);
    return res;
  };

  const logout = () => {
    setUser(null);
    // token is httpOnly cookie — for hackathon speed, clearing client state is enough
    // optionally call a /api/auth/logout endpoint later if time allows
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};