/**
 * Generates a clean URL slug from a product's title.
 * 
 * @param {Object} product - The product object
 * @returns {string} - The slug representation of the product title
 */
export function getProductSlug(product) {
  if (!product || !product.title) return '';
  return product.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // remove non-word chars except spaces and dashes
    .replace(/[\s_-]+/g, '-')     // replace spaces, underscores, and consecutive dashes with a single dash
    .replace(/^-+|-+$/g, '');     // trim leading/trailing dashes
}
