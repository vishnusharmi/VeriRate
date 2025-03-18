// import { useState } from "react";
// import {
//   Security,
//   LockOutlined,
//   PeopleOutlined,
//   VpnKeyOutlined,
//   Notifications,
//   ToggleOff,
// } from "@mui/icons-material";
// import PropTypes from "prop-types";

// // const mockAdmins = [
// //   { id: 1, name: "Admin John" },
// //   { id: 2, name: "Admin Sarah" },
// //   { id: 3, name: "Admin Mike" },
// // ];

// const defaultSettings = {
//   1: {
//     e2eEncryption: true,
//     roleBasedAccess: true,
//     twoFactor: false,
//     gdprCompliance: true,
//     blacklistControl: false,
//     auditLogs: true,
//   },
//   2: {
//     e2eEncryption: false,
//     roleBasedAccess: false,
//     twoFactor: true,
//     gdprCompliance: false,
//     blacklistControl: true,
//     auditLogs: false,
//   },
//   3: {
//     e2eEncryption: true,
//     roleBasedAccess: true,
//     twoFactor: false,
//     gdprCompliance: true,
//     blacklistControl: true,
//     auditLogs: true,
//   },
// };

// const SecurityCompliance = ({ selectedAdmin }) => {
//   // const [selectedAdmin, setSelectedAdmin] = useState(mockAdmins[0]);
//   const [adminSettings, setAdminSettings] = useState(defaultSettings);
//   // const [gdprConsent, setGdprConsent] = useState(true);
//   // const [e2eEncryption, setE2eEncryption] = useState(true);
//   // const [openRole, setOpenRole] = useState(null);

//   // const toggleRole = (role) => {
//   //   setOpenRole(openRole === role ? null : role);
//   // };

//   const handleToggle = (key) => {
//     setAdminSettings((prevSettings) => ({
//       ...prevSettings,
//       [selectedAdmin.id]: {
//         ...prevSettings[selectedAdmin.id],
//         [key]: !prevSettings[selectedAdmin.id][key],
//       },
//     }));
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen p-6 md:p-8">
//       <div className="mx-auto">
//         {/* Alert for important security notice */}
//         <div className="flex items-center p-4 mb-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg shadow-sm">
//           <div className="p-2 bg-indigo-100 rounded-full">
//             <Security className="h-6 w-6 text-indigo-600" />
//           </div>
//           <div className="ml-4">
//             <p className="font-semibold text-indigo-800">
//               Security Status: Strong
//             </p>
//             <p className="text-sm text-indigo-600">
//               Your account security is being monitored. Last security audit: 2
//               days ago
//             </p>
//           </div>
//         </div>

//         {/* DROP DOWN */}
//         {/* <select
//           className="block w-full mt-2 p-2 border-2 border-gray-300 rounded-md my-4"
//           value={selectedAdmin.id}
//           onChange={(e) => {
//             const newAdmin = mockAdmins.find(
//               (admin) => admin.id === parseInt(e.target.value)
//             );
//             setSelectedAdmin(newAdmin);
//           }}
//         >
//           {mockAdmins.map((admin) => (
//             <option key={admin.id} value={admin.id}>
//               {admin.name}
//             </option>
//           ))}
//         </select> */}

//         {/* Main Settings Grid */}
//         <div className="grid grid-cols-1 gap-6">
//           {/* ENCRYPTION SETTINGS */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-50 rounded-lg">
//                   <LockOutlined className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   End-to-End Encryption
//                 </h2>
//               </div>
//               {/* <p className="text-gray-500 mt-2">
//                 Manage encryption settings and keys for {selectedAdmin.name}
//               </p> */}
//               <p className="text-blue-700 font-medium mt-4">
//                 {selectedAdmin.name} data encryption is enabled. Data is
//                 encrypted in transit and at rest.
//               </p>
//             </div>
//             {/* <div className="p-6 flex justify-between">
//               <div>
//                 <p className="font-medium text-gray-700">
//                   Enable E2E Encryption
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Encrypt all data in transit and at rest
//                 </p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={adminSettings[selectedAdmin.id].e2eEncryption}
//                   onChange={() => handleToggle("e2eEncryption")}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//               </label>
//             </div> */}
//           </div>

