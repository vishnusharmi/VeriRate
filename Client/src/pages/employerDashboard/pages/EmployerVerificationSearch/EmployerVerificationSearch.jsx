import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./DashboardComponent";
import FilterButtons from "./FilterButtonsComponent";
import SearchComponent from "./SearchComponent";
import Tabs from "./TabsComponent";
import CardsComponent from "./CardsComponent";
import { toast } from "react-toastify";
import axiosInstance from "../../../../middleware/axiosInstance";

// ENUM Definition
const VerificationStatus = {
  VERIFIED: "Verified",
  PENDING: "Pending",
};

// VerificationDialog Component
const VerificationDialog = ({ isOpen, onClose, employment, onVerify }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !employment) return null;

  const companyName =
    Array.isArray(employment.company) && employment.company.length > 0
      ? employment.company[0].company
      : typeof employment.company === "string"
      ? employment.company
      : "N/A";

  const handleVerify = async () => {
    setIsSubmitting(true);
    try {
      const result = await onVerify(employment);
      if (result) {
        onClose();
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Failed to verify employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,50%)] h-screen flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Verify Employment</h2>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {employment.name}
          </div>
          <div>
            <strong>Company:</strong> {employment.company_name}
          </div>
          <div>
            <strong>Position:</strong> {employment.position}
          </div>
          <div>
            <strong>Email:</strong> {employment.email}
          </div>
          <div>
            <strong>Verification Status:</strong>
            {employment.is_verified === VerificationStatus.VERIFIED ? (
              <span className="text-green-600"> Verified</span>
            ) : (
              <span className="text-yellow-600"> Pending</span>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {employment.is_verified !== VerificationStatus.VERIFIED && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleVerify}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// EmploymentVerificationSearch Component
const EmploymentVerificationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchEmployees(signal);

    return () => controller.abort();
  }, []);

  const fetchEmployees = async (signal) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/all", { signal });
      const formattedEmployees =
        response?.data?.employees?.data?.map((employee) => ({
          id: employee.id || "N/A",
          name: `${employee.first_name} ${employee.last_name}`.trim() || "N/A",
          email: employee.User.email || "N/A",
          position: employee.position || "N/A",
          salary: employee.salary || "N/A",
          phone_number: employee.phone_number || "N/A",
          qualification: employee.qualification || "N/A",
          address: employee.address || "N/A",
          bankAccount: employee.bankAccount || "N/A",
          bankName: employee.bankName || "N/A",
          IFSCcode: employee.IFSCcode || "N/A",
          is_verified:
            employee.is_verified === "Verified"
              ? VerificationStatus.VERIFIED
              : VerificationStatus.PENDING,
          employment_history: employee.employment_history || "N/A",
          company_name: employee.Company.companyName || "N/A",
        })) || [];

      setEmployees(formattedEmployees);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        "Error fetching data from the API: " + (err.message || "Unknown error")
      );
      setLoading(false);
    }
  };

  const handleVerify = async (employee) => {
    try {
      const employeeId = employee.id || employee.employeeId;
      console.log("Verifying Employee:", employeeId);

      const updatePayload = {
        ...employee.originalData,
        is_verified: VerificationStatus.VERIFIED,
      };

      const response = await axiosInstance.put(
        `"/update"/${employeeId}`,
        updatePayload
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Axios Response:", response.data);
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employee.id
              ? { ...emp, is_verified: VerificationStatus.VERIFIED }
              : emp
          )
        );

        toast.success("Employee verification successful!");
        return true;
      } else {
        throw new Error(`Failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error(`Failed to verify employee: ${error.message}`);
      return false;
    }
  };
  const filteredEmployees = employees
    .filter((employee) => {
      if (!searchQuery) return true;
      let searchField =
        searchType === "name"
          ? employee.name
          : searchType === "email"
          ? employee.email
          : employee.id;
      return String(searchField || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    })
    .filter((employee) => {
      return (
        activeFilter === "All" ||
        (activeFilter === "Verified" &&
          employee.is_verified === VerificationStatus.VERIFIED) ||
        (activeFilter === "Pending" &&
          employee.is_verified === VerificationStatus.PENDING)
      );
    });
  return (
    <div className="bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 pt-2">
          Employment Verification System
        </h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 0 ? (
          <>
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchType={searchType}
              setSearchType={setSearchType}
            />
            <FilterButtons
              filters={["All", "Verified", "Pending"]}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              fetchEmployees={fetchEmployees}
            />
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredEmployees.length === 0 ? (
              <p>No employees found</p>
            ) : (
              <CardsComponent
                filteredEmploymentHistory={filteredEmployees}
                onVerifyClick={setSelectedEmployee}
              />
            )}
          </>
        ) : (
          <Dashboard />
        )}
      </div>
      <VerificationDialog
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        employment={selectedEmployee}
        onVerify={handleVerify}
      />
    </div>
  );
};

export default EmploymentVerificationSearch;
