import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '../../actions';
import placeholder from '../../assets/placeholder.png'


const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCartRequest({ ...product, quantity: 1 }));
  }

  return (

    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-104 duration-300">
      <a href="#">
        <div className="mt-1 p-2">
          <img src={placeholder} alt="lorem ipsum" className="h-20 w-auto"/>
          <h2 className="text-slate-700">{product.description}</h2>
          <p className="mt-1 text-sm text-slate-400">{product.name}</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg font-bold text-emerald-500">$ {product.price}</p>
            <div className="flex items-center space-x-1.5 rounded-lg bg-emerald-400 px-4 py-1.5 text-white duration-100 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <button onClick={handleAddToCart} className="text-sm">Agregar</button>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

export default ProductItem;
