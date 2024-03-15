import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest } from '../../actions';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch(); // useDispatch hook to access dispatch function

  // useSelector hook to select products, currentPage, and totalPages from Redux store's state
  const products = useSelector((state) => state.products);
  const currentPage = useSelector((state) => state.products.currentPage);
  const totalPages = useSelector((state) => state.products.totalPages);

  useEffect(() => {
    dispatch(fetchProductsRequest(1, 10));
  }, [dispatch]);

  const handlePagination = (page) => {
    dispatch(fetchProductsRequest(page, 10));
  }

  return (
    <section className="py-10 bg-gray-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {/* Pagination controls */}
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePagination(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
