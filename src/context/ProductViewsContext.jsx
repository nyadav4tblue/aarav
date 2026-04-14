/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const KEY = 'showcase_product_views'

const ProductViewsContext = createContext(null)

function readViews() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function ProductViewsProvider({ children }) {
  const [views, setViews] = useState(readViews)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(views))
    } catch {
      /* ignore */
    }
  }, [views])

  const getViewCount = useCallback(
    (id) => {
      const n = views[id]
      return typeof n === 'number' && Number.isFinite(n) ? n : 0
    },
    [views],
  )

  const incrementView = useCallback((id) => {
    setViews((prev) => {
      const cur =
        typeof prev[id] === 'number' && Number.isFinite(prev[id]) ? prev[id] : 0
      return { ...prev, [id]: cur + 1 }
    })
  }, [])

  const value = useMemo(
    () => ({ getViewCount, incrementView }),
    [getViewCount, incrementView],
  )

  return (
    <ProductViewsContext.Provider value={value}>
      {children}
    </ProductViewsContext.Provider>
  )
}

export function useProductViews() {
  const ctx = useContext(ProductViewsContext)
  if (!ctx) {
    throw new Error('useProductViews must be used within ProductViewsProvider')
  }
  return ctx
}
