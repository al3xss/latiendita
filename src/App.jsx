import { useState, useEffect } from 'react'
import ProductList from './components/containers/ProductList';
import Footer from './components/Footer';
import NewNavbar from './components/NewNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShoppingCart, synchronizeRequests } from './actions';
import Cart from './components/containers/Cart'
import { registerSW } from 'virtual:pwa-register';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (window.confirm("New content available. Reload?")) {
          updateSW(true);
        }
      },
    });
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      dispatch(synchronizeRequests());
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [dispatch]);
  
  const [count, setCount] = useState(0)

  const showShoppingCart = useSelector(state => state.uiElements.showShoppingCart);

  const handleToggleShoppingCart = () => {
    dispatch(toggleShoppingCart());
  }


  return (
    <>
      {showShoppingCart && <Cart />}
      <NewNavbar />
      <ProductList />
      <Footer />
    </>
  )
}

export default App
