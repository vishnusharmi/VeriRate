const FilterButtons = ({
  filters,
  activeFilter,
  setActiveFilter,
  fetchEmployees,
}) => (
  <div className="flex items-center justify-between py-3 px-2">
    <div className="flex gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg ${
            activeFilter === filter
              ? "bg-blue-500 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
    <button
      className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
      onClick={fetchEmployees}
    >
      Refresh
    </button>
  </div>
);

export default FilterButtons;
