import { useState } from 'react'
import ProductsContainer from './components/ProductsContainer';
import Footer from './components/Footer';
import NewNavbar from './components/NewNavbar';

function App() {
  const [count, setCount] = useState(0)

  const products = [
    {
      id: 1,
      name:'name',
      description:'description',
      price:'0.0'
    }
  ];

  return (
    <>
	<NewNavbar />
    <ProductsContainer product={products} />
    <Footer />
    </>
  )
}

export default App
