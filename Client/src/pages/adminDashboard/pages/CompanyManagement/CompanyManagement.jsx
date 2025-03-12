import  { useState, useEffect, useContext } from "react";
import { ToastContainer,toast } from "react-toastify";
import CompanyTable from "./CompanyTable";
import CompanyHeader from "./CompanyHeader";
import CreateCompany from "./CreateCompany";
import axiosInstance from "../../../../middleware/axiosInstance";
import PaginationControls from "../../../../components/Pagination/PaginationControls";


const CompanyManagement = () => {
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
    role: "Employee Admin",
    departments: [{ name: "", departmentCode: "" }]
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  
const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };
  
  const handlePageSizeChange = (newSize) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1, // Reset to first page
    }));
  };
  

  const handleCancel = () => {
    setShowAddModal(false);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/get-companies`, {
        params: {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      });
  
      console.log("API Response:", response.data);
  
      const totalRecords = parseInt(response.data?.companies?.totalRecords) || 0;
      const pageSize = parseInt(response.data?.companies?.pageSize) || pagination.pageSize;
      const computedTotalPages = Math.max(Math.ceil(totalRecords / pageSize), 1); // Ensure at least 1 page
  
      setPagination((prev) => ({
        ...prev,
        totalRecords,
        totalPages: computedTotalPages,
        currentPage: Math.min(prev.currentPage, computedTotalPages), // Prevent invalid page
      }));
  
      setCompanies(response.data?.companies?.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]); // Ensure an empty array in case of an error
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchCompanies();
  }, [pagination.currentPage, pagination.pageSize]);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter((company) =>
        company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit && selectedCompanyId) {
      await updateCompany(selectedCompanyId, formData);
    } else {
      await addCompany(formData);
    }

    setShowAddModal(false);
  };

  const addCompany = async (formData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/create-company`, formData);
      toast.success(response.data.message);
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add company!");
    } finally {
      setLoading(false);
    }
  };

  const editCompany = async (company) => {
    setSelectedCompanyId(company.id);
    setFormData({
      companyName: company.companyName || "",
      email: company.email || "",
      phonenumber: company.phonenumber || "",
      address: company.address || "",
      industry: company.industry || "",
      country: company.country || "",
      state: company.state || "",
      registerNum: company.registerNum || "",
      founderYear: company.founderYear || "",
      companyWebsite: company.companyWebsite || "",
      role: company.role || "Employee Admin",
      departments: company.departments?.map(dept => ({
        name: dept.name,
        departmentCode: dept.departmentCode
      })) || [{ name: "", departmentCode: "" }]
    });

    setShowAddModal(true);
    setIsEdit(true);
  };

  const updateCompany = async (id, formData) => {
    console.log(formData);
    
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/update-company/${id}`, formData
      );
      console.log(response);
      
      toast.success(response.data.message);
      fetchCompanies();
      setCompanies(prev =>
        prev.map(company => company.id === id ? response.data.companies : company)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update company!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/delete-company/${id}`);
      toast.success("Company deleted successfully!");
      setCompanies(prev => prev.filter(company => company.id !== id));
    } catch (error) {
      toast.error("Failed to delete company!");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="m-h-screen w-full p-3 pl-4 bg-gray-100 overflow-auto">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <CompanyHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          companies={companies}
          setShowAddModal={setShowAddModal}
          setFormData={setFormData}
        />
        <CompanyTable
          filteredCompanies={filteredCompanies}
          editCompany={editCompany}
          deleteCompany={deleteCompany}
        
        />
        <PaginationControls
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
      {showAddModal && (
        <CreateCompany
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          showAddModal={showAddModal}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default CompanyManagement;
// import { useState, useEffect, useContext } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import CompanyTable from "./CompanyTable";
// import CompanyHeader from "./CompanyHeader";
// import CreateCompany from "./CreateCompany";
// import axiosInstance from "../../../../middleware/axiosInstance";
// import PaginationControls from "../../../../components/Paginations/PaginationControls";

// const CompanyManagement = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     industry: "",
//     founderYear: "",
//     registerNum: "",
//     address: "",
//     country: "",
//     state: "",
//     phonenumber: "",
//     companyWebsite: "",
//     role: "Employee Admin",
//     departments: [{ name: "", departmentCode: "" }],
//   });
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [pagination, setPagination] = useState({
//     totalRecords: 0,
//     totalPages: 1,
//     currentPage: 1,
//     pageSize: 10,
//   });
//   const handlePageChange = (newPage) => {
//     console.log("Changing page to:", newPage);

//     // Ensure newPage is a number and valid
//     const pageNumber = parseInt(newPage);
//     if (
//       isNaN(pageNumber) ||
//       pageNumber < 1 ||
//       pageNumber > pagination.totalPages
//     ) {
//       console.warn("Invalid page number:", newPage);
//       return;
//     }

//     setPagination((prev) => ({
//       ...prev,
//       currentPage: pageNumber,
//     }));
//   };

//   const handlePageSizeChange = (newSize) => {
//     console.log("Changing page size to:", newSize);

//     // Ensure newSize is a number and valid
//     const sizeNumber = parseInt(newSize);
//     if (isNaN(sizeNumber) || sizeNumber < 1) {
//       console.warn("Invalid page size:", newSize);
//       return;
//     }

//     setPagination((prev) => ({
//       ...prev,
//       pageSize: sizeNumber,
//       currentPage: 1, // Reset to first page when changing page size
//     }));
//   };
//   const handleCancel = () => {
//     setShowAddModal(false);
//   };

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`/get-companies`, {
       
//         params: {
//           page: pagination.currentPage,
//           pageSize: pagination.pageSize,
//         },
//       });
//       // const response = await axiosInstance.get(`/get-companies`);
//       console.log(response);
//       const companyData = response.data?.companies;
//       setPagination({
//         currentPage: parseInt(companyData.currentPage) || 1,
//         pageSize: parseInt(companyData.pageSize) || 10,
//         totalPages: parseInt(companyData.totalPages) || 1,
//         totalRecords: parseInt(companyData.totalRecords) || 0,
//       });
//       setCompanies(response.data?.companies?.data || []);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       setCompanies([]); // Ensure it's an array even on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const filteredCompanies = Array.isArray(companies)
//     ? companies.filter((company) =>
//         company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isEdit && selectedCompanyId) {
//       await updateCompany(selectedCompanyId, formData);
//     } else {
//       await addCompany(formData);
//     }

//     setShowAddModal(false);
//   };

//   const addCompany = async (formData) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post(`/create-company`, formData);
//       toast.success(response.data.message);
//       fetchCompanies();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add company!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const editCompany = async (company) => {
//     setSelectedCompanyId(company.id);
//     setFormData({
//       companyName: company.companyName || "",
//       email: company.email || "",
//       phonenumber: company.phonenumber || "",
//       address: company.address || "",
//       industry: company.industry || "",
//       country: company.country || "",
//       state: company.state || "",
//       registerNum: company.registerNum || "",
//       founderYear: company.founderYear || "",
//       companyWebsite: company.companyWebsite || "",
//       role: company.role || "Employee Admin",
//       departments: company.departments?.map((dept) => ({
//         name: dept.name,
//         departmentCode: dept.departmentCode,
//       })) || [{ name: "", departmentCode: "" }],
//     });

//     setShowAddModal(true);
//     setIsEdit(true);
//   };

//   const updateCompany = async (id, formData) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.put(
//         `/update-company/${id}`,
//         formData
//       );
//       toast.success(response.data.message);
//       fetchCompanies();
//       setCompanies((prev) =>
//         prev.map((company) =>
//           company.id === id ? response.data.companies : company
//         )
//       );
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update company!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteCompany = async (id) => {
//     try {
//       setLoading(true);
//       await axiosInstance.delete(`/delete-company/${id}`);
//       toast.success("Company deleted successfully!");
//       setCompanies((prev) => prev.filter((company) => company.id !== id));
//     } catch (error) {
//       toast.error("Failed to delete company!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="m-h-screen w-full p-3 pl-4 bg-gray-100 overflow-auto">
//       <ToastContainer />
//       <div className="max-w-6xl mx-auto">
//         <CompanyHeader
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           companies={companies}
//           setShowAddModal={setShowAddModal}
//           setFormData={setFormData}
//         />
//         <CompanyTable
//           filteredCompanies={filteredCompanies}
//           editCompany={editCompany}
//           deleteCompany={deleteCompany}
//           page={page}
//           totalPages={totalPages}
//           handlePageChange={handlePageChange} // Pass pagination data
//         />
//         <PaginationControls
//           pagination={pagination}
//           handlePageChange={handlePageChange}
//           handlePageSizeChange={handlePageSizeChange}
//         />
//       </div>
//       {showAddModal && (
//         <CreateCompany
//           handleCancel={handleCancel}
//           handleSubmit={handleSubmit}
//           showAddModal={showAddModal}
//           loading={loading}
//           formData={formData}
//           setFormData={setFormData}
//           setLoading={setLoading}
//         />
//       )}
//     </div>
//   );
// };

// export default CompanyManagement;
