import SidebarItems from "../SidebarItems/SidebarItems.jsx";

const Sidebar = () => {
  return (
    <aside
      className="w-full min-h-full h-auto bg-gradient-to-br from-[#3f51b5] to-[#2196f3] hidden md:flex flex-col justify-between text-black font-bold 
    transition-all duration-300"
    >
      <SidebarItems />
    </aside>
  );
};

export default Sidebar;
