

import React, { useState } from "react";
import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const CompanyTable = ({
    filteredCompanies = [],
    editCompany,
    deleteCompany,
}) => {
    const navigate = useNavigate();
    const [isModalOpenPopup, setIsModalOpenPopup] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleDeleteClick = (id) => {
        setSelectedCompanyId(id);
        setIsModalOpenPopup(true);
    };

    const confirmDelete = () => {
        if (selectedCompanyId && deleteCompany) {
            deleteCompany(selectedCompanyId);
            setIsModalOpenPopup(false);
        }
    };

    const handleView = (company) => {
        navigate("/admin/department", { state: { company } });
    };

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filteredCompanies)
        ? filteredCompanies.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const totalPages = Math.ceil(
        (Array.isArray(filteredCompanies) ? filteredCompanies.length : 0) / itemsPerPage
    );

    // Pagination handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div className="container mx-auto px-1 py-4">
            {/* Fixed table container with scrollable body */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                {/* Fixed table header */}
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-500 to-blue-600">
                            <tr>
                                <th className="px-6 py-3  text-xs font-semibold text-white uppercase tracking-wider text-center">
                                    COMPANY NAME
                                </th>
                                <th className="px-6 pl-20 text-xs font-semibold text-white uppercase tracking-wider text-right">
                                    EMAIL
                                </th>
                                <th className="px-6 pl-25 text-xs font-semibold text-white uppercase tracking-wider text-right">
                                    PHONE NUMBER
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">
                                    REGISTRATION NUMBER
                                </th>
                                <th className="px-6 pl-10 text-xs font-semibold text-white uppercase tracking-wider text-right">
                                    YEAR
                                </th>
                                <th className="px-6 pl-5 text-xs font-semibold text-white uppercase tracking-wider text-right">
                                    DEPARTMENT
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">
                                    ACTION
                                </th>
                            </tr>

                        </thead>
                    </table>
                </div>

                {/* Scrollable table body */}
                <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length > 0 ? (
                                currentItems.map((company, index) => (
                                    <tr
                                        key={company.id || index}
                                        className="hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <td className="px-3 md:px-6  text-xs md:text-sm text-black font-semibold text-center whitespace-nowrap">
                                            {company.companyName || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-6  text-xs md:text-sm text-gray-900 text-center hidden sm:table-cell">
                                            {company.email || "N/A"}
                                        </td>
                                        <td className="px-3 md:pr-6  text-xs md:text-sm text-gray-900 text-left hidden md:table-cell">
                                            {company.phonenumber || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-6  text-xs md:text-sm text-gray-900 text-center hidden lg:table-cell">
                                            {company.registerNum || "N/A"}
                                        </td>
                                        <td className="px-3 md:px-6  text-xs md:text-sm text-gray-900 text-center hidden xl:table-cell">
                                            {company.founderYear || "N/A"}
                                        </td>
                                        <td className="px-2 md:px-4  text-xs md:text-sm text-gray-900 text-center">
                                            <button
                                                className="cursor-pointer text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200"
                                                onClick={() => handleView(company)}
                                            >
                                                <Eye size={10} className="md:w-5 md:h-5" />
                                            </button>
                                        </td>
                                        <td className="px-2 md:px-4 py-3 md:py-2 flex justify-center space-x-2 md:space-x-4">
                                            <button
                                                className="cursor-pointer text-yellow-500 hover:text-yellow-600 hover:scale-110 transition-all duration-200"
                                                onClick={() => editCompany && editCompany(company)}
                                            >
                                                <Edit2 size={10} className="md:w-5 md:h-5" />
                                            </button>
                                            <button
                                                className="cursor-pointer text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200"
                                                onClick={() => handleDeleteClick(company.id)}
                                            >
                                                <Trash2 size={10} className="md:w-5 md:h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-4 text-center text-gray-500 text-sm"
                                    >
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Simplified Next/Previous Pagination */}
            {Array.isArray(filteredCompanies) && filteredCompanies.length > 0 && (
                <div className="flex flex-col md:flex-row items-center justify-between mt-4 px-2">
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-sm text-gray-700 mr-2">Show</span>
                        <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            {[5, 10, 25, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-700 ml-2">entries</span>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto">
                        <span className="text-sm text-gray-700 mr-4">
                            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCompanies.length)} of {filteredCompanies.length}
                        </span>

                        <div className="flex border border-gray-300 rounded divide-x">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-1 flex items-center ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                <ChevronLeft size={16} className="mr-1" />
                                Previous
                            </button>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-1 flex items-center ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Next
                                <ChevronRight size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isModalOpenPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative">
                        <button
                            onClick={() => setIsModalOpenPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4.5 w-6 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to delete this company?
                        </p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                                onClick={() => setIsModalOpenPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyTable;
