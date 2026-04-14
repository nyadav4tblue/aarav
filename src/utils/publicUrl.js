/**
 * URL for files in Vite `public/` when the app uses a non-root `base` (e.g. GitHub Pages).
 * @param {string} path - Path relative to site root, e.g. `images/foo.svg` (with or without leading `/`)
 */
export function publicUrl(path) {
  const normalized = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
