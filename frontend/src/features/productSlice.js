import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE = 'http://localhost:8001/api/v1'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/products`)
      const data = await response.json()
      if (data.success && Array.isArray(data.data)) {
        return data.data.map(item => ({
          id: item._id || item.id,
          name: item.name,
          price: item.price,
          category: item.category || 'General',
          stock: item.stock ?? 20,
          image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
          description: item.description || '',
          rating: item.rating || 4.8,
          reviews: item.reviews || 12
        }))
      }
      return []
    } catch (error) {
      console.warn('API error, using initial products:', error)
      return []
    }
  }
)

const initialMockProducts = [
  {
    id: '1',
    name: 'Aura Chronograph Obsidian',
    price: 499,
    category: 'Watches',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    description: 'Precision sapphire crystal chronograph with brushed titanium accents.',
    rating: 4.9,
    reviews: 38
  },
  {
    id: '2',
    name: 'Sonic Master Studio ANC',
    price: 349,
    category: 'Audio',
    stock: 24,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    description: 'Bespoke acoustic transducers delivering studio-grade spatial resonance.',
    rating: 4.8,
    reviews: 52
  },
  {
    id: '3',
    name: 'Milano Artisan Leather Duffel',
    price: 280,
    category: 'Leather Goods',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    description: 'Handcrafted full-grain Italian leather with hand-burnished edges.',
    rating: 5.0,
    reviews: 19
  },
  {
    id: '4',
    name: 'Solaris Polarized Aviators',
    price: 195,
    category: 'Accessories',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
    description: 'Ultralight titanium frame with gradient UV400 Japanese optics.',
    rating: 4.7,
    reviews: 29
  }
]

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: initialMockProducts,
    loading: false,
    error: null,
    selectedCategory: 'All',
    searchQuery: ''
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.length > 0) {
          state.products = action.payload
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setCategory, setSearchQuery, deleteProduct, addProduct } = productSlice.actions
export default productSlice.reducer
