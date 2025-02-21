import {
  Analytics,
  Block,
  Dashboard,
  History,
  People,
  Person,
  Reviews,
  Settings,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import { NavLink } from "react-router";

const SidebarItems = () => {
  const role = "admin//";

  const adminMenuItems = [
    { name: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { name: "Employer", icon: <BadgeIcon />, path: "/admin/employer" },
    { name: "Disputes", icon: <Person />, path: "/admin/disputes" },
    { name: "Monitoring", icon: <Settings />, path: "/admin/monitoring" },
  ];

  const employeeMenuItems = [
    { name: "Dashboard", icon: <Dashboard />, path: "/company" },
    { name: "Employee List", icon: <People />, path: "/company/employee-list" },
    { name: "Reviews", icon: <Reviews />, path: "/company/reviews" },
    { name: "Blacklist", icon: <Block />, path: "/company/blacklist" },
    {
      name: "Analytics",
      icon: <Analytics />,
      path: "/company/analytics",
    },
    {
      name: "History",
      icon: <History />,
      path: "/company/history",
    },
  ];

  let items = role === "admin" ? adminMenuItems : employeeMenuItems;

  return (
    <>
      <div className="flex flex-col items-center font-medium">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            // className="flex items-center px-4 py-4 gap-4 text-md text-white cursor-pointer hover:bg-[#d2e8ee] hover:text-black transition-all w-full hover:shadow-md"
            className={({ isActive }) =>
              `flex items-center px-4 py-4 gap-4 text-md cursor-pointer transition-all w-full hover:shadow-md ${
                isActive && item.name !== "Dashboard"
                  ? "bg-[#d2e8ee] text-black"
                  : "text-white  hover:bg-[#d2e8ee] hover:text-black"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="">
        <button className="flex items-center px-5 py-4 gap-4 text-md text-white font-medium cursor-pointer hover:bg-[#d2e8ee] hover:text-black transition-all w-full hover:shadow-md">
          {<LogoutIcon />}Logout
        </button>
      </div>
    </>
  );
};

export default SidebarItems;
