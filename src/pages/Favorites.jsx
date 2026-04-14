import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useFavorites } from '../context/FavoritesContext'
import { useSearch } from '../context/SearchContext'
import { filterProductsByName } from '../utils/filter'

export function Favorites() {
  const { ids } = useFavorites()
  const { query } = useSearch()

  const saved = products.filter((p) => ids.includes(p.id))
  const list = filterProductsByName(saved, query)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="text-left">
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Saved products
        </h1>
        <p className="mt-2 text-stone-600">Items you have saved.</p>
      </header>

      {ids.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-600">You have not saved anything yet.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Browse the catalog
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-stone-500">
            Showing {list.length} of {saved.length} saved
            {query.trim() ? ` matching “${query.trim()}”` : ''}.
          </p>
          {list.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-stone-200 bg-white p-8 text-center text-stone-600">
              No saved items match your search.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
