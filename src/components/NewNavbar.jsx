import React from "react"
import SearchComponent from "./containers/SearchComponent"
import CartIcon from "./containers/CartIcon"
import { toggleShoppingCart } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


export default function NewNavbar() {

  const dispatch = useDispatch();

  const showShoppingCart = useSelector(state => state.uiElements.showShoppingCart);

  const handleToggleShoppingCart = () => {
    dispatch(toggleShoppingCart());
  };

  return (
    <>
      <nav className="p-0 m-0 top-0 w-full z-10">
        {/* Web version */}
        <div className="p-2 hidden md:flex justify-between items-center px-4 bg-green-400">
          <div className="flex items-center">
            <span className="text-white">Ayuda/Preguntas frecuentes</span>
          </div>
          <span className="text-white hidden md:inline"></span>
          <span className="text-white">Contacto</span>
        </div>
        <div className="p-2 hidden md:flex justify-between items-center px-4 bg-white">
          <div className="flex items-center">
            <span className="text-black"></span>
          </div>
          <div className="flex p-1">
            <SearchComponent />
          </div>
          <div className="flex p-1">
            <button onClick={handleToggleShoppingCart}>
              <CartIcon />
            </button>
          </div>
        </div>

        {/* Mobile version */}
        <div className="p-4 md:hidden flex justify-center items-center px-4 bg-white">
          <button onClick={handleToggleShoppingCart}>
            <CartIcon />
          </button>
        </div>
        <div className="md:hidden">
          <SearchComponent />
        </div>
      </nav>

    </>

  )
}