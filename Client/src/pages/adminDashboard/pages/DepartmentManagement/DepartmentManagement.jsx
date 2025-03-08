import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router';

const DepartmentManagement = () => {
    // Sample data for the table
    const initialData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' }
    ];

    const [searchTerm, setSearchTerm] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Filter data based on search term
    const filteredData = initialData.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Pagination handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };
    const navigate = useNavigate();
    const handleCompany = () => {
        navigate("/admin/company-management");
    }
    return (
        <div className="flex flex-col">
            <div className="p-4 bg-white rounded-lg shadow-lg">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Department Management
                    </h1>
                </div>

                {/* Search Field */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                    <div className="relative w-full max-w-md bg-gray-50 mb-6">
                        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500"
                            placeholder="Search by name, email or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleCompany} className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >Back</button>
                    </div>
                </div>


                <div className="bg-white shadow-xl rounded-xl overflow-hidden min-h-screen">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-500 to-blue-600">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Name</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Email</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Role</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length > 0 ? (
                                currentItems.map((person) => (
                                    <tr key={person.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 text-center">{person.name}</div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 text-center">{person.email}</div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 text-center">{person.role}</div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-2 text-sm text-gray-500 text-center">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredData.length > 0 && (
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

                        <div className="flex items-center">
                            <span className="text-sm text-gray-700 mr-4">
                                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0}-
                                {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
                            </span>

                            <div className="flex border border-gray-300 rounded divide-x">
                                <button
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-indigo-600 hover:bg-indigo-50"
                                        }`}
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page Numbers */}
                                <div className="flex divide-x border-gray-300">
                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        // Logic to show pages around current page
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-1 ${currentPage === pageNum
                                                        ? "bg-indigo-100 text-indigo-700 font-medium"
                                                        : "text-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className={`px-3 py-1 ${currentPage === totalPages || totalPages === 0
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-indigo-600 hover:bg-indigo-50"
                                        }`}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentManagement;

