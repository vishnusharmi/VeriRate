import { useState } from 'react';
import { ChevronLeft, Search } from "lucide-react";
import { useLocation, useNavigate } from 'react-router';

const DepartmentManagement = () => {
    const location = useLocation();
    const company = location.state?.company || { companyName: '', departments: [] };
    const [searchTerm, setSearchTerm] = useState('');

    // Filter departments based on search term
    const filteredDepartments = company.departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.departmentCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();
    const handleCompany = () => {
        navigate("/admin/company-management");
    };

    return (
        <div className="flex flex-col">
            <div className="p-4 bg-white rounded-lg">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
                </div>

                {/* Search Field */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative w-full max-w-md bg-gray-50 mb-6">
                        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500"
                            placeholder="Search by department name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleCompany}
                        className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    ><ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-500 to-blue-600">   <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Company Name</th>
                                <th className="pr-10 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Department Name</th>
                                <th className="px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider text-center">Department Code</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDepartments.length > 0 ? (
                                    filteredDepartments.map((department) => (
                                        <tr key={department.departmentCode} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="pl-10 py-2 whitespace-nowrap text-center font-medium">{company.companyName}</td>
                                            <td className="pr-20 py-2 whitespace-nowrap text-center">{department.name}</td>
                                            <td className="pr-30 py-2 whitespace-nowrap text-center">{department.departmentCode}</td>
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
                </div>
            </div>
        </div>
    );
};

export default DepartmentManagement;