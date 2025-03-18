import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/Contextapi.jsx";

const Header = () => {
  const { auth,logOut } = useContext(AuthContext);
  const [isLogoutModal,setIsLogoutModal] = useState(false)

  const [toggleMenu, setToggleMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [userName, setUserName] = useState(auth.name); 
  const [email, setEmail] = useState(auth.email);
  const [profilePic, setProfilePic] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  function handleToggle() {
    setToggleMenu(!toggleMenu);
  }

  function handleDropdown() {
    setShowDropdown(!showDropdown);
    setShowProfileEdit(false);
  }

  function handleProfileEdit() {
    setShowProfileEdit(true);
  }

  function handleSaveProfile(e) {
    e.preventDefault(); // Prevent page reload first

    const saveDetails = window.confirm("Are you sure you want to update details?");
    if (saveDetails) {
      const formData = new FormData(e.target);
      const newUserName = formData.get("userName");
      setUserName(newUserName); // Update state with the new username
      setShowProfileEdit(false);
      setShowDropdown(false);
    }
  }

  function handleCancelProfile() {
    setShowProfileEdit(false);
    setShowDropdown(false);
  }

  // function handleSignOut() {
  //   const confirmSignOut = window.confirm("Are you sure you want to sign out?");
  //   if (confirmSignOut) {
  //     navigate("/");
  //   }
  // }

  function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleIconClick() {
    fileInputRef.current.click(); // Triggers file input when clicking the camera icon
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowProfileEdit(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    {isLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setIsLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
    <header className="flex items-center justify-between p-4 bg-[#1a148b] text-white h-15 relative">
      <div className="flex items-center gap-2">
        <div className="md:hidden mr-2 cursor-pointer" onClick={handleToggle}>
          {toggleMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
        <img src={logo} alt="Logo" className="w-9 h-9 rounded-3xl shadow-lg" />
        <span className="text-xl font-bold">VeriRate</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleDropdown}
          className="hover:scale-[1.04] hover:bg-[#3f51b5] font-bold text-white px-3 py-2 rounded-md cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Avatar src={profilePic} sx={{ width: "30px", height: "30px" }} />
          <span className="hidden md:block">{userName || "User"}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-[#2196f3] shadow-lg rounded-md py-2 z-100  transition ease-out duration-300 ">
            {!showProfileEdit ? (
              <>
                <button className="flex items-center font-semibold gap-2 px-4 py-2 w-full text-white hover:bg-[#3f51b5] cursor-pointer" onClick={handleProfileEdit}>
                  <AccountCircleIcon fontSize="small" /> Your Profile
                </button>

                <button className="flex items-center gap-2 font-bold px-4 py-2 w-full  hover:bg-[#3f51b5] cursor-pointer" onClick={() => setIsLogoutModal((prev) => !prev)}>
                  <ExitToAppIcon fontSize="small" /> Sign Out
                </button>
              </>
            ) : (
              <div className="absolute right-0 top-0 w-auto md:w-72 sm:w-56 h-auto md:h-86 sm:h-70 bg-white shadow-lg rounded-lg z-50 border border-gray-200 transition ease-out duration-300 ">
                <div className="bg-[#3f51b5] text-center py-4 rounded-t-lg">
                  <span className="text-lg font-semibold">{userName}</span>
                </div>
                <div className="flex flex-col items-center p-6 relative">
                  <div className="relative w-16 h-16 ">
                    <Avatar src={profilePic} sx={{ width: 60, height: 60 }} />
                    <button 
                      onClick={handleIconClick}
                      className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full hover:bg-gray-700 flex items-center justify-center"
                    >
                      <CameraAltIcon className="text-white" fontSize="small" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePicChange} // Calls function to update profile picture
                    />
                  </div>
                  <span className="text-gray-600 mt-2"><strong> Email :</strong> {email}</span>
                 <span className="text-gray-600 mt-2"><strong> Name :</strong> {userName}</span>
                  <span className="text-gray-600 mt-2"> <strong>Role :</strong> {auth.role}</span>
                </div>
                <div className="px-4">
                <button 
                      onClick={handleCancelProfile} 
                      type="button"
                      className="bg-gray-600 font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                 
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
