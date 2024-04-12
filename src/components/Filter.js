import React from 'react';

function Filter({ search, setSearch }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="flex items-center justify-center py-8">
        <form className='flex items-center'>
          <input className="px-2 h-[44px] rounded-l bg-gray-200" type="text" value={search} onChange={handleSearchChange} />
          <button className='bg-green-900 text-white font-semibold text-xl px-6 py-2 rounded-r'>Filter</button>
        </form>
    </div>
  );
}

export default Filter;