"use client"
import PropTypes from "prop-types"
import {
  People as Users,
  PersonAdd as UserPlus,
  Search,
  Security as Shield,
  CheckCircle,
  CancelOutlined as XCircle,
} from "@mui/icons-material"
import { useState } from "react"



const HeaderSection = ({
  handleAddUser,
  searchQuery,
  setSearchQuery,
  companyFilter,
  users,
  setUsers,
  setCompanyFilter,
  verifiedFilter,
  setVerifiedFilter,
  verifiedUsers,
  pendingUsers,
  adminUsers,
}) => {
  const activePercentage = users.length > 0 ? (verifiedUsers / users.length) * 100 : 0
  const inActivePercentage = users.length > 0 ? (pendingUsers / users.length) * 100 : 0
  const adminPercentage = users.length > 0 ? (adminUsers / users.length) * 100 : 0

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">User Management</h1>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <UserPlus style={{ fontSize: 18 }} />
            <span className="hidden md:inline">Add New User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-gradient-to-br from-blue-100 to-blue-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Total Users</h2>
            <Users fontSize="small" className="text-blue-600" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{users.length}</p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-gradient-to-br from-green-200 to-green-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Active Users</h2>
            <CheckCircle fontSize="small" className="text-green-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{verifiedUsers}</p>
            <p className="text-sm text-gray-500">{activePercentage.toFixed(2)}% of total users</p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-gradient-to-br from-red-200 to-red-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Inactive Users</h2>
            <XCircle fontSize="small" className="text-red-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{pendingUsers}</p>
            <p className="text-sm text-gray-500">{inActivePercentage.toFixed(2)}% of total users</p>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-gradient-to-br from-yellow-100 to-yellow-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Admin Users</h2>
            <Shield fontSize="small" className="text-purple-500" />
          </div>
          <div className="pt-2">
            <p className="text-xl font-bold text-gray-900">{adminUsers}</p>
            <p className="text-sm text-gray-500">{adminPercentage.toFixed(2)}% of total users</p>
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm transition"
              >
                <option value="All Companies">All Companies</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Amazon">Amazon</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <label htmlFor="verified-filter" className="text-xs text-gray-700 font-medium">
                Status:{" "}
              </label>
              <select
                id="verified-filter"
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value)}
                className="w-[160px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 shadow-sm transition"
              >
                <option value="Verified Status">Verified Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Prop Types for validation (Optional)
HeaderSection.propTypes = {
  handleAddUser: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  roleFilter: PropTypes.string.isRequired,
  setRoleFilter: PropTypes.func.isRequired,
  verifiedFilter: PropTypes.string.isRequired,
  setVerifiedFilter: PropTypes.func.isRequired,
  totalUsers: PropTypes.number.isRequired,
  activeUsers: PropTypes.number.isRequired,
  inActiveUsers: PropTypes.number.isRequired,
  adminUsers: PropTypes.number.isRequired,
}

export default HeaderSection
