// api.js
const BASE_URL = 'http://127.0.0.1:3000';

const fetchProducts = async (page, limit) => {
  const response = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

const addToCart = async (product) => {
  const response = await fetch(`${BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }
};

const removeFromCart = async (productId) => {
  const response = await fetch(`${BASE_URL}/cart/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    throw new Error('Failed to remove from cart');
  }
};

const updateCartItem = async (productId, quantity) => {
  const response = await fetch(`${BASE_URL}/cart/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }
};

const checkout = async (cartItems) => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Checkout failed: ${errorMessage}`);
  }
};

export default {
  fetchProducts,
  fetchCategories,
  addToCart,
  removeFromCart,
  updateCartItem,
  checkout,
};
