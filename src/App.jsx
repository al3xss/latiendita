import { useState } from 'react'
import ProductList from './components/containers/ProductList';
import Footer from './components/Footer';
import NewNavbar from './components/NewNavbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
	<NewNavbar />
    <ProductList/>
    <Footer />
    </>
  )
}

export default App
