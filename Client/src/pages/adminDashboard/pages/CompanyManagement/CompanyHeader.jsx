import { Search, UserPlus } from "lucide-react"; // Ensure you have lucide-react installed

const CompanyHeader = ({ searchTerm, setSearchTerm, companies, setShowAddModal, setFormData }) => {
    return (
        <>
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Company Management
                </h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                {/* Search Input */}
                <div className="relative w-full max-w-md bg-gray-50">
                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search Company Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500"
                    />
                </div>

                {/* Total Companies & Add Button */}
                <div className="flex gap-3">
                    <label className="flex items-center font-bold text-gray-700 bg-gray-50 px-3 border rounded-lg hover:bg-gray-200 cursor-pointer">
                        Total Companies: &nbsp;
                        <h3 className="font-bold text-red-600">{companies.length}</h3>
                        <input type="file" className="hidden" />
                    </label>

                    <button
                        onClick={() => {
                            setShowAddModal(true);
                            setFormData({
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
                                departments: [{ name: '',departmentCode:""}]
                            });
                        }}
                        className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <UserPlus className="h-5 w-5 mr-2" /> Add Company
                    </button>
                </div>
            </div>
        </>
    );
};

export default CompanyHeader;