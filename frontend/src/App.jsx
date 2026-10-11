import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
import HomePage from './components/Home/HomePage'
import ProductsPage from './components/Products/ProductsPage'
import CartPage from './components/Cart/CartPage'
import CheckoutPage from './components/Checkout/CheckoutPage'
import LoginPage from './components/Auth/LoginPage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
