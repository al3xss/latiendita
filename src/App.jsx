import { useState, useEffect } from 'react'
import ProductList from './components/containers/ProductList';
import Footer from './components/Footer';
import NewNavbar from './components/NewNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShoppingCart } from './actions';
import Cart from './components/containers/Cart'
import { registerSW } from 'virtual:pwa-register';


function App() {
  useEffect(() => {
    const updateSW = registerSW({
      // Configuration options
      onNeedRefresh() {
        if (window.confirm("New content available. Reload?")) {
          updateSW(true);
        }
      },
    });
  }, []);
  
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();

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
