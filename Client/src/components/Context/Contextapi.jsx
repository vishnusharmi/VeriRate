import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import axiosInstance from "../../middleware/axiosInstance";
  const baseURL = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem("authToken");
    return token ? jwtDecode(token) : null;
  });

  useEffect(()=>{
    fetchCompanies();
  },[]);

  const login = (token) => {
    sessionStorage.setItem("authToken", token);
    const decToken = jwtDecode(token);
    setAuth(decToken);
  };

  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setAuth(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      setAuth(jwtDecode(token));
    }
  }, []);

  // console.log(auth);

  
      const fetchCompanies = async () => {
          try {
                  const response = await axiosInstance.get(`/get-companies`);
              console.log(response,'hhhh');
  
          
          } catch (error) {
              console.error("Error fetching companies:", error);
       
          }
      };

  return (
    <AuthContext.Provider value={{ auth, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
