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
  toggleShoppingCart,
  removeFromCartRequest,
  removeFromCartRequestApply,
  fetchProductsPaginatedSuccess,
  searchProductsRequest,
  searchProductsSuccess,
  searchProductsFailure
} from '../actions';

const initialState = {
  cartId: null
}

const toogleShoppingCartReducer = createReducer({}, (builder) => {
  builder
    .addCase(toggleShoppingCart, (state) => {
      state.showShoppingCart = !state.showShoppingCart;
    });
});

const productsReducer = createReducer([], builder => {
  builder
    .addCase(fetchProductsSuccess, (state, action) => action.payload)
});

const paginatedProductsReducer = createReducer([], builder => {
  builder
    .addCase(fetchProductsPaginatedSuccess, (state, action) => action.payload)
    .addCase(searchProductsSuccess, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    })
    .addCase(searchProductsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
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
    .addCase(removeFromCartRequestApply, (state, action) => {   
      const {filtered, newTotal, locallyModified} = action.payload
      
      return {
        ...state,
        remoteCartData: {
          ...state.remoteCartData,
          items:[...filtered],
          total:newTotal,
          locallyModified
        }
      }
    })
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
  paginatedProducts: paginatedProductsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  uiElements: toogleShoppingCartReducer
});
