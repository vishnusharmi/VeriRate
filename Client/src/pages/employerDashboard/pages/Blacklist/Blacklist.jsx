<<<<<<< HEAD
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
=======

// import React, { useEffect, useState } from "react";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/blacklists";

// const BlacklistManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     // employee_id: "",
//     reason_code: "",
//     status: "",
//     start_date: "",
//     end_date: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch Employees
//   const getData = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       const data = response.data.data;

//       setEmployees(data);
//       console.log(data);




//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleSave = async () => {
//     console.log(formData, 'formData');


//     try {
//       const payload = {
//         name: formData.name,
//         // employee_id: formData.employee_id, 
//         reason_code: formData.reason_code, 
//         status: formData.status,
//         start_date: formData.start_date,
//         end_date: formData.end_date, 
//       };
//       console.log(payload, 'helllll');

//       if (editEmployee) {
//         await axios.put(`${API_URL}/${editEmployee}`, payload);
//       } else {
//         const response = await axios.post("http://localhost:3000/api/blacklists", formData);
//         console.log(response, 'reeeee');
//       }


//       getData(); // Refresh data
//       closeModal();
//     } catch (err) {
//       console.error("Error saving data:", err);
//     }
//   };


//   // Handle Delete Employee
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       getData();
//     } catch (err) {
//       console.error("Error deleting data:", err);
//     }
//   };

//   // Handle Edit Click
//   const handleEdit = (employee) => {
//     setEditEmployee(employee.id);
//     setFormData(employee);
//     setIsModalOpen(true);
//   };

//   // Open Add Employee Modal
//   const handleAddEmployee = () => {
//     setEditEmployee(null);
//     setFormData({
//       name: "",
//       status: "",
//     });
//     setIsModalOpen(true);
//   };

