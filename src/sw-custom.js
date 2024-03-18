self.addEventListener('sync', event => {
  if (event.tag === 'addToCartQueue') {
    event.waitUntil(
      handleBackgroundSync(event.tag).catch(err => {
        console.error('Background sync failed:', err);
      })
    );
  }
});

async function handleBackgroundSync(tag) {
  console.log(`Processing background sync: ${tag}`);
}