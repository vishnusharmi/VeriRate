import { Search, BarChart } from "@mui/icons-material";

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200 mb-1">
    <div className="flex space-x-8">
      {[
        {
          label: "Search & Verify",
          icon: <Search className="w-4 h-4" />,
        },
        {
          label: "Dashboard Analytics",
          icon: <BarChart className="w-4 h-4" />,
        },
      ].map((tab, index) => (
        <button
          key={tab.label}
          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
            activeTab === index
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default Tabs;
