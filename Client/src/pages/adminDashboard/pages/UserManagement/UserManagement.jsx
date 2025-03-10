
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  People as Users,
  PersonAdd as UserPlus,
  Search,
  Security as Shield,
  CheckCircle,
  CancelOutlined as XCircle,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Box from "@mui/material/Box";

const UserManagement = () => {
  // State management
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [verifiedFilter, setVerifiedFilter] = useState("Verified Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);

  const [totalUsers, setTotalUsers] = useState(1134);
  const [activeUsers, setActiveUsers] = useState(980);
  const [inActiveUsers, setInActiveUsers] = useState(54);
  const [adminUsers, setAdminUsers] = useState(8);
  const activePercentage = (activeUsers / totalUsers) * 100;
  const inActivePercentage = (inActiveUsers / totalUsers) * 100;
  const adminPercentage = (adminUsers / totalUsers) * 100;

  const [step, setStep] = useState(1);
 
  const handleNext = () => {
    const { firstName, lastName, gender, dateOfBirth, phoneNumber, qualification, currentAddress, permanentAddress } = formData;
  
    if (!firstName || !lastName || !gender || !dateOfBirth || !phoneNumber || !qualification || !currentAddress || !permanentAddress) {
toast.error("All fields are required  ")
      return;
    }
  
    setStep(2);
  };
  const handletheNext = () => {
    const { employeeType, employeeVerified, salary, dateOfJoining, pfAccount, upiId, employment_history } = formData;
  
    if (!employeeType || !employeeVerified || !salary || !dateOfJoining || !pfAccount || !upiId || !employment_history) {
toast.error("All fields are required  ")
      return;
    }
  
    setStep(3);
  };

    const [employmentHistory, setEmploymentHistory] = useState([
      { company: "", jobTitle: "", startDate: "", endDate: "", description: "" }
    ])

 
  
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Employee Admin",
      phoneNumber : "1234567890",
      employeeVerified: "Pending",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Employee ",
      phoneNumber : "12341654540",

      employeeVerified: "Verified",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Employee",
      phoneNumber : "2222222222",
      employeeVerified: "Pending",
      lastLogin: "1 week ago",
    },
    {
      id: 4,
      name: "Alice Brown",
      role: "Employee Admin",
      phoneNumber : "4444444444",

      employeeVerified: "Verified",
      lastLogin: "3 hours ago",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      role: "Employee",
      phoneNumber : "777777777",
      employeeVerified: "Pending",
      lastLogin: "5 hours ago",
    },
    {
      id: 6,
      name: "Diana Prince",
      role: "Employee Admin",
      phoneNumber : "88888888888",
      employeeVerified: "Verified",
      lastLogin: "1 hour ago",
    },
    {
      id: 7,
      name: "Edward Stone",
      role: "Employee",
      phoneNumber : "999999999",
      employeeVerified: "Pending",
      lastLogin: "2 days ago",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    qualification: "",
    currentAddress: "",
    permanentAddress: "",
    employeeVerified:"",
    employeeType:"",
    salary: "",
    dateOfJoining: "",
    pfAccount: "",
    upiId: "",
    employeeHistory: "",
    panCard: "",
    aadharCard: "",
    bankaccount: "",
    ifscCode: "",
    bankName: "",
    employment_history:"",
    
  });

  // Add new User
  const handleAddUser = () => {
    setAddModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Capitalize the first letter of the input
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
  
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  
    console.log({ [name]: formattedValue });
  };
  

  const handleAddSubmit = () => {

    const fullName = `${formData.firstName} ${formData.lastName}`;

    // Create a new user object with required fields
    const newUser = {
      id: users.length + 1,
      name: fullName, 
      phoneNumber : `${formData.phoneNumber}`,
      role: "Employee", // Default role
      employeeVerified: `${formData.employeeVerified}`, // Default status
      lastLogin: "Just now",
    };

    // Add the new user to the users array
    setUsers([newUser, ...users]);

    toast.success("User created successfully");
    setAddModalOpen(false);

    // Reset form data and step
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      qualification: "",
      currentAddress: "",
      permanentAddress: "",
    employeeVerified:"",
    employeeType :"",
      salary: "",
      dateOfJoining: "",
      pfAccount: "",
      upiId: "",
      employeeHistory: "",
      panCard: "",
      aadharCard: "",
      bankaccount: "",
      ifscCode: "",
      bankName: "",
    });

    setStep(1);
  };

  // Filter and search logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery);
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesStatus =
      verifiedFilter === "Verified Status" || user.employeeVerified === verifiedFilter;
  
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  // Menu handlers
  const handleMenuOpen = (event, userId) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveUserId(userId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveUserId(null);
  };

  // Modal handlers
  const handleEditClick = (user) => {
    setSelectedUser(user);

    // Split the name into first and last name
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Set all form fields with existing data or defaults
    setFormData({
      ...formData,
      firstName: firstName,
      lastName: lastName,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeVerified: user.employeeVerified,
      employeeType : user.employeeType || "",
      
      // Set default values for other fields if they don't exist in the user object
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth || "",
      phoneNumber: user.phoneNumber || "",
      qualification: user.qualification || "",
      currentAddress: user.currentAddress || "",
      permanentAddress: user.permanentAddress || "",
      salary: user.salary || "",
      dateOfJoining: user.dateOfJoining || "",
      pfAccount: user.pfAccount || "",
      upiId: user.upiId || "",
      employeeHistory: user.employeeHistory || "",
      panCard: user.panCard || "",
      aadharCard: user.aadharCard || "",
      bankaccount: user.bankaccount || "",
      ifscCode: user.ifscCode || "",
      bankName: user.bankName || "",
    });

    setStep(1); // Start at step 1
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    // Create a full name from first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`;

    // Find the user in the array and update their information
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: fullName,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          // Add all the additional fields
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          qualification: formData.qualification,
          currentAddress: formData.currentAddress,
          permanentAddress: formData.permanentAddress,
          salary: formData.salary,
          dateOfJoining: formData.dateOfJoining,
          pfAccount: formData.pfAccount,
          upiId: formData.upiId,
          employeeHistory: formData.employeeHistory,
          panCard: formData.panCard,
          aadharCard: formData.aadharCard,
          bankaccount: formData.bankaccount,
          ifscCode: formData.ifscCode,
          bankName: formData.bankName,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    toast.success("User updated successfully");
    setEditModalOpen(false);
    setStep(1); // Reset step for next time
  };

  const handleDeleteConfirm = () => {
    // Filter out the selected user
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    toast.success("User deleted successfully");
    setDeleteModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3  md:p-4  md:pt-2 overflow-hidden">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold ">
            User Management
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {/* <button className="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload size={18} />
            <span className="hidden md:inline">Import</span>
          </button>
          <button className="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={18} />
            <span className="hidden md:inline">Export</span>
          </button> */}
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <UserPlus size={18} />
            <span className="hidden md:inline">Add New User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between ">
            <h2 className="text-sm font-semibold text-gray-700">Total Users</h2>
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{totalUsers}</p>
            {/* <p className="text-sm text-gray-500">+5.2% from last month</p> */}
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between ">
            <h2 className="text-sm font-semibold text-gray-700">
              Active Users
            </h2>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{activeUsers}</p>
            <p className="text-sm text-gray-500">
              {activePercentage.toFixed(2)}% of total users
            </p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between ">
            <h2 className="text-sm font-semibold text-gray-700">
              Inactive Users
            </h2>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{inActiveUsers}</p>
            <p className="text-sm text-gray-500">
              {inActivePercentage.toFixed(2)}% of total users
            </p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between ">
            <h2 className="text-sm font-semibold text-gray-700">Admin Users</h2>
            <Shield className="h-5 w-5 text-purple-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{adminUsers}</p>
            <p className="text-sm text-gray-500">
              {adminPercentage.toFixed(2)}% of total users
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="mb-4 bg-white border border-gray-200 rounded-lg p-3 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 bg-gray-100 rounded-md pl-12 pr-4 py-2 text-sm   transition"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative ">
              <label
                htmlFor="role-filter"
                className="text-xs text-gray-700 font-medium"
              >
                Role :{" "}
              </label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm transition"
              >
                <option value="All Roles">All Roles</option>
                <option value="Employee Admin">Employee Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <label
                htmlFor="verified-filter"
                className="text-xs text-gray-700 font-medium"
              >
                Status :{" "}
              </label>
              <select
                id="verified-filter"
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value)}
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm  transition"
              >
                <option value="Verified Status">Verified Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Users Table */}
      <div className="border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
            <tr className="text-left text-md font-semibold">
              <th className="px-15 py-2 rounded-tl-lg">USER</th>
              <th className="px-2 py-2">PHONE NUMBER</th>
              <th className="px-6 py-2">ROLE</th>
              <th className="px-6 py-2">STATUS</th>
              <th className="px-6 py-2 hidden md:table-cell">LAST LOGIN</th>
              <th className="px-6 py-2 text-right rounded-tr-lg">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-300 hover:bg-gray-50 ${
                  index === currentUsers.length - 1 ? "last:rounded-b-lg" : ""
                }`}
              >
                <td className="px-6 py-2 flex items-center gap-3">
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </td>
                <td className="px-6 py-2 text-gray-600">{user.phoneNumber}</td>
                <td className="px-6 py-2">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-md border ${
                      user.role === "Super Admin"
                        ? "bg-purple-100 text-purple-700 border-purple-300"
                        : user.role === "Employee Admin"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-yellow-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-2">
  <span
    className={`px-3 py-1 text-xs font-medium rounded-md border ${
      user.employeeVerified === "Verified"
        ? "bg-green-100 text-green-700 border-green-300"
        : "bg-red-100 text-red-700 border-red-300"
    }`}
  >
    {user.employeeVerified}
  </span>
</td>



                <td className="px-6 py-2 hidden md:table-cell text-gray-600">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-2 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="flex items-center gap-1 text-blue-600 px-1 py-1 rounded-lg text-sm"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="flex items-center gap-1 text-red-600 px-1 py-1 rounded-lg text-sm"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box className="flex justify-center mt-6">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: KeyboardArrowLeft,
                  next: KeyboardArrowRight,
                }}
                {...item}
              />
            )}
          />
        </Box>
      )}

      {/* Add User Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay (Click to Close) */}
          <div
            className="absolute inset-0 bg-gray-500/50"
            onClick={() => setAddModalOpen(false)}
          ></div>

          {/* Centered Modal Box */}
          <div className="relative bg-white rounded-lg w-full max-w-lg p-4 shadow-lg border border-gray-300 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold  pb-2">Add New User</h2>
              <button
                onClick={() => setAddModalOpen(false)}
                aria-label="Close"
                className="text-black p-4"
              >
                <CloseIcon />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className={step === 1 ? "text-blue-600 font-medium" : ""}>
                  Personal Info
                </span>
                <span className={step === 2 ? "text-blue-600 font-medium" : ""}>
                  Employment Details
                </span>
                <span className={step === 3 ? "text-blue-600 font-medium" : ""}>
                  Documents & Banking
                </span>
              </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className=" max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name :
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="First Name"
                      value={formData.firstName}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name :
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Last Name"
                      value={formData.lastName}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender :
                    </label>
                    <select
                      name="gender"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.gender}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth :
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number :
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="+1 (123) 456-7890"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification :
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. B.Tech in CS"
                      required
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Address :
                    </label>
                    <textarea
                      name="currentAddress"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter current address"
                      required
                      value={formData.currentAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address :
                    </label>
                    <textarea
                      name="permanentAddress"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter permanent address"
                      required
                      value={formData.permanentAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 font-semibold text-black rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                   onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Employment Details */}
            {step === 2 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee type :
                    </label>
                    <select
                      name="employeeType"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.employeeType}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Employee type</option>
                      <option value="Internship">Internship</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee is_verified :
                    </label>
                    <select
                      name="employeeVerified"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.employeeVerified}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select verified or not</option>
                      <option value="Verified">Pending</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary*
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., 50000"
                      required
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Joining*
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PF Account :
                    </label>
                    <input
                      type="text"
                      name="pfAccount"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter PF Account"
                      required
                      value={formData.pfAccount}
                      onChange={handleChange}
                    />
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID :
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter UPI ID"
                      required
                      value={formData.upiId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employment History */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Employment History :
                    </label>
                    <button
                      type="button"
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                      onClick={() => setStep(4)}
                    >
                      <span className="text-2xl font-semibold text-blue-800 m-2">
                        +{" "}
                      </span>{" "}
                      Add Employment History
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handletheNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
              {/* step-3 : Documents & Banking */}
            {step === 3 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1 ">
                      PAN Card :
                    </label>
                    <input
                      type="text"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      placeholder="Enter PAN Number"
                      className="w-full p-2 border border-gray-300 rounded "
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Aadhar Card :
                    </label>
                    <input
                      type="text"
                      name="aadharCard"
                      value={formData.aadharCard}
                      onChange={handleChange}
                      placeholder="Enter Aadhar Number"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Bank Account Number :
                    </label>
                    <input
                      type="text"
                      name="bankaccount"
                      value={formData.bankaccount}
                      onChange={handleChange}
                      placeholder="Enter Bank Account Number"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Bank Name :
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="Enter Bank name"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      IFSC Code :
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAddSubmit}
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* step-4  : Add employement histyory*/}
            {step === 4 && (
             <div className=" rounded-lg shadow-sm bg-white">
             <h2 className="text-lg font-semibold ">Employment History</h2>
             {employmentHistory.map((job, index) => (
               <div key={index} className=" p-2 rounded-lg mb-2">
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Company Name :</label>
                   <input
                     type="text"
                     name="company"
                     placeholder="Previous Company Name"
                     value={formData.company}
                     onChange={handleChange}
                     className="w-full border  border-gray-300 rounded px-3 py-2"
                     required
                   />
                 </div>
       
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Job Title :</label>
                   <input
                     type="text"
                     name="jobTitle"
                     placeholder="e.g., Senior Developer"
                     value={formData.jobTitle}
                    onChange={handleChange}
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     required
                   />
                 </div>
       
                 <div className="grid grid-cols-2 gap-4 mb-3">
                   <div>
                     <label className="block text-sm font-medium mb-1">Start Date :</label>
                     <div className="relative">
                       <input
                         type="date"
                         name="startDate"
                         value={formData.startDate}
                         onChange={handleChange}
                         className="w-full border border-gray-300 rounded px-3 py-2"
                         required
                       />
                       {/* < className="absolute right-3 top-3 text-gray-400" /> */}
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-1">End Date :</label>
                     <div className="relative">
                       <input
                         type="date"
                         name="endDate"
                         value={formData.endDate}
                         onChange={handleChange}
                         className="w-full border rounded px-3 py-2"
                         required
                       />
                       {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" /> */}
                     </div>
                   </div>
                 </div>
       
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Description :</label>
                   <textarea
                     name="description"
                     placeholder="Briefly describe your responsibilities and achievements"
                     value={formData.description}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     rows="2"
                   />
                 </div>
                 <div  className="flex justify-between mt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setStep(3)}
                    >
                      Add
                    </button>
                  </div>
       
                 
               </div>
             ))}
       
            
           </div>
           
            )}
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gray-500/50 bg-opacity-50"></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg w-full max-w-lg p-4 shadow-lg border border-gray-300 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold pb-2">Edit User</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                aria-label="Close"
                className="text-black p-4"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className={step === 1 ? "text-blue-600 font-medium" : ""}>
                  Personal Info
                </span>
                <span className={step === 2 ? "text-blue-600 font-medium" : ""}>
                  Employment Details
                </span>
                <span className={step === 3 ? "text-blue-600 font-medium" : ""}>
                  Documents & Banking
                </span>
              </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name :
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="First Name"
                      value={formData.firstName}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name :
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Last Name"
                      value={formData.lastName}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender :
                    </label>
                    <select
                      name="gender"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.gender}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth :
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number :
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="+1 (123) 456-7890"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification :
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. B.Tech in CS"
                      required
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Address :
                    </label>
                    <textarea
                      name="currentAddress"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter current address"
                      required
                      value={formData.currentAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address :
                    </label>
                    <textarea
                      name="permanentAddress"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter permanent address"
                      required
                      value={formData.permanentAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 font-semibold text-black rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Employment Details */}
            {step === 2 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee type :
                    </label>
                    <select
                      name="employeeType"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.employeeType}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Employee type</option>
                      <option value="Internship">Internship</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee is_verified :
                    </label>
                    <select
                      name="employeeVerified"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.employeeVerified}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select verified or not</option>
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary*
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., 50000"
                      required
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Joining*
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PF Account :
                    </label>
                    <input
                      type="text"
                      name="pfAccount"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter PF Account"
                      required
                      value={formData.pfAccount}
                      onChange={handleChange}
                    />
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID :
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter UPI ID"
                      required
                      value={formData.upiId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employment History */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Employment History :
                    </label>
                    <button
                      type="button"
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                      onClick={() => setStep(4)}
                    >
                      <span className="text-2xl font-semibold text-blue-800 m-2">
                        +{" "}
                      </span>{" "}
                      Add Employment History
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handletheNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1 ">
                      PAN Card :
                    </label>
                    <input
                      type="text"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      placeholder="Enter PAN Number"
                      className="w-full p-2 border border-gray-300 rounded "
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Aadhar Card :
                    </label>
                    <input
                      type="text"
                      name="aadharCard"
                      value={formData.aadharCard}
                      onChange={handleChange}
                      placeholder="Enter Aadhar Number"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Bank Account Number :
                    </label>
                    <input
                      type="text"
                      name="bankaccount"
                      value={formData.bankaccount}
                      onChange={handleChange}
                      placeholder="Enter Bank Account Number"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Bank Name :
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="Enter Bank name"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      IFSC Code :
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <div>
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
             {/* step-4  : Add employement histyory*/}
             {step === 4 && (
             <div className=" rounded-lg shadow-sm bg-white">
             <h2 className="text-lg font-semibold ">Employment History</h2>
             {employmentHistory.map((job, index) => (
               <div key={index} className=" p-2 rounded-lg mb-2">
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Company Name :</label>
                   <input
                     type="text"
                     name="company"
                     placeholder="Previous Company Name"
                     value={formData.company}
                     onChange={handleChange}
                     className="w-full border  border-gray-300 rounded px-3 py-2"
                     required
                   />
                 </div>
       
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Job Title :</label>
                   <input
                     type="text"
                     name="jobTitle"
                     placeholder="e.g., Senior Developer"
                     value={formData.jobTitle}
                    onChange={handleChange}
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     required
                   />
                 </div>
       
                 <div className="grid grid-cols-2 gap-4 mb-3">
                   <div>
                     <label className="block text-sm font-medium mb-1">Start Date :</label>
                     <div className="relative">
                       <input
                         type="date"
                         name="startDate"
                         value={formData.startDate}
                         onChange={handleChange}
                         className="w-full border border-gray-300 rounded px-3 py-2"
                         required
                       />
                       {/* < className="absolute right-3 top-3 text-gray-400" /> */}
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-1">End Date :</label>
                     <div className="relative">
                       <input
                         type="date"
                         name="endDate"
                         value={formData.endDate}
                         onChange={handleChange}
                         className="w-full border rounded px-3 py-2"
                         required
                       />
                       {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" /> */}
                     </div>
                   </div>
                 </div>
       
                 <div className="mb-3">
                   <label className="block text-sm font-medium mb-1">Description :</label>
                   <textarea
                     name="description"
                     placeholder="Briefly describe your responsibilities and achievements"
                     value={formData.description}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     rows="2"
                   />
                 </div>
                 <div  className="flex justify-between mt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4"
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setStep(3)}
                    >
                      Add
                    </button>
                  </div>
       
                 
               </div>
             ))}
       
            
           </div>
           
            )}
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gray-500/50 bg-opacity-50"></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg w-full max-w-sm p-5 shadow-lg border border-gray-300">
            <h2 className="text-lg font-semibold  pb-2">Delete User</h2>
            <p className="text-sm text-gray-600 my-3">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.name}</span>? This
              action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3 p-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
