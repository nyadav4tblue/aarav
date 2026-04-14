import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { categories } from '../data/categories'

export function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-left text-sm text-stone-500">
        <Link to="/" className="transition hover:text-amber-800">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">About us</span>
      </nav>

      <header className="mt-8 text-left">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-800">
          Aarav
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          About us
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          We work in metal only—chiefly peetal (brass) and jasta (zinc)—for
          pieces that feel considered on a shelf or in afternoon light. Browse
          first, save what speaks to you, then reach out when you are ready to
          enquire.
        </p>
      </header>

      <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="text-left">
          <h2 className="font-display text-xl font-semibold text-stone-900">
            What we do
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Aarav brings together small metal collections across gods & deities,
            sculptural leaders, gifts, and home décor—always peetal, jasta, or a
            mix. Each listing calls out alloy and finish so you can picture the
            piece before you message us.
          </p>
          <p className="mt-4 leading-relaxed text-stone-600">
            We sell through conversation, not a cart: a short message beats a
            long checkout. Tap Enquire Now on any product to open WhatsApp with
            the piece name ready to send.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-amber-100 via-white to-stone-100 p-8 shadow-sm ring-1 ring-amber-200/60">
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Built for browsing
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
            <li className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-xs font-bold text-amber-950"
                aria-hidden
              >
                1
              </span>
              Search and filter by category to narrow the catalog.
            </li>
            <li className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-xs font-bold text-amber-950"
                aria-hidden
              >
                2
              </span>
              Save favorites locally—they stay in your browser until you clear
              them.
            </li>
            <li className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-xs font-bold text-amber-950"
                aria-hidden
              >
                3
              </span>
              Open a product, flip through images, and enquire when something
              clicks.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16 text-left">
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Collections
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Explore by room, theme, or gift—each collection has its own grid.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i + 1} />
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-stone-800 hover:shadow-lg"
        >
          Back to home
        </Link>
        <Link
          to="/category/gods"
          className="inline-flex rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-amber-300 hover:bg-amber-50"
        >
          Browse gods & deities
        </Link>
      </div>
    </div>
  )
}
