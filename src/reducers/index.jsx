import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchProductsSuccess,
  fetchCategoriesSuccess,
  addToCartSuccess,
  removeFromCartSuccess,
  updateCartItemSuccess,
  checkoutSuccess,
  updateCartId,
  fetchShoppingCartSuccess,
  toggleShoppingCart
} from '../actions';

const initialState = {
  cartId: null
}

const toogleShoppingCartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleShoppingCart, (state) => {
      state.showShoppingCart = !state.showShoppingCart;
    });
});

const productsReducer = createReducer([], builder => {
  builder
    .addCase(fetchProductsSuccess, (state, action) => action.payload)
});

const categoriesReducer = createReducer([], builder => {
  builder
    .addCase(fetchCategoriesSuccess, (state, action) => action.payload)
});

const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(addToCartSuccess, (state, action) => {
      const { cartId } = action.payload;

      if (!cartId) {
        throw new Error('Cart ID must be provided');
      }

      return {
        ...state,
        cartId,
      }
    })
    .addCase(removeFromCartSuccess, (state, action) => ({
      ...state,
      items: state.items.filter(item => item.id !== action.payload.productId),
    }))
    .addCase(updateCartItemSuccess, (state, action) => {
      const { productId, quantity } = action.payload;
      state.items = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    })
    .addCase(checkoutSuccess, () => initialState)
    .addCase(updateCartId, (state, action) => {
      state.cartId = action.payload;
    })
    .addCase(fetchShoppingCartSuccess, (state, action) => {
      return {
        ...state,
        remoteCartData: {
          ...action.payload
        }
      }
    });
});


export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  uiElements: toogleShoppingCartReducer
});
