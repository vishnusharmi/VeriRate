const PaginationControls = ({
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) => {
  const pageSizeOptions = [5, 10, 15, 20];

  return (
    <div className="flex justify-between items-center p-4 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={pagination.pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="border rounded-md py-1 px-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">items</span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
