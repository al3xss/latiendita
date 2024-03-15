import { takeLatest, call, put, all, select } from 'redux-saga/effects';
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
  removeFromCartFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
  updateCartId,
  fetchShoppingCartRequest,
  fetchShoppingCartSuccess,
  fetchShoppingCartFailure,
  removeFromCartRequestApply
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
    const { cartId } = yield select(state => state.cart);
    const response = yield call(API.addToCart, { ...payload, cartId });
    yield put(addToCartSuccess(response));

    if (cartId) {
      yield put(updateCartId(cartId));
      yield put(fetchShoppingCartRequest({ cartId }));
    }
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* removeFromCartSaga({ payload }) {
  try {

    const { remoteCartData } = yield select(state => state.cart);
    const items = remoteCartData?.items || [];
    const filtered = items.filter(item => item.id !== payload.id);

    const newTotal = filtered.reduce((sum, item) => sum + parseFloat(item.total), 0,0);

    yield put(removeFromCartRequestApply({filtered, newTotal, locallyModified:true}));
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

function* fetchShoppingCartSaga(action) {
  try {
    const { cartId } = action.payload;
    const response = yield call(API.fetchShoppingCart, { cartId });
    yield put(fetchShoppingCartSuccess(response));
  } catch (error) {
    yield put(fetchShoppingCartFailure(error.message));
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
    takeLatest(addToCartSuccess.type, fetchShoppingCartSaga)
  ]);
}
