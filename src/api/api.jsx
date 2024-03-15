const BASE_URL = 'http://127.0.0.1:3000';

const fetchProducts = async (page, limit) => {
  const response = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`, {
    timeout: 3000,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

const fetchShoppingCart = async ({ cartId }) => {
  const response = await fetch(`${BASE_URL}/shopping-cart/${cartId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch shoppping cart');
  }
  return response.json();
}

const addToCart = async ({ id, quantity, cartId }) => {
  try {
    const response = await fetch(`${BASE_URL}/shopping-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity, cartId }),
      timeout: 3000,
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Internal server error');
      } else {
        throw new Error('Failed to add to cart');
      }
    }

    const responseData = await response.json();
    if (!responseData || !responseData.cartId) {
      throw new Error('Invalid response data');
    }

    return responseData;
  } catch (error) {
    if (error instanceof DOMException && error.code === DOMException.TIMEOUT_ERR) {
      throw new Error('Request timed out');
    } else {
      throw new Error('Failed to add to cart');
    }
  }
}

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
}

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
}

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
}

export default {
  fetchProducts,
  fetchCategories,
  addToCart,
  removeFromCart,
  updateCartItem,
  checkout,
  fetchShoppingCart
}
