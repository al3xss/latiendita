import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchProductsSuccess,
  fetchCategoriesSuccess,
  addToCartSuccess,
  removeFromCartSuccess,
  updateCartItemSuccess,
  checkoutSuccess,
} from '../actions';

const productsReducer = createReducer([], builder => {
  builder
    .addCase(fetchProductsSuccess, (state, action) => action.payload)
});

const categoriesReducer = createReducer([], builder => {
  builder
    .addCase(fetchCategoriesSuccess, (state, action) => action.payload)
});

const cartReducer = createReducer([], builder => {
  builder
    .addCase(addToCartSuccess, (state, action) => [...state, action.payload])
    .addCase(removeFromCartSuccess, (state, action) =>
      state.filter(item => item.id !== action.payload.productId)
    )
    .addCase(updateCartItemSuccess, (state, action) =>
      state.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    )
    .addCase(checkoutSuccess, () => [])
});

export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
