import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest, fetchPaginatedProductsRequest } from '../../actions';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch(); // useDispatch hook to access dispatch function

  //TODO
  //Uggly last minute hack, needs to be improved
  const paginatedProducts = useSelector((state) => state.paginatedProducts);
  const remoteProducts = useSelector((state) => state.products);
  const totalPages = remoteProducts.length / 8

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handlePagination = (page) => {
    dispatch(fetchPaginatedProductsRequest({ page, limit: 8 }));
  };

  return (
    <>
      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* Pagination controls */}
        <div className="flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800" key={index + 1} onClick={() => handlePagination(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
