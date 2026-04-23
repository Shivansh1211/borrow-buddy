import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const STORAGE_KEY = 'borrow-buddy-token'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(STORAGE_KEY)
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (error) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      setReady(true);
    };

    fetchUser();
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({ user, ready, login, logout, isAuthenticated: !!user }),
    [user, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
