import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-stone-900">
        Page not found
      </h1>
      <p className="mt-3 text-stone-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Back to home
      </Link>
    </div>
  )
}
