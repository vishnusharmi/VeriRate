import React, { useState } from 'react';
import {
  Users, UserPlus, Search, Filter, Shield,
  CheckCircle, XCircle, Download, Upload,
  Edit, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, FormControl,
  InputLabel, Box, Pagination
} from '@mui/material';

const UserManagement = () => {
  // State management
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Sample user data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob.j@example.com', role: 'User', status: 'Inactive', lastLogin: '1 week ago' },
    { id: 4, name: 'Alice Brown', email: 'alice.b@example.com', role: 'Admin', status: 'Active', lastLogin: '3 hours ago' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.w@example.com', role: 'User', status: 'Active', lastLogin: '5 hours ago' },
    { id: 6, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Manager', status: 'Active', lastLogin: '1 hour ago' },
    { id: 7, name: 'Edward Stone', email: 'edward.s@example.com', role: 'User', status: 'Inactive', lastLogin: '2 days ago' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  // Modal handlers
  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      status: ''
    });
    setAddModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleAddSubmit = () => {
    console.log('Adding new user:', formData);
    setAddModalOpen(false);
  };

  const handleEditSubmit = () => {
    console.log('Editing user:', selectedUser.id, formData);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting user:', selectedUser.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload size={18} />
            <span className="hidden md:inline">Import</span>
          </button>
          <button className="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={18} />
            <span className="hidden md:inline">Export</span>
          </button>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-semibold mt-1">1,234</h3>
            </div>
            <Users size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Users</p>
              <h3 className="text-2xl font-semibold mt-1">1,180</h3>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Inactive Users</p>
              <h3 className="text-2xl font-semibold mt-1">54</h3>
            </div>
            <XCircle size={32} className="text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Admin Users</p>
              <h3 className="text-2xl font-semibold mt-1">8</h3>
            </div>
            <Shield size={32} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="flex gap-4">
            <select
              className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </select>

            <select
              className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
              <th className="px-4 md:px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 md:px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-4 md:px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500">Last Login</th>
              <th className="px-4 md:px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 flex items-center">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="User avatar" className="h-8 w-8 rounded-full mr-3" />
                  <div className="font-medium">{user.name}</div>
                </td>
                <td className="px-4 md:px-6 py-4 text-sm">{user.email}</td>
                <td className="px-4 md:px-6 py-4 text-sm">{user.role}</td>
                <td className="px-4 md:px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-4 md:px-6 py-4 flex gap-2">
                  <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </div>

      {/* Add User Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubmit} color="primary">Add User</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;