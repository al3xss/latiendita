import Dexie from 'dexie';

const db = new Dexie('shoppingCart');

db.version(1).stores({
  cartRequests: '++id, productId, quantity, cartId', 
});

export default db;
