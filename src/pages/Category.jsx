import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategoryById } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useSearch } from '../context/SearchContext'
import { filterProductsByName } from '../utils/filter'

export function Category() {
  const { categoryId } = useParams()
  const { query } = useSearch()

  const category = categoryId ? getCategoryById(categoryId) : undefined
  const base = useMemo(
    () => (categoryId ? getProductsByCategory(categoryId) : []),
    [categoryId],
  )
  const list = useMemo(
    () => filterProductsByName(base, query),
    [base, query],
  )

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-stone-900">
          Category not found
        </h1>
        <p className="mt-2 text-stone-600">
          That collection does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="text-left">
        <p className="text-sm font-medium text-amber-800">Collection</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {category.label}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          {category.description}
        </p>
      </header>

      <p className="mt-8 text-sm text-stone-500">
        Showing {list.length} of {base.length} product
        {base.length === 1 ? '' : 's'}
        {query.trim() ? ` matching “${query.trim()}”` : ''}.
      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center text-stone-600">
          No products match your search in this category.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
