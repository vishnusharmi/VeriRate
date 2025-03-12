import { useState, useEffect } from "react";
import Dashboard from "./DashboardComponent";
import FilterButtons from "./FilterButtonsComponent";
import SearchComponent from "./SearchComponent";
import Tabs from "./TabsComponent";
import CardsComponent from "./CardsComponent";
import VerificationDialog from "./VerificationDialog";
import PaginationControls from "../../../../components/Pagination/PaginationControls";
import { toast } from "react-toastify";
import axiosInstance from "../../../../middleware/axiosInstance";

const VerificationStatus = {
  VERIFIED: "Verified",
  PENDING: "Pending",
};

const EmploymentVerificationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchEmployees(signal);

    return () => controller.abort();
  }, [pagination.currentPage, pagination.pageSize]);

  const fetchEmployees = async (signal) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/employee/all`, {
        signal,
        params: {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      });
      const employeeData = response?.data?.employees || {};
      const formattedEmployees =
        employeeData.data?.map((employee) => ({
          id: employee.id || "N/A",
          name: `${employee.first_name} ${employee.last_name}`.trim() || "N/A",
          email: employee.User?.email || "N/A",
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
          company_name: employee.Company?.companyName || "N/A",
          originalData: employee,
        })) || [];

      setEmployees(formattedEmployees);
      setPagination({
        currentPage: parseInt(employeeData.currentPage) || 1,
        pageSize: parseInt(employeeData.pageSize) || 10,
        totalPages: parseInt(employeeData.totalPages) || 1,
        totalRecords: parseInt(employeeData.totalRecords) || 0,
      });

      setLoading(false);
    } catch (err) {
      console.log("API Error:", err);
      setLoading(false);
      toast.error("Failed to fetch employees");
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Changing page to:", newPage);

    // Ensure newPage is a number and valid
    const pageNumber = parseInt(newPage);
    if (
      isNaN(pageNumber) ||
      pageNumber < 1 ||
      pageNumber > pagination.totalPages
    ) {
      console.warn("Invalid page number:", newPage);
      return;
    }

    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };

  const handlePageSizeChange = (newSize) => {
    console.log("Changing page size to:", newSize);

    // Ensure newSize is a number and valid
    const sizeNumber = parseInt(newSize);
    if (isNaN(sizeNumber) || sizeNumber < 1) {
      console.warn("Invalid page size:", newSize);
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pageSize: sizeNumber,
      currentPage: 1, // Reset to first page when changing page size
    }));
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
        `/employee/update/${employeeId}`,
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
      console.log("Verification Error:", error);
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
          ? employee.email // ✅ Already formatted in fetchEmployees
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
              fetchEmployees={() => {
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
                fetchEmployees();
              }}
            />
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <p className="flex justify-center mt-5 text-lg">
                No employees found
              </p>
            ) : (
              <>
                <CardsComponent
                  filteredEmploymentHistory={filteredEmployees}
                  onVerifyClick={setSelectedEmployee}
                />

                {employees.length > 0 && (
                  <PaginationControls
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                  />
                )}
              </>
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
