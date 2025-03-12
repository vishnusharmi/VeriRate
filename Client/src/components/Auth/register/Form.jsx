// import { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../../Context/Contextapi";
// import { UploadCloud } from "lucide-react";

// const Form = () => {
//     const navigate = useNavigate();
//     const { login } = useContext(AuthContext);
//     const [loading, setLoading] = useState(false);

//     // State for form fields
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         role: "Super Admin",
//         document: null,
//     });

//     // Handle input change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     // Handle document selection
//     const handledocumentChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, document: file }));
//         }
//     };

//     // Form validation
//     const validateForm = () => {
//         const { username, email, password } = formData;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!username || !email || !password) {
//             toast.error("All fields are required!");
//             return false;
//         }
//         if (!emailRegex.test(email)) {
//             toast.error("Invalid email format!");
//             return false;
//         }
//         if (password.length < 6) {
//             toast.error("Password must be at least 6 characters long!");
//             return false;
//         }
//         return true;
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setLoading(true);

//         const formDataToSend = new FormData();
//         formDataToSend.append("username", formData.username);
//         formDataToSend.append("email", formData.email);
//         formDataToSend.append("password", formData.password);
//         formDataToSend.append("role", formData.role);
//         formDataToSend.append("document", formData.document);

//         try {
//             const res = await axios.post("http://localhost:3000/api/register", formDataToSend, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             console.log(res, 'responseeee');

//             // if (res.status === 201 && res.data.response.statusCode == 400) {
//             //     toast.error(res.data.response.message)
//             // }
//             // else
//              if (res.status === 201) {
//                 toast.success("Registration successful! Redirecting...");
//                 setTimeout(() => {
//                     navigate("/admin/");
//                 }, 2000);
//             }
//         } catch (error) {
//             console.log(error)
//             if (error.response?.status === 500) {
//                 toast.error(error?.response?.data?.message || "Registration failed!");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <form
//                 onSubmit={handleSubmit}
//                 className="rounded-md shadow-lg flex flex-col gap-6 px-6 pt-4 pb-9 w-120"
//             >
//                 <p className="text-3xl font-bold text-blue-500">
//                     Register <span className="font-normal text-lg">to Verirate</span>
//                 </p>

//                 {/* Username */}
//                 <div className="flex flex-col">
//                     <label htmlFor="username" className="font-medium text-md mb-1.5">
//                         Username:
//                     </label>
//                     <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         placeholder="Enter your username"
//                         className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
//                         value={formData.username}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 {/* Email */}
//                 <div className="flex flex-col">
//                     <label htmlFor="email" className="font-medium text-md mb-1.5">
//                         Email address:
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         placeholder="Enter your email address"
//                         className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 {/* Password */}
//                 <div className="flex flex-col">
//                     <label htmlFor="password" className="font-medium text-md mb-1.5">
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         placeholder="Enter your password"
//                         className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 {/* Role Selection */}
//                 <div className="flex flex-col">
//                     <label htmlFor="role" className="font-medium text-md mb-1.5">
//                         Role:
//                     </label>
//                     <input
//                         name="role"
//                         id="role"
//                         value={formData.role}
//                         className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
//                         disabled
//                     />
//                 </div>

//                 {/* document Upload */}
//                 <div className="flex flex-col items-center">
//                     <label
//                         htmlFor="document"
//                         className="flex items-center justify-center w-full border border-blue-400 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-50 cursor-pointer transition"
//                     >
//                         <UploadCloud className="w-5 h-5 mr-2" />
//                         {formData.document ? formData.document.name : "Upload document"}
//                     </label>
//                     <input
//                         type="file"
//                         name="document"
//                         id="document"
//                         className="hidden"
//                         accept="document/*"
//                         onChange={handledocumentChange}
//                     />
//                     {/* document Preview */}
//                     {formData.document && (
//                         <img
//                             src={URL.createObjectURL(formData.document)}
//                             alt="Preview"
//                             className="mt-2 w-20 h-20 object-cover rounded-md"
//                             onLoad={(e) => URL.revokeObjectURL(e.target.src)}
//                         />
//                     )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="outline-none cursor-pointer px-4 py-3 font-medium text-xl bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white"
//                     disabled={loading}
//                 >
//                     {loading ? "Registering..." : "Register"}
//                 </button>
//             </form>
//         </>
//     );
// };

// export default Form;



import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

const Form = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // State for form fields
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "Super Admin",
        document: null,
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle document selection
    const handledocumentChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, document: file }));
        }
    };

    // Form validation
    const validateForm = () => {
        const { username, email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username || !email || !password) {
            toast.error("All fields are required!");
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("document", formData.document);

        try {
            const res = await axios.post("http://localhost:3000/api/register", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res, 'responseeee');

            // if (res.status === 201 && res.data.response.statusCode == 400) {
            //     toast.error(res.data.response.message)
            // }
            // else
             if (res.status === 201) {
                toast.success("Registration successful! Redirecting...");
                setTimeout(() => {
                    navigate("/admin/");
                }, 2000);
            }
        } catch (error) {
            console.log(error)
            if (error.response?.status === 500) {
                toast.error(error?.response?.data?.message || "Registration failed!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <form
                onSubmit={handleSubmit}
                className="rounded-md shadow-lg flex flex-col gap-6 px-6 pt-4 pb-9 w-120"
            >
                <p className="text-3xl font-bold text-blue-500">
                    Register <span className="font-normal text-lg">to Verirate</span>
                </p>

                {/* Username */}
                <div className="flex flex-col">
                    <label htmlFor="username" className="font-medium text-md mb-1.5">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-medium text-md mb-1.5">
                        Email address:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-medium text-md mb-1.5">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Role Selection */}
                <div className="flex flex-col">
                    <label htmlFor="role" className="font-medium text-md mb-1.5">
                        Role:
                    </label>
                    <input
                        name="role"
                        id="role"
                        value={formData.role}
                        className="outline-none border border-gray-400 p-2 focus:border-blue-600 rounded-md"
                        disabled
                    />
                </div>

                {/* document Upload */}
                <div className="flex flex-col items-center">
                    <label
                        htmlFor="document"
                        className="flex items-center justify-center w-full border border-blue-400 text-blue-500 py-3 px-6 rounded-md hover:bg-blue-50 cursor-pointer transition"
                    >
                        <UploadCloud className="w-5 h-5 mr-2" />
                        {formData.document ? formData.document.name : "Upload document"}
                    </label>
                    <input
                        type="file"
                        name="document"
                        id="document"
                        className="hidden"
                        accept="document/*"
                        onChange={handledocumentChange}
                    />
                    {/* document Preview */}
                    {formData.document && (
                        <img
                            src={URL.createObjectURL(formData.document)}
                            alt="Preview"
                            className="mt-2 w-20 h-20 object-cover rounded-md"
                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="outline-none cursor-pointer px-4 py-3 font-medium text-xl bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </>
    );
};

export default Form;

