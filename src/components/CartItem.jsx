import React from 'react';

const CartItem = ({ product, removeItem }) => {

  return (

    <li className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href="#">{product?.name}</a>
          </h3>
          <p className="ml-4">$ {product?.price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{product?.quantity}</p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">{product?.total}</p>

        <div className="flex">
          <button type="button" className="font-medium text-emerald-600 hover:text-emerald-500" onClick={() => removeItem(product)}>Remove</button>
        </div>
      </div>
    </div>
  </li>
  );
}

export default CartItem;
