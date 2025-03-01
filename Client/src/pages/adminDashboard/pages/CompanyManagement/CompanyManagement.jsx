import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
 
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
    role:"admin",
    password: "",
    document: null,
  });

  const handleCountryChange = (selectedCountry) => {
    setFormData({
      ...formData,
      country: selectedCountry ? selectedCountry.name : "",
      state: "", // Reset state when country changes
    });
  };

  const handleStateChange = (selectedState) => {
    setFormData({
      ...formData,
      state: selectedState ? selectedState.name : "",
    });
  };

  // searchbar filter
  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, companies]);

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
  const handleCancel = () => {
    setShowAddModal(false);
  };

  const [activeCard, setActiveCard] = useState(1);
  const totalCards = 4;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      document: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const nextCard = () => {
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
                <th className="hidden md:table-cell px-6 py-4 text-left">
                  {" "}
                  LAST AUDIT
                </th>
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
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
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
                          name: country.name,
                        }))}
                        onChange={handleCountryChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2X"
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
                                name: state.name,
                              }))
                            : []
                        }
                        onChange={handleStateChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500  "
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
                        htmlFor="companyWebsite "
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Website 
                      </label>
                      <input
  type="url"
  id="companyWebsite" // Remove the space here
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
