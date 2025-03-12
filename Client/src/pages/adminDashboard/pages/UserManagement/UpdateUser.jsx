import React from 'react'
import {useState,useEffect } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import axiosInstance from "../../../../middleware/axiosInstance"
import {  toast } from "react-toastify"

const UpdateUser = ({editModalOpen,setEditModalOpen,selectedUser,formData,setIsUpdated,isUpdated,setFormData,companies,employmentHistory,setEmploymentHistory}) => {

    const [step, setStep] = useState(1)

    // formating the date to read in input
    const formatDateForInput = (isoDate) => {
      if (!isoDate) return "";
      return new Date(isoDate).toISOString().split("T")[0];
    };

    // handle change for update
    const handleChange = (e, index = null) => {
      const { name, value } = e.target;
    
      // Capitalize first letter of first_name and last_name
      const formattedValue = (name === "first_name" || name === "last_name")
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
    
      if (index !== null) {
        const updatedEmploymentHistory = employmentHistory.map((job, i) =>
          i === index ? { ...job, [name]: formattedValue } : job
        );
    
        setEmploymentHistory(updatedEmploymentHistory);
        setFormData((prev) => ({
          ...prev,
          employment_history: updatedEmploymentHistory,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    };
    
  
    // Populate form data when editing a user
   useEffect(() => {
      if (editModalOpen && selectedUser) {
        try {

          const employmentHistoryData = Array.isArray(selectedUser.Employee?.employment_history) 
          ? selectedUser.Employee.employment_history 
          : [];

          const formattedEmploymentHistory = employmentHistoryData.map((history) => ({
            company: history.company || "",
            description: history.description || "",
            startDate: formatDateForInput(history.startDate) || "",
            endDate: formatDateForInput(history.endDate) || "",
            jobTitle: history.jobTitle || "",
          })) || [];
          setFormData({
            id: selectedUser?.id || "",
            empId:selectedUser.Employee?.id,
            email: selectedUser.email || "",
            role: selectedUser.role || "",
            first_name: selectedUser.Employee?.first_name || "",
            last_name: selectedUser.Employee?.last_name || "",
            gender: selectedUser.Employee?.gender || "",
            dateOfBirth: formatDateForInput(selectedUser.Employee?.dateOfBirth) || "",
            phone_number: selectedUser.Employee?.phone_number || "",
            qualification: selectedUser.Employee?.qualification || "",
            address: selectedUser.Employee?.address || "",
            permanent_address: selectedUser.Employee?.permanent_address || "",
            is_verified: selectedUser.Employee?.is_verified || "",
            employee_type: selectedUser.Employee?.employee_type || "",
            company_id: selectedUser.Employee?.company_id || "",
            salary: selectedUser.Employee?.salary || "",
            dateOfJoin: formatDateForInput(selectedUser.Employee?.dateOfJoin) || "",
            pf_account: selectedUser.Employee?.pf_account || "",
            UPI_Id: selectedUser.Employee?.UPI_Id || "",
            panCard: selectedUser.Employee?.panCard || "",
            aadharCard: selectedUser.Employee?.aadharCard || "",
            bankAccount: selectedUser.Employee?.bankAccount || "",
            IFSCcode: selectedUser.Employee?.IFSCcode || "",
            bankName: selectedUser.Employee?.bankName || "",
            employment_history: formattedEmploymentHistory,
          })
          setEmploymentHistory(formattedEmploymentHistory)
          setStep(1)
        } catch (error) {
          console.error("Error preparing employee data for edit:", error)
          toast.error("Something went wrong while loading employee data")
        }
      }
    }, [editModalOpen, selectedUser])
  
  // Edit user
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
    const userData = {
      id: formData.id,
      email: formData.email, 
      role: formData.role,
      username : `${formData.first_name } ${formData.last_name}`,
      Employee: {
        id:Number(formData.empId) || 0,
        first_name: formData.first_name || "",
        last_name: formData.last_name || "",
        gender: formData.gender || "",
        dateOfBirth: formData.dateOfBirth || null,
        phone_number: formData.phone_number || "",
        qualification: formData.qualification || "",
        address: formData.address || "",
        permanent_address: formData.permanent_address || "",
        is_verified: formData.is_verified || "Pending",
        employee_type: formData.employee_type || "",
        company_id: Number(formData.company_id) || null,
        salary: Number(formData.salary) || 0,
        dateOfJoin: formData.dateOfJoin || null,
        pf_account: formData.pf_account || "",
        UPI_Id: formData.UPI_Id || "",
        employment_history: Array.isArray(employmentHistory) ? employmentHistory : [],
          
        panCard: formData.panCard || "",
        aadharCard: formData.aadharCard || "",
        bankAccount: formData.bankAccount || "",
        IFSCcode: formData.IFSCcode || "",
        bankName: formData.bankName || "",
      },
    };
    const userId = Number(userData.id)
      const response = await axiosInstance.put(`/users/${userId}`,userData )
      console.log("Update response:", response.data)
      toast.success("Employee updated successfully!")
      setIsUpdated(!isUpdated)
      setEditModalOpen(false)
    } catch (error) {
      console.error("Error updating employee:", error)
      toast.error("Something went wrong, try again")
    }
  }

  const handleAddEmploymentHistory = () => {
    setEmploymentHistory((prev) =>
      prev.length > 0 ? prev : [{ company: "", jobTitle: "", startDate: "", endDate: "", description: "" }],
    )
    setStep(4)
  }
  
  return (
    <>
     {/* Edit User Modal */}
     {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gray-500/50 bg-opacity-50"></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg w-full max-w-lg p-4 shadow-lg border border-gray-300 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold pb-2">Edit User</h2>
              <button onClick={() => setEditModalOpen(false)} aria-label="Close" className="text-black p-4">
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
                <span className={step === 1 ? "text-blue-600 font-medium" : ""}>Personal Info</span>
                <span className={step === 2 ? "text-blue-600 font-medium" : ""}>Employment Details</span>
                <span className={step === 3 ? "text-blue-600 font-medium" : ""}>Documents & Banking</span>
              </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name :</label>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="First Name"
                      value={formData.first_name}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name :</label>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Last Name"
                      value={formData.last_name}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email :</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter Email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role :</label>
                    <input
                      type="text"
                      name="role"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter Role"
                      value={formData.role}
                      required
                      readOnly
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender :</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth :</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number :</label>
                    <input
                      type="tel"
                      name="phone_number"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="+1 (123) 456-7890"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification :</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Address :</label>
                    <textarea
                      name="address"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows={2}
                      placeholder="Enter current address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address :</label>
                    <textarea
                      name="permanent_address"
                      className="w-full p-1.5 border border-gray-300 rounded-lg"
                      rows={2}
                      placeholder="Enter permanent address"
                      required
                      value={formData.permanent_address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 font-semibold text-black rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Employment Details */}
            {step === 2 && (
              <div className='max-h-[65vh] overflow-y-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee type :</label>
                    <select
                      name="employeeType"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.employee_type}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee is_verified :</label>
                    <select
                      name="is_verified"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.is_verified}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select verified or not</option>
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company :</label>
                    <select
                      name="company_id"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.company_id}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select a Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining*</label>
                    <input
                      type="date"
                      name="dateOfJoin"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfJoin}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PF Account :</label>
                    <input
                      type="text"
                      name="pf_account"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter PF Account"
                      required
                      value={formData.pf_account}
                      onChange={handleChange}
                    />
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID :</label>
                    <input
                      type="text"
                      name="UPI_Id"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter UPI ID"
                      required
                      value={formData.UPI_Id}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employment History */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Employment History :</label>
                    <button
                      type="button"
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={handleAddEmploymentHistory}
                    >
                      <span className="text-2xl font-semibold text-blue-800 m-2">+ </span> Add Employment History
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
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
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
                    <label className="block font-medium text-gray-700 mb-1 ">PAN Card :</label>
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
                    <label className="block font-medium text-gray-700 mb-1">Aadhar Card :</label>
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
                    <label className="block font-medium text-gray-700 mb-1">Bank Account Number :</label>
                    <input
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleChange}
                      placeholder="Enter Bank Account Number"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Bank Name :</label>
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
                    <label className="block font-medium text-gray-700 mb-1">IFSC Code :</label>
                    <input
                      type="text"
                      name="IFSCcode"
                      value={formData.IFSCcode}
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
                      className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      update Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* step-4 : Add employment history */}
            {step === 4 && (
              <div className="rounded-lg shadow-sm bg-white">
                <h2 className="text-lg font-semibold">Employment History</h2>
                {(employmentHistory || []).map((job, index) => (
                  <div key={index} className="p-2 rounded-lg mb-2">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Company Name :</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Previous Company Name"
                        value={job.company || ""}
                        onChange={(e) => handleChange(e,index)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Job Title :</label>
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder="e.g., Senior Developer"
                        value={job.jobTitle || ""}
                        onChange={((e) => handleChange(e,index))}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date :</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="startDate"
                            value={job.startDate || ""}
                            onChange={((e) => handleChange(e,index))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date :</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="endDate"
                            value={job.endDate || ""}
                            onChange={((e) => handleChange(e,index))}
                            className="w-full border rounded px-3 py-2"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Description :</label>
                      <textarea
                        name="description"
                        placeholder="Briefly describe your responsibilities and achievements"
                        value={job.description || ""}
                        onChange={((e) => handleChange(e,index))}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors mr-4 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        className="px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
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
    </>
  )
}

export default UpdateUser