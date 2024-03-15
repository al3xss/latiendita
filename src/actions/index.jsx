import { createAction } from '@reduxjs/toolkit';

export const fetchProductsRequest = createAction('FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('FETCH_PRODUCTS_FAILURE');

export const fetchCategoriesRequest = createAction('FETCH_CATEGORIES_REQUEST');
export const fetchCategoriesSuccess = createAction('FETCH_CATEGORIES_SUCCESS');
export const fetchCategoriesFailure = createAction('FETCH_CATEGORIES_FAILURE');

export const addToCartRequest = createAction('ADD_TO_CART_REQUEST');
export const addToCartSuccess = createAction('ADD_TO_CART_SUCCESS');
export const addToCartFailure = createAction('ADD_TO_CART_FAILURE', errorMessage => ({
  payload: errorMessage || 'Failed to add to cart',
}));
export const updateCartId = createAction('UPDATE_CART_ID');

export const fetchShoppingCartRequest = createAction('FETCH_SHOPPING_CART_REQUEST');
export const fetchShoppingCartSuccess = createAction('FETCH_SHOPPING_CART_SUCCESS');
export const fetchShoppingCartFailure = createAction('FETCH_SHOPPING_CART_FAILURE');

export const removeFromCartRequest = createAction('REMOVE_FROM_CART_REQUEST');
export const removeFromCartRequestApply = createAction('REMOVE_FROM_CART_APPLY');
export const removeFromCartSuccess = createAction('REMOVE_FROM_CART_SUCCESS');
export const removeFromCartFailure = createAction('REMOVE_FROM_CART_FAILURE');

export const updateCartItemRequest = createAction('UPDATE_CART_ITEM_REQUEST');
export const updateCartItemSuccess = createAction('UPDATE_CART_ITEM_SUCCESS');
export const updateCartItemFailure = createAction('UPDATE_CART_ITEM_FAILURE');

export const checkoutRequest = createAction('CHECKOUT_REQUEST');
export const checkoutSuccess = createAction('CHECKOUT_SUCCESS');
export const checkoutFailure = createAction('CHECKOUT_FAILURE');

export const toggleShoppingCart = createAction('TOGGLE_SHOPPING_CART');
