import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const token = sessionStorage.getItem("authToken");
  
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
