import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const BlacklistManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      employeeId: "EMP001",
      reason: "Policy Violation",
      status: "Temporary",
      startDate: "2025-02-15",
      endDate: "2025-05-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      employeeId: "EMP002",
      reason: "Security Breach",
      status: "Permanent",
      startDate: "2025-02-20",
      endDate: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    reason: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee.id);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editEmployee ? { ...emp, ...formData } : emp
      )
    );
    setEditEmployee(null);
    setFormData({
      name: "",
      employeeId: "",
      reason: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setIsModalOpen(false);
  };

  const handleAddEmployee = () => {
    setEditEmployee(null);
    setFormData({
      name: "",
      employeeId: "",
      reason: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (
      formData.name &&
      formData.employeeId &&
      formData.reason &&
      formData.status
    ) {
      if (editEmployee) {
        handleSave();
      } else {
        const newEmployee = { id: Date.now(), ...formData };
        setEmployees([...employees, newEmployee]);
        setFormData({
          name: "",
          employeeId: "",
          reason: "",
          status: "",
          startDate: "",
          endDate: "",
        });
        setIsModalOpen(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto min-h-auto bg-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Employee Blacklist Management
      </h2>
      <input
        type="text"
        placeholder="Search by name or ID..."
        className="w-full p-3 border rounded-lg shadow-md mb-4 focus:ring-2 focus:ring-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="flex items-center text-white px-4 py-2 rounded-lg shadow-md bg-black cursor-pointer"
        onClick={handleAddEmployee}
      >
        <FiPlus className="mr-2" /> Add Employee
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,50%)] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {editEmployee ? "Edit Employee" : "Add Employee"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                onClick={handleModalSubmit}
              >
                {editEmployee ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-collapse shadow-md rounded-lg mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white px-6 py-4 text-center shadow-gray-500 shadow-md">
              <th className="text-left p-3 shadow-gray-500">Employee</th>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Reason</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Start Date</th>
              <th className="text-left p-3">End Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-none h-10 mb-4 shadow-md rounded-lg"
              >
                <td className="px-6 py-4 text-left leading-tight">
                  {employee.name}
                </td>
                <td className="p-1 text-left leading-tight">
                  {employee.employeeId}
                </td>
                <td className="p-1 text-left leading-tight">
                  {employee.reason}
                </td>
                <td
                  className={`p-1 text-left text-sm font-medium leading-tight ${
                    employee.status === "Temporary"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {employee.status}
                </td>
                <td className="p-1 text-left leading-tight">
                  {employee.startDate}
                </td>
                <td className="p-1 text-left leading-tight">
                  {employee.endDate || "N/A"}
                </td>
                <td className="p-1 text-center leading-tight">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                    onClick={() => handleEdit(employee)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlacklistManagement;
