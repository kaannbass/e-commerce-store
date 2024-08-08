import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../type';
import { RootState } from '.';
import { baseURL } from '../config';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    image: string;
    title: string;
    description: string;
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    cart: CartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    cart: [],
    loading: false,
    error: null,
};

const fetchProductData = async (endpoint: string) => {
    const response = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
};

// Asenkron thunk'lar
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return await fetchProductData('/products');
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
    return await fetchProductData(`/products/${id}`);
});

export const fetchProductsLimit = createAsyncThunk('products/fetchProducts', async (limit: number = 10) => {
    return await fetchProductData(`/products?limit=${limit}`);
});

export const fetchProductsCategory = createAsyncThunk('products/fetchProductsCategory', async (category: string) => {
    return await fetchProductData(`/products/category/${category}`);
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { id, quantity } = action.payload;

            const existingProduct = state.cart.find(product => product.id === id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.cart = state.cart.filter(product => product.id !== id);
        },
        updateCartQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.cart.find(product => product.id === id);

            if (existingProduct) {
                if (quantity > 0) {
                    existingProduct.quantity = quantity;
                } else {
                    state.cart = state.cart.filter(product => product.id !== id);
                }
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
            });
    },
});

// Seçiciler
export const selectCart = (state: RootState) => state.products.cart;

// Export işlemleri
export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = productSlice.actions;
export default productSlice.reducer;
