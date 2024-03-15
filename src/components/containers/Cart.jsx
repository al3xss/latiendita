import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShoppingCart, removeFromCartRequest } from '../../actions';
import CartItem from '../CartItem';


const Cart = () => {
  const dispatch = useDispatch();

  const handleToggleShoppingCart = () => {
    dispatch(toggleShoppingCart());
  }

  const handleRemoveFromCartRequest = (product) => {
    dispatch(removeFromCartRequest(product));
  }

  const products = useSelector((state) => state?.cart?.remoteCartData?.items);
  const total = useSelector((state) => state?.cart?.remoteCartData?.total);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop, show/hide based on slide-over state */}
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="flex items-center justify-center h-full">

        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          {/* Background backdrop, show/hide based on slide-over state */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                {/* Slide-over panel, show/hide based on slide-over state */}
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de compras</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button onClick={handleToggleShoppingCart} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">

                            {products?.map((product) => (
                              <CartItem key={product.id} product={product} removeItem={handleRemoveFromCartRequest} />
                            ))}

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Impuestos y envío incluidos</p>
                      <div className="mt-6">
                        <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700">Checkout</a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button type="button" className="font-medium text-emerald-600 hover:text-emerald-500">
                            Limpiar el carrito
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
