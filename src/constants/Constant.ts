export const PRODUCT_SORT_OPTIONS = {
  relevance: { label: 'Relevance', field: 'relevance', direction: 'desc' },
  priceAscending: { label: 'Price: Low to High', field: 'price', direction: 'asc' },
  priceDescending: { label: 'Price: High to Low', field: 'price', direction: 'desc' },
  newest: { label: 'Newest', field: 'days_since_published', direction: 'desc' },
  bestSelling: { label: 'Best Selling', field: 'sales_rank', direction: 'desc' },
} as const;