import { Link } from 'react-router-dom'

/**
 * @param {{ category: { id: string; label: string; description: string }; index: number }} props
 */
export function CategoryCard({ category, index }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-b from-white via-white to-stone-50/80 p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-950/5"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition duration-300 group-hover:scale-x-100"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-stone-100 to-stone-50 text-sm font-bold tabular-nums text-stone-700 shadow-inner ring-1 ring-stone-200/90 transition duration-300 group-hover:from-amber-100 group-hover:to-amber-50 group-hover:text-amber-950 group-hover:ring-amber-300/60"
          aria-hidden
        >
          {index}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-stone-900 transition group-hover:text-amber-950">
        {category.label}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-stone-600">
        {category.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900">
        View collection
        <ArrowRightIcon />
      </span>
    </Link>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 translate-x-0 transition duration-300 group-hover:translate-x-0.5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
