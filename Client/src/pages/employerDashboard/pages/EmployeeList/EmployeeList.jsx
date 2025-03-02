import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FiUser, FiFileText } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios"; // Import axios

// IMPORTANT: Make sure this line is executed after the DOM is loaded
// If you're getting errors, you might need to move this to your main App component
// or use a useEffect hook with an empty dependency array
// useEffect(() => {
//   Modal.setAppElement("#root");
// }, []);

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [files, setFiles] = useState([
    { id: 1, name: "passport_copy.pdf", type: "ID Proof", employee: "John Doe" },
    { id: 2, name: "certification_java.pdf", type: "Certification", employee: "John Doe" },
  ]);
  const [employees,  ] = useState([]);
  const [employmentHistory, setEmploymentHistory] = useState([
    {
      company: "ABC Corp",
      role: "Junior Developer",
      tenure: "2018 - 2020",
    },
    {
      company: "XYZ Ltd",
      role: "Senior Developer",
      tenure: "2020 - 2023",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const [employeeData, setEmployeeData] = useState({
    first_name: editableEmployee?.name || "",
    last_name: editableEmployee?.last_name || "",
    position: editableEmployee?.position || "",
    email: editableEmployee?.email || "",
    history: editableEmployee?.history || "",
    document: editableEmployee?.document || null,
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 3) {
      handleFormSubmit(e.target.form); // Submit the form when on the last step
    } else {
      setStep(step + 1);
    }
    // e.preventDefault()
    // if(step <= 2){
    //   setStep(step + 1);
    // }
    // console.log(e.target.form)
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEmployeeData({ ...employeeData, document: e.target.files[0] });
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees using axios instead of fetch
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3007/api/get-employees");
      console.log("Fetched employees:", response.data);
      setEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again later.");
      // Fallback to empty array to prevent errors
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Open/close modal for adding/editing employees
  const toggleModal = (employee = null) => {
    setEditableEmployee(employee);
    setIsModalOpen(!isModalOpen);
  };

  // Open/close delete confirmation modal
  const toggleDeleteConfirm = (employee = null) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  // Handle file upload via input
  // const handleFileChange = (event) => {
  //   const uploadedFiles = Array.from(event.target.files);
  //   const newFiles = uploadedFiles.map((file, index) => ({
  //     id: files.length + index + 1,
  //     name: file.name,
  //     type: getFileType(file.name),
  //     employee: "Unassigned",
  //     file: file,
  //   }));
  //   setFiles([...files, ...newFiles]);
  // };

  // Determine file type based on file name
  const getFileType = (fileName) => {
    if (fileName.includes("id") || fileName.includes("passport") || fileName.includes("license")) {
      return "ID Proof";
    } else if (fileName.includes("cert") || fileName.includes("diploma")) {
      return "Certification";
    } else {
      return "Other Document";
    }
  };

  // Handle drag-and-drop file upload
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    const newFiles = droppedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: getFileType(file.name),
      employee: "Unassigned",
      file: file,
    }));
    setFiles([...files, ...newFiles]);
  };

  // Handle employee edit
  const handleEdit = (employee) => {
    toggleModal(employee);
  };

  // Handle employee delete
  const handleDelete = (employee) => {
    toggleDeleteConfirm(employee);
  };

  // Confirm employee deletion
  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        // You might want to add API call here if you have a delete endpoint
        // await axios.delete(`http://localhost:3007/api/delete-employee/${employeeToDelete.id}`);
        
        // Update local state after successful deletion
        setEmployees(employees.filter((employee) => employee.id !== employeeToDelete.id));
        toggleDeleteConfirm();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Handle file deletion
  const handleFileDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  // Handle form submission for adding/editing employees using axios
  const handleFormSubmit = async (form) => {
    // console.log(event)
    // event.preventDefault();
    // console.log(event)
    // const form = event.target;
    const formData = new FormData(form);

   const data = Object.fromEntries(formData)
   console.log(data) 
   console.log(formData);
   
   

    try {
      const response = await axios.post(
        "http://localhost:3007/api/create-employees", 
        data
      );
   console.log("response", response);
   console.log(data)
   
      const updatedEmployee = response.data;
      if (editableEmployee) {
        const updatedEmployees = employees.map((employee) =>
          employee.id === editableEmployee.id ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
      } else {
        setEmployees([...employees, updatedEmployee]);
      }
      toggleModal();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Render loading state
  if (isLoading && employees.length === 0) {
    return <div className="p-6">Loading employees...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-4xl font-bold">Employee Management</h1>
        <button
          className="text-lg border border-black rounded-xl px-4 py-2 bg-black text-white flex items-center"
          onClick={() => toggleModal()}
        >
          <FaCirclePlus className="mr-2" />
          Add Employee
        </button>
      </div>

      <div className="mt-4 flex border-b w-[90%]">
        <button
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === "employees" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setActiveTab("employees")}
        >
          <FiUser />
          Employees
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === "history" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          <LuHistory />
          Employment History
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === "documents" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setActiveTab("documents")}
        >
          <FiFileText />
          Documents
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {activeTab === "employees" && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
          {console.log(employees)}
          {employees?.employees?.length === 0 ? (
            <p className="text-center py-4">No employees found. Add your first employee!</p>
          ) : (
            employees.employees.map((employee) => (
              <div key={employee.id} className="p-4 mt-4 flex justify-between items-center border rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">{employee.name}</h3>
                  <p className="text-gray-600">{employee.position}</p>
                  <p className="text-gray-600">{employee.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border rounded bg-gray-200" onClick={() => handleEdit(employee)}>
                    <FaRegEdit />
                  </button>
                  <button className="p-2 border rounded bg-red-500 text-white" onClick={() => handleDelete(employee)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "history" && (
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
      )}

      {activeTab === "documents" && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
          <h2 className="text-xl font-bold mb-4">Employee Documents</h2>
          <div
            className={`p-8 border-2 border-dashed rounded-lg mb-6 text-center ${
              isDragging ? "bg-blue-50 border-blue-400" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <AiOutlineCloudUpload className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="mb-2">Drag and drop files here</p>
            <p className="text-sm text-gray-500 mb-4">Support for certifications, ID proofs, and other employee documents</p>
            <div>
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
                Browse Files
                <input type="file" multiple className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Document Name</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Employee</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{file.name}</td>
                    <td className="py-3 px-4">{file.type}</td>
                    <td className="py-3 px-4">{file.employee}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 mx-1 border rounded bg-gray-200" onClick={() => handleEdit(file)}>
                        <FaRegEdit />
                      </button>
                      <button className="p-1 mx-1 border rounded bg-red-500 text-white" onClick={() => handleFileDelete(file.id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={() => toggleModal()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50 bg-opacity-60"
        ariaHideApp={false} // Added this to prevent the error about appElement
      >
        <h2 className="text-2xl font-bold mb-6">{editableEmployee ? "Edit Employee" : "Add New Employee"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              defaultValue={editableEmployee?.name || ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input 
              type="text"
              name="last_name"
              defaultValue={editableEmployee?.last_name || ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              name="position"
              defaultValue={editableEmployee?.position || ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={editableEmployee?.email || ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => toggleModal()}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editableEmployee ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal> */}

<Modal
      isOpen={isModalOpen}
      onRequestClose={() => toggleModal()}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[500px]"
      overlayClassName="fixed inset-0 bg-black/50 bg-opacity-60"
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-6">
        {editableEmployee ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={employeeData.position}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium mb-1">Employee History</label>
            <textarea
              name="history"
              value={employeeData.history}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Document</label>
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Back
            </button>
          )}

          <div>
            {step < 3 ? (
              <button
                type="button"
                onClick={(e) => handleNext(e)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={(e) => handleNext(e)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onRequestClose={() => toggleDeleteConfirm()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50 bg-opacity-60"
        ariaHideApp={false} // Added this to prevent the error about appElement
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => toggleDeleteConfirm()}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;