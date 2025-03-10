import { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/Contextapi";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axiosInstance from "../../../middleware/axiosInstance";

const OTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState("idle");
  const [otpStatus, setOtpStatus] = useState(Array(6).fill("")); // Stores status for each digit
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { login, auth } = useContext(AuthContext);
  const email = location.state?.email;
  const role = location.state?.role;

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = otp.map((digit, i) =>
      i < pastedData.length ? pastedData[i] : digit
    );
    setOtp(newOtp);
  };

  const resendOTP = () => {
    setTimeLeft(60);
    setIsActive(true);
    setOtp(Array(6).fill(""));
    setStatus("idle");
    setOtpStatus(Array(6).fill(""));
  };

  const verifyOTP = async () => {
    setStatus("loading");
    try {
      const enteredOtp = otp.join("");
      const tempToken = sessionStorage.getItem("tempToken"); 

      if (!tempToken) {
        throw new Error("Session expired. Please log in again.");
      }

      const response = await axiosInstance.post("/otp", {
        email,
        otp: enteredOtp,
      });

      // console.log(response);

      if (response.status === 200){

        sessionStorage.setItem("authToken", tempToken); 
        sessionStorage.removeItem("tempToken"); 
        login(tempToken); 
        toast.success("OTP Verified successfully");
        if(role === "Super Admin"){
          navigate("/admin"); 
        }else{
          navigate('/company')
        }
        setStatus("success");
        setOtpStatus(Array(6).fill("success"));
      } else {
        setStatus("error");
        setOtpStatus(Array(6).fill("error"));
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      sessionStorage.removeItem("tempToken"); // Remove temp token on failure
      setStatus("error");
      setOtpStatus(Array(6).fill("error"));
      toast.error(error.response?.data?.message || "OTP Verification failed!");
      navigate("/"); 
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
            Enter OTP
          </h2>
          <div className="flex justify-center gap-3 mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-12 h-14 text-xl font-bold text-center border-2 rounded-lg transition-all 
                ${
                  otpStatus[index] === "success"
                    ? "border-green-500 bg-green-50"
                    : otpStatus[index] === "error"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between px-2 mt-4 text-gray-600">
            <span className="flex items-center gap-1">
              <AccessTimeIcon fontSize="small" className="text-blue-500" />
              {timeLeft}s
            </span>
            <button
              onClick={resendOTP}
              disabled={isActive}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </div>

          {status === "error" && (
            <div className="text-red-500 text-center mt-4">
              Invalid OTP, try again.
            </div>
          )}
          {status === "success" && (
            <div className="text-green-500 text-center mt-4">OTP Verified!</div>
          )}

          <button
            onClick={verifyOTP}
            disabled={otp.some((digit) => !digit) || status === "loading"}
            className="w-full py-3 mt-6 rounded-lg text-white text-lg bg-blue-500 hover:bg-blue-600"
          >
            {status === "loading" ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default OTP;
