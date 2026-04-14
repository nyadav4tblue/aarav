/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const KEY = 'showcase_favorites'

const FavoritesContext = createContext(null)

function readIds() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readIds)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* ignore */
    }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const has = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
