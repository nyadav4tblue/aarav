import { Link } from 'react-router-dom'
import { getCategoryById } from '../data/categories'
import { useFavorites } from '../context/FavoritesContext'

/** @param {{ product: { id: string; name: string; category: string; description: string; images: string[] } }} props */
export function ProductCard({ product }) {
  const cat = getCategoryById(product.category)
  const { toggle, has } = useFavorites()
  const thumb = product.images[0] || '/images/gods-surya-1.svg'
  const saved = has(product.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-amber-200/80">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-stone-100"
      >
        <img
          src={thumb}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-700 shadow backdrop-blur">
          {cat?.label ?? product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="font-display text-lg font-semibold text-stone-900 transition hover:text-amber-800"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              toggle(product.id)
            }}
            className="shrink-0 rounded-full p-1.5 text-stone-400 transition hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={saved ? 'Remove from saved' : 'Save product'}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-amber-800 transition hover:gap-2"
        >
          View details
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}
