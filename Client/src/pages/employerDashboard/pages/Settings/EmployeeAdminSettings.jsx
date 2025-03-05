import { useState, useEffect } from "react";
import { Star, Block, Search, Storage } from "@mui/icons-material";
import SettingToggle from "../../../../components/SettingToggle/SettingToggle";

// Fake Employer Admins Data (Replace with API Call)
const mockEmployerAdmins = [
  { id: 1, name: "Employer Admin John" },
  { id: 2, name: "Employer Admin Sarah" },
  { id: 3, name: "Employer Admin Mike" },
];

// Fake Admin Settings (Replace with API Call)
const mockAdminSettings = {
  1: {
    employeeManagement: true,
    ratingsFeedback: true,
    blacklistManagement: false,
    searchVerification: true,
  },
  2: {
    employeeManagement: false,
    ratingsFeedback: true,
    blacklistManagement: true,
    searchVerification: false,
  },
  3: {
    employeeManagement: true,
    ratingsFeedback: false,
    blacklistManagement: false,
    searchVerification: true,
  },
};

const EmployeeAdminSettings = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(mockEmployerAdmins[0]); // Default to first admin
  const [settings, setSettings] = useState(mockAdminSettings[selectedAdmin.id]);

  useEffect(() => {
    // When selectedAdmin changes, update settings
    setSettings(mockAdminSettings[selectedAdmin.id]);
  }, [selectedAdmin]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <Storage className="mr-2 text-gray-600" />
        Employer Admin Settings
      </h2>

      {/* Employer Admin Selector */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">
          Managing Settings for:
        </label>
        <select
          className="block w-full mt-2 p-2 border rounded-md"
          value={selectedAdmin.id}
          onChange={(e) =>
            setSelectedAdmin(
              mockEmployerAdmins.find(
                (admin) => admin.id === parseInt(e.target.value)
              )
            )
          }
        >
          {mockEmployerAdmins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.name}
            </option>
          ))}
        </select>
      </div>

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
