import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { updateQuantity, removeFromCart, clearCart } from '../../features/cartSlice'

export default function CartPage() {
  const cart = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + (cart.length > 0 ? shipping : 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 bg-black text-white">
        <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-center">
          Explore our handpicked curation of luxury timepieces, audio, and leather goods.
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-8 py-3 rounded-xl hover:from-blue-500 hover:to-blue-600 transition shadow-lg shadow-blue-500/20"
        >
          Discover Collection
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Shopping Bag</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs text-gray-400 hover:text-red-400 transition"
          >
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-900/60 border border-gray-800/80 rounded-2xl p-4 hover:border-blue-500/30 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover border border-gray-800"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-white truncate">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.category}</p>
                  <p className="text-blue-400 font-bold mt-1">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2 border border-gray-800 rounded-lg bg-black/40 px-2 py-1">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(0, item.quantity - 1) }))}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-right pl-2">
                  <p className="text-base font-bold text-white mb-2">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="font-semibold text-white">
                    {shipping === 0 ? <span className="text-emerald-400">Complimentary</span> : `$${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Total</span>
                  <span className="text-blue-400 text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Encrypted checkout with worldwide concierge delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