//   // Close Modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditEmployee(null);
//     setFormData({
//       name: "",
//       status: "",
//     });
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setFormData((prev) => ({
//       ...prev,
//       employee_id: 1,
//        company_id:1
//     }));
//   };

//   // Search Filter
//   const filteredEmployees = searchTerm.trim()
//     ? employees?.filter(
//       (emp) =>
//         emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || []
//     : employees;

//   return (
//     <div className="max-w-7xl mx-auto min-h-screen bg-white p-6 rounded-3xl shadow-2xl">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Employee Blacklist Management
//       </h2>

//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or ID..."
//           className="w-2/3 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md"
//           onClick={handleAddEmployee}
//         >
//           <FiPlus className="mr-2" /> Add Employee
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-lg font-bold mb-4">
//               {editEmployee ? "Edit Employee" : "Add Employee"}
//             </h3>

//             {["name", "reason_code", "status"].map((field) => (
//               <input
//                 key={field}
//                 type="text"
//                 name={field}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-lg mb-2"
//               />
//             ))}
//             {["start_date", "end_date"].map((field) => (
//               <input
//                 key={field}
//                 type="date"
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-lg mb-2"
//               />
//             ))}
//             <div className="flex justify-end space-x-2">
//               <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
//                 Cancel
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>
//                 {editEmployee ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="border-collapse shadow-md rounded-lg mt-4">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-black text-white text-center">
//               {["Employee", "ID", "Reason", "Status", "Start Date", "End Date", "Actions"].map(
//                 (header) => (
//                   <th key={header} className="p-3">{header}</th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((employee) => (
//                 <tr key={employee.id} className="border-b hover:bg-gray-100">
//                   <td className="p-3">{employee.name || "N/A"}</td>
//                   <td className="p-3">{employee.employee_id
//                     || "N/A"}</td>
//                   <td className="p-3">{employee.reason_code
//                     || "N/A"}</td>
//                   <td
//                     className={`p-3 text-sm font-medium ${employee.status === "Temporary" ? "text-yellow-600" : "text-red-600"
//                       }`}
//                   >
//                     {employee.status || "N/A"}
//                   </td>
//                   <td className="p-3">{employee.
//                     start_date || "N/A"}</td>
//                   <td className="p-3">{employee.end_date || "N/A"}</td>
//                   <td className="p-3 flex space-x-2">
//                     <FiEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(employee)} />
//                     <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(employee.id)} />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-500">
//                   No employees found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BlacklistManagement;


import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import axios from "axios";

const API_URL = "http://localhost:3000/api/blacklists";
const EMPLOYEE_API_URL = "http://localhost:3000/api/get-employees";

const BlacklistManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]); // Store employees for dropdown
  const [searchTerm, setSearchTerm] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    reason_code: "",
    status: "",
    start_date: "",
    end_date: "",
    name:"",
    company_id:""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(formData, 'data');

  // Fetch Blacklist Data
  const getData = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad
  };

  // Fetch Employee List
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(EMPLOYEE_API_URL);
      setEmployeeList(response.data?.employees);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  console.log(employeeList);


  useEffect(() => {
    getData();
    fetchEmployees(); // Fetch employees when component loads
  }, []);

  const handleSave = async () => {
    try {
      if (!formData.employee_id) {
        alert("Please select an employee!");
        return;
      }

      const payload = {
        employee_id: formData.employee_id,
        reason_code: formData.reason_code,
        status: formData.status,
        start_date: formData.start_date,
        end_date: formData.end_date,
        name:formData.name,
        company_id:formData.company_id
      };

      if (editEmployee) {
        await axios.put(`${API_URL}/${editEmployee}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      getData();
      closeModal();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Handle Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  // Handle Edit Click
  const handleEdit = (employee) => {
    setEditEmployee(employee.id);
    setFormData(employee);
    setIsModalOpen(true);
  };

<<<<<<< HEAD
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
=======
  // Open Add Employee Modal
  const handleAddEmployee = () => {
    setEditEmployee(null);
    setFormData({
      employee_id: "",
      reason_code: "",
      status: "",
      start_date: "",
      end_date: "",
      name:"",
      company_id:""
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad
    });
    setIsModalOpen(true);
  };

<<<<<<< HEAD
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
=======
  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditEmployee(null);
    setFormData({
      employee_id: "",
      reason_code: "",
      status: "",
      start_date: "",
      end_date: "",
      company_id:""
    });
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad
  };

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
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
=======
  
  const handleChangeOption = (e) => {
    const selectedEmployee = employeeList.find(emp => emp.id === parseInt(e.target.value, 10));
    console.log(selectedEmployee,"data coming");
    
    
    if (selectedEmployee) {
      setFormData((prev) => ({
        ...prev,
        employee_id: selectedEmployee.id,
        company_id:selectedEmployee.company_id,
        name:`${selectedEmployee.first_name} ${selectedEmployee.last_name}`
      }));
    }
  };

  // Search Filter
  const filteredEmployees = searchTerm.trim()
    ? employees?.filter(
      (emp) =>
        emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
    : employees;

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white p-6 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Employee Blacklist Management
      </h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="w-2/3 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md"
          onClick={handleAddEmployee}
        >
          <FiPlus className="mr-2" /> Add Employee
        </button>
      </div>
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,50%)] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
<<<<<<< HEAD
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
=======
              {editEmployee ? "Edit Blacklist Entry" : "Add Blacklist Entry"}
            </h3>

            {/* Employee Dropdown */}

            <select
              onChange={handleChangeOption}
              className="w-full p-2 border rounded-lg mb-2"
            >
              <option value="">Select Employee</option>
              {employeeList.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name}
                </option>
              ))}
            </select>


            {["reason_code", "status"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-2"
              />
            ))}
            {["start_date", "end_date"].map((field) => (
              <input
                key={field}
                type="date"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-2"
              />
            ))}

            <div className="flex justify-end space-x-2">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad
                {editEmployee ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-collapse shadow-md rounded-lg mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white text-center">
              {["Employee", "ID", "Reason", "Status", "Start Date", "End Date", "Actions"].map(
                (header) => (
                  <th key={header} className="p-3">{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
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
=======
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{employee.name || "N/A"}</td>
                  <td className="p-3">{employee.employee_id || "N/A"}</td>
                  <td className="p-3">{employee.reason_code || "N/A"}</td>
                  <td className="p-3">{employee.status || "N/A"}</td>
                  <td className="p-3">{employee.start_date || "N/A"}</td>
                  <td className="p-3">{employee.end_date || "N/A"}</td>
                  <td className="p-3 flex space-x-2">
                    <FiEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(employee)} />
                    <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(employee.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">No employees found.</td></tr>
            )}
>>>>>>> 529a732522d661d6d8852e4ec9270bed1b44b5ad
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlacklistManagement;
