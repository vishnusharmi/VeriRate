// import { Outlet } from "react-router";
// import Header from "../../header/header";
// import Sidebar from "../../sidebar/Sidebar";

// const Layout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="md:grid grid-cols-12 flex-grow h-0 flex-1 flex">
//         <div className="md:col-span-2">
//           <Sidebar />
//         </div>
//         <div className="md:col-span-10 flex-grow h-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import { Outlet } from "react-router";
import Header from "../../header/header";
import Sidebar from "../../sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-clip">
      <Header />
      <div className="md:grid grid-cols-12 flex-grow h-0 flex-1">
        <div className="overflow-y-hidden md:col-span-2">
          <Sidebar />
        </div>
        <div className="md:col-span-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
