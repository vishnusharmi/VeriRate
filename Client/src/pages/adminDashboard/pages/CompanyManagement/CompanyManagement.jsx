import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpenPopup, setIsModalOpenPopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    founderYear: "",
    registerNum: "",
    address: "",
    country: "",
    state: "",
    phonenumber: "",
    companyWebsite: "",
    email: "",
    username: "",
    role: "admin",
    password: "",
    document: null,
  });
  useEffect(() => {
    if (showAddModal) {
      setActiveCard(1);
    }
  }, [showAddModal]);
  
  const handleCountryChange = (selected) => {
    setFormData({
      ...formData,
      country: selected.label, // Store country name
      state: "", // Reset state when country changes
    });
  };
  
  const handleStateChange = (selected) => {
    setFormData({
      ...formData,
      state: selected.label, // Store state name
    });
  };
  

  const handleCancel = () => {
    setShowAddModal(false);
  };

  const [activeCard, setActiveCard] = useState(1);
  const totalCards = 4;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      document: e.target.files[0],
    }));
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEdit && selectedCompanyId) {
        res = await axios.put(`http://localhost:3000/api/update-company/${selectedCompanyId}`, formData);
        toast.success(res.data.message);
        setShowAddModal(false);
      } else {
        res = await axios.post("http://localhost:3000/api/register", {formData});
        toast.success(res.data.message);
        setShowAddModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed!");
      console.log("Error:", error);
    }
  };

  const validateForm = () => {
    const { email, password, companyWebsite, phonenumber } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
    const phoneRegex = /^[0-9]{10,15}$/; // Allows only digits, 10 to 15 characters long
    if (activeCard === 1) {
      // Validate email and password
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format!");
        return false;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return false;
      }
    }

    if (activeCard === 3) {
      // Validate company website and phone number
      if (!urlRegex.test(companyWebsite)) {
        toast.error("Invalid website URL format!");
        return false;
      }
      if (!phoneRegex.test(phonenumber)) {
        toast.error(
          "Invalid phone number! It must contain only digits and be 10-15 digits long."
        );
        return false;
      }
    }

    return true;
  };

  const nextCard = () => {
    if (!validateForm()) return;
    if (activeCard < totalCards) {
      setActiveCard(activeCard + 1);
    }
  };

  const prevCard = () => {
    if (activeCard > 1) {
      setActiveCard(activeCard - 1);
    }
  };

  const isNextDisabled = () => {
    if (activeCard === 1) {
      return !formData.email || !formData.password || !formData.username;
    }
    if (activeCard === 2) {
      return (
        !formData.companyName ||
        !formData.industry ||
        !formData.founderYear ||
        !formData.registerNum
      );
    }
    if (activeCard === 3) {
      return (
        !formData.address ||
        !formData.country ||
        !formData.state ||
        !formData.phonenumber ||
        !formData.companyWebsite
      );
    }
    return false;
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get-companies"
      ); // Your API endpoint
      setCompanies(response.data.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]); // Ensure it's an array even on error
    }
  };

  const editCompany = async (company) => {
    setSelectedCompanyId(company.id)
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === company.country
    );
  
    const selectedState = selectedCountry
      ? State.getStatesOfCountry(selectedCountry.isoCode).find(
          (s) => s.name === company.state
        )
      : null;
    setFormData({
      companyName: company.companyName || "",
      industry: company.industry || "",
      founderYear: company.founderYear || "",
      registerNum: company.registerNum || "",
      address: company.address || "",
      country: company.country || "",
      state: company.state || "",
      phonenumber: company.phonenumber || "",
      companyWebsite: company.companyWebsite || "",
      email: company.email || "",
      username: company.username || "",
      role: company.role || "admin",
      password: company.password || "",
      document: company.document || null,
    });
    setShowAddModal(true);
    setIsEdit(true); 
  };
  
  const handleDeleteClick = (id) => {
    setSelectedCompanyId(id);
    setIsModalOpenPopup(true);
  };

  const deleteCompany = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/delete-company/${selectedCompanyId}`
      ); // Replace with your API URL
      toast.success("Company deleted successfully!");
      setCompanies((prevCompanies) =>
        prevCompanies.filter((c) => c.id !== selectedCompanyId)
      );
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Failed to delete company!");
    } finally {
      setIsModalOpenPopup(false);
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
              Total Companies : &nbsp;
              <h3 className="font-bold text-red-600">{companies.length}</h3>
              <input type="file" className="hidden" />
            </label>
            <button
              onClick={() => {
                setShowAddModal(true);
                setFormData({ companyName: "",
                  industry: "",
                  founderYear: "",
                  registerNum: "",
                  address: "",
                  country: "",
                  state: "",
                  phonenumber: "",
                  companyWebsite: "",
                  email: "",
                  username: "",
                  role: "admin",
                  password: "",
                  document: null,})
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
              <tr className="text-sm font-medium text-gray-700 text-center">
                <th className="px-4 md:px-6 py-4 ">COMPANY NAME</th>
                <th className="px-4 md:px-6 py-4 ">EMAIL</th>
                <th className="px-4 md:px-6 py-4">PHONE NUMBER</th>
                <th className="px-4 md:px-6 py-4">REGISTRATION NUMBER</th>
                <th className="px-4 md:px-6 py-4 ">YEAR</th>
                <th className="px-4 md:px-6 py-4 ">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <tr key={index} className="text-left">
                  <td className="border px-4 py-2">{company.companyName}</td>
                  <td className="border px-4 py-2">{company.email}</td>
                  <td className="border px-4 py-2">{company.phonenumber}</td>
                  <td className="border px-4 py-2">{company.registerNum}</td>
                  <td className="border px-4 py-2">{company.founderYear}</td>
                  <td className="py-4 px-6 flex gap-3 border">
                    <div
                      whileHover={{ scale: 1.1 }}
                      className="text-yellow-500 hover:text-gray-600"
                      onClick={() => editCompany(company)}
                    >
                      <EditOutlinedIcon />
                    </div>
                    <div
                      whileHover={{ scale: 1.1 }}
                      className="text-red-500 hover:text-gray-600"
                      onClick={() => handleDeleteClick(company.id)} // Pass company ID
                    >
                      <DeleteOutlineOutlinedIcon />
                    </div>
                  </td>
                </tr>
              ))  ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* popup for delete */}
        {isModalOpenPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete this company?
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setIsModalOpenPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={deleteCompany}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add or Edit Company form */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
            {/* Close/Cross Icon Button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Business Registration
            </h1>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(activeCard / totalCards) * 100}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Card 1: Founder Information */}
              <div
                className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
                  activeCard === 1 ? "block" : "hidden"
                }`}
              >
                <div className="bg-blue-600 rounded-t-lg px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Founder Information
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={nextCard}
                      disabled={isNextDisabled()}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
    ${
      isNextDisabled()
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              {/* Card 2: Company Information */}
              <div
                className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
                  activeCard === 2 ? "block" : "hidden"
                }`}
              >
                <div className="bg-blue-600 rounded-t-lg px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Company Information
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Industry Type
                    </label>
                    <input
                      type="text"
                      id="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="founderYear"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Year Founded
                      </label>
                      <input
                        type="date"
                        id="founderYear"
                        value={formData.founderYear}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="registerNum"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Registration Number
                      </label>
                      <input
                        type="text"
                        id="registerNum"
                        value={formData.registerNum}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={prevCard}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={nextCard}
                      disabled={isNextDisabled()}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
    ${
      isNextDisabled()
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Contact Information */}
              <div
                className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
                  activeCard === 3 ? "block" : "hidden"
                }`}
              >
                <div className="bg-blue-600 rounded-t-lg px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Contact Information
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Country
  </label>
  <Select
    options={Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }))}
    value={
      formData.country
        ? {
            value: Country.getAllCountries().find(
              (c) => c.name === formData.country
            )?.isoCode,
            label: formData.country,
          }
        : null
    }
    onChange={handleCountryChange}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    placeholder="Select Country"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    State/Province
  </label>
  <Select
    options={
      formData.country
        ? State.getStatesOfCountry(
            Country.getAllCountries().find(
              (c) => c.name === formData.country
            )?.isoCode
          ).map((state) => ({
            value: state.isoCode,
            label: state.name,
          }))
        : []
    }
    value={
      formData.state
        ? {
            value: State.getStatesOfCountry(
              Country.getAllCountries().find(
                (c) => c.name === formData.country
              )?.isoCode
            ).find((s) => s.name === formData.state)?.isoCode,
            label: formData.state,
          }
        : null
    }
    onChange={handleStateChange}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    placeholder="Select State"
    isDisabled={!formData.country}
  />
</div>

                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phonenumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phonenumber"
                        max={10}
                        min={10}
                        value={formData.phonenumber}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyWebsite"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Website
                      </label>
                      <input
                        type="url"
                        id="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={prevCard}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextCard}
                      disabled={isNextDisabled()}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
    ${
      isNextDisabled()
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Company document */}
              <div
                className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
                  activeCard === 4 ? "block" : "hidden"
                }`}
              >
                <div className="bg-blue-600 rounded-t-lg px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Company document
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="mt-2">
                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="document"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="document"
                              name="document"
                              type="file"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formData.document
                            ? formData.document.name
                            : "PNG, JPG, GIF up to 10MB"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevCard}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>

                    <button
                      onClick={nextCard}
                      disabled={isNextDisabled()}
                      type="submit"
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
                    ${
                      isNextDisabled()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    >
                      Submit Registration
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
