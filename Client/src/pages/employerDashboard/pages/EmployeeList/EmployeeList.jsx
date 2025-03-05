import { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiUser, FiFileText } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import Modal from "react-modal";
import axios from "axios"; // Import axios
import Employees from "./Employees";
import EmploymentHistory from "./EmploymentHistory";
import Documents from "./Documents";
import Form from "./Form";

const mockFiles = [
  {
    id: 1,
    name: "passport_copy.pdf",
    type: "ID Proof",
    employee: "John Doe",
  },
  {
    id: 2,
    name: "certification_java.pdf",
    type: "Certification",
    employee: "John Doe",
  },
];

const mockEmploymentHistory = [
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
];

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [files, setFiles] = useState(mockFiles);
  const [employees, setEmployees] = useState([]);
  const [employmentHistory, setEmploymentHistory] = useState(
    mockEmploymentHistory
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [step, setStep] = useState(1);

  const [employeeData, setEmployeeData] = useState({
    first_name: editableEmployee?.name || "",
    last_name: editableEmployee?.last_name || "",
    position: editableEmployee?.position || "",
    email: editableEmployee?.email || "",
    history: editableEmployee?.history || "",
    document: editableEmployee?.document || null,
  });

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
      const response = await axios.get(
        "http://localhost:3007/api/get-employees"
      );
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

  const getFileType = (fileName) => {
    if (
      fileName.includes("id") ||
      fileName.includes("passport") ||
      fileName.includes("license")
    ) {
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
        setEmployees(
          employees.filter((employee) => employee.id !== employeeToDelete.id)
        );
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
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    console.log(data);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3007/api/create-employees",
        data
      );
      console.log("response", response);
      console.log(data);

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

  console.log("Component rendered!!");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-4xl font-bold">Employee Management</h1>
        <button
          className="text-lg border border-black rounded-xl px-4 py-2 bg-black text-white flex items-center cursor-pointer"
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
        <Employees
          employees={employees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeTab === "history" && (
        <EmploymentHistory employmentHistory={employmentHistory} />
      )}

      {activeTab === "documents" && (
        <Documents
          isDragging={isDragging}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          files={files}
          handleEdit={handleEdit}
          handleFileDelete={handleFileDelete}
        />
      )}

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

        {/* FORM BEING RENDERED HERE */}
        <Form />
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
        <p className="mb-6">
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </p>
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
