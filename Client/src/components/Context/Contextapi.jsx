import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider({children}) {
  const [auth,setAuth]=useState(()=>{
     const token = sessionStorage.getItem("authToken");
     return token ? jwtDecode(token) : null;
  });


 const login = (token) => { 
   sessionStorage.setItem("authToken", token); 
   const decToken = jwtDecode(token);
   setAuth(decToken); 
 };


  const logOut =()=>{
    sessionStorage.removeItem("authToken");
    setAuth(null)
  }

  useEffect(()=>{
    const token = sessionStorage.getItem("authToken");
    
    if (token) {
      setAuth(jwtDecode(token));
    }
  },[])

  console.log(auth);
  

  return (
    <AuthContext.Provider value={{ auth, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;