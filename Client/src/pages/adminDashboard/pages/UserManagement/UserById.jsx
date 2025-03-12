import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../../../middleware/axiosInstance";
import { FaUserCircle,FaArrowLeft  } from "react-icons/fa"; 

const UserById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employer, setEmployer] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Fetch employer details and employees
  const fetchEmployer = async () => {
    try {
      const response = await axiosInstance.get(`/employer/${id}`);
      console.log("&*&&*&*&**&&*&&&&*&&*&*&*");
      
      if (response.status === 200 && response.data) {
        setEmployer(response.data.data.userData || {});
        setEmployees(response.data.data.createdEmployees || []);
      }
    } catch (error) {
      console.error("Error fetching employer:", error);
      toast.error("Failed to fetch employer data. Please try again.");
    }
  };


  useEffect(() => {
    fetchEmployer();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-4">
      <ToastContainer />
      <div className="flex justify-start mb-2 " >
        <button
          onClick={() => navigate("/admin/user-management")} // ✅ Navigate to previous page
          className="flex items-center text-gray-700 hover:text-indigo-600 font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      {/* Employer Card */}
      {employer && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6  hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <FaUserCircle className="text-gray-600 w-16 h-16" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{employer.username || "N/A"}</h2>
              <p className="text-sm text-gray-500">{employer.email || "N/A"}</p>
            </div>
            <span className={`px-4 py-1 text-sm font-semibold rounded-full ${employer.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {employer.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Phone:</strong> {employer?.Employee?.phone_number || "N/A"}</p>
            <p><strong>Aadhar:</strong> {employer?.Employee?.aadharCard || "N/A"}</p>
            <p><strong>Pan Card:</strong> {employer?.Employee?.panCard || "N/A"}</p>
            <p><strong>DOB:</strong> {employer?.Employee?.dateOfBirth?.split("T")[0] || "N/A"}</p>
            <p><strong>Bank Name:</strong> {employer?.Employee?.bankName || "N/A"}</p>
            <p><strong>Bank Account:</strong> {employer?.Employee?.bankAccount || "N/A"}</p>
            <p><strong>IFSC Code:</strong> {employer?.Employee?.IFSCcode || "N/A"}</p>
            <p><strong>UPI:</strong> {employer?.Employee?.UPI_Id || "N/A"}</p>
            <p><strong>PF Account:</strong> {employer?.Employee?.pf_account || "N/A"}</p>
            <p><strong>Address:</strong> {employer?.Employee?.address || "N/A"}</p>
          </div>
        </div>
      )}

      {/* Employees Table */}
      <div className="border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            <tr className="text-left text-md font-semibold">
              <th className="px-6 py-2">NAME</th>
              <th className="px-6 py-2">EMAIL</th>
              <th className="px-6 py-2">PHONE NUMBER</th>
              <th className="px-6 py-2">DATE OF JOINING</th>
              <th className="px-6 py-2">POSITION</th>
              <th className="px-6 py-2">QUALIFICATION</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="px-6 py-2">{employee?.User?.username || "N/A"}</td>
                  <td className="px-6 py-2">{employee?.User?.email || "N/A"}</td>
                  <td className="px-6 py-2">{employee?.phone_number || "N/A"}</td>
                  <td className="px-6 py-2">{employee?.dateOfJoin?.split("T")[0] || "N/A"}</td>
                  <td className="px-6 py-2">{employee?.position || "N/A"}</td>
                  <td className="px-6 py-2">{employee?.qualification || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserById;
