import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategoryById } from '../data/categories'
import { getProductById } from '../data/products'
import { ImageCarousel } from '../components/ImageCarousel'
import { getWhatsAppEnquiryUrl } from '../utils/whatsapp'
import { useFavorites } from '../context/FavoritesContext'
import { useProductViews } from '../context/ProductViewsContext'

export function ProductDetail() {
  const { productId } = useParams()
  const product = productId ? getProductById(productId) : undefined
  const cat = product ? getCategoryById(product.category) : undefined
  const { toggle, has } = useFavorites()
  const { incrementView, getViewCount } = useProductViews()

  useEffect(() => {
    if (!product?.id) return
    const key = `showcase_view_bump_${product.id}`
    const now = Date.now()
    const last = Number(sessionStorage.getItem(key)) || 0
    if (now - last < 400) return
    sessionStorage.setItem(key, String(now))
    incrementView(product.id)
  }, [product?.id, incrementView])

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-stone-900">
          Product not found
        </h1>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Back home
        </Link>
      </div>
    )
  }

  const views = getViewCount(product.id)
  const wa = getWhatsAppEnquiryUrl(product.name)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-left text-sm text-stone-500">
        <Link to="/" className="transition hover:text-amber-800">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/category/${product.category}`}
          className="transition hover:text-amber-800"
        >
          {cat?.label ?? product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ImageCarousel
          key={product.id}
          images={product.images}
          alt={product.name}
        />

        <div className="flex flex-col text-left">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-amber-800">
                {cat?.label ?? product.category}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                has(product.id)
                  ? 'border-amber-300 bg-amber-50 text-amber-950'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-amber-200 hover:bg-amber-50/60'
              }`}
            >
              <HeartIcon filled={has(product.id)} />
              {has(product.id) ? 'Saved' : 'Save'}
            </button>
          </div>

          <p className="mt-2 text-sm text-stone-500">
            Local views: <span className="font-medium text-stone-700">{views}</span>
          </p>

          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Enquire Now
            </a>
            <Link
              to={`/category/${product.category}`}
              className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:border-amber-200 hover:bg-amber-50/50"
            >
              More in this category
            </Link>
          </div>

          {product.videoUrl && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Video
              </h2>
              <video
                className="mt-3 w-full max-w-xl rounded-2xl bg-black shadow-lg ring-1 ring-stone-200"
                controls
                playsInline
                preload="metadata"
                src={product.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
              <p className="mt-2 text-xs text-stone-500">
                Preview clip to illustrate the piece in context.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
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
      className="h-4 w-4"
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
