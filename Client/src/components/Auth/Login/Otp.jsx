import React, { useState, useRef, useEffect } from 'react';

const OTP = () => {
  const defaultOtp = ['1', '1', '1', '1', '1', '1'];
  const [otp, setOtp] = useState(defaultOtp);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [currentInput, setCurrentInput] = useState(null);
  const inputRefs = useRef([]);

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
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && !isNaN(char)) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
  };

  const resendOTP = () => {
    setTimeLeft(30);
    setIsActive(true);
    setOtp(defaultOtp);
    setStatus('idle');
  };

  const verifyOTP = () => {
    setStatus('loading');
    setTimeout(() => {
      const enteredOtp = otp.join('');
      if (enteredOtp === '111111') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl backdrop-blur-lg border border-white/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Verification Code</h2>
          <p className="text-gray-500">
            Enter the code sent to<br />
            <span className="font-medium text-gray-700">email</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6">
          {otp.map((digit, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setCurrentInput(index)}
                onBlur={() => setCurrentInput(null)}
                onPaste={handlePaste}
                className={`w-10 h-12 sm:w-12 sm:h-14 text-xl sm:text-2xl font-bold text-center rounded-xl
                  transition-all duration-300 outline-none border-2
                  ${status === 'error' ? 'border-red-500 bg-red-50' :
                    status === 'success' ? 'border-green-500 bg-green-50' :
                    'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}
                `}
              />
            </div>
          ))}
        </div>

        {/* Timer and Resend */}
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="font-medium">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
          <button
            onClick={resendOTP}
            disabled={isActive}
            className={`px-4 py-2 rounded-lg transition-all duration-300
              ${isActive ? 'text-gray-400 cursor-not-allowed' : 
              'text-blue-600 hover:bg-blue-50 active:scale-95'}`}
          >
            Resend Code
          </button>
        </div>

        {/* Status Messages */}
        {status === 'error' && (
          <div className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg mt-4">
            Invalid code. Please try again.
          </div>
        )}
        {status === 'success' && (
          <div className="text-green-500 text-center text-sm bg-green-50 p-3 rounded-lg mt-4">
            Verification successful!
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={verifyOTP}
          disabled={otp.some(digit => !digit) || status === 'loading'}
          className={`w-full py-3 rounded-xl text-white font-medium text-lg mt-6
            transition-all duration-300 transform active:scale-95
            ${otp.some(digit => !digit) ? 'bg-gray-300 cursor-not-allowed' :
              status === 'loading' ? 'bg-blue-400' :
              status === 'success' ? 'bg-green-500' :
              status === 'error' ? 'bg-red-500' :
              'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg'}`}
        >
          {status === 'loading' ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>{status === 'success' ? 'Verified' : 'Verify Code'}</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default OTP;
