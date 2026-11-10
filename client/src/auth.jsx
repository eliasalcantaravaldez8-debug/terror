import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = carregando
  const refresh = useCallback(() => api.get('/auth/me').then((d) => setUser(d.user)).catch(() => setUser(null)), []);
  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    if (!user) return undefined;
    const t = setInterval(refresh, 60_000); // contadores de notificações/mensagens
    return () => clearInterval(t);
  }, [user, refresh]);
  const value = {
    user,
    loading: user === undefined,
    refresh,
    setUser,
    async login(login, password) { const d = await api.post('/auth/login', { login, password }); setUser(d.user); return d.user; },
    async register(data) { const d = await api.post('/auth/register', data); setUser(d.user); return d; },
    async logout() { await api.post('/auth/logout'); setUser(null); },
    has: (feature) => !!user?.plan?.features?.includes(feature),
    isAdmin: user?.role === 'admin',
    isStaff: user?.role === 'admin' || user?.role === 'moderator',
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
