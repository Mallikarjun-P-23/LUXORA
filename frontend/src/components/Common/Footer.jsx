import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 text-gray-400 text-sm py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-black tracking-widest bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-600 bg-clip-text text-transparent">
              LUXORA
            </Link>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Purveyors of world-class design, horological precision, and bespoke luxury lifestyle essentials.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/products" className="hover:text-white transition">Horology & Watches</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Audiophile Systems</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Italian Leather Goods</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Fine Eyewear</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Client Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition">Concierge Support</a></li>
              <li><a href="#" className="hover:text-white transition">Authentication Registry</a></li>
              <li><a href="#" className="hover:text-white transition">Insured Global Courier</a></li>
              <li><a href="#" className="hover:text-white transition">Bespoke Inquiries</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-3">
              Receive private invitations to confidential product drops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 flex-1"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-900 text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 LUXORA Haute Horlogerie & Luxury Group. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition">Terms of Sale</a>
            <a href="#" className="hover:text-gray-400 transition">Legal Notice</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
