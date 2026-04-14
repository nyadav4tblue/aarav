import raw from './categories.json'

/** @typedef {{ id: string; label: string; description: string; slug: string }} Category */

/** @type {Category[]} */
export const categories = raw

export function getCategoryById(id) {
  return categories.find((c) => c.id === id)
}
