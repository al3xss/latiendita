import React from 'react';
import { useDispatch } from 'react-redux';
import { checkout } from './actions/checkoutActions';

const CheckoutButton = () => {
  const dispatch = useDispatch(); // useDispatch hook to access dispatch function

  const handleCheckout = () => {
    dispatch(checkout()); // Dispatch checkout action
  };

  return (
    <button onClick={handleCheckout}>Checkout</button>
  );
};

export default CheckoutButton;
