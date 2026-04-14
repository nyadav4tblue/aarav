import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="text-left">
          <p className="font-display text-base font-semibold text-stone-900">
            Aarav
          </p>
          <p className="mt-1 max-w-md text-sm text-stone-600">
            Peetal and jasta metal craft. Browse the catalog, save your favorites,
            and reach us on WhatsApp to enquire.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
          <Link className="transition hover:text-amber-800" to="/">
            Home
          </Link>
          <Link className="transition hover:text-amber-800" to="/about">
            About
          </Link>
          <Link className="transition hover:text-amber-800" to="/favorites">
            Saved
          </Link>
          <Link className="transition hover:text-amber-800" to="/login">
            Account
          </Link>
        </nav>
      </div>
      <div className="border-t border-stone-100 bg-stone-50/80">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-stone-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Aarav.
        </p>
      </div>
    </footer>
  )
}
