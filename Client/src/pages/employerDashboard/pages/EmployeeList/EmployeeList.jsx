import React, { useState, useEffect, useContext } from "react";
import { FaRegEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { FiUser, FiFileText } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import Modal from "react-modal";
import axios from "axios";
import { AuthContext } from "../../../../components/Context/Contextapi";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../../middleware/axiosInstance";
import PaginationControls from "../../../../components/Pagination/PaginationControls";


// Set the root element for accessibility (required by react-modal)
Modal.setAppElement("#root");

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
  },
});

// Function to decode the JWT token and get the user ID
// function Tokendecodeing() {
//   const token = sessionStorage.getItem("authToken");
//   if (!token) return null;
//   const decodedPayload = jwtDecode(token);
//   return decodedPayload.id;
// }

const EmployeeManagement = () => {
  // Get the auth context
  const { auth } = useContext(AuthContext);
    console.log(auth.id);

  // State variables
  const [activeTab, setActiveTab] = useState("employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  // Pagination states for each tab
  const [currentPageEmployees, setCurrentPageEmployees] = useState(1);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const [currentPageDocuments, setCurrentPageDocuments] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);

// pagination
    const [pagination, setPagination] = useState({
      totalRecords: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    });

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
      }
    };

    const handlePageSizeChange = (newSize) => {
      setPagination((prev) => ({
        ...prev,
        pageSize: newSize,
        currentPage: 1,
      }));
    };


    useEffect(() => {
      fetchEmployees();
      fetchCompanies();
    }, [pagination.currentPage, pagination.pageSize]);

  // Employee data state
  const [employeeData, setEmployeeData] = useState({
    email:"",
    password:"",
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
    employment_history: [], // Ensure this is always an array
    employee_type: "",
    gender: "",
    pf_account: "",
    father_or_husband_name: "",
    permanent_address: "",
    current_address: "",
    UPI_Id: "",
    company_id: "",
    department_id: "",
    created_by: auth?.id || "",
    role:"Employee"
  });

  // Toggle modal for adding/editing employees
  const toggleModal = (employee = null) => {
    if (!auth) {
      console.error("Auth context is not available.");
      return;
    }

    setEditableEmployee(employee);
    if (employee) {
      setEmployeeData({
        ...employee,
        employment_history: employee.employment_history || [],
        company_id: employee.company_id || "",
        department_id: employee.department_id || "",
        created_by: auth.id || "",
      });
      setImagePreview(employee.profile_image_url || null);
    } else {
      setEmployeeData({
        email:"",
        password:"",
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
        employment_history: [],
        employee_type: "",
        gender: "",
        pf_account: "",
        father_or_husband_name: "",
        permanent_address: "",
        current_address: "",
        UPI_Id: "",
        company_id: "",
        department_id: "",
        created_by: auth.id || "",
      });
      setImagePreview(null);
    }
    setIsModalOpen(!isModalOpen);
    setStep(1);
  };

  const handleEdit = (employee) => toggleModal(employee);

  const handleDelete = (employee) => toggleDeleteConfirm(employee);

  const handleExperienceChange = (e, index, fieldName) => {
    const { value } = e.target;
    setEmployeeData((prevData) => {
      const updatedExperience = [...prevData.employment_history];
      updatedExperience[index][fieldName] = value;
      return { ...prevData, employment_history: updatedExperience };
    });
  };

  const toggleDeleteConfirm = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
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

  const handlePrev = () => setStep(step - 1);

  // Handle delete employee
  //   const handleDelete = (employee) => toggleDeleteConfirm(employee);

  //Confirm Delete
  const confirmDelete = async () => {

      try {
        await axiosInstance.delete(`/employee/delete/${employeeToDelete}`);
        toggleDeleteConfirm();
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        setError("Failed to delete employee. Please try again.");
      }
    
  };

  //handle Next
  const handleNext = (e) => {
    e.preventDefault();
    if (step === 3) {
      handleFormSubmit(e); // Submit the form on the last step
    } else {
      setStep(step + 1); // Move to the next step
    }
  };

  //handleCompnyChge

  const handleCompanyChange = (e) => {
    const companyId = e.target.value;
    setEmployeeData((prevData) => ({
      ...prevData,
      company_id: companyId,
      department_id: "", // Reset department when company changes
    }));
    fetchDepartments(companyId); // Fetch departments for the selected company
  };

  //handle Chage

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle numeric fields (salary, company_id, department_id, pf_account)
    if (
      name === "salary" ||
      name === "company_id" ||
      name === "department_id" ||
      name === "pf_account"
    ) {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value === "" ? null : parseInt(value, 10), // Convert to number or null
      }));
    } else {
      // Handle other fields
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Fetch employees with pagination
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
       const response = await axiosInstance.get(`/employees/${auth.id}`, {
         params: {
           page: pagination.currentPage,
           limit: pagination.pageSize,
         },
       });

         const { totalRecords, totalPages, currentPage, pageSize, data } =
           response.data;
         console.log("Full API response:", response.data); // Debugging
         setPagination({ totalRecords, totalPages, currentPage, pageSize });

      setEmployees(response?.data?.employee);

      // setTotalEmployees(response.data.employees.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again later.");
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(employees,'.........');
  
  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get("/get-companies");
      //   console.log("Companies", response.data.companies.companies);
      setCompanies(response.data.companies.companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to load companies. Please try again later.");
    }
  };

  // Fetch departments for a specific company
  const fetchDepartments = async (companyId) => {
    try {
      const company = companies.find((c) => c.id === companyId);
      if (company) {
        setDepartments(company.departments);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to load departments. Please try again later.");
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEmployeeData((prev) => ({
      ...prev,
      created_by: auth?.id || "",
    }));

    const employeeDataForSubmission = {
      ...employeeData,
      salary: employeeData.salary ? parseInt(employeeData.salary, 10) : null,
      company_id: employeeData.company_id
        ? parseInt(employeeData.company_id, 10)
        : null,
      department_id: employeeData.department_id
        ? parseInt(employeeData.department_id, 10)
        : null,
      pf_account: employeeData.pf_account
        ? parseInt(employeeData.pf_account, 10)
        : null,
    };

    try {
      let response;
      if (editableEmployee) {
        response = await axiosInstance.put(
          `/employee/update/${editableEmployee.id}`,
          employeeDataForSubmission
        );
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === editableEmployee.id ? response.data : employee
          )
        );
      } else {
        
        response = await axiosInstance.post(
          "/register",
          employeeDataForSubmission
        );
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      }

      // Refresh the employee list after submission
      fetchEmployees(currentPageEmployees, pageSize);
      toggleModal();
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save employee. Please check the input data and try again."
      );
    }
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // return (
    //   <div className="flex justify-center items-center mt-6">
    //     <button
    //       onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
    //       disabled={currentPage === 1}
    //       className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
    //     >
    //       Previous
    //     </button>
    //     <span className="mx-4 text-gray-700">
    //       Page {currentPage} of {totalPages}
    //     </span>
    //     <button
    //       onClick={() => onPageChange((prev) => prev + 1)}
    //       disabled={currentPage === totalPages}
    //       className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
    //     >
    //       Next
    //     </button>
    //   </div>
    // );
  };

  // Fetch employees and companies on component mount
  

  // Loading state
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

  // Calculate total pages for each tab
  const totalPagesEmployees = Math.ceil(totalEmployees / pageSize);
  const totalPagesHistory = Math.ceil(employees.length / pageSize);
  const totalPagesDocuments = Math.ceil(employees.length / pageSize);

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
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md">
            <div className="flex items-center">
              <span className="font-semibold">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === "employees" && (
          <div className="bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-300">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-extrabold">Employee Directory</h2>
              <p className="mt-2 text-lg opacity-90">
                Manage and track employee details
              </p>
            </div>

            {/* Content Section */}
            <div className="mt-6">
              {employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white py-12 rounded-xl shadow-md">
                  <FiUser className="text-6xl text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg font-medium">
                    No employees found. Add your first employee!
                  </p>
                  <button
                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md"
                    onClick={() => toggleModal()}
                  >
                    Add Employee
                  </button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-4 px-6 text-left text-gray-700 font-semibold">
                            Employee Name
                          </th>
                          <th className="py-4 px-6 text-left text-gray-700 font-semibold">
                            Role
                          </th>
                          <th className="py-4 px-6 text-left text-gray-700 font-semibold">
                            Email
                          </th>
                          <th className="py-4 px-6 text-left text-gray-700 font-semibold">
                            Phone
                          </th>
                          <th className="py-4 px-6 text-left text-gray-700 font-semibold">
                            Joined On
                          </th>
                          <th className="py-4 px-6 text-center text-gray-700 font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {employees.map((employee) => (
                          <tr
                            key={employee.id}
                            className="hover:bg-gray-50 transition-all"
                          >
                            <td className="py-4 px-6 text-gray-900 font-medium">
                              {employee.first_name} {employee.last_name}
                            </td>
                            <td className="py-4 px-6 text-gray-700">
                              {employee?.User?.role || "No Role"}
                            </td>
                            <td className="py-4 px-6 text-gray-700">
                              {employee?.User?.email || "No Email"}
                            </td>
                            <td className="py-4 px-6 text-gray-700">
                              {employee?.phone_number || "No Phone"}
                            </td>
                            <td className="py-4 px-6 text-gray-700">
                              {employee?.dateOfJoin || "N/A"}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex justify-center space-x-3">
                                <button
                                  className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all shadow-sm"
                                  onClick={() => handleEdit(employee)}
                                >
                                  <FaRegEdit className="text-lg" />
                                </button>
                                <button
                                  className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-all shadow-sm"
                                  onClick={() => handleDelete(employee.id)}
                                >
                                  <FaTrashAlt className="text-lg" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Employee History Tab */}
        {activeTab === "history" && (
          <div className="bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-300">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-extrabold">Employment History</h2>
              <p className="mt-2 text-lg opacity-90">
                Track and manage past employment records
              </p>
            </div>

            {/* Content Section */}
            <div className="mt-6">
              {employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white py-12 rounded-xl shadow-md">
                  <LuHistory className="text-6xl text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg font-medium">
                    No employment history found.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {employees
                      .slice(
                        (currentPageHistory - 1) * pageSize,
                        currentPageHistory * pageSize
                      )
                      .map((employee) => (
                        <div
                          key={employee.id}
                          className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform transition-all hover:shadow-2xl"
                        >
                          {/* Employee Details */}
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                {employee.first_name} {employee.last_name}
                              </h3>
                              <p className="text-gray-700 mt-2">
                                <strong>Salary:</strong> ₹{employee.salary}
                              </p>
                              <p className="text-gray-700">
                                <strong>Join Date:</strong>{" "}
                                {employee.dateOfJoin}
                              </p>
                              <p className="text-gray-700">
                                <strong>PF Account:</strong>{" "}
                                {employee.pf_account}
                              </p>
                              <p className="text-gray-700">
                                <strong>UPI Id:</strong> {employee.UPI_Id}
                              </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                Active
                              </span>
                            </div>
                          </div>

                          {/* Employment History */}
                          {Array.isArray(employee?.employment_history) &&
                          employee?.employment_history?.length > 0 ? (
                            <div className="mt-6 space-y-4">
                              {employee?.employment_history?.map((history) => (
                                <div
                                  key={history.id}
                                  className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition-all"
                                >
                                  <p className="text-lg font-semibold text-gray-900">
                                    {history.company}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Role:</strong> {history.jobTitle}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Start:</strong> {history.startDate}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>End:</strong> {history.endDate}
                                  </p>
                                  <p className="text-gray-600 text-sm italic">
                                    {history.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 mt-4 italic">
                              No employment history available.
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                  <Pagination
                    currentPage={currentPageHistory}
                    totalPages={totalPagesHistory}
                    onPageChange={setCurrentPageHistory}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-300">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-extrabold">Documents</h2>
              <p className="mt-2 text-lg opacity-90">
                View and manage employee documents
              </p>
            </div>

            {/* Content Section */}
            <div className="mt-6">
              {employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white py-12 rounded-xl shadow-md">
                  <FiFileText className="text-6xl text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg font-medium">
                    No documents found.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {employees
                      .slice(
                        (currentPageDocuments - 1) * pageSize,
                        currentPageDocuments * pageSize
                      )
                      .map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                        >
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Employee {employees.indexOf(doc) + 1}
                          </h3>
                          <div className="space-y-2 text-gray-700">
                            <p>
                              <strong>PAN Card:</strong>{" "}
                              {doc.panCard || "Not Available"}
                            </p>
                            <p>
                              <strong>Aadhar Card:</strong>{" "}
                              {doc.aadharCard || "Not Available"}
                            </p>
                            <p>
                              <strong>Bank Account:</strong>{" "}
                              {doc.bankAccount || "Not Available"}
                            </p>
                            <p>
                              <strong>Bank Name:</strong>{" "}
                              {doc.bankName || "Not Available"}
                            </p>
                            <p>
                              <strong>IFSC Code:</strong>{" "}
                              {doc.IFSCcode || "Not Available"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Pagination
                    currentPage={currentPageDocuments}
                    totalPages={totalPagesDocuments}
                    onPageChange={setCurrentPageDocuments}
                  />
                </>
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
                        Email*
                      </label>
                      <input
                        type="email"
                        name="phone_number"
                        value={employeeData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password*
                      </label>
                      <input
                        type="password"
                        name="phone_number"
                        value={employeeData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="+1 (123) 456-7890"
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
                    {/* <div className="md:col-span-2">
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
                    </div> */}

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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company*
                      </label>
                      <select
                        name="company_id"
                        value={employeeData.company_id}
                        onChange={handleCompanyChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.companyName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                      <select
                        name="department_id"
                        value={employeeData.department_id}
                        onChange={handleDepartmentChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div> */}
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

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Employment History
                    </h3>
                    {Array.isArray(employeeData?.employment_history) &&
                      employeeData?.employment_history?.map((exp, index) => (
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
