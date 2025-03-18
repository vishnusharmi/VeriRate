// import { useState, useEffect } from "react";
// import {
//   Security,
//   Gavel,
//   SettingsApplications,
//   Visibility,
//   BarChart,
//   AdminPanelSettings,
// } from "@mui/icons-material";
// import SettingToggle from "../../../../components/SettingToggle/SettingToggle";
// import SecurityCompliance from "../SecurityCompliance/SecurityCompliance";

// const mockAdmins = [
//   { id: 1, name: "Admin John" },
//   { id: 2, name: "Admin Sarah" },
//   { id: 3, name: "Admin Mike" },
// ];

// const AdminSettings = () => {
//   const [selectedUser, setSelectedUser] = useState(mockAdmins[0]); // Default to first admin
//   const [settings, setSettings] = useState({});
//   const [confirmChange, setConfirmChange] = useState(null);

//   // Simulate fetching user-specific settings from API
//   useEffect(() => {
//     const fetchUserSettings = async () => {
//       // Mock API response (Replace this with an actual API call)
//       const userSettings = {
//         accessControl: selectedUser.id === 1 ? true : false,
//         complianceCheck: true,
//         blacklistControl: false,
//         twoFactorAuth: false,
//         systemMonitoring: true,
//         performanceTracking: true,
//       };
//       setSettings(userSettings);
//     };

//     fetchUserSettings();
//   }, [selectedUser]);

//   const handleToggle = (key) => {
//     setConfirmChange(key);
//   };

//   const confirmToggle = () => {
//     setSettings((prev) => ({ ...prev, [confirmChange]: !prev[confirmChange] }));
//     setConfirmChange(null);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto my-2 bg-white shadow-lg rounded-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//         <SettingsApplications className="mr-2 text-gray-600" />
//         Super Admin Settings
//       </h2>

//       {/* User Selector */}
//       <div className="mb-6">
//         <label className="text-gray-700 font-medium">
//           Editing Settings for:
//         </label>
//         <select
//           className="block w-full mt-2 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={selectedUser.id}
//           onChange={(e) =>
//             setSelectedUser(
//               mockAdmins.find((user) => user.id === parseInt(e.target.value))
//             )
//           }
//         >
//           {mockAdmins.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Settings Sections */}
//       <div className="space-y-6">
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Security Settings
//           </h3>
//           <SettingToggle
//             title="Two-Factor Authentication"
//             description="Require this Employee Admin to use two-factor authentication for added security."
//             icon={<Visibility className="mr-2 text-yellow-600" />}
//             enabled={settings.twoFactorAuth}
//             onToggle={() => handleToggle("twoFactorAuth")}
//           />
//           <SettingToggle
//             title="System Monitoring"
//             description="Allow this Employee Admin to access security logs, login tracking, and system performance analytics."
//             icon={<BarChart className="mr-2 text-purple-600" />}
//             enabled={settings.systemMonitoring}
//             onToggle={() => handleToggle("systemMonitoring")}
//           />
//         </div>

//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Employee Admin Control Settings
//           </h3>
//           <SettingToggle
//             title="Access Control"
//             description="Allow this Employee Admin to manage other Employee Admins and their permissions."
//             icon={<AdminPanelSettings className="mr-2 text-blue-600" />}
//             enabled={settings.accessControl}
//             onToggle={() => handleToggle("accessControl")}
//           />
//           <SettingToggle
//             title="Dispute Resolution"
//             description="Allow this Employee Admin to handle employee disputes related to ratings and blacklisting."
//             icon={<Gavel className="mr-2 text-red-600" />}
//             enabled={settings.complianceCheck}
//             onToggle={() => handleToggle("complianceCheck")}
//           />
//           <SettingToggle
//             title="Blacklist Management"
//             description="Allow this Employee Admin to enable/disable blacklisting for other Employee Admins under their company."
//             icon={<Security className="mr-2 text-gray-600" />}
//             enabled={settings.blacklistControl}
//             onToggle={() => handleToggle("blacklistControl")}
//           />
//           <SettingToggle
//             title="Performance Tracking"
//             description="Allow this Employee Admin to track employee performance trends and company-wide analytics."
//             icon={<BarChart className="mr-2 text-green-600" />}
//             enabled={settings.performanceTracking}
//             onToggle={() => handleToggle("performanceTracking")}
//           />
//         </div>
//       </div>

