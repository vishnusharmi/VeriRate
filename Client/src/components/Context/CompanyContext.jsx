import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../middleware/axiosInstance";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/get-companies");
      setCompanies(response.data.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (formData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/register", { formData });
      toast.success(response.data.message);
      setCompanies((prev) => [...prev, response.data.company]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add company!");
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (id, formData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("/update-company/${id}", {
        formData,
      });
      toast.success(response.data.message);
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === id ? response.data.company : company
        )
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
      await axiosInstance.delete("/delete-company/${id}");
      toast.success("Company deleted successfully!");
      setCompanies((prev) => prev.filter((company) => company.id !== id));
    } catch (error) {
      toast.error("Failed to delete company!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        fetchCompanies,
        addCompany,
        updateCompany,
        deleteCompany,
        loading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
