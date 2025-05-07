const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={`px-4 py-2 ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;
