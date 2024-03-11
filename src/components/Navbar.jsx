import React from 'react';
import SearchComponent from './SearchComponent'

const Navbar = () => {
  return (
    <nav className="p-0 m-0 fixed top-0 w-full z-10">
      {/* Web version */}
      <div className="p-4 hidden md:flex justify-between items-center px-4 bg-green-400">
        <div className="flex items-center">
          <span className="text-white">Ayuda/Preguntas frecuentes</span>
        </div>
        <span className="text-white hidden md:inline">Descarga nuestra App</span>
        <span className="text-white">Banderita</span>
      </div>
      <div className="p-4 hidden md:flex justify-between items-center px-4 bg-white">
          <div className="flex items-center">
            <span className="text-black">Ayuda/Preguntas frecuentes</span>
          </div>

            <div className="flex p-1">
                <SearchComponent />

                <div className="relative py-2">
                    <div className="t-0 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">5</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
            </div>
      </div>
      
      {/* Mobile version */}
      <div className="p-4 md:hidden flex justify-center items-center px-4 bg-white">
        <img src="/logo.png" alt="Logo" className="h-8 mr-4" />
      </div>
      <div className="md:hidden">
        <SearchComponent />
      </div>
    </nav>
  );
};

export default Navbar;
