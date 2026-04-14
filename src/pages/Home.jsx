import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import {
  getFeaturedProducts,
  products as allProducts,
} from '../data/products'
import { CategoryCard } from '../components/CategoryCard'
import { ProductCard } from '../components/ProductCard'
import { useSearch } from '../context/SearchContext'
import { filterProductsByName } from '../utils/filter'

export function Home() {
  const { query } = useSearch()
  const featured = getFeaturedProducts()
  const searchResults = filterProductsByName(allProducts, query)
  const showSearch = query.trim().length > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {!showSearch && (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-white to-stone-100 p-8 shadow-sm ring-1 ring-amber-200/60 sm:p-12">
          <div className="relative max-w-2xl text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-800">
              Peetal & jasta metal
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Metal pieces with presence.
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Every listing is metal—warm peetal (brass) or cool jasta (zinc).
              Browse by category, save your favorites, and enquire on WhatsApp
              when you are ready — no cart, just a direct line to us.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/gods"
                className="inline-flex rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-stone-800 hover:shadow-lg"
              >
                Shop gods & deities
              </Link>
              <Link
                to="/category/home_decor"
                className="inline-flex rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-amber-300 hover:bg-amber-50"
              >
                Explore home décor
              </Link>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
            aria-hidden
          />
        </section>
      )}

      {showSearch && (
        <section className="mb-12 text-left">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Search results
          </h2>
          <p className="mt-1 text-stone-600">
            {searchResults.length} match
            {searchResults.length === 1 ? '' : 'es'} for “{query.trim()}”.
          </p>
          {searchResults.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-stone-200 bg-white p-8 text-stone-600">
              Try another name, or browse categories from the menu.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      )}

      {!showSearch && (
        <>
          <section className="mt-14">
            <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  Categories
                </h2>
                <p className="mt-1 text-stone-600">
                  Pick a collection to explore the full grid.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((c, i) => (
                <CategoryCard key={c.id} category={c} index={i + 1} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="text-left">
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Featured products
              </h2>
              <p className="mt-1 text-stone-600">
                Hand-picked peetal and jasta highlights.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
