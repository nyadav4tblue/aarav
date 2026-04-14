/**
 * @param {import('../data/products').Product[]} list
 * @param {string} query
 */
export function filterProductsByName(list, query) {
  const s = query.trim().toLowerCase()
  if (!s) return list
  return list.filter((p) => p.name.toLowerCase().includes(s))
}
