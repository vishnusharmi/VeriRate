import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import axiosInstance from "../../middleware/axiosInstance";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  const [auth, setAuth] = useState(() => {
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  });

  // useEffect(() => {
  //   fetchCompanies();
  // }, []);

  const login = (token) => {
    sessionStorage.setItem("authToken", token);
    try {
      setAuth(jwtDecode(token));
    } catch (error) {
      console.error("Invalid token:", error);
      setAuth(null);
    }
  };

  // logging out the dashboard
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setAuth(null);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      try {
        setAuth(jwtDecode(token));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // const fetchCompanies = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/get-companies`);
  //     // console.log(response, "hhhh");
  //   } catch (error) {
  //     console.error("Error fetching companies:", error);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ auth, login, logOut, token }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
