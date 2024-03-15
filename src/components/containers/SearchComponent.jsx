import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchProductsRequest } from '../../actions';

export default function SearchComponent() {
    const dispatch = useDispatch(); // useDispatch hook to access dispatch function
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
        dispatch(searchProductsRequest({ page: 1, limit: 8, text })); // Dispatch searchProducts action with the search text
    };


    return (
        <div className="relative w-full md:w-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                placeholder="Search"
                className="w-full md:w-auto py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                value={searchText}
                onChange={handleInputChange}
            />
        </div>
    );
}
