import db from './dexieDB';

export const storeRequestInIndexedDB = async (request) => {
  try {
    await db.cartRequests.put(request);
    console.log('Request stored in IndexedDB:', request);
  } catch (error) {
    console.error('Error storing request in IndexedDB:', error);
  }
}

export const getStoredRequests = async () => {
  try {
    return await db.cartRequests.toArray();
  } catch (error) {
    console.error('Error getting stored requests in IndexedDB:', error);
    return [];
  }
}

export const deleteStoredRequest = async(id) =>{
  try {
    await db.cartRequests.delete(id);
  } catch (error) {
    console.error('Error deleting stored requests in IndexedDB:', error);
  }
}