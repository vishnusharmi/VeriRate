import PropTypes from "prop-types";

const EmploymentHistory = ({ employmentHistory }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Employment History</h2>
      {employmentHistory.map((history, index) => (
        <div key={index} className="p-4 mt-4 border shadow-2xl rounded-lg">
          <h3 className="text-lg font-bold">{history.company}</h3>
          <p className="text-gray-600">{history.role}</p>
          <p className="text-gray-600">{history.tenure}</p>
        </div>
      ))}
    </div>
  );
};

EmploymentHistory.propTypes = {
  employmentHistory: PropTypes.array.isRequired,
};

export default EmploymentHistory;
