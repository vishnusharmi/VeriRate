import SidebarItems from "../components/SidebarItems";

const Sidebar = () => {
  return (
    <aside className="w-full h-full bg-[#0a3469] hidden md:flex flex-col justify-between text-black font-bold transition-all duration-300">
      <SidebarItems />
    </aside>
  );
};

export default Sidebar;
