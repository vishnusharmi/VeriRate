import {
  Analytics,
  Block,
  Dashboard,
  History,
  People,
  Person,
  Settings,
  PeopleAlt,
  Security,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PropTypes from "prop-types";

const SidebarItems = ({ toggleMenu, handleToggle }) => {
  const role = "admin/";

  const adminMenuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin",
    },
    {
      name: "Employer",
      icon: <BadgeIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/employer",
    },
    {
      name: "Management",
      icon: <BadgeIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: '/admin/company-management'
    },
    {
      name: "Disputes",
      icon: <Person className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/disputes",
    },
    {
      name: "Records",
      icon: <DescriptionIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/records",
    },
    {
      name: "Monitoring",
      icon: <Settings className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/monitoring",
    },
    {
      name: "User Management",
      icon: <PeopleAlt className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/usermanagement",
    },
    {
      name: "Security & Compliance",
      icon: <Security className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/security-compliance",
    },
    {
      name: "Settings",
      icon: <SettingsIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/admin/settings",
    },
  ];

  const employerMenuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company",
    },
    {
      name: "Employee List",
      icon: <People className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/employee-list",
    },
    {
      name: "Blacklist",
      icon: <Block className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/blacklist",
    },
    {
      name: "Verification",
      icon: <DomainVerificationIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/verification",
    },
    // {
    //   name: "Analytics",
    //   icon: <Analytics className="w-5 h-5 cb1:w-6 cb1:h-6" />,
    //   path: "/company/analytics",
    // },
    // {
    //   name: "History",
    //   icon: <History className="w-5 h-5 cb1:w-6 cb1:h-6" />,
    //   path: "/company/history",
    // },
    {
      name: "Ratings and Feedback",
      icon: <RateReviewIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/ratings-feedback",
    },
    {
      name: "Security & Compliance",
      icon: <Security className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/security-compliance",
    },
    {
      name: "Settings",
      icon: <SettingsIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />,
      path: "/company/employee-settings",
    },
  ];

  let items = role === "admin" ? adminMenuItems : employerMenuItems;

  return (
    <>
      <div className="flex flex-col items-center font-medium">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-4 gap-4 text-sm cursor-pointer transition-all w-full cb2:text-base hover:shadow-md border-y-2 border-[#0a3469] ${
                isActive && item.name !== "Dashboard"
                  ? "bg-[#d2e8ee] text-black"
                  : "text-white  hover:bg-[#d2e8ee] hover:text-black"
              }`
            }
            onClick={() => toggleMenu && handleToggle()}
          >
            <div className="flex gap-4 h-max items-center justify-center">
              <span>{item.icon}</span>
              <span className="text-xs cb1:text-base">{item.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
      <div>
        <button className="flex items-center px-5 py-4 gap-4 text-sm cb2:text-base text-white font-medium cursor-pointer hover:bg-[#d2e8ee] hover:text-black transition-all w-full hover:shadow-md">
          {<LogoutIcon className="w-5 h-5 cb1:w-6 cb1:h-6" />}Logout
        </button>
      </div>
    </>
  );
};

SidebarItems.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default SidebarItems;
