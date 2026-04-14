import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ProductViewsProvider } from './context/ProductViewsContext'
import { SearchProvider } from './context/SearchContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Category } from './pages/Category'
import { ProductDetail } from './pages/ProductDetail'
import { Login } from './pages/Login'
import { Favorites } from './pages/Favorites'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { HashRouter } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ProductViewsProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="category/:categoryId" element={<Category />} />
                  <Route path="product/:productId" element={<ProductDetail />} />
                  <Route path="login" element={<Login />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="about" element={<About />} />
                  <Route path="home" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </SearchProvider>
          </ProductViewsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </HashRouter>
  )
}
