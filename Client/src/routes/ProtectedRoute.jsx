import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../components/Context/Contextapi";

const PrivateRoute = () => {
  const {auth,token} = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
