import React from 'react';
import { useDispatch } from 'react-redux';
import { checkout } from './actions/checkoutActions';

const CheckoutButton = () => {
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <button onClick={handleCheckout}>Checkout</button>
  );
};

export default CheckoutButton;
