import { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { FiUser, FiFileText } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import Modal from "react-modal";
import axiosInstance from "../../../../middleware/axiosInstance";

Modal.setAppElement("#root");

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
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]); // Add state for companies
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    salary: "",
    dateOfBirth: "",
    dateOfJoin: "",
    phone_number: "",
    qualification: "",
    address: "",
    panCard: "",
    aadharCard: "",
    bankAccount: "",
    bankName: "",
    IFSCcode: "",
    is_verified: "Pending",
    userId: "",
    employment_history: [],
    employee_type: "",
    gender: "",
    pf_account: "",
    father_or_husband_name: "",
    permanent_address: "",
    current_address: "",
    UPI_Id: "",
    company_id: "", // Ensure this is initially empty
  });

  useEffect(() => {
    fetchEmployees();
    fetchCompanies(); // Fetch companies when the component mounts
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/all");
      setEmployees(response.data.employees);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again later.");
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get("/companies"); // Replace with your API endpoint to fetch companies
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to load companies. Please try again later.");
    }
  };

  const toggleModal = (employee = null) => {
    setEditableEmployee(employee);
    if (employee) {
      setEmployeeData({
        ...employee,
        employment_history: employee.employment_history || [],
        company_id: employee.company_id || "", // Ensure company_id is set
      });
      setImagePreview(employee.profile_image_url || null);
    } else {
      setEmployeeData({
        first_name: "",
        last_name: "",
        salary: "",
        dateOfBirth: "",
        dateOfJoin: "",
        phone_number: "",
        qualification: "",
        address: "",
        panCard: "",
        aadharCard: "",
        bankAccount: "",
        bankName: "",
        IFSCcode: "",
        is_verified: "Pending",
        userId: "",
        employment_history: [],
        employee_type: "",
        gender: "",
        pf_account: "",
        father_or_husband_name: "",
        permanent_address: "",
        current_address: "",
        UPI_Id: "",
        company_id: "", // Ensure this is initially empty
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

  const handleEdit = (employee) => toggleModal(employee);
  const handleDelete = (employee) => toggleDeleteConfirm(employee);

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await axiosInstance.delete(`/delete/${employeeToDelete.id}`);
        setEmployees(
          employees.filter((employee) => employee.id !== employeeToDelete.id)
        );
        toggleDeleteConfirm();
      } catch (error) {
        console.error("Error deleting employee:", error);
        setError("Failed to delete employee. Please try again.");
      }
    }
  };

  const handleFileDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate integer fields
    const employeeDataForSubmission = {
      ...employeeData,
      salary: employeeData.salary ? parseInt(employeeData.salary, 10) : null,
      company_id: employeeData.company_id
        ? parseInt(employeeData.company_id, 10)
        : null, // Ensure company_id is included
      pf_account: employeeData.pf_account
        ? parseInt(employeeData.pf_account, 10)
        : null,
      userId:
        employeeData.userId && employeeData.userId.trim() !== ""
          ? parseInt(employeeData.userId, 10)
          : null,
    };

    // Log the data being submitted for debugging
    console.log("Submitting employee data:", employeeDataForSubmission);

    try {
      let response;
      if (editableEmployee) {
        response = await axiosInstance.put(
          `/update/${editableEmployee.id}`,
          employeeDataForSubmission
        );
        setEmployees(
          employees.map((employee) =>
            employee.id === editableEmployee.id ? response.data : employee
          )
        );
      } else {
        const token = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        response = await axiosInstance.post(
          "/create",
          employeeDataForSubmission,
          config
        );
        setEmployees([...employees, response.data]);
      }
      toggleModal();
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save employee. Please check the input data and try again."
      );
    }
  };

  const addExperience = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      employment_history: [
        ...prevData.employment_history,
        {
          company: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperience = employeeData.employment_history.filter(
      (_, i) => i !== index
    );
    setEmployeeData({ ...employeeData, employment_history: updatedExperience });
  };

  const handleExperienceChange = (e, index, fieldName) => {
    const { value } = e.target;
    setEmployeeData((prevData) => {
      const updatedExperience = [...prevData.employment_history];
      updatedExperience[index][fieldName] = value;
      return { ...prevData, employment_history: updatedExperience };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 3) {
      handleFormSubmit(e);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle integer fields
    if (name === "salary" || name === "company_id" || name === "pf_account") {
      if (value === "") {
        setEmployeeData({ ...employeeData, [name]: null }); // Set to null if empty
      } else {
        setEmployeeData({ ...employeeData, [name]: parseInt(value, 10) }); // Parse as integer
      }
    } else {
      setEmployeeData({ ...employeeData, [name]: value }); // Handle other fields normally
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData({ ...employeeData, [e.target.name]: file });

    if (e.target.name === "profile_image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
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
        {/* Header and Add Employee Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Employee Management
          </h1>
          <div className="flex gap-3">
            <button
              className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => toggleModal()}
            >
              <FaPlusCircle className="text-xl mr-2" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <div className="flex items-center">
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Employees Tab */}
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
                            {employee.first_name} {employee.last_name}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.User.role || "No Role"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.User.email || "No Email"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.phone_number || "No Phone"}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {employee.dateOfJoin || "N/A"}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={employeeData.first_name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={employeeData.last_name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="Last Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender*
                      </label>
                      <select
                        name="gender"
                        value={employeeData.gender}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth*
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={employeeData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
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
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address
                      </label>
                      <textarea
                        name="permanent_address"
                        value={employeeData.permanent_address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows="3"
                        placeholder="Enter permanent address"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Address
                      </label>
                      <textarea
                        name="current_address"
                        value={employeeData.current_address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows="3"
                        placeholder="Enter current address"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Father/Husband Name
                      </label>
                      <input
                        type="text"
                        name="father_or_husband_name"
                        value={employeeData.father_or_husband_name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter father/husband name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Type*
                      </label>
                      <select
                        name="employee_type"
                        value={employeeData.employee_type}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Employee Type</option>
                        <option value="Internship">Internship</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Full-time">Full-time</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        Date of Joining*
                      </label>
                      <input
                        type="date"
                        name="dateOfJoin"
                        value={employeeData.dateOfJoin}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PF Account
                      </label>
                      <input
                        type="text"
                        name="pf_account"
                        value={employeeData.pf_account}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter PF account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="UPI_Id"
                        value={employeeData.UPI_Id}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter UPI ID"
                      />
                    </div>
                  </div>

                  {/* Employment History Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Employment History
                    </h3>
                    {employeeData.employment_history.map((exp, index) => (
                      <div key={index} className="border p-4 rounded-lg mb-4">
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name*
                          </label>
                          <input
                            type="text"
                            name={`company_${index}`}
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(e, index, "company")
                            }
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
                            onChange={(e) =>
                              handleExperienceChange(e, index, "jobTitle")
                            }
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
                              onChange={(e) =>
                                handleExperienceChange(e, index, "startDate")
                              }
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
                              onChange={(e) =>
                                handleExperienceChange(e, index, "endDate")
                              }
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
                            onChange={(e) =>
                              handleExperienceChange(e, index, "description")
                            }
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
                      ➕ Add Employment History
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
                        name="panCard"
                        value={employeeData.panCard}
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
                        name="aadharCard"
                        value={employeeData.aadharCard}
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
                        name="bankAccount"
                        value={employeeData.bankAccount}
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
                        name="bankName"
                        value={employeeData.bankName}
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
                        name="IFSCcode"
                        value={employeeData.IFSCcode}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="SBIN0001234"
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
