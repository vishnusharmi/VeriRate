
import { useState , useEffect } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const UserModals = ({
  addModalOpen,
  setAddModalOpen,
  editModalOpen,
  setEditModalOpen,
  deleteModalOpen,
  setDeleteModalOpen,
  selectedUser,
  users,
  setUsers,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    qualification: "",
    currentAddress: "",
    permanentAddress: "",
    employeeVerified: "",
    employeeType: "",
    company :"",
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
    employment_history: "",
  });
  const [companies, setCompanies] = useState([
    { id: "1", name: "Google" },
    { id: "2", name: "Microsoft" },
    { id: "3", name: "Amazon" },
    { id: "4", name: "Tesla" },
  ]);
  const [employmentHistory, setEmploymentHistory] = useState([
    { company: "", jobTitle: "", startDate: "", endDate: "", description: "" },
  ]);


  //post

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, gender, dateOfBirth, phoneNumber, qualification,currentAddress,permanentAddress,employeeVerified,
        employeeType,company,salary,dateOfJoining,pfAccount,upiId,employeeHistory,panCard,aadharCard,bankaccount,ifscCode,bankName,employment_history } = formData;

      const response = await axios.post(
        "http://localhost:3000/api/register",
        { firstName, lastName, gender, dateOfBirth, phoneNumber, qualification
            ,currentAddress,permanentAddress,employeeVerified,
            employeeType,company,salary,dateOfJoining,pfAccount,upiId
            ,employeeHistory,panCard,aadharCard,bankaccount
            ,ifscCode,bankName,employment_history }
      );
    setAddModalOpen(false)
      console.log("Company added:", response.data);      
      toast.success("Company added successfully!")
    //   setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Something went wrong , try again...")
    }
  };


  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Apply capitalization only for specific fields
    const formattedValue =
      ["firstName", "lastName", "company"].includes(name) && value
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
  
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };
  

  // validations
  const handleNext = () => {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      qualification,
      currentAddress,
      permanentAddress,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !phoneNumber ||
      !qualification ||
      !currentAddress ||
      !permanentAddress
    ) {
      toast.error("All fields are required");
      return;
    }

    setStep(2);
  };

  const handletheNext = () => {
    const {
      employeeType,
      employeeVerified,
      company,
      salary,
      dateOfJoining,
      pfAccount,
      upiId,
      employment_history,
    } = formData;

    if (
      !employeeType ||
      !employeeVerified ||
      !company ||
      !salary ||
      !dateOfJoining ||
      !pfAccount ||
      !upiId ||
      !employment_history
    ) {
      toast.error("All fields are required");
      return;
    }

    setStep(3);
  };

  
  
  //delete request

  const deleteEmployee = async (id) => {
    if (confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/delete/${id}`
        );
        console.log("company deleted successfully", response.data);
        // setIsUpdated(!isUpdated);
        toast.success("Company deleted successfully");
        setDeleteModalOpen(false);
      } catch (error) {
        console.log("Error occured while deleting company :", error);
        toast.error("Error! Something went wrong ");
        setDeleteModalOpen(false);
      }
    }
  };

 
  const handleDeleteConfirm = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    toast.success("User deleted successfully");
    setDeleteModalOpen(false);
  };

  return (
    <>
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
              <h2 className="text-lg font-semibold pb-2">Add New User</h2>
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
                      rows={2}
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
                      rows={2}
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
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company :
                    </label>
                    <select
                      name="company"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.company}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select a Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary*
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="w-full p-2 border border-gray-300 rounded-lg"
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
                      className="w-full p-2 border border-gray-300 rounded-lg"
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
                      className="w-full p-2 border border-gray-300 rounded-lg"
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
                      className="w-full p-2 border border-gray-300 rounded-lg"
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
                      onClick={submitData}
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* step-4 : Add employment history */}
            {step === 4 && (
              <div className="rounded-lg shadow-sm bg-white">
                <h2 className="text-lg font-semibold">Employment History</h2>
                {employmentHistory.map((job, index) => (
                  <div key={index} className="p-2 rounded-lg mb-2">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Company Name :
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Previous Company Name"
                        value={formData.company || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Job Title :
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder="e.g., Senior Developer"
                        value={formData.jobTitle || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Start Date :
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          End Date :
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Description :
                      </label>
                      <textarea
                        name="description"
                        placeholder="Briefly describe your responsibilities and achievements"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
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
                      rows={2}
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
                      rows={2}
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
                    onClick={() => setStep(2)}
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
                      Company :
                    </label>
                    <select
                      name="company"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.company}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select a Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
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
                      onClick={() => setStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
             {/* Step 3: Document Details */}
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

            {/* step-4 : Add employment history */}
            {step === 4 && (
              <div className="rounded-lg shadow-sm bg-white">
                <h2 className="text-lg font-semibold">Employment History</h2>
                {employmentHistory.map((job, index) => (
                  <div key={index} className="p-2 rounded-lg mb-2">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Company Name :
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Previous Company Name"
                        value={formData.company || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Job Title :
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder="e.g., Senior Developer"
                        value={formData.jobTitle || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Start Date :
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          End Date :
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        Description :
                      </label>
                      <textarea
                        name="description"
                        placeholder="Briefly describe your responsibilities and achievements"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
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
            <h2 className="text-lg font-semibold pb-2">Delete User</h2>
            <p className="text-sm text-gray-600 my-3">
              Are you sure you want to delete{" "}
              <span className="font-medium">{}</span>? This
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
                onClick={deleteEmployee}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModals;
