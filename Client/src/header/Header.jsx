import { useState } from "react";
import SidebarItems from "../components/SidebarItems";
import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-[#dbecff] text-black h-15">
      <div className="flex items-center gap-2">
        <div
          className="md:hidden mr-2 cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          {toggleMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
        <img src={logo} alt="Logo" className="w-9 h-9 rounded-3xl shadow-lg" />
        <span className="text-xl font-bold">VeriRate</span>
      </div>

      <div className="">
        <button className="hover:scale-[1.04] hover:bg-[#D7E1E3] font-bold text-black px-3 py-2 rounded-md cursor-pointer transition-all flex items-center justify-center gap-2">
          {<Avatar sx={{ width: "30px", height: "30px" }} />}John Doe
        </button>
      </div>
      <div
        className={`px-3 fixed top-15 left-0 h-full w-fit bg-[#0a3469] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="contents md:flex justify-between items-center bg-[#0a3469] z-50">
          <SidebarItems />
        </div>
      </div>
    </header>
  );
};

export default Header;
