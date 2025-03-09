import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateCompany = ({
    handleCancel,
    loading,
    handleSubmit,
    showAddModal,
    formData,
    setFormData
}) => {

    const totalCards = 3;
    const [activeCard, setActiveCard] = useState(1);

    useEffect(() => {
        if (showAddModal) {
            setActiveCard(1);
        }
    }, [showAddModal]);


// handle change 
    const handleChange = (e) => {
        const { id, value } = e.target;
    
        // Keep email and companyWebsite unchanged; capitalize first letter for other fields
        const formattedValue = (id === "email" || id === "companyWebsite")
            ? value
            : value.charAt(0).toUpperCase() + value.slice(1);
    
        setFormData((prev) => ({
            ...prev,
            [id]: formattedValue,
        }));
    };


// handle country change
    const handleCountryChange = (selected) => {
        setFormData({
            ...formData,
            country: selected.label, // Store country name
            state: "", // Reset state when country changes
        });
    };

// handle state change
    const handleStateChange = (selected) => {
        setFormData({
            ...formData,
            state: selected.label, // Store state name
        });
    };

  // next button for create form
    const nextCard = () => {
        if (!validateForm()) return;
        if (activeCard < totalCards) {
            setActiveCard(activeCard + 1);
        }
    };

  // prev button for create form 
    const prevCard = () => {
        if (activeCard > 1) {
            setActiveCard(activeCard - 1);
        }
    };

  // next button isdisabled for create form
   const isNextDisabled = () => {
        if (activeCard === 1) {
            return (
                !formData.email||
                !formData.companyName ||
                !formData.industry ||
                !formData.founderYear ||
                !formData.registerNum
            );
        }
        if (activeCard === 2) {
            // Ensure there is at least one department with a name and departmentCode
            return (
                !formData.departments.length ||
                formData.departments.some(dept => !dept.name || !dept.departmentCode)
            );
        }
        if (activeCard === 3) {
            return (
                !formData.address ||
                !formData.country ||
                !formData.state ||
                !formData.phonenumber ||
                !formData.companyWebsite
            );
        }
        return false;
    };

// validation form for company
    const validateForm = () => {
        const { email, companyWebsite, phonenumber } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
        const phoneRegex = /^[0-9]{10,15}$/; // Allows only digits, 10 to 15 characters long
        if (activeCard === 1) {
            // Validate email and password
            if (!emailRegex.test(email)) {
                toast.error("Invalid email format!");
                return false;
            }
        }

        if (activeCard === 3) {
            // Validate company website and phone number
            if (!urlRegex.test(companyWebsite)) {
                toast.error("Invalid website URL format!");
                return false;
            }
            if (!phoneRegex.test(phonenumber)) {
                toast.error(
                    "Invalid phone number! It must contain only digits and be 10-15 digits long."
                );
                return false;
            }
        }

        return true;
    };

    // handling department form 
    const handleDepartmentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDepartments = [...formData.departments];
        updatedDepartments[index][name] = value;
        setFormData({
            ...formData,
            departments: updatedDepartments
        });
    };

    // adding department to create form
    const addDepartment = () => {
        setFormData({
            ...formData,
            departments: [...formData.departments, { name: '', departmentCode: '' }]
        });
    };

    // remove department in create form
    const removeDepartment = (index) => {
        const updatedDepartments = formData.departments.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            departments: updatedDepartments
        });
    };

     
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
            <div className="bg-white rounded-lg shadow-lg p-2 w-full max-w-lg relative">
                {/* Close/Cross Icon Button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer"
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

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Business Registration
                </h1>

                {/* Progress Bar */}
                <div className="w-120 bg-gray-200 rounded-full mx-2 h-2.5 mb-2">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(activeCard / totalCards) * 100}%` }}
                    ></div>
                </div>

                <form>
                   
                    {/* Card 1: Company Information */}
                    <div
                        className={`bg-white rounded-lg  transition-all duration-300 ${activeCard === 1 ? "block" : "hidden"
                            }`}
                    >
                        <div className=" rounded-t-lg px-3 pt-3">
                            <h2 className="text-lg font-semibold text-black">
                                Company Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-2">
                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="industry"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Industry Type
                                </label>
                                <input
                                    type="text"
                                    id="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="founderYear"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Year Founded
                                    </label>
                                    <input
                                        type="date"
                                        id="founderYear"
                                        value={formData.founderYear}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="registerNum"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        id="registerNum"
                                        value={formData.registerNum}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={nextCard}
                                    disabled={isNextDisabled()}
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
    ${isNextDisabled()
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 2: Department Information */}
                    <div
                        className={`bg-white rounded-lg  transition-all duration-300 ${activeCard === 2 ? "block" : "hidden"
                            }`}
                    >
                        <div className=" rounded-t-lg px-3 pt-3">
                            <h2 className="text-lg font-semibold text-black">
                                Department Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-2 overflow-y-scroll max-h-90">
                            {formData.departments.map((dept, index) => (
                                <div key={index} className="grid grid-cols-2 gap-3 items-end">
                                    <div>
                                        <label
                                            htmlFor={`departmentName-${index}`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Department Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`departmentName-${index}`}
                                            name="name"
                                            value={dept.name}
                                            placeholder="Ex: Human Resource Management"
                                            onChange={(e) => handleDepartmentChange(index, e)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`departmentCode-${index}`}
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Department Code
                                            </label>
                                             <input
                                            type="text"
                                            id={`departmentcode-${index}`}
                                            name="departmentCode"
                                            value={dept.departmentCode}
                                              placeholder="Ex: Hr"
                                            onChange={(e) => handleDepartmentChange(index, e)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                        />
                                        </div>

                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDepartment(index)}
                                                className="mt-6 p-2 text-red-600 hover:text-red-800"
                                                aria-label="Remove department"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-start mt-2">
                                <button
                                    type="button"
                                    onClick={addDepartment}
                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                    Add Department
                                </button>
                            </div>

                            <div className="pt-4 flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevCard}
                                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={nextCard}
                                    disabled={isNextDisabled()}
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
${isNextDisabled()
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 Contact Information */}
                    <div
                        className={`bg-white rounded-lg  transition-all duration-300 ${activeCard === 3 ? "block" : "hidden"
                            }`}
                    >
                        <div className=" rounded-t-lg px-3 pt-3">
                            <h2 className="text-lg font-semibold text-black">
                                Contact Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-2">
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <Select
                                        options={Country.getAllCountries().map((country) => ({
                                            value: country.isoCode,
                                            label: country.name,
                                        }))}
                                        value={
                                            formData.country
                                                ? {
                                                    value: Country.getAllCountries().find(
                                                        (c) => c.name === formData.country
                                                    )?.isoCode,
                                                    label: formData.country,
                                                }
                                                : null
                                        }
                                        onChange={handleCountryChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Select Country"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State/Province
                                    </label>
                                    <Select
                                        options={
                                            formData.country
                                                ? State.getStatesOfCountry(
                                                    Country.getAllCountries().find(
                                                        (c) => c.name === formData.country
                                                    )?.isoCode
                                                ).map((state) => ({
                                                    value: state.isoCode,
                                                    label: state.name,
                                                }))
                                                : []
                                        }
                                        value={
                                            formData.state
                                                ? {
                                                    value: State.getStatesOfCountry(
                                                        Country.getAllCountries().find(
                                                            (c) => c.name === formData.country
                                                        )?.isoCode
                                                    ).find((s) => s.name === formData.state)?.isoCode,
                                                    label: formData.state,
                                                }
                                                : null
                                        }
                                        onChange={handleStateChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Select State"
                                        isDisabled={!formData.country}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="phonenumber"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phonenumber"
                                        max={10}
                                        min={10}
                                        value={formData.phonenumber}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="companyWebsite"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Company Website
                                    </label>
                                    <input
                                        type="url"
                                        id="companyWebsite"
                                        value={formData.companyWebsite}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 border"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevCard}
                                    className="cursor-pointer *:
                    inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
          ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                        }
        `}
                                >
                                    {loading ? "Submitting..." : "Submit Registration"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Company document */}
                    {/* <div
                        className={`bg-white rounded-lg  transition-all duration-300 ${activeCard === 4 ? "block" : "hidden"
                            }`}
                    >
                        <div className=" rounded-t-lg px-3 py-2">
                            <h2 className="text-lg font-semibold text-black">
                                Company document
                            </h2>
                        </div>
                        <div className="p-6 space-y-2">
                            <div className="mt-2">
                                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="document"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="document"
                                                    name="document"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {formData.document
                                                ? formData.document.name
                                                : "PNG, JPG, GIF up to 10MB"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevCard}
                                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md 
          ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                        }
        `}
                                >
                                    {loading ? "Submitting..." : "Submit Registration"}
                                </button>
                            </div>
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default CreateCompany;


