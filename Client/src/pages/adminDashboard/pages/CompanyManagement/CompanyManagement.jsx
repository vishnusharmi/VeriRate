import  { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../components/Context/Contextapi";
import { ToastContainer,toast } from "react-toastify";
import CompanyTable from "./CompanyTable";
import CompanyHeader from "./CompanyHeader";
import CreateCompany from "./CreateCompany";


const baseURL = import.meta.env.VITE_API_BASE_URL;    

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
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleCancel = () => {
    setShowAddModal(false);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/get-companies`, {
        headers: {
          "authorization": `Bearer ${token}`
        },
        params: { page }  // Send current page number
      });
      setPage(response.data?.page || 1);
      setTotalPages(response.data?.totalPages || 1);
      setTotalRecords(response.data?.totalRecords || 0);
      setCompanies(response.data?.companies?.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]); // Ensure it's an array even on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);  // Fetch companies when page changes

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
      const response = await axios.post(`${baseURL}/create-company`, formData, {
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        }
      });
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
    try {
      setLoading(true);
      const response = await axios.put(`${baseURL}/update-company/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        }
      });
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
      await axios.delete(`${baseURL}/delete-company/${id}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      toast.success("Company deleted successfully!");
      setCompanies(prev => prev.filter(company => company.id !== id));
    } catch (error) {
      toast.error("Failed to delete company!");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen w-full p-3 pl-4 bg-gray-100 overflow-auto">
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
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}  // Pass pagination data
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
