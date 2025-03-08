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

  // Single declaration of employeeData
  const [employeeData, setEmployeeData] = useState({
    emp_name: editableEmployee?.emp_name || "",
    employee_id: editableEmployee?.employee_id || "",
    salary: editableEmployee?.salary || "",
    date_of_birth: editableEmployee?.date_of_birth || "",
    role: editableEmployee?.role || "",
    password: editableEmployee?.password || "",
    email: editableEmployee?.email || "",
    date_of_joining: editableEmployee?.date_of_joining || "",
    phone_number: editableEmployee?.phone_number || "",
    qualification: editableEmployee?.qualification || "",
    address: editableEmployee?.address || "",
    pan_card: editableEmployee?.pan_card || "",
    aadhar_card: editableEmployee?.aadhar_card || "",
    bank_account: editableEmployee?.bank_account || "",
    bank_name: editableEmployee?.bank_name || "",
    ifsc_code: editableEmployee?.ifsc_code || "",
    profile_image: editableEmployee?.profile_image || null,
    experience: editableEmployee?.experience || [], // Add experience field here
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData({ ...employeeData, [e.target.name]: file });

    if (e.target.name === "profile_image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get-employees"
      );
      console.log("Fetched employees:", response.data);
      setEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again later.");
      setEmployees([]); // Fallback to an empty array
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = (employee = null) => {
    setEditableEmployee(employee);
    if (employee) {
      setEmployeeData({
        emp_name: employee.emp_name || "",
        employee_id: employee.employee_id || "",
        salary: employee.salary || "",
        date_of_birth: employee.date_of_birth || "",
        role: employee.role || "",
        password: employee.password || "",
        email: employee.email || "",
        date_of_joining: employee.date_of_joining || "",
        phone_number: employee.phone_number || "",
        qualification: employee.qualification || "",
        address: employee.address || "",
        pan_card: employee.pan_card || "",
        aadhar_card: employee.aadhar_card || "",
        bank_account: employee.bank_account || "",
        bank_name: employee.bank_name || "",
        ifsc_code: employee.ifsc_code || "",
        profile_image: employee.profile_image || null,
        experience: employee.experience || [],
      });
      // setImagePreview(employee.profile_image_url || null);
    } else {
      setEmployeeData({
        emp_name: "",
        employee_id: "",
        salary: "",
        date_of_birth: "",
        role: "",
        password: "",
        email: "",
        date_of_joining: "",
        phone_number: "",
        qualification: "",
        address: "",
        pan_card: "",
        aadhar_card: "",
        bank_account: "",
        bank_name: "",
        ifsc_code: "",
        profile_image: null,
        experience: [],
      });
      // setImagePreview(null);
    }
    setIsModalOpen(!isModalOpen);
    // setStep(1);
  };

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

  const handleDelete = (employee) => {
    toggleDeleteConfirm(employee);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        // You might want to add API call here if you have a delete endpoint
        // await axios.delete(`http://localhost:3000/api/delete-employee/${employeeToDelete.id}`);

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

  const handleFileDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  const handleFormSubmit = async (form) => {
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    console.log(data);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-employees",
        data
      );
      console.log("response", response);
      console.log(data);

      const updatedEmployee = response.data;
      if (editableEmployee) {
        setEmployees(
          employees.map((employee) =>
            employee.id === editableEmployee.id ? updatedEmployee : employee
          )
        );
      } else {
        setEmployees([...employees, updatedEmployee]);
      }
      toggleModal();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  if (!isLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-sm mx-auto bg-white rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
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

      <div>
        {activeTab === "employees" && (
          <Employees
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

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

      <button
        type="button"
        // onClick={addExperience}
        className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
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
      </button>
    </div>
  );
};

export default EmployeeManagement;
