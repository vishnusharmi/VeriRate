
const PaginationControls = ({
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) => {
  const pageSizeOptions = [5, 10, 15, 20];

  // Make sure pagination properties are numbers
  const currentPage = parseInt(pagination.currentPage);
  const totalPages = parseInt(pagination.totalPages);
  const pageSize = parseInt(pagination.pageSize);

  // Helper function to navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Helper function to navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Debug info
  console.log("PaginationControls props:", {
    currentPage,
    totalPages,
    pageSize,
    disabled: {
      prev: currentPage === 1,
      next: currentPage === totalPages || totalPages === 0,
    },
  });

  return (
    <div className="flex justify-between items-center p-4 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={pageSize}
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
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages || totalPages <= 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
