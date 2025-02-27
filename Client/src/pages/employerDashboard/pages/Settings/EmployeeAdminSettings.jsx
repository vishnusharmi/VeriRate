import { useState, useEffect } from "react";
import { Person, Star, Block, Search, Storage } from "@mui/icons-material";
import SettingToggle from "../../../../components/SettingToggle/SettingToggle";

const mockAdmins = [
  { id: 1, name: "HR Admin John" },
  { id: 2, name: "HR Admin Sarah" },
  { id: 3, name: "HR Admin Mike" },
];

const EmployeeAdminSettings = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(mockAdmins[0]); // Default admin
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchAdminSettings = async () => {
      // Mock API Response (Replace with real API call)
      const adminSettings = {
        employeeManagement: true,
        ratingsFeedback: true,
        blacklistManagement: false,
        searchVerification: true,
      };
      setSettings(adminSettings);
    };

    fetchAdminSettings();
  }, [selectedAdmin]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <Storage className="mr-2 text-gray-600" />
        Employee Admin Settings
      </h2>

      {/* Admin Selector */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">
          Editing Settings for:
        </label>
        <select
          className="block w-full mt-2 p-2 border rounded-md"
          value={selectedAdmin.id}
          onChange={(e) =>
            setSelectedAdmin(
              mockAdmins.find((admin) => admin.id === parseInt(e.target.value))
            )
          }
        >
          {mockAdmins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Management */}
      <SettingToggle
        title="Employee Management"
        description="Create, update, and delete employee records."
        icon={<Person className="mr-2 text-blue-600" />}
        enabled={settings.employeeManagement}
        onToggle={() => handleToggle("employeeManagement")}
      />

      {/* Ratings & Feedback */}
      <SettingToggle
        title="Ratings & Feedback"
        description="Manage employee ratings and verification marks."
        icon={<Star className="mr-2 text-yellow-500" />}
        enabled={settings.ratingsFeedback}
        onToggle={() => handleToggle("ratingsFeedback")}
      />

      {/* Blacklist Management */}
      <SettingToggle
        title="Blacklist Management"
        description="Manage the blacklist for flagged employees."
        icon={<Block className="mr-2 text-red-600" />}
        enabled={settings.blacklistManagement}
        onToggle={() => handleToggle("blacklistManagement")}
      />

      {/* Search & Verification */}
      <SettingToggle
        title="Search & Verification"
        description="Search employees and verify their work history."
        icon={<Search className="mr-2 text-green-600" />}
        enabled={settings.searchVerification}
        onToggle={() => handleToggle("searchVerification")}
      />
    </div>
  );
};

export default EmployeeAdminSettings;
