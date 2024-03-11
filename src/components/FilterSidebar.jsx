import React from 'react';

const FilterSidebar = () => {
  return (
    <aside className="w-full lg:w-64">
      <div className="px-6">
        {/* Category would be mapped from data */}
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-2">Categories</h3>
          <ul>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer">Galletas</li>


            {/* Add more list items here */}
          </ul>
        </div>
        {/* Other filters */}
      </div>
    </aside>
  );
};

export default FilterSidebar;
