const FilterButtons = ({ filters, activeFilter, setActiveFilter }) => (
  <div className="flex gap-4 mb-6">
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
);

export default FilterButtons;
