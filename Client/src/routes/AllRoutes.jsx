import { Route, Routes,Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../components/Context/Contextapi.jsx";
import PrivateRoutes from "./ProtectedRoutes.jsx";
import ErrorPage from "../components/Error.jsx"; 

import Layout from "../pages/Layout/Layout.jsx";
import Login from "../components/Auth/Login/Login.jsx";

// ADMIN DASHBOARD IMPORTS
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import Disputes from "../pages/adminDashboard/pages/Disputes/Disputes.jsx";
import Monitoring from "../pages/adminDashboard/pages/Monitoring/Monitoring.jsx";
import SecurityCompliances from "../pages/adminDashboard/pages/SecurityCompliance/SecurityCompliance.jsx";

// EMPLOYER DASHBOARD IMPORTS
import EmployerDashboard from "../pages/employerDashboard/EmployerDashboard";
import Analytics from "../pages/employerDashboard/pages/Analytics/Analytics.jsx";
import Blacklist from "../pages/employerDashboard/pages/Blacklist/Blacklist.jsx";
import EmployeeList from "../pages/employerDashboard/pages/EmployeeList/EmployeeList.jsx";
import History from "../pages/employerDashboard/pages/History/History.jsx";
import Records from "../pages/adminDashboard/pages/Records/Records.jsx";

import EmployerVerificationSearch from "../pages/employerDashboard/pages/EmployerVerificationSearch/EmployerVerificationSearch.jsx";
import EmployeeRatingsFeedback from "../pages/employerDashboard/pages/RatingsAndFeedback/EmployeeRatingsFeedback.jsx";
import UserManagement from "../pages/adminDashboard/pages/UserManagement/UserManagement.jsx";
import UserById from "../pages/adminDashboard/pages/UserManagement/UserById.jsx";
import SecurityCompliance from "../pages/employerDashboard/pages/SecurityCompliance/SecurityCompliance.jsx";
// import ForgetPassword from "../components/Auth/Login/ForgetPassword.jsx";
// import ResetPassword from "../components/Auth/Login/NewPassword.jsx";

import CompanyManagement from "../pages/adminDashboard/pages/CompanyManagement/CompanyManagement.jsx";
import AdminSettings from "../pages/adminDashboard/pages/Settings/AdminSettings.jsx";
import EmployeeAdminSettings from "../pages/employerDashboard/pages/Settings/EmployeeAdminSettings.jsx";
import OTP from "../components/Auth/Login/Otp.jsx";

import DepartmentManagement from "../pages/adminDashboard/pages/DepartmentManagement/DepartmentManagement.jsx";
import Register from "../components/Auth/register/Register.jsx";

const AllRoutes = () => {
  const {auth,token} = useContext(AuthContext);

  return (
    <Routes>
      <Route index path="/" element={token ? <Navigate to={auth.role === "Super Admin" ? "/admin":"/company"} replace /> : <Login />} />
     {!token && <Route path="/otp" element={<OTP />} />}
     {!token && <Route path="/register" element={<Register/>}/>}

{/* Secure Admin Routes */}
<Route element={<PrivateRoutes allowedRoles={["Super Admin"]} />}>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="/admin/company-management"
          element={<CompanyManagement />}
        />
        <Route path="/admin/disputes" element={<Disputes />} />
        <Route path="/admin/records" element={<Records />} />
        <Route path="/admin/monitoring" element={<Monitoring />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/user-management/:id" element={<UserById />} />
        <Route path="/admin/department" element={<DepartmentManagement />} />

        <Route
          path="/admin/security-compliance"
          element={<SecurityCompliances />}
        />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
      </Route>
<Route element={<PrivateRoutes allowedRoles={["Employee Admin"]} />}>
      <Route path="/company" element={<Layout />}>
        <Route index element={<EmployerDashboard />} />
        <Route path="/company/analytics" element={<Analytics />} />
        <Route path="/company/blacklist" element={<Blacklist />} />
        <Route path="/company/employee-list" element={<EmployeeList />} />
        <Route path="/company/history" element={<History />} />
        <Route
          path="/company/verification"
          element={<EmployerVerificationSearch />}
        />
        <Route
          path="/company/ratings-feedback"
          element={<EmployeeRatingsFeedback />}
        />
        <Route
          path="/company/security-compliance"
          element={<SecurityCompliance />}
        />
        <Route
          path="/company/employee-settings"
          element={<EmployeeAdminSettings />}
        />
      </Route>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  );
};

export default AllRoutes;
