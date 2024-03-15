import React from 'react';

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Prev</button>
      {/* Map through pages here */}
      <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Next</button>
    </div>
  );
}

export default Pagination;
