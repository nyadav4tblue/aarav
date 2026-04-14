/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const KEY = 'showcase_user'

const AuthContext = createContext(null)

function readUser() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.email) return parsed
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user))
      else localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }, [user])

  const login = useCallback((payload) => {
    setUser({
      name: String(payload.name || '').trim(),
      email: String(payload.email || '').trim(),
      createdAt: payload.createdAt || new Date().toISOString(),
    })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
