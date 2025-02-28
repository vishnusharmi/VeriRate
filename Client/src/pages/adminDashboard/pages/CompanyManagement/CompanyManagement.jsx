import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Upload,
  Download,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    address: "",

    employees: "",
    compliance: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

// searchbar filter 
  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, companies]);
  

  //get request to get all companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3007/api/get-companies"
        );
        console.log("get done ", response.data);
        setCompanies(
          Array.isArray(response.data.companies) ? response.data.companies : []
        );
      } catch (err) {
        console.log("Error fetching company:", err);
      }
    };
    fetchCompanies();

  }, [isUpdated]);

 

  //post request to add a company
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, status, compliance, address } = formData;
      const response = await axios.post(
        "http://localhost:3007/api/create-company/",
        {
          name,
          email,
          phone,
          status,
          compliance,
          address,
        }
      );
      setShowAddModal(false);
      console.log("Company added:", response.data);
      toast.success("Company added successfully!")
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Something went wrong , try again...")
    }
  };

  //delete company
  const deleteCompany = async (id) => {
    if (confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3007/api/delete-company/${id}`
        );
        console.log("company deleted successfully", response.data);
        setIsUpdated(!isUpdated);
        toast.success("Company deleted successfully")
      } catch (error) {
        console.log("Error occured while deleting company :", error);
        toast.error("Error! Something went wrong ");

      }
    }
  };

  // edit company
  const editCompany = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3007/api/update-company/${id}`,
        formData
      );
      console.log("Company details edited successfully:", response.data);
      toast.success("Company edited successfully.");

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === id ? { ...company, ...formData } : company
        )
      );

      setShowAddModal(false);
      setEditingCompany(null);
    } catch (error) {
      console.log("Failed to edit company:", error);
      toast.error("Error! Something went wrong.");

    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      companyName: company.name || "",
      email: company.email || "",
      phonenumber: company.phone || "",
      status: company.status || "",
      address: company.address || "",
      employees: company.employees || "",
      compliance: company.compliance || "",
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      await editCompany(editingCompany.id);
    } else {
      await submitData(e);
    }
  };

  return (
    <div className="w-full p-5 bg-gray-100 overflow-auto">
       <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Company Management
          </h1>
          <p className="text-gray-600">
            Oversee and manage all registered companies
          </p>
        </div>

        {/*Search bar , total companies , export  */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative w-full max-w-md bg-gray-50">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 " />
            <input
              type="text"
              placeholder="Search Company Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <label className="flex items-center font-bold text-gray-700 bg-gray-50 px-3 border rounded-lg hover:bg-gray-200 cursor-pointer">
              Total Companies : &nbsp;<h3 className="font-bold text-red-600">{companies.length}</h3>
              <input type="file" className="hidden" />
            </label>
            {/* <label className="flex items-center px-4 bg-gray-50 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <Download className="h-5 w-5 mr-2" /> Export
              <input type="file" className="hidden" />
            </label> */}
            <button
              onClick={() => {
                setShowAddModal(true);
                setEditingCompany(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  status: "",
                  address: "",
                  employees: "",
                  compliance: "",
                });
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus className="h-5 w-5 mr-2" /> Add Company
            </button>
          </div>
        </div>

        {/* Companies list Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr className="text-sm font-medium text-gray-700">
                <th className="px-4 md:px-6 py-4 text-left">COMPANY DETAILS</th>
                <th className="px-4 md:px-6 py-4 text-left">STATUS</th>
                <th className="px-4 md:px-6 py-4 text-left">EMPLOYEES</th>
                <th className="px-4 md:px-6 py-4 text-left">COMPLIANCE</th>
                <th className="hidden md:table-cell px-6 py-4 text-left"> LAST AUDIT</th>
                <th className="px-4 md:px-6 py-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr
                  key={company.id}
                  className="hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="font-medium">{company.name}</div>
                    <div className="text-gray-500 text-xs">{company.email}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : company.status === "Pending Approval"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">{companies.length}</td>
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        company.compliance === "Compliant"
                          ? "bg-green-100 text-green-800"
                          : company.compliance === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {company.compliance}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 ">
                    {new Date(company.updatedAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 md:px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(company)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteCompany(company.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add or Edit Company form */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingCompany ? "Edit Company" : "Add New Company"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Company Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Company Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Phone Number :
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Status :</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Compliance :</label>
                  <select
                    name="compliance"
                    value={formData.compliance}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Compliance</option>
                    <option value="Compliant">Compliant</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Non-Compliant">Non-Compliant</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Address :</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCompany ? "Update Company" : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
