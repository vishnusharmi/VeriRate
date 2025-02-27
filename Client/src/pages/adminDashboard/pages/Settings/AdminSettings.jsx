import { useState, useEffect } from "react";
import {
  Security,
  Gavel,
  SettingsApplications,
  Visibility,
  BarChart,
} from "@mui/icons-material";
import SettingToggle from "../../../../components/SettingToggle/SettingToggle";

const mockUsers = [
  { id: 1, name: "Admin John" },
  { id: 2, name: "Admin Sarah" },
  { id: 3, name: "Admin Mike" },
];

const AdminSettings = () => {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]); // Default to first admin
  const [settings, setSettings] = useState({});

  // Simulate fetching user-specific settings from API
  useEffect(() => {
    const fetchUserSettings = async () => {
      // Mock API response (Replace this with an actual API call)
      const userSettings = {
        accessControl: selectedUser.id === 1 ? true : false,
        complianceCheck: true,
        twoFactorAuth: false,
        systemMonitoring: true,
        performanceTracking: true,
      };
      setSettings(userSettings);
    };

    fetchUserSettings();
  }, [selectedUser]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <SettingsApplications className="mr-2 text-gray-600" />
        Super Admin Settings
      </h2>

      {/* User Selector */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">
          Editing Settings for:
        </label>
        <select
          className="block w-full mt-2 p-2 border rounded-md"
          value={selectedUser.id}
          onChange={(e) =>
            setSelectedUser(
              mockUsers.find((user) => user.id === parseInt(e.target.value))
            )
          }
        >
          {mockUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Access Control */}
      <SettingToggle
        title="Access Control"
        description="Manage role-based access and permissions."
        icon={<Security className="mr-2 text-blue-600" />}
        enabled={settings.accessControl}
        onToggle={() => handleToggle("accessControl")}
      />

      {/* Dispute Resolution */}
      <SettingToggle
        title="Dispute Resolution"
        description="Manage disputes related to ratings or blacklisting."
        icon={<Gavel className="mr-2 text-red-600" />}
        enabled={settings.complianceCheck}
        onToggle={() => handleToggle("complianceCheck")}
      />

      {/* Two-Factor Authentication */}
      <SettingToggle
        title="Two-Factor Authentication"
        description="Enforce two-factor authentication for admins."
        icon={<Visibility className="mr-2 text-yellow-600" />}
        enabled={settings.twoFactorAuth}
        onToggle={() => handleToggle("twoFactorAuth")}
      />

      {/* System Monitoring */}
      <SettingToggle
        title="System Monitoring"
        description="Monitor audit logs, security alerts, and compliance tracking."
        icon={<BarChart className="mr-2 text-purple-600" />}
        enabled={settings.systemMonitoring}
        onToggle={() => handleToggle("systemMonitoring")}
      />

      {/* Performance Tracking */}
      <SettingToggle
        title="Performance Tracking"
        description="Monitor system response times and concurrent users."
        icon={<BarChart className="mr-2 text-green-600" />}
        enabled={settings.performanceTracking}
        onToggle={() => handleToggle("performanceTracking")}
      />
    </div>
  );
};

export default AdminSettings;
