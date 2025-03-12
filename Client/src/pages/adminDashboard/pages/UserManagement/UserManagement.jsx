"use client"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { People as Users, Search, CheckCircle, CancelOutlined as XCircle } from "@mui/icons-material"
import axiosInstance from "../../../../middleware/axiosInstance"
import UserFormModals from "./CreateUser"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router"
import UpdateUser from "./UpdateUser"
import PaginationControls from "../../../../components/Paginations/PaginationControls"

const UserManagement = () => {
  const INITIAL_DATA = {
    email: "",
    password: "",
    company_id: null,
    role: "Employee Admin",
    first_name: "",
    last_name: "",
    gender: "",
    dateOfBirth: "",
    phone_number: "",
    qualification: "",
    address: "",
    permanent_address: "",
    is_verified: "",
    employee_type: "",
    salary: "",
    dateOfJoin: "",
    pf_account: "",
    UPI_Id: "",
    panCard: "",
    aadharCard: "",
    bankAccount: "",
    IFSCcode: "",
    bankName: "",
    employment_history: [],
  }
  const [employmentHistory, setEmploymentHistory] = useState([])

  const [formData, setFormData] = useState(INITIAL_DATA)

  // State management
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)
  const [companyFilter, setCompanyFilter] = useState("All Companies")
  const [verifiedFilter, setVerifiedFilter] = useState("Verified Status")

  const [verifiedUsers, setVerifiedUsers] = useState(0)
  const [pendingUsers, setPendingUsers] = useState(0)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(false)
  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)

  // pagination set-up //

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 0,
  })

  const handlePageChange = (newPage) => {
    console.log("Changing page to:", newPage);
  
    // Ensure newPage is a number and valid
    const pageNumber = parseInt(newPage);
    if (
      isNaN(pageNumber) ||
      pageNumber < 1 ||
      pageNumber > pagination.totalPages
    ) {
      console.warn("Invalid page number:", newPage);
      return;
    }
  
    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };
  
  const handlePageSizeChange = (newSize) => {
    console.log("Changing page size to:", newSize);
  
    // Ensure newSize is a number and valid
    const sizeNumber = parseInt(newSize);
    if (isNaN(sizeNumber) || sizeNumber < 1) {
      console.warn("Invalid page size:", newSize);
      return;
    }
  
    setPagination((prev) => ({
      ...prev,
      pageSize: sizeNumber,
      currentPage: 1, // Reset to first page when changing page size
    }));
  };

  useEffect(() => {
    console.log("Updated Pagination:", pagination);
  }, [pagination]);
  
  const navigate = useNavigate()

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/get-companies`)
      setCompanies(response.data?.companies?.companies || [])
    } catch (error) {
      console.error("Error fetching companies:", error)
      setCompanies([]) // Ensure it's an array even on error
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCompanies()
  }, [])


  // Form handling
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
  
    // Capitalize the first letter of first_name and last_name
    const formattedValue = (name === "first_name" || name === "last_name") 
      ? value.charAt(0).toUpperCase() + value.slice(1) 
      : value;
  
    if (index !== null && name.startsWith("employment_")) {
      // Create a copy of the current employment history
      const updatedHistory = [...(Array.isArray(employmentHistory) ? employmentHistory : [])];
  
      // Ensure the index exists in the array
      if (!updatedHistory[index]) {
        updatedHistory[index] = {};
      }
  
      // Update the specific field
      const fieldName = name.replace("employment_", "");
      updatedHistory[index][fieldName] = formattedValue;
  
      // Update both state variables
      setEmploymentHistory(updatedHistory);
      setFormData((prev) => ({
        ...prev,
        employment_history: updatedHistory,
      }));
    } else {
      // Handle regular form fields with capitalization
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
  };
  

  // Add new User
  const handleAddUser = () => {
    setFormData(INITIAL_DATA)
    setEmploymentHistory([])
    setAddModalOpen(true)
  }

  // Modal handlers
  const handleEditClick = (user) => {
    if (!user) {
      console.error("User data is missing!", user)
      toast.error("Failed to load user data")
      return
    }
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  // Fetch users data
  const fetchUsers = async (signal) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/users`, {
        signal,
        params: {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      });
