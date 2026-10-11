import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import cartReducer from './features/cartSlice'
import orderReducer from './features/orderSlice'
import productReducer from './features/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer
  }
})