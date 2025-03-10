import React, { useState, useEffect } from "react";
import {
  User,
  Star,
  Check,
  Filter,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import axiosInstance from "../../../../middleware/axiosInstance";

const EmployeeRatingsFeedback = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterVerified, setFilterVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ratingsAndFeedbackUpdated, setRatingsAndFeedbackUpdated] =
    useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Form state
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    feedback: "",
    verified: false,
    reviewer: "",
  });

  // Fetch employees from the API
  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employee/all", {
          signal: controller.signal,
        });

        // console.log(response.data.employees);
        const formattedEmployees = response.data.employees.data.map((emp) => ({
          id: emp.id,
          name: `${emp.first_name} ${emp.last_name}`,
          email: emp.User ? emp.User.email : "", // Get email from User object
          role: emp.User ? emp.User.role : "", // Get role from User object
          position: emp.position,
          Ratings: emp.Ratings
            ? emp.Ratings.map((rating) => ({
                id: rating.id,
                rating: rating.rating,
                feedback: rating.feedback,
                date: rating.created_at
                  ? new Date(rating.created_at).toISOString().slice(0, 10)
                  : "",
                verified: rating.is_verified,
                reviewer: rating.name || "HR System",
              }))
            : [],
        }));

        setEmployees(formattedEmployees);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();

    return () => controller.abort();
  }, [ratingsAndFeedbackUpdated]);

  // Calculate average rating for an employee
  const getAverageRating = (Ratings) => {
    if (!Ratings || Ratings.length === 0) return 0;
    const sum = Ratings.reduce((total, item) => total + item.rating, 0);
    return (sum / Ratings.length).toFixed(1);
  };

  // Sort employees based on field and direction
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "rating") {
      const aRating = parseFloat(getAverageRating(a.Ratings));
      const bRating = parseFloat(getAverageRating(b.Ratings));
      return sortDirection === "asc" ? aRating - bRating : bRating - aRating;
    }
    return 0;
  });

  // Filter employees based on search query
  const filteredEmployees = sortedEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  useEffect(() => {
    setTotalPages(Math.ceil(filteredEmployees.length / itemsPerPage));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filteredEmployees.length, itemsPerPage]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Toggle sort direction and field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Open feedback form for an employee
  const handleAddFeedback = (employee) => {
    setSelectedEmployee(employee);
    setFeedbackData({
      rating: 0,
      feedback: "",
      verified: false,
      reviewer: "",
    });
    setShowFeedbackForm(true);
  };

  // Handle star rating click
  const handleStarClick = (rating) => {
    setFeedbackData({
      ...feedbackData,
      rating,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save new feedback
  const saveFeedback = async () => {
    if (
      feedbackData.rating === 0 ||
      !feedbackData.feedback ||
      !feedbackData.reviewer
    ) {
      alert("Please complete all required fields");
      return;
    }

    try {
      // Format data for the API request
      const ratingData = {
        employee_id: selectedEmployee.id,
        rating: feedbackData.rating,
        feedback: feedbackData.feedback,
        is_verified: feedbackData.verified.toString(),
        name: feedbackData.reviewer,
      };

      // Send POST request to API
      await axiosInstance.post("/ratings-post", ratingData);
      setRatingsAndFeedbackUpdated(!ratingsAndFeedbackUpdated); // Updating the state; triggers useEffect to re-run for get request
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback. Please try again.");
    }
  };

  // Render star rating display
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : star - 0.5 <= rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  // Render interactive star rating input
  const renderStarRatingInput = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => handleStarClick(star)}
          >
            <Star
              size={24}
              className={
                star <= feedbackData.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {feedbackData.rating > 0
            ? `${feedbackData.rating} stars `
            : "Select rating"}
        </span>
      </div>
    );
  };

  // Feedback form modal
  const renderFeedbackForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Add Performance Rating for {selectedEmployee?.name}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="mt-2">{renderStarRatingInput()}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              name="feedback"
              rows={4}
              value={feedbackData.feedback}
              onChange={handleInputChange}
              placeholder="Provide detailed feedback about the employee's performance..."
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="reviewer"
              value={feedbackData.reviewer}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="verified"
              name="verified"
              checked={feedbackData.verified}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="verified"
              className="ml-2 block text-sm text-gray-900"
            >
              Verify this feedback (confirms you've directly worked with this
              employee)
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowFeedbackForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveFeedback}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Detailed feedback expansion component
  const FeedbackDetails = ({ employee }) => {
    const [expanded, setExpanded] = useState(false);

    // Filter verified Ratings if the filter is active
    const displayRatings = filterVerified
      ? employee.Ratings.filter((r) => r.verified)
      : employee.Ratings;

    return (
      <div className="mb-4 bg-gray-50 p-3 rounded-md shadow-md shadow-gray-400 rounded-lg">
        <button
          className="flex items-center justify-between w-full text-left text-sm font-medium text-[#2896f9] focus:outline-none"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Rating History ({displayRatings.length})</span>
          {expanded ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>

        {expanded && (
          <div className="mt-3 space-y-3">
            {displayRatings.length > 0 ? (
              displayRatings.map((rating) => (
                <div
                  key={rating.id}
                  className="border border-gray-200 rounded-md p-3 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {renderStarRating(rating.rating)}
                      {rating.verified && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <Check size={12} className="mr-1" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{rating.date}</div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {rating.feedback}
                  </p>
                  <div className="mt-2 text-xs font-bold text-gray-700">
                    Reviewed by: {rating.reviewer}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                No Ratings available with current filters
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    // Generate page numbers
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    // Logic to show limited page numbers with ellipsis
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-4 text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} employees
          </span>
        </div>

        <nav className="flex justify-center">
          <ul className="flex items-center">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft size={16} />
              </button>
            </li>

            {startPage > 1 && (
              <>
                <li>
                  <button
                    onClick={() => paginate(1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}
                  >
                    1
                  </button>
                </li>
                {startPage > 2 && (
                  <li>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </li>
                )}
              </>
            )}

            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                    currentPage === number
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <li>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => paginate(totalPages)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}

            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6 sticky fixed top-5 z-50">
        <h2 className="text-xl font-semibold">Employee Ratings & Feedback</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              id="verified-filter"
              type="checkbox"
              checked={filterVerified}
              onChange={() => setFilterVerified(!filterVerified)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="verified-filter"
              className="ml-2 mr-4 text-sm text-gray-700"
            >
              Verified Only
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading employee data...</p>
        </div>
      ) : (
        <div className="relative max-w-7xl min-h-[75dvh] bg-white p-6 rounded-lg shadow-md z-10 content-scrollbar">
          <div className="absolute inset-0 px-2 overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-br from-[#3f51b5] to-[#2196f3] h-8 w-full text-white rounded-lg text-base p-6 sticky top-0">
                <tr>
                  <th
                    className="px-10 py-3 text-left text-mb font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Employee
                      {sortField === "name" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={14} className="ml-1" />
                        ) : (
                          <ArrowDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-mb font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center">
                      Average Rating
                      {sortField === "rating" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp size={14} className="ml-1" />
                        ) : (
                          <ArrowDown size={14} className="ml-1" />
                        ))}
                    </div>
                  </th>
                  <th className="px-12 py-3 text-right text-mb font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentEmployees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              Role: {employee.role}
                            </div>
                            <div className="text-xs text-gray-400">
                              Position: {employee.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.Ratings.length > 0 ? (
                          <div>
                            {renderStarRating(
                              getAverageRating(employee.Ratings)
                            )}
                            <div className="mt-1 text-xs text-gray-500">
                              {employee.Ratings.length}{" "}
                              {employee.Ratings.length === 1
                                ? "rating"
                                : "ratings"}
                              {" • "}
                              {
                                employee.Ratings.filter((r) => r.verified)
                                  .length
                              }{" "}
                              verified
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No ratings yet
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleAddFeedback(employee)}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-2 rounded"
                        >
                          Rate Performance
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-2">
                        <FeedbackDetails employee={employee} />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                {currentEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No employees found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Add pagination component */}
            {filteredEmployees.length > 0 && <Pagination />}
          </div>
        </div>
      )}

      {showFeedbackForm && renderFeedbackForm()}
    </div>
  );
};

export default EmployeeRatingsFeedback;