console.log(response,"chand")
      if (response.data?.data?.data) {
        const setPage= response.data?.data
        const fetchedUsers = response.data?.data?.data
        setPagination({
          currentPage: Number.parseInt(setPage.currentPage) || 1,
          pageSize: Number.parseInt(setPage.pageSize) || 10,
          totalPages: Number.parseInt(setPage.totalPages) || 1,
          totalRecords: Number.parseInt(setPage.totalRecords) || 0,
        })
        setUsers(fetchedUsers || [])
        setFilteredUsers(fetchedUsers || [])
      } else if (Array.isArray(response.data?.data)) {
        // Alternative data structure
        setUsers(response.data.data)
        setFilteredUsers(response.data.data)
      } else {
        console.error("Unexpected data structure:", response.data)
        toast.error("Received unexpected data format")
      }
    } catch (err) {
      if (!signal?.aborted) {
        console.error("Error fetching users:", err)
        toast.error("Failed to load users data")
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }

  // useEffect(() => {
  //   fetchUsers()
  // }, [isUpdated,pagination.currentPage, pagination.pageSize])
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetchUsers(signal)

    return () => controller.abort()
  }, [isUpdated, pagination.currentPage, pagination.pageSize])

  
  // Calculate stats whenever users change
  useEffect(() => {
    if (users && users.length > 0) {
      // Calculate verified users
      const verified = users.filter((user) => user.Employee && user.Employee.is_verified === "Verified").length

      // Calculate pending users
      const pending = users.filter((user) => user.Employee && user.Employee.is_verified === "Pending").length

      setVerifiedUsers(verified)
      setPendingUsers(pending)
    }
  }, [users,isUpdated])

  // Calculate percentages
  const totalUsers = users.length || 1 // Prevent division by zero
  const activePercentage = (verifiedUsers / totalUsers) * 100
  const inActivePercentage = (pendingUsers / totalUsers) * 100

  // Search and filter functionality
  useEffect(() => {
    if (!users.length) return

    const filtered = users.filter((user) => {
      // Search term matching
      const matchesSearch =
        searchTerm === "" ||
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.Employee && user.Employee.phone_number && user.Employee.phone_number.includes(searchTerm))

      // Company filter matching
      const matchesCompany =
        companyFilter === "All Companies" ||
        (user.Employee?.company_id && String(user.Employee.company_id) === String(companyFilter))

      // Status filter matching
      const matchesStatus =
        verifiedFilter === "Verified Status" || (user.Employee && user.Employee.is_verified === verifiedFilter)

      return matchesSearch && matchesCompany && matchesStatus
    })

    setFilteredUsers(filtered)

    // Reset to first page when filters change
    if (searchTerm || companyFilter !== "All Companies" || verifiedFilter !== "Verified Status") {
      setPagination((prev) => ({
        ...prev,
        currentPage: 1,
      }))
    }
  }, [searchTerm, companyFilter, verifiedFilter, users])



  // Delete user
  const deleteEmployee = async (id) => {
    // console.log("Deleting employee with ID:", id)
    try {
      const response = await axiosInstance.delete(`/users/${id}`)

      console.log("Employee deleted successfully:", response.data)
      toast.success("Employee deleted successfully")

      setDeleteModalOpen(false)
      setIsUpdated(!isUpdated)
    } catch (error) {
      console.error("Error occurred while deleting employee:", error.response?.data || error.message)
      toast.error("Error! Something went wrong")
      setDeleteModalOpen(false)
    }
  }

  // Handle form submission from child component
  const handleFormSubmit = () => {
    setIsUpdated(!isUpdated)
    setAddModalOpen(false)
    setEditModalOpen(false)
  }

  const handleView = (userId) => {
    navigate(`/admin/user-management/${userId}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-4 md:pt-2 overflow-hidden">
      <ToastContainer />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">User Management</h1>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => {
              handleAddUser()
            }}
            className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Users style={{ fontSize: 18 }} />
            <span className="hidden md:inline cursor-pointer">Add New User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="border border-gray-200 shadow-sm rounded-xl p-6 bg-gradient-to-br from-blue-100 to-blue-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Total Users</h2>
            <Users fontSize="small" className="text-blue-600" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{users.length}</p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-6 bg-gradient-to-br from-green-200 to-green-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Verified Users</h2>
            <CheckCircle fontSize="small" className="text-green-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{verifiedUsers}</p>
            <p className="text-sm text-gray-500">{activePercentage.toFixed(2)}% of total users</p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-6 bg-gradient-to-br from-red-200 to-red-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Pending Users</h2>
            <XCircle fontSize="small" className="text-red-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{pendingUsers}</p>
            <p className="text-sm text-gray-500">{inActivePercentage.toFixed(2)}% of total users</p>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="mb-4 bg-white border border-gray-200 rounded-lg p-3 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search fontSize="small" />
            </span>
            <input
              type="text"
              placeholder="Search By Username or PhoneNumber"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 bg-gray-100 rounded-md pl-12 pr-4 py-2 text-sm transition"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <label htmlFor="company-filter" className="text-xs text-gray-700 font-medium">
                Company :{" "}
              </label>
              <select
                id="company-filter"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm transition cursor-pointer"
              >
                <option value="All Companies">All Companies</option>
                {companies.map((company) => (
                  <option key={company.id} value={String(company.id)}>
                    {company.companyName}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <label htmlFor="verified-filter" className="text-xs text-gray-700 font-medium ">
                Status:{" "}
              </label>
              <select
                id="verified-filter"
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value)}
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm transition cursor-pointer"
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
              <th className="px-6 py-2 rounded-tl-lg">USER NAME</th>
              <th className="px-2 py-2">PHONE NUMBER</th>
              <th className="px-6 py-2">COMPANY</th>
              <th className="px-6 py-2">STATUS</th>
              <th className="px-6 py-2 hidden md:table-cell">LAST UPDATE</th>
              <th className="px-6 py-2">VIEW</th>
              <th className="px-6 py-2 text-right rounded-tr-lg">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-3 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-300 hover:bg-gray-50 ${
                    index === filteredUsers.length - 1 ? "last:rounded-b-lg" : ""
                  }`}
                >
                  <td className="px-6 py-2 flex items-center gap-3">
                    <span className="text-gray-800 font-medium">{user.username}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-700">{user?.Employee?.phone_number || "Not provided"}</td>
                  <td className="px-6 py-2">
                    <span className="text-gray-800 font-medium">
                      {user?.Employee?.Company?.companyName || "Not provided"}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-md border ${
                        user?.Employee?.is_verified === "Verified"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                    >
                      {user?.Employee?.is_verified || "Not Verified"}
                    </span>
                  </td>
                  <td className="px-6 py-2 hidden md:table-cell text-gray-600">
                    {new Date(user.updatedAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-6 py-2 text-gray-600 cursor-pointer" onClick={() => handleView(user.id)}>
                    <Eye size={16} className="md:w-5 md:h-5" />
                  </td>
                  <td className="px-6 py-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="flex items-center gap-1 text-blue-600 px-1 py-1 rounded-lg text-sm cursor-pointer"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="flex items-center gap-1 text-red-600 px-1 py-1 rounded-lg text-sm cursor-pointer"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-3 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationControls 
  pagination={pagination} 
  handlePageChange={handlePageChange} 
  handlePageSizeChange={handlePageSizeChange} 
/>


      {/* User Form Modals Component */}
      <UserFormModals
        addModalOpen={addModalOpen}
        deleteModalOpen={deleteModalOpen}
        editModalOpen={editModalOpen}
        selectedUser={selectedUser}
        companies={companies}
        setAddModalOpen={setAddModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        onFormSubmit={handleFormSubmit}
        onDeleteUser={deleteEmployee}
        formData={formData}
        setFormData={setFormData}
        employmentHistory={employmentHistory}
        setEmploymentHistory={setEmploymentHistory}
        handleChange={handleChange}
      />

      <UpdateUser
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        selectedUser={selectedUser}
        setAddModalOpen={setAddModalOpen}
        formData={formData}
        setFormData={setFormData}
        companies={companies}
        employmentHistory={employmentHistory}
        setEmploymentHistory={setEmploymentHistory}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </div>
  )
}

export default UserManagement

