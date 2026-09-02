export const categories = [
  { id: 'cat-women', name: 'Women', parentId: null, productCount: 273, status: 'active' },
  { id: 'cat-men', name: 'Men', parentId: null, productCount: 176, status: 'active' },
  { id: 'cat-kids', name: 'Kids', parentId: null, productCount: 54, status: 'active' },

  { id: 'cat-women-abayas', name: 'Abayas & Dresses', parentId: 'cat-women', productCount: 142, status: 'active' },
  { id: 'cat-women-bags', name: 'Bags', parentId: 'cat-women', productCount: 38, status: 'active' },
  { id: 'cat-women-shoes', name: 'Shoes', parentId: 'cat-women', productCount: 29, status: 'active' },
  { id: 'cat-women-jewelry', name: 'Jewelry', parentId: 'cat-women', productCount: 34, status: 'active' },
  { id: 'cat-women-accessories', name: 'Accessories', parentId: 'cat-women', productCount: 30, status: 'active' },

  { id: 'cat-men-thobes', name: 'Thobes', parentId: 'cat-men', productCount: 96, status: 'active' },
  { id: 'cat-men-accessories', name: 'Accessories', parentId: 'cat-men', productCount: 41, status: 'active' },
  { id: 'cat-men-shoes', name: 'Shoes', parentId: 'cat-men', productCount: 39, status: 'draft' },
]

export function getCategoryChildren(parentId) {
  return categories.filter((c) => c.parentId === parentId)
}

export function getTopLevelCategories() {
  return categories.filter((c) => c.parentId === null)
}
