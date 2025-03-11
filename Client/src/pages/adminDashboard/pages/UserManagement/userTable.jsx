import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Box from "@mui/material/Box";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";


// Holds fetched companies

const UserTable = ({
  filteredUsers,
  currentPage,
  users,
  setUsers,
  setCurrentPage,
  usersPerPage,
  handleEditClick,
  handleDeleteClick,
}) => {
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = (filteredUsers ?? []).slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const pageCount = Math.ceil((filteredUsers?.length ?? 0) / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  // const [users, setUsers] = useState([]);

  //get request
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/all");
        console.log("get done", response.data);
        // const getData = Array.isArray(response.data.employees) ? response.data.employees : [];
        setUsers(response.data.employees);
        console.log(response.data.employees.company_id);
         // Store fetched companies
      } catch (err) {
        console.log("Error fetching company:", err);
      }
    };

    fetchCompanies();
  }, []);

  
  return (
    <>
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
              <th className="px-6 py-2 text-right rounded-tr-lg">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-300 hover:bg-gray-50 ${
                    index === users.length - 1 ? "last:rounded-b-lg" : ""
                  }`}
                >
                  <td className="px-6 py-2 flex items-center gap-3">
                    <span className="text-gray-800 font-medium">
                      {user.first_name + " " + user.last_name}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    {/* {user.User.email} */}
                    {user.phone_number}
                  </td>
                  <td className="px-6 py-2">
                    <span className="text-gray-800 font-medium">
                      {user.company_id}
                      {/* {user?.company || "Company"} */}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-md border ${
                        user.is_verified === "Verified"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                    >
                      {user.is_verified}
                    </span>
                  </td>
                  <td className="px-6 py-2 hidden md:table-cell text-gray-600">
                    {new Date(user.updated_at).toISOString().split("T")[0]}
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
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
    </>
  );
};

export default UserTable;
