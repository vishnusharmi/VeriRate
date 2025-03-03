import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt, FaPlusCircle, FaUpload } from "react-icons/fa";
import {
  FiUser,
  FiFileText,
  FiCalendar,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiHome,
  FiBookmark,
} from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); // Ensure this is set to your app's root element

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [files, setFiles] = useState([
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
  ]);
  const [employees,  ] = useState([]);
  const [employmentHistory, setEmploymentHistory] = useState([
    { company: "ABC Corp", role: "Junior Developer", tenure: "2018 - 2020" },
    { company: "XYZ Ltd", role: "Senior Developer", tenure: "2020 - 2023" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

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
    document:null
  });

  // Add Experience Function
const addExperience = () => {
  setEmployeeData((prevData) => ({
    ...prevData,
    experience: [...prevData.experience, { company: "", jobTitle: "", startDate: "", endDate: "", description: "" }]
  }));
};

  const removeExperience = (index) => {
    const updatedExperience = employeeData.experience.filter((_, i) => i !== index);
    setEmployeeData({ ...employeeData, experience: updatedExperience });
  };

  const handleExperienceChange = (e, index, fieldName) => {
    const { value } = e.target;
    setEmployeeData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience[index][fieldName] = value; // Only update the specific field
      return { ...prevData, experience: updatedExperience };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can store the file in state or upload it to a server
    }
  };
  
  

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 3) {
      handleFormSubmit(e.target.form);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

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
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3007/api/get-employees");
      console.log("API Response:", response.data); // Log the response
      setEmployees(response.data.employees); // Access the `employees` array
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
      setImagePreview(employee.profile_image_url || null);
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
      setImagePreview(null);
    }
    setIsModalOpen(!isModalOpen);
    setStep(1);
  };

  const toggleDeleteConfirm = (employee = null) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const handleEdit = (employee) => {
    toggleModal(employee);
  };

  const handleDelete = (employee) => {
    toggleDeleteConfirm(employee);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await axios.delete(
          `http://localhost:3007/api/delete-employee/${employeeToDelete.id}`
        );
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
    if (employeeData.profile_image instanceof File) {
      formData.append("profile_image", employeeData.profile_image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3007/api/create-employees",
        formData
      );
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

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-sm mx-auto bg-white rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Employee Management
          </h1>
          <button
            className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => toggleModal()}
          >
            <FaPlusCircle className="text-xl" />
            Add Employee
          </button>
        </div>

        <div className="mb-8">
          <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
            <button
              className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors ${
                activeTab === "employees"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("employees")}
            >
              <FiUser className="text-lg" />
              Employees
            </button>
            <button
              className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <LuHistory className="text-lg" />
              Employment History
            </button>
            <button
              className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors ${
                activeTab === "documents"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("documents")}
            >
              <FiFileText className="text-lg" />
              Documents
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <div className="flex items-center">
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">
                Employee Directory
              </h2>
              <p className="text-gray-600 mt-1">
                Manage all employee information
              </p>
            </div>
            <div className="p-6">
              {employees.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FiUser className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    No employees found. Add your first employee!
                  </p>
                  <button
                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => toggleModal()}
                  >
                    Add Employee
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Employee Name
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Role
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Phone
                        </th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                          Joined On
                        </th>
                        <th className="py-3 px-4 text-center text-gray-700 font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {employees.map((employee) => (
                        <tr
                          key={employee.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4 text-gray-800">
                            {employee.emp_name || "No Name"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.role || "No Role"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.email || "No Email"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.phone_number || "No Phone"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.date_of_joining || "N/A"}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                onClick={() => handleEdit(employee)}
                              >
                                <FaRegEdit />
                              </button>
                              <button
                                className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                                onClick={() => handleDelete(employee)}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Employee Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => toggleModal()}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-0 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
          overlayClassName="fixed inset-0 bg-black/60"
          ariaHideApp={false}
        >
          <div className="sticky top-0 bg-gray-50 border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
            <h2 className="text-2xl font-bold text-gray-800">
              {editableEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <button
              onClick={() => toggleModal()}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className={step >= 1 ? "text-blue-600 font-medium" : ""}>
                  Personal Info
                </span>
                <span className={step >= 2 ? "text-blue-600 font-medium" : ""}>
                  Employment Details
                </span>
                <span className={step >= 3 ? "text-blue-600 font-medium" : ""}>
                  Documents & Banking
                </span>
              </div>
            </div>

            <form className="space-y-6">
              {step === 1 && (
                <>
                  <div className="flex justify-center mb-6">
                    {/* <div className="relative -z-10">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          <FiUser size={48} />
                        </div>
                      )}
                      <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors text-white shadow-md">
                        <FaUpload size={14} />
                        <input
                          type="file"
                          name="profile_image"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Name*
                      </label>
                      <input
                        type="text"
                        name="emp_name"
                        value={employeeData.emp_name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID*
                      </label>
                      <input
                        type="text"
                        name="employee_id"
                        value={employeeData.employee_id}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="EMP001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth*
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={employeeData.date_of_birth}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={employeeData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={employeeData.phone_number}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password*
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={employeeData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                        <option>Select Company</option>
                        <option>ABC Corp</option>
                        <option>XYZ Ltd</option>
                        <option>123 Inc</option>
                        <option>Busitron pvt</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={employeeData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows="3"
                        placeholder="Enter full address"
                      ></textarea>
                    </div>
                  </div>
                </>
              )}

{step === 2 && (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-black-700 mb-1">
          Role*
        </label>
        <input
          type="text"
          name="role"
          value={employeeData.role}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="e.g., Software Engineer"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Joining*
        </label>
        <input
          type="date"
          name="date_of_joining"
          value={employeeData.date_of_joining}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Salary*
        </label>
        <input
          type="number"
          name="salary"
          value={employeeData.salary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="e.g., 50000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Qualification*
        </label>
        <input
          type="text"
          name="qualification"
          value={employeeData.qualification}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="e.g., B.Tech in Computer Science"
        />
      </div>
    </div>

    {/* Experience Section */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
      {employeeData.experience.map((exp, index) => (
        <div key={index} className="border p-4 rounded-lg  mb-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name*
            </label>
            <input
              type="text"
              name={`company_${index}`}
              value={exp.company}
              onChange={(e) => handleExperienceChange(e, index, "company")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Previous Company Name"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <input
              type="text"
              name={`jobTitle_${index}`}
              value={exp.jobTitle}
              onChange={(e) => handleExperienceChange(e, index, "jobTitle")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                name={`startDate_${index}`}
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(e, index, "startDate")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                name={`endDate_${index}`}
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(e, index, "endDate")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name={`description_${index}`}
              value={exp.description}
              onChange={(e) => handleExperienceChange(e, index, "description")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Briefly describe your responsibilities and achievements"
            />
          </div>
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="text-red-500 font-medium"
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
      >
        ➕ Add Experience
      </button>
    </div>
  </>
)}


{step === 3 && (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PAN Card*
        </label>
        <input
          type="text"
          name="pan_card"
          value={employeeData.pan_card}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="ABCDE1234F"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Aadhar Card*
        </label>
        <input
          type="text"
          name="aadhar_card"
          value={employeeData.aadhar_card}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="1234 5678 9012"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bank Account Number*
        </label>
        <input
          type="text"
          name="bank_account"
          value={employeeData.bank_account}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="1234567890"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bank Name*
        </label>
        <input
          type="text"
          name="bank_name"
          value={employeeData.bank_name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="e.g., State Bank of India"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          IFSC Code*
        </label>
        <input
          type="text"
          name="ifsc_code"
          value={employeeData.ifsc_code}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
          placeholder="SBIN0001234"
        />
      </div>
      {/* Document Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Document*
        </label>
        <input
          type="file"
          name="document"
          onChange={handleFileUpload}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
    </div>
  </>
)}


              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {step === 3 ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteConfirmOpen}
          onRequestClose={() => toggleDeleteConfirm()}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl max-w-md w-full"
          overlayClassName="fixed inset-0 bg-black/60"
          ariaHideApp={false}
        >
          <div className="text-center">
            <FaTrashAlt className="mx-auto text-4xl text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Delete Employee
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => toggleDeleteConfirm()}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeManagement;