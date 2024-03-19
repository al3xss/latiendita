import { takeLatest, call, put, all, select, take } from 'redux-saga/effects';
import API from '../api/api';
import { storeRequestInIndexedDB, getStoredRequests, deleteStoredRequest } from '../db/dbOperations';
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
  removeFromCartRequestApply,
  fetchPaginatedProductsRequest,
  fetchProductsPaginatedSuccess,
  fetchProductsPaginatedFailure,
  searchProductsRequest,
  storeRequest,
  synchronizeRequests
} from '../actions';

function* fetchProductsSaga() {
  try {
    const products = yield call(API.fetchProducts);
    yield put(fetchProductsSuccess(products));
    yield put(fetchPaginatedProductsRequest({ page: 1, limit: 8 }));
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
    if(error.message == "no connection"){
      alert("You're offline. The item will be added to your cart once you're back online!!!!");
      yield put(storeRequest(payload));
    }else{
      yield put(addToCartFailure(error.message));
    }
  }
}

function* removeFromCartSaga({ payload }) {
  try {

    const { remoteCartData } = yield select(state => state.cart);
    const items = remoteCartData?.items || [];
    const filtered = items.filter(item => item.id !== payload.id);

    const newTotal = filtered.reduce((sum, item) => sum + parseFloat(item.total), 0, 0);

    yield put(removeFromCartRequestApply({ filtered, newTotal, locallyModified: true }));
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

function* fetchPaginatedProductsSaga(action) {
  try {
    const { page, limit } = action.payload;
    const products = yield select(state => state.products);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);
    yield put(fetchProductsPaginatedSuccess(paginatedProducts));
  } catch (error) {
    yield put(fetchProductsPaginatedFailure(error.message));
  }
}

function* fetchPaginatedAndTextSearchProductsSaga(action) {
  try {
    const { page, limit, text } = action.payload;
    const products = yield select(state => state.products);

    const productsResult = products.filter(str => {
      let str_1 = str.name.toLowerCase()
      let str_2 = text.toLowerCase()

      return str_1.includes(str_2)
    });

    const startIndex = (page - 1) * limit;
    const paginatedProducts = productsResult.slice(startIndex, startIndex + limit);
    yield put(fetchProductsPaginatedSuccess(paginatedProducts));
  } catch (error) {
    yield put(fetchProductsPaginatedFailure(error.message));
  }
}

function* handleStoreRequestSaga(action) {
  try {
    yield call(storeRequestInIndexedDB, action.payload);
  } catch (error) {
    console.error('Error in handleStoreRequest saga:', error);
  }
}

function* handleSynchronizeRequestsSaga() {
  let cartId = null
  try{
    const requests = yield call(getStoredRequests)

    for (const request of requests) {
      const { id } = request
      const response = yield call(API.addToCart, { ...request, cartId });

      yield put(addToCartSuccess(response));
      deleteStoredRequest(id)

      const {cartId:newCardId} = response
      cartId = newCardId

      if (cartId) {
        yield put(updateCartId(cartId));
        yield put(fetchShoppingCartRequest({ cartId }));
      }
    }
  }catch (error) {
    if(error.message == "no connection"){
      //alert("You're offline. The item will be added to your cart once you're back online!!!!");
      yield put(storeRequest(payload));
    }else{
      yield put(addToCartFailure(error.message));
    }
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
    takeLatest(addToCartSuccess.type, fetchShoppingCartSaga),
    takeLatest(fetchPaginatedProductsRequest.type, fetchPaginatedProductsSaga),
    takeLatest(searchProductsRequest.type, fetchPaginatedAndTextSearchProductsSaga),
    takeLatest(storeRequest.type, handleStoreRequestSaga),
    takeLatest(synchronizeRequests.type, handleSynchronizeRequestsSaga)
  ]);
}