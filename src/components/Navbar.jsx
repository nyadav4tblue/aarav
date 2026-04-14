import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { categories } from '../data/categories'
import { useSearch } from '../context/SearchContext'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

export function Navbar() {
  const { query, setQuery } = useSearch()
  const { user } = useAuth()
  const { ids } = useFavorites()
  const [open, setOpen] = useState(false)

  const navClass = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-amber-100 text-amber-950'
        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900',
    ].join(' ')

  const navClusterClass =
    'flex min-w-0 flex-wrap items-center justify-end gap-0.5 sm:gap-1 md:gap-2'

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] gap-x-3 gap-y-3 px-4 py-3.5 sm:px-6 lg:gap-x-6 lg:px-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:grid-rows-1 md:items-center md:gap-y-0 lg:gap-x-8">
        <Link
          to="/"
          className="col-start-1 row-start-1 flex min-w-0 max-w-[min(100%,12rem)] flex-col justify-center self-center no-underline transition hover:opacity-90"
        >
          <span className="font-display text-lg font-semibold tracking-tight text-stone-900">
            Aarav
          </span>
          <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-800/90 sm:block">
            Peetal & jasta metal
          </span>
        </Link>

        <div
          className={`${navClusterClass} col-start-2 row-start-1 self-center md:col-start-3`}
        >
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          <Link
            to="/favorites"
            className="relative inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Saved
            {ids.length > 0 && (
              <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white">
                {ids.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-categories"
          >
            Menu
          </button>

          <nav
            className="hidden max-w-[min(100vw-8rem,28rem)] items-center gap-0.5 overflow-x-auto whitespace-nowrap md:flex md:pl-1"
            aria-label="Categories"
          >
            {categories.map((c) => (
              <NavLink key={c.id} to={`/category/${c.id}`} className={navClass}>
                {c.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/login"
            className="inline-flex shrink-0 items-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {user ? user.name || 'Account' : 'Login'}
          </Link>
        </div>

        <div className="col-span-full min-w-0 md:col-span-1 md:col-start-2 md:row-start-1">
          <label className="relative block w-full">
            <span className="sr-only">Search products</span>
            <span
              className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-400"
              aria-hidden
            >
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peetal & jasta pieces…"
              className="w-full rounded-full border border-stone-200/90 bg-stone-50/80 py-2.5 pl-10 pr-4 text-sm text-stone-900 shadow-sm ring-1 ring-stone-100 transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/35"
            />
          </label>
        </div>
      </div>

      <div
        id="mobile-categories"
        className={`border-t border-stone-100 bg-white px-4 pb-4 pt-2 md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
          Categories
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              className={navClass}
              onClick={() => setOpen(false)}
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.3-4.3m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 10.45 10.45Z"
      />
    </svg>
  )
}