//       <div className="bg-gray-100 p-4 rounded-lg mt-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-3">
//           Security & Compliance
//         </h3>
//         <SecurityCompliance
//           mockAdmins={mockAdmins}
//           selectedAdmin={selectedUser}
//         />
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmChange && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Confirm Change
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to change this setting?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setConfirmChange(null)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmToggle}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSettings;



import { useState, useEffect } from "react";
import {
  Security,
  Gavel,
  SettingsApplications,
  Visibility,
  BarChart,
  AdminPanelSettings,
} from "@mui/icons-material";
import SettingToggle from "../../../../components/SettingToggle/SettingToggle";
import SecurityCompliance from "../SecurityCompliance/SecurityCompliance";
import axiosInstance from "../../../../middleware/axiosInstance"; // Adjust the import path as needed

const AdminSettings = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [settings, setSettings] = useState({});
  const [confirmChange, setConfirmChange] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axiosInstance.get("/user/employee-admins");
        if (response.data.success) {
          setAdmins(response.data.data);
          setSelectedUser(response.data.data[0]); // Default to first admin
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchUserSettings = async () => {
        try {
          const response = await axiosInstance.get(`/admin-settings/get-settings/${selectedUser.id}`);
          setSettings(response.data);
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      };

      fetchUserSettings();
    }
  }, [selectedUser]);

  const handleToggle = (key) => {
    setConfirmChange(key);
  };

  const confirmToggle = async () => {
    try {
      const updatedSetting = !settings[confirmChange];
      const response = await axiosInstance.put("/admin-settings/update-settings", {
        adminId: selectedUser.id,
        [confirmChange]: updatedSetting,
      });
      setSettings(response.data.settings);
      setConfirmChange(null);
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto my-2 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <SettingsApplications className="mr-2 text-gray-600" />
        Super Admin Settings
      </h2>

      {/* User Selector */}
      <div className="mb-6">
        <label className="text-gray-700 font-medium">
          Editing Settings for:
        </label>
        <select
          className="block w-full mt-2 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedUser?.id || ""}
          onChange={(e) =>
            setSelectedUser(
              admins.find((user) => user.id === parseInt(e.target.value))
            )
          }
        >
          {admins.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Security Settings
          </h3>
          <SettingToggle
            title="Two-Factor Authentication"
            description="Require this Employee Admin to use two-factor authentication for added security."
            icon={<Visibility className="mr-2 text-yellow-600" />}
            enabled={settings.twoFactorAuth}
            onToggle={() => handleToggle("twoFactorAuth")}
          />
          <SettingToggle
            title="System Monitoring"
            description="Allow this Employee Admin to access security logs, login tracking, and system performance analytics."
            icon={<BarChart className="mr-2 text-purple-600" />}
            enabled={settings.systemMonitoring}
            onToggle={() => handleToggle("systemMonitoring")}
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Employee Admin Control Settings
          </h3>
          <SettingToggle
            title="Access Control"
            description="Allow this Employee Admin to manage other Employee Admins and their permissions."
            icon={<AdminPanelSettings className="mr-2 text-blue-600" />}
            enabled={settings.accessControl}
            onToggle={() => handleToggle("accessControl")}
          />
          <SettingToggle
            title="Dispute Resolution"
            description="Allow this Employee Admin to handle employee disputes related to ratings and blacklisting."
            icon={<Gavel className="mr-2 text-red-600" />}
            enabled={settings.complianceCheck}
            onToggle={() => handleToggle("complianceCheck")}
          />
          <SettingToggle
            title="Blacklist Management"
            description="Allow this Employee Admin to enable/disable blacklisting for other Employee Admins under their company."
            icon={<Security className="mr-2 text-gray-600" />}
            enabled={settings.blacklistControl}
            onToggle={() => handleToggle("blacklistControl")}
          />
          <SettingToggle
            title="Performance Tracking"
            description="Allow this Employee Admin to track employee performance trends and company-wide analytics."
            icon={<BarChart className="mr-2 text-green-600" />}
            enabled={settings.performanceTracking}
            onToggle={() => handleToggle("performanceTracking")}
          />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Security & Compliance
        </h3>
        <SecurityCompliance
          admins={admins}
          selectedAdmin={selectedUser}
          settings={settings}
        />
      </div>

      {/* Confirmation Dialog */}
      {confirmChange && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Change
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to change this setting?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmChange(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;