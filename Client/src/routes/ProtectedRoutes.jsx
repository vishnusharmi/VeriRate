import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../components/Context/Contextapi";

const PrivateRoute = ({allowedRoles }) => {
  const {auth,token} = useContext(AuthContext);


  if (!token) return <Navigate to="/" replace />;

  if (!allowedRoles.includes(auth?.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;