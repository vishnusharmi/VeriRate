import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router";

export const AuthContext = createContext()

function AuthProvider({children}) {

  const navigate = useNavigate()
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem("authToken");
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

  const login = (token) => {
    sessionStorage.setItem("authToken", token);
    try {
      setAuth(jwtDecode(token));
    } catch (error) {
      console.error("Invalid token:", error);
      setAuth(null);
    }
  };


  const logOut =()=>{
    sessionStorage.removeItem("authToken");
    setAuth(null)
    navigate("/")
    
  }

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      try {
        setAuth(jwtDecode(token));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;