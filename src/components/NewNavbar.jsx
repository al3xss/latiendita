import React from "react"
import SearchComponent from "./SearchComponent"
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
      <nav className="p-0 m-0 fixed top-0 w-full z-10">
        {/* Web version */}
        <div className="p-2 hidden md:flex justify-between items-center px-4 bg-green-400">
          <div className="flex items-center">
            <span className="text-white">Ayuda/Preguntas frecuentes</span>
          </div>
          <span className="text-white hidden md:inline">[]</span>
          <span className="text-white">Banderita</span>
        </div>
        <div className="p-2 hidden md:flex justify-between items-center px-4 bg-white">
          <div className="flex items-center">
            <span className="text-black">[element]</span>
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

        <div className="hidden md:flex pt-1 bg-white justify-center"><h3 className="text-center font-bold text-gray-800">Categorias</h3></div>

        <div className="hidden md:flex flex flex-wrap items-center overflow-x-auto overflow-y-hidden  justify-center bg-white text-gray-800">
          <a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600">
            <span>[Element]</span>
          </a>
          <a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900">
            <span>[Element]</span>
          </a>
          <a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600">
            <span>[Element]</span>
          </a>
          <a rel="noopener noreferrer" href="#" className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600">
            <span>[Element]</span>
          </a>
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