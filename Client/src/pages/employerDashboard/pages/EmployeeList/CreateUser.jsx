"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CloseIcon from "@mui/icons-material/Close"
import axiosInstance from "../../../../middleware/axiosInstance"

const UserFormModals = ({
  addModalOpen,
  deleteModalOpen,
  selectedUser,
  companies,
  setAddModalOpen,
  setDeleteModalOpen,
  onFormSubmit,
  onDeleteUser,
  formData,
  setFormData,
  employmentHistory,
  setEmploymentHistory,
  handleChange,
  setIsUpdated,
  isUpdated,
}) => {
  const [step, setStep] = useState(1)
  const [isLoading,setIsLoading] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (addModalOpen) {
      setStep(1)
      setFormData({
        ...formData,
        employment_history: Array.isArray(employmentHistory) ? employmentHistory : [],
      })
    }
  }, [addModalOpen])

  // Form validation and navigation
  const handleNext = () => {
    const { first_name, last_name, gender, dateOfBirth, phone_number, qualification, address, permanent_address } =
      formData

    if (
      !first_name ||
      !last_name ||
      !gender ||
      !dateOfBirth ||
      !phone_number ||
      !qualification ||
      !address ||
      !permanent_address
    ) {
      toast.error("All fields are required")
      return
    }

    setStep(2)
  }
  const handletheNext = () => {
    const { employee_type, is_verified, company_id, salary, dateOfJoin, pf_account, UPI_Id } = formData

    if (!employee_type || !is_verified || !salary || !dateOfJoin || !pf_account || !UPI_Id) {
      toast.error("All fields are required")
      return
    }

    setStep(3)
  }

  //  Submit new user(post request)
  const submitData = async (e) => {
    e.preventDefault()
    try {
      const formattedData = {
        ...formData,
        company_id: companies.id,
        employment_history: employmentHistory.length ? employmentHistory : [],
      };
      const response = await axiosInstance.post("/register", formattedData );
      console.log("Employee added:", response.data)
      toast.success("Employee added successfully!")
      onFormSubmit()
    } catch (error) {
      console.error("Error adding employee:", error)
      toast.error("Something went wrong, try again...")
    }
  }

  const handleAddEmploymentHistory = () => {
    setEmploymentHistory((prev) =>
      prev.length > 0 ? prev : [{ company: "", jobTitle: "", startDate: "", endDate: "", description: "" }],
    )
    setStep(4)
  }

  const handleEmploymentHistoryChange = (e, index) => {
    const { name, value } = e.target
    setEmploymentHistory((prev) => {
      const updatedHistory = [...prev]
      updatedHistory[index] = {
        ...updatedHistory[index],
        [name]: value,
      }
      return updatedHistory
    })
  }

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
                className="text-black p-4 cursor-pointer"
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
                      name="first_name"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="First Name"
                      value={formData.first_name}
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
                      name="last_name"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Last Name"
                      value={formData.last_name}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email :
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role :
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password :
                    </label>
                    <input
                      type="text"
                      name="password"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter Password"
                      value={formData.password}
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
                      name="phone_number"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="+1 (123) 456-7890"
                      required
                      value={formData.phone_number}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address :
                    </label>
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
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 font-semibold text-black rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
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
                      name="employee_type"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee is_verified :
                    </label>
                    <select
                      name="is_verified"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={formData.is_verified}
                      required
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select verified or not
                      </option>
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company :
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                      value={companies.companyName}
                      readOnly
                      onChange={handleChange}
                    />
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
                      name="dateOfJoin"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                      value={formData.dateOfJoin}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PF Account :
                    </label>
                    <input
                      type="text"
                      name="pf_account"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter PF Account"
                      required
                      value={formData.pf_account}
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
                      name="UPI_Id"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter UPI ID"
                      required
                      value={formData.UPI_Id}
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
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={handleAddEmploymentHistory}
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
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
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
                      name="bankAccount"
                      value={formData.bankAccount}
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
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
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
                      onClick={submitData}
                      disabled={isLoading}
                      className={`px-6 py-3 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      {isLoading ? "Saving..." : "Save"}
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
                      <label className="block text-sm font-medium mb-1">
                        Company Name :
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Previous Company Name"
                        value={job.company || ""}
                        onChange={(e) =>
                          handleEmploymentHistoryChange(e, index)
                        }
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
                        value={job.jobTitle || ""}
                        onChange={(e) =>
                          handleEmploymentHistoryChange(e, index)
                        }
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
                            value={job.startDate || ""}
                            onChange={(e) =>
                              handleEmploymentHistoryChange(e, index)
                            }
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
                            value={job.endDate || ""}
                            onChange={(e) =>
                              handleEmploymentHistoryChange(e, index)
                            }
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
                        value={job.description || ""}
                        onChange={(e) =>
                          handleEmploymentHistoryChange(e, index)
                        }
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
              <span className="font-medium">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3 p-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => onDeleteUser(selectedUser?.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserFormModals

