import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FiUser, FiFileText } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Modal from "react-modal";

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [files, setFiles] = useState([
    { id: 1, name: "passport_copy.pdf", type: "ID Proof", employee: "John Doe" },
    { id: 2, name: "certification_java.pdf", type: "Certification", employee: "John Doe" }
  ]);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      email: "john@example.com"
    }
  ]);
  const [employmentHistory, setEmploymentHistory] = useState([
    {
      company: "ABC Corp",
      role: "Junior Developer",
      tenure: "2018 - 2020"
    },
    {
      company: "XYZ Ltd",
      role: "Senior Developer",
      tenure: "2020 - 2023"
    }
  ]);
  
  const [isDragging, setIsDragging] = useState(false);

  const toggleModal = (employee = null) => {
    setEditableEmployee(employee);
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteConfirm = (employee = null) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const newFiles = uploadedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: getFileType(file.name),
      employee: "Unassigned",
      file: file
    }));
    setFiles([...files, ...newFiles]);
  };

  const getFileType = (fileName) => {
    if (fileName.includes("id") || fileName.includes("passport") || fileName.includes("license")) {
      return "ID Proof";
    } else if (fileName.includes("cert") || fileName.includes("diploma")) {
      return "Certification";
    } else {
      return "Other Document";
    }
  };

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
      file: file
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleEdit = (employee) => {
    toggleModal(employee);
  };

  const handleDelete = (employee) => {
    toggleDeleteConfirm(employee);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((employee) => employee.id !== employeeToDelete.id));
      toggleDeleteConfirm();
    }
  };

  const handleFileDelete = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newEmployee = {
      id: editableEmployee ? editableEmployee.id : employees.length + 1,
      name: form.name.value,
      position: form.position.value,
      email: form.email.value
    };

    if (editableEmployee) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editableEmployee.id ? newEmployee : employee
      );
      setEmployees(updatedEmployees);
    } else {
      setEmployees([...employees, newEmployee]);
    }
    toggleModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center  w-[100%]">
        <h1 className="text-4xl font-bold">Employee Management</h1>
        <button
          className="text-lg border border-black rounded-xl px-4 py-2 bg-black text-white flex items-center"
          onClick={() => toggleModal()}
        >
          <FaCirclePlus className="mr-2" />
          Add Employee
        </button>
      </div>

      <div className="mt-4 flex border-b w-[90%] ">
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

      {activeTab === "employees" && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
          {employees.map((employee) => (
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
          ))}
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
            className={`p-8 border-2 border-dashed rounded-lg mb-6 text-center ${isDragging ? 'bg-blue-50 border-blue-400' : 'border-gray-300'}`}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => toggleModal()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50 bg-opacity-60"
      >
        <h2 className="text-2xl font-bold mb-6">{editableEmployee ? "Edit Employee" : "Add New Employee"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editableEmployee?.name || ""}
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
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onRequestClose={() => toggleDeleteConfirm()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50 bg-opacity-60"
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