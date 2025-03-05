import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const Employees = ({ employees, handleEdit, handleDelete }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
      {employees.employees.length === 0 ? (
        <p className="text-center py-4">
          No employees found. Add your first employee!
        </p>
      ) : (
        employees.employees.map((employee) => (
          <div
            key={employee.id}
            className="p-4 mt-4 flex justify-between items-center border rounded-lg"
          >
            <div>
              <h3 className="text-lg font-bold">{employee.name}</h3>
              <p className="text-gray-600">{employee.position}</p>
              <p className="text-gray-600">{employee.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 border rounded bg-gray-200"
                onClick={() => handleEdit(employee)}
              >
                <FaRegEdit />
              </button>
              <button
                className="p-2 border rounded bg-red-500 text-white"
                onClick={() => handleDelete(employee)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

Employees.propTypes = {
  employees: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Employees;