//           {/* ROLE BASED ACCESS CONTROL */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl relative">
//             <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 text-center py-2 font-medium">
//               🚧 Under Development 🚧
//             </div>
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3 ">
//                 <div className="p-2 bg-purple-50 rounded-lg">
//                   <PeopleOutlined className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Role-Based Access Control
//                 </h2>
//               </div>
//               <p className="text-gray-500 mt-2">
//                 Manage user roles for {selectedAdmin.name}
//               </p>
//             </div>
//             <div className="p-6 space-y-2">
//               <div className="flex items-center justify-between">
//                 <p className="font-medium text-gray-700">
//                   Enable Role-Based Access
//                 </p>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={adminSettings[selectedAdmin.id].roleBasedAccess}
//                     onChange={() => handleToggle("roleBasedAccess")}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* 2FA - TWO FACTOR AUTHENTICATION */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-green-50 rounded-lg">
//                   <VpnKeyOutlined className="h-6 w-6 text-green-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Two-Factor Authentication
//                 </h2>
//               </div>
//               <p className="text-gray-500 mt-2">
//                 Add an extra layer of security to your account
//               </p>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-700">Enable 2FA</p>
//                   <p className="text-sm text-gray-500">
//                     Use authenticator app or SMS
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={adminSettings[selectedAdmin.id].twoFactor}
//                     onChange={() => handleToggle("twoFactor")}
//                   />

//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                 </label>
//               </div>

//               {!adminSettings[selectedAdmin.id].twoFactor && (
//                 <div className="flex items-center mt-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
//                   <Notifications className="h-5 w-5 text-amber-600" />
//                   <p className="text-sm text-amber-700 ml-2 font-medium">
//                     We strongly recommend enabling 2FA for additional security
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* GDPR Compliance */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl relative">
//             <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 text-center py-2 font-medium">
//               🚧 Under Development 🚧
//             </div>
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-orange-50 rounded-lg">
//                   <ToggleOff className="h-6 w-6 text-orange-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   GDPR Compliance
//                 </h2>
//               </div>
//               <p className="text-gray-500 mt-2">
//                 Manage your data protection settings
//               </p>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 {/*   <div>
//                   <p className="font-medium text-gray-700">
//                     Data Processing Consent
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Allow data collection and processing
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={gdprConsent}
//                     onChange={() => setGdprConsent(!gdprConsent)}
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
//                 </label> */}
//               </div>

//               <div className="mt-5 p-5 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-sm font-medium text-gray-700 mb-3">
//                   Your Rights:
//                 </p>
//                 <ul className="space-y-2">
//                   {[
//                     "Right to access your data",
//                     "Right to be forgotten",
//                     "Data portability",
//                   ].map((right) => (
//                     <li
//                       key={right}
//                       className="flex items-center text-sm text-gray-600"
//                     >
//                       <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
//                       {right}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* BLACKLIST */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-red-50 rounded-lg">
//                   <Security className="h-6 w-6 text-red-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Blacklist Management Control
//                 </h2>
//               </div>
//               <p className="text-gray-500 mt-2">
//                 Control blacklist permissions for {selectedAdmin.name}
//               </p>
//             </div>
//             <div className="p-6 flex justify-between">
//               <p className="font-medium text-gray-700">
//                 Allow Blacklist Control
//               </p>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={adminSettings[selectedAdmin.id].blacklistControl}
//                   onChange={() => handleToggle("blacklistControl")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>
//           </div>

//           {/* AUDIT LOGS */}
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl relative">
//             <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 text-center py-2 font-medium">
//               🚧 Needs attention for toggle. 🚧
//             </div>
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-purple-50 rounded-lg">
//                   <PeopleOutlined className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Audit Logs & Monitoring
//                 </h2>
//               </div>
//               <p className="text-gray-500 mt-2">
//                 Track system activity for {selectedAdmin.name}
//               </p>
//             </div>
//             <div className="p-6 flex justify-between">
//               <p className="font-medium text-gray-700">Enable Audit Logs</p>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={adminSettings[selectedAdmin.id].auditLogs}
//                   onChange={() => handleToggle("auditLogs")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// SecurityCompliance.propTypes = {
//   // mockAdmins: PropTypes.array.isRequired,
//   selectedAdmin: PropTypes.object.isRequired,
// };

// export default SecurityCompliance;

import PropTypes from "prop-types";

const SecurityCompliance = ({ admins, selectedAdmin, settings }) => {
  if (!selectedAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Security & Compliance for {selectedAdmin.username}
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">Access Control</h4>
          <p className="text-gray-600">
            {settings.accessControl ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">Compliance Check</h4>
          <p className="text-gray-600">
            {settings.complianceCheck ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">Blacklist Control</h4>
          <p className="text-gray-600">
            {settings.blacklistControl ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">Two-Factor Authentication</h4>
          <p className="text-gray-600">
            {settings.twoFactorAuth ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">System Monitoring</h4>
          <p className="text-gray-600">
            {settings.systemMonitoring ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-gray-700">Performance Tracking</h4>
          <p className="text-gray-600">
            {settings.performanceTracking ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>
    </div>
  );
};

SecurityCompliance.propTypes = {
  admins: PropTypes.array.isRequired,
  selectedAdmin: PropTypes.object,
  settings: PropTypes.object.isRequired,
};

export default SecurityCompliance;