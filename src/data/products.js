import raw from './products.json'

/** @typedef {'gods' | 'leaders' | 'gifts' | 'home_decor'} ProductCategory */

/**
 * @typedef {{
 *   id: string
 *   name: string
 *   category: ProductCategory
 *   description: string
 *   images: string[]
 *   videoUrl?: string
 *   featured?: boolean
 * }} Product
 */

/** @type {Product[]} */
export const products = raw

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}
