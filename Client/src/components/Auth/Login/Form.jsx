import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../middleware/axiosInstance";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading

    const { email, password } = loginData;

    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (res.status === 200) {
        const token = res.data.loginUser.jwtToken;
        console.log(token,'token');
        
        if (token && typeof token === "string") {
          sessionStorage.setItem("tempToken", token); 
         toast.success("OTP sent to your mail");
          // Redirect after success
          setTimeout(() => {
            navigate("/otp", { state: { email: loginData.email,role:loginData.role } });
          }, 1500);
        } else {
          console.error("Invalid token received", token);
        }
      }
      console.log("Submitted:", res.data.loginUser.message);
      console.log(res);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Reset loading state if login fails

      toast.error(error.response?.data?.message || "Login failed!");
      console.log("Error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex flex-col gap-7 px-6 pt-7 pb-9 w-120"
      >
        <p className="text-3xl font-bold text-blue-500">
          Login <span className="font-normal text-[1.3rem]">to Verirate</span>
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-md">
            Email address:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="outline-none border-2 border-gray-400 p-3 focus:border-gray-600 rounded-md"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-md">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="outline-none border-2 border-gray-400 p-3 focus:border-gray-600 rounded-md"
            onChange={handleInputChange}
          />
          <Link to={"/forget-password"}>
            <span className="text-blue-400 font-medium hover:underline cursor-pointer w-fit">
              Forgot password?
            </span>
          </Link>
        </div>

        <button
          type="submit"
          className="outline-none cursor-pointer px-4 py-3 font-medium text-xl bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <ToastContainer/>
    </>
  );
};

export default Form;
