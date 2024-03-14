import { takeLatest, call, put, all } from 'redux-saga/effects';
import API from '../api/api';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
} from '../actions';

function* fetchProductsSaga({ payload }) {
  try {
    const { page, limit } = payload;
    const products = yield call(API.fetchProducts, page, limit);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* fetchCategoriesSaga() {
  try {
    const categories = yield call(API.fetchCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* addToCartSaga({ payload }) {
  try {
    yield call(API.addToCart, payload);
    yield put(addToCartSuccess(payload));
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* removeFromCartSaga({ payload }) {
  try {
    yield call(API.removeFromCart, payload.productId);
    yield put(removeFromCartSuccess(payload));
  } catch (error) {
    yield put(removeFromCartFailure(error.message));
  }
}

function* updateCartItemSaga({ payload }) {
  try {
    yield call(API.updateCartItem, payload.productId, payload.quantity);
    yield put(updateCartItemSuccess(payload));
  } catch (error) {
    yield put(updateCartItemFailure(error.message));
  }
}

function* checkoutSaga({ payload }) {
  try {
    yield call(API.checkout, payload);
    yield put(checkoutSuccess());
  } catch (error) {
    yield put(checkoutFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchProductsRequest.type, fetchProductsSaga),
    takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga),
    takeLatest(addToCartRequest.type, addToCartSaga),
    takeLatest(removeFromCartRequest.type, removeFromCartSaga),
    takeLatest(updateCartItemRequest.type, updateCartItemSaga),
    takeLatest(checkoutRequest.type, checkoutSaga),
  ]);
}
