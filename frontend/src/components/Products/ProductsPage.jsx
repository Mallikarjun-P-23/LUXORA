import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../Common/ProductCard'
import { Filter, ArrowUpDown, Sparkles } from 'lucide-react'
import { fetchProducts } from '../../features/productSlice'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { products, loading } = useSelector(state => state.products)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]

  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category?.toLowerCase() === selectedCategory.toLowerCase())
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-gray-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">The Luxora Collection</h1>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">
              Precision-crafted masterpieces engineered for discernment and enduring style.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <div className="flex items-center bg-gray-900/80 border border-gray-800 rounded-xl px-3 py-2 text-sm">
              <ArrowUpDown className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer text-sm"
              >
                <option value="featured" className="bg-gray-900">Featured</option>
                <option value="price-low" className="bg-gray-900">Price: Low to High</option>
                <option value="price-high" className="bg-gray-900">Price: High to Low</option>
                <option value="rating" className="bg-gray-900">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800/80 hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading && products.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}