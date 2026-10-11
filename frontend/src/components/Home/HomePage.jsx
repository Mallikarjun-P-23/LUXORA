import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react'
import ProductCard from '../Common/ProductCard'
import { fetchProducts } from '../../features/productSlice'

export default function HomePage() {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const featured = products.slice(0, 4)

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 border-b border-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn / Winter Haute Édition</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight md:leading-none">
            Elegance <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-600 bg-clip-text text-transparent">Engineered</span> for the Modern Elite.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Discover precision horology, audiophile acoustics, and bespoke leather goods tailored with uncompromised artistry.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 font-semibold shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition font-medium"
            >
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="max-w-6xl mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Certified Authenticity</h3>
              <p className="text-xs text-gray-400 mt-1">Every item independently verified with cryptographic provenance.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Global Express Courier</h3>
              <p className="text-xs text-gray-400 mt-1">Dispatched in tamper-proof diplomatic cases across 180 countries.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">24/7 Private Concierge</h3>
              <p className="text-xs text-gray-400 mt-1">Dedicated client advisors standing by for all inquiries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">Curated Highlights</h2>
            <h3 className="text-3xl font-extrabold text-white">Featured Pieces</h3>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
