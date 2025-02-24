import React, { useState } from 'react';
import { User, Star, Check, Filter, ArrowDown, ArrowUp } from 'lucide-react';

const EmployeeRatingsFeedback = () => {
  // Sample data - in a real app this would come from an API
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Jane Smith', 
      position: 'Senior Developer', 
      department: 'Engineering',
      ratings: [
        { id: 101, rating: 4.5, feedback: 'Excellent problem-solving skills. Always delivers on time.', date: '2024-12-15', verified: true, reviewer: 'Michael Chen' },
        { id: 102, rating: 5, feedback: 'Outstanding team player. Mentored junior developers effectively.', date: '2024-09-20', verified: true, reviewer: 'Sarah Johnson' }
      ]
    },
    { 
      id: 2, 
      name: 'David Johnson', 
      position: 'Marketing Manager', 
      department: 'Marketing',
      ratings: [
        { id: 201, rating: 3.5, feedback: 'Good at campaign planning, but sometimes misses deadlines.', date: '2024-11-10', verified: false, reviewer: 'Lisa Williams' }
      ]
    },
    { 
      id: 3, 
      name: 'Robert Chen', 
      position: 'UX Designer', 
      department: 'Product',
      ratings: [
        { id: 301, rating: 5, feedback: 'Exceptional design work. User testing results were outstanding.', date: '2025-01-05', verified: true, reviewer: 'James Wilson' },
        { id: 302, rating: 4, feedback: 'Creative solutions to complex problems. Could improve documentation.', date: '2024-10-18', verified: true, reviewer: 'Emily Rodriguez' }
      ]
    }
  ]);
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterVerified, setFilterVerified] = useState(false);
  
  // Form state
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    feedback: '',
    verified: false,
    reviewer: ''
  });
  
  // Calculate average rating for an employee
  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, item) => total + item.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };
  
  // Sort employees based on field and direction
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === 'rating') {
      const aRating = parseFloat(getAverageRating(a.ratings));
      const bRating = parseFloat(getAverageRating(b.ratings));
      return sortDirection === 'asc' ? aRating - bRating : bRating - aRating;
    }
    return 0;
  });
  
  // Filter employees based on search query
  const filteredEmployees = sortedEmployees.filter(emp => 
    (emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
     emp.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Toggle sort direction and field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Open feedback form for an employee
  const handleAddFeedback = (employee) => {
    setSelectedEmployee(employee);
    setFeedbackData({
      rating: 0,
      feedback: '',
      verified: false,
      reviewer: ''
    });
    setShowFeedbackForm(true);
  };
  
  // Handle star rating click
  const handleStarClick = (rating) => {
    setFeedbackData({
      ...feedbackData,
      rating
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Save new feedback
  const saveFeedback = () => {
    if (feedbackData.rating === 0 || !feedbackData.feedback || !feedbackData.reviewer) {
      alert('Please complete all required fields');
      return;
    }
    
    const newFeedback = {
      id: Date.now(),
      rating: feedbackData.rating,
      feedback: feedbackData.feedback,
      date: new Date().toISOString().slice(0, 10),
      verified: feedbackData.verified,
      reviewer: feedbackData.reviewer
    };
    
    const updatedEmployees = employees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          ratings: [...emp.ratings, newFeedback]
        };
      }
      return emp;
    });
    
    setEmployees(updatedEmployees);
    setShowFeedbackForm(false);
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
                ? 'text-yellow-400 fill-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300'
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
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {feedbackData.rating > 0 ? `${feedbackData.rating} stars `: 'Select rating'}
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
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="mt-2">
              {renderStarRatingInput()}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
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
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
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
            <label htmlFor="verified" className="ml-2 block text-sm text-gray-900">
              Verify this feedback (confirms you've directly worked with this employee)
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
    
    // Filter verified ratings if the filter is active
    const displayRatings = filterVerified
      ? employee.ratings.filter(r => r.verified)
      : employee.ratings;
    
    return (
        //rating-history
      <div className="mb-4 bg-gray-50 p-3 rounded-md shadow-md shadow-gray-400 rounded-lg">
        <button
          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 focus:outline-none"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Rating History ({displayRatings.length})</span>
          {expanded ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
        
        {expanded && (
          <div className="mt-3 space-y-3">
            {displayRatings.length > 0 ? (
              displayRatings.map(rating => (
                <div key={rating.id} className="border border-gray-200 rounded-md p-3 bg-white">
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
                  <p className="mt-2 text-sm text-gray-700">{rating.feedback}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Reviewed by: {rating.reviewer}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No ratings available with current filters</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
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
            <label htmlFor="verified-filter" className="ml-2 mr-4 text-sm text-gray-700">
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
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="shadow-[inset_0_-30px_36px_-28px_rgba(0,0,0,0.35),inset_0_20px_36px_-28px_rgba(0,0,0,0.35)] bg-white p-6 rounded-lg">
            <tr>
              <th 
                className="px-10 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Employee
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center">
                  Average Rating
                  {sortField === 'rating' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-12 py-3 text-right text-xs font-medium text-white-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <React.Fragment key={employee.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                        <div className="text-xs text-gray-400">{employee.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.ratings && employee.ratings.length > 0 ? (
                      <div>
                        {renderStarRating(getAverageRating(employee.ratings))}
                        <div className="mt-1 text-xs text-gray-500">
                          {employee.ratings.length} {employee.ratings.length === 1 ? 'rating' : 'ratings'}
                          {' • '}
                          {employee.ratings.filter(r => r.verified).length} verified
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No ratings yet</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleAddFeedback(employee)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded"
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
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  No employees found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {showFeedbackForm && renderFeedbackForm()}
    </div>
  );
};

export default EmployeeRatingsFeedback;