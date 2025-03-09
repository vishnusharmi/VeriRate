import  { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import CompanyTable from "./CompanyTable";
import CompanyHeader from "./CompanyHeader";
import CreateCompany from "./CreateCompany";
import { CompanyContext } from "../../../../components/Context/CompanyContext";


const CompanyManagement = () => {
  const { companies = [], addCompany, updateCompany, deleteCompany, loading } = useContext(CompanyContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    document: null,
    departments: [{ name: "", departmentCode: "" }]
  });

  const handleCancel = () => {
    setShowAddModal(false);
  };


  const filteredCompanies = (companies || []).filter(
    (company) => company && company.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit && selectedCompanyId) {
      await updateCompany(selectedCompanyId, formData);
    } else {
      await addCompany(formData);
    }

    setShowAddModal(false);
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
      document: company.document || null,
      departments: company.departments?.map(dept => ({
        name: dept.name,
        departmentCode: dept.departmentCode
      })) || [{ name: "", departmentCode: "" }]
    });

    setShowAddModal(true);
    setIsEdit(true);
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
        />
      </div>
      {showAddModal && (
        <CreateCompany
          handleCancel={handleCancel}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          handleSubmit={handleSubmit}
          showAddModal={showAddModal}
        />
      )}
    </div>
  );
};

export default CompanyManagement;
