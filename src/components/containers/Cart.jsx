import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from './actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch(); // useDispatch hook to access dispatch function

  // useSelector hook to select cartItems from Redux store's state
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch removeFromCart action
  };

  const handleUpdateCartItem = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity)); // Dispatch updateCartItem action
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateCartItem(item.id, parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default Cart;
