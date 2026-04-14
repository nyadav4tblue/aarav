import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { user, login, logout } = useAuth()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const em = email.trim()
    if (!em) {
      setMessage('Please enter an email.')
      return
    }
    if (mode === 'signup') {
      const nm = name.trim() || 'Collector'
      login({ name: nm, email: em, createdAt: new Date().toISOString() })
      setMessage('Welcome. Your account details are saved on this device.')
    } else {
      login({
        name: name.trim() || em.split('@')[0] || 'Guest',
        email: em,
        createdAt: new Date().toISOString(),
      })
      setMessage('Signed in. Your profile is saved on this device.')
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200/80 sm:p-10">
        <h1 className="text-center font-display text-2xl font-bold text-stone-900">
          Account
        </h1>

        {user && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-left text-sm text-stone-800">
            <p className="font-semibold">Signed in as {user.name}</p>
            <p className="mt-1 text-stone-600">{user.email}</p>
            <button
              type="button"
              onClick={() => {
                logout()
                setMessage('You have signed out locally.')
              }}
              className="mt-3 text-sm font-medium text-amber-900 underline-offset-2 hover:underline"
            >
              Sign out
            </button>
          </div>
        )}

        <div className="mt-8 flex rounded-2xl bg-stone-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('signin')
              setMessage('')
            }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              mode === 'signin'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup')
              setMessage('')
            }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              mode === 'signup'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
          {mode === 'signup' && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-stone-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                placeholder="Alex Collector"
              />
            </div>
          )}
          {mode === 'signin' && (
            <div>
              <label
                htmlFor="nameOptional"
                className="block text-sm font-medium text-stone-700"
              >
                Display name{' '}
                <span className="font-normal text-stone-500">(optional)</span>
              </label>
              <input
                id="nameOptional"
                name="nameOptional"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                placeholder="How we greet you"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              placeholder="you@example.com"
            />
          </div>

          {message && (
            <p className="rounded-xl bg-stone-50 px-3 py-2 text-sm text-stone-700 ring-1 ring-stone-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-stone-900 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-stone-800 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {mode === 'signup' ? 'Create local profile' : 'Continue'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-stone-600">
          <Link to="/" className="font-medium text-amber-800 hover:underline">
            ← Back to catalog
          </Link>
        </p>
      </div>
    </div>
  )
}
