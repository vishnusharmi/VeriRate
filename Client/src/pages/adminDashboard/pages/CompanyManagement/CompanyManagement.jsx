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
    email: "",
    username: "",
    role: "Employee Admin",
    password: "",
    document: null,
    departments: [{ name: "", code: "" }]
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
      role: company.role || "Employee Admin",
      password: company.password || "",
      document: company.document || null,
      departments: [{ name: "", code: "" }]
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
