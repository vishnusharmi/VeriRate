"use client"

import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import HeaderSection from "./header"
import UserTable from "./userTable"
import UserModals from "./userModel"

const UserManagement = () => {
  // State management
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)

  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilter, setCompanyFilter] = useState("All Companies")
  const [verifiedFilter, setVerifiedFilter] = useState("Verified Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)

  const [verifiedUsers, setVerifiedUsers] = useState(9)
  const [pendingUsers, setPendingUsers] = useState(4)
  const [adminUsers, setAdminUsers] = useState(8)

  const [users , setUsers] = useState([])

  // Sample user data

const [filteredUsers, setFilteredUsers] = useState([]); 

  // Add new User
  const handleAddUser = () => {
    setAddModalOpen(true)
  }

 

  // Filter and search logic
  // const filteredUsers = users.filter((user) => {
  //   const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.phoneNumber.includes(searchQuery)
  //   const matchesRole = companyFilter === "All Companies" || user.company === companyFilter
  //   const matchesStatus = verifiedFilter === "Verified Status" || user.employeeVerified === verifiedFilter

  //   return matchesSearch && matchesRole && matchesStatus
  // })

  // Modal handlers
  const handleEditClick = (user) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-4 md:pt-2 overflow-hidden">
      <ToastContainer />

      <HeaderSection
        handleAddUser={handleAddUser}
        users={users}
        setUsers={setUsers}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        verifiedFilter={verifiedFilter}
        setVerifiedFilter={setVerifiedFilter}
        verifiedUsers={verifiedUsers}
        pendingUsers={pendingUsers}
        adminUsers={adminUsers}
      />

      <UserTable
        // filteredUsers={filteredUsers}
        users={users}
        setUsers={setUsers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />

      

      <UserModals
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        selectedUser={selectedUser}
        // users={users}
        // setUsers={setUsers}
      />
    </div>
  )
}

export default UserManagement
