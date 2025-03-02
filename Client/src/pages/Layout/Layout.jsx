import { Outlet } from "react-router";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="md:grid grid-cols-12 flex-grow h-0 flex-1 overflow-y-auto content-scrollbar">
        <div className="md:col-span-2 overflow-y-auto aside-scrollbar">
          <Sidebar />
        </div>
        <div className="md:col-span-10 overflow-y-auto content-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
