// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
// import { jsPDF } from "jspdf";
// import Papa from "papaparse";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// const API_URL = "https://dummyjson.com"; // Dummy API URL

// const AdminDashboard = () => {
//   const [systemStats, setSystemStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch data from the dummy API and map it to systemStats keys.
//   const fetchSystemStats = async () => {
//     try {
//       const response = await fetch(`${API_URL}/users`);
//       const data = await response.json();
//       const users = data.users || [];

//       // Mapping:
//       const totalEmployers = data.total || users.length; // Total users
//       const totalEmployees = users.reduce((sum, user) => sum + user.age, 0); // Sum of ages
//       const activeCompanies = users.filter((user) => user.age > 30).length;
//       const disputesRaised = users.filter((user) => user.gender === "female").length;
//       const blacklistedEmployees = users.filter((user) => user.gender === "male").length;

//       setSystemStats({
//         totalEmployers,
//         totalEmployees,
//         activeCompanies,
//         disputesRaised,
//         blacklistedEmployees,
//       });
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching system stats");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSystemStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <p className="text-xl text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <p className="text-xl text-red-500">{error}</p>
//       </div>
//     );
//   }

//   // Data configuration for Bar Chart.
//   const barChartData = {
//     labels: ["Employers", "Employees", "Active Companies"],
//     datasets: [
//       {
//         label: "System Stats",
//         data: [
//           systemStats.totalEmployers,
//           systemStats.totalEmployees,
//           systemStats.activeCompanies,
//         ],
//         backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
//         borderColor: ["#2980b9", "#27ae60", "#f39c12"],
//         borderWidth: 1,
//         borderRadius: 6,
//         barThickness: 40,
//       },
//     ],
//   };

//   // Custom options for the Bar Chart.
//   const barChartOptions = {
//     maintainAspectRatio: false,
//     responsive: true,
//     layout: { padding: 10 },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: { font: { size: 14, family: "Inter, sans-serif" }, color: "#333" },
//       },
//     },
//     scales: {
//       x: { grid: { display: false }, ticks: { font: { size: 12 }, color: "#555" } },
//       y: { grid: { color: "#eee" }, ticks: { font: { size: 12 }, color: "#555" } },
//     },
//   };

//   // Data configuration for Pie Chart.
//   const pieChartData = {
//     labels: ["Disputes Raised", "Blacklisted Employees"],
//     datasets: [
//       {
//         data: [systemStats.disputesRaised, systemStats.blacklistedEmployees],
//         backgroundColor: ["#9b59b6", "#2ecc71"],
//         borderColor: "#fff",
//         borderWidth: 2,
//         hoverOffset: 10,
//       },
//     ],
//   };

//   // Custom options for the Pie Chart.
//   const pieChartOptions = {
//     maintainAspectRatio: false,
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: { font: { size: 14, family: "Inter, sans-serif" }, color: "#333" },
//       },
//     },
//   };

//   // Export functions.
//   const exportToCSV = () => {
//     const csvData = Papa.unparse([
//       { Metric: "Total Employers", Value: systemStats.totalEmployers },
//       { Metric: "Total Employees", Value: systemStats.totalEmployees },
//       { Metric: "Active Companies", Value: systemStats.activeCompanies },
//       { Metric: "Disputes Raised", Value: systemStats.disputesRaised },
//       { Metric: "Blacklisted Employees", Value: systemStats.blacklistedEmployees },
//     ]);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "admin_dashboard_data.csv");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Admin Dashboard Analytics", 10, 10);
//     doc.text(`Total Employers: ${systemStats.totalEmployers}`, 10, 20);
//     doc.text(`Total Employees: ${systemStats.totalEmployees}`, 10, 30);
//     doc.text(`Active Companies: ${systemStats.activeCompanies}`, 10, 40);
//     doc.text(`Disputes Raised: ${systemStats.disputesRaised}`, 10, 50);
//     doc.text(`Blacklisted Employees: ${systemStats.blacklistedEmployees}`, 10, 60);
//     doc.save("admin_dashboard_data.pdf");
//   };

//   const exportToJSON = () => {
//     const jsonData = JSON.stringify(systemStats, null, 2);
//     const blob = new Blob([jsonData], { type: "application/json" });
//     saveAs(blob, "admin_dashboard_data.json");
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Row: Left - "System Analytics"; Right - Export Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">System Analytics</h2>
//           <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
//             <button
//               onClick={exportToCSV}
//               className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
//             >
//               Export to CSV
//             </button>
//             <button
//               onClick={exportToPDF}
//               className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
//             >
//               Export to PDF
//             </button>
//             <button
//               onClick={exportToJSON}
//               className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
//             >
//               Export to JSON
//             </button>
//           </div>
//         </div>

//         {/* Quick Insights Cards (placed immediately after header) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
//           {[
//             {
//               title: "Total Employers",
//               value: systemStats.totalEmployers,
//               gradient: "from-blue-100 to-blue-200",
//             },
//             {
//               title: "Total Employees",
//               value: systemStats.totalEmployees,
//               gradient: "from-green-100 to-green-200",
//             },
//             {
//               title: "Active Companies",
//               value: systemStats.activeCompanies,
//               gradient: "from-yellow-100 to-yellow-200",
//             },
//             {
//               title: "Disputes Raised",
//               value: systemStats.disputesRaised,
//               gradient: "from-red-100 to-red-200",
//             },
//             {
//               title: "Blacklisted Employees",
//               value: systemStats.blacklistedEmployees,
//               gradient: "from-gray-100 to-gray-200",
//             },
//           ].map((card, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br ${card.gradient} rounded-xl shadow-xl p-6 flex flex-col items-center transition transform hover:scale-105`}
//             >
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 {card.title}
//               </h3>
//               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* System Analytics Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Bar Chart Card */}
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl ">
//             <div className="bg-gradient-to-r from-blue-700 to-green-300 p-4 ">
//               <h3 className="text-2xl font-bold text-white ">
//                 Employer & Employee Stats
//               </h3>
//             </div>
//             <div className="p-6">
//               <div className="h-64">
//                 <Bar data={barChartData} options={barChartOptions}/>
//               </div>
//             </div>
//           </div>
//           {/* Pie Chart Card */}
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
//             <div className="bg-gradient-to-r from-purple-700 to-green-600 p-4">
//               <h3 className="text-2xl font-bold text-white">
//                 Disputes & Blacklist Stats
//               </h3>
//             </div>
//             <div className="p-6">
//               <div className="h-64">
//                 <Pie data={pieChartData} options={pieChartOptions} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axiosInstance from '../../middleware/axiosInstance'

// Register Chart.js components
ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);


const AdminDashboard = () => {
  const [systemStats, setSystemStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashBoardData,setDashBoardData]=useState([]);

  // Fetch data from the dummy API and map it to systemStats keys.
  const fetchSystemStats = async () => {
    // try {
  //     const response = await fetch(`${API_URL}/users`);
  //     const data = await response.json();
  //     const users = data.users || [];

     
  //     // const totalEmployers = data.total || users.length; // Total users
  //     // const totalEmployees = users.reduce((sum, user) => sum + user.age, 0); // Sum of ages
  //     // const activeCompanies = users.filter((user) => user.age > 30).length;
  //     const disputesRaised = users.filter((user) => user.gender === "female").length;
  //     const blacklistedEmployees = users.filter((user) => user.gender === "male").length;

  //     setSystemStats({
  //       totalEmployers,
  //       totalEmployees,
  //       activeCompanies,
  //       disputesRaised,
  //       blacklistedEmployees,
  //     });
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Error fetching system stats");
  //     setLoading(false);
  //   }
  };

  console.log(dashBoardData,'dasssss');
  

  const dashboardFetch = async()=>{
    try {
      const response = await axiosInstance.get("/total-employers")

      console.log(response);
      
      const totalEmployers = response?.data?.totalEmployers?.totalEmployeeAdmins ; 
      console.log(totalEmployers,'eeeeee');
        
      const totalEmployees = response?.data?.totalEmployers?.totalEmployees ;
      const activeCompanies = response?.data?.totalEmployers?.companies;
      const disputesRaised = response?.data?.totalEmployers?.dispute;
      const blacklistedEmployees = response?.data.totalEmployers?.blacklist
      ;

      setSystemStats({
        totalEmployers,
        totalEmployees,
        activeCompanies,
        disputesRaised,
        blacklistedEmployees,
      });
      setLoading(false);
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchSystemStats();
    dashboardFetch()
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  // Data configuration for Bar Chart.
  const barChartData = {
    labels: ["Employer Admins", "Employees", "Companies"],
    datasets: [
      {
        label: "System Stats",
        data: [
          systemStats.totalEmployers,
          systemStats.totalEmployees,
          systemStats.activeCompanies,
          systemStats.disputesRaised
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
        borderColor: ["#2980b9", "#27ae60", "#f39c12"],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  // Custom options for the Bar Chart.
  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    layout: { padding: 10 },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { font: { size: 14, family: "Inter, sans-serif" }, color: "#333" },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 }, color: "#555" } },
      y: { grid: { color: "#eee" }, ticks: { font: { size: 12 }, color: "#555" } },
    },
  };

  // Data configuration for Pie Chart.
  const pieChartData = {
    labels: ["Disputes Raised", "Blacklisted Employees"],
    datasets: [
      {
        data: [systemStats.disputesRaised, systemStats.blacklistedEmployees],
        backgroundColor: ["#9b59b6", "#2ecc71"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // Custom options for the Pie Chart.
  const pieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { font: { size: 14, family: "Inter, sans-serif" }, color: "#333" },
      },
    },
  };

  // Export functions.
  const exportToCSV = () => {
    const csvData = Papa.unparse([
      { Metric: "Total Employers", Value: systemStats.totalEmployers },
      { Metric: "Total Employees", Value: systemStats.totalEmployees },
      { Metric: "Active Companies", Value: systemStats.activeCompanies },
      { Metric: "Disputes Raised", Value: systemStats.disputesRaised },
      { Metric: "Blacklisted Employees", Value: systemStats.blacklistedEmployees },
    ]);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "admin_dashboard_data.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Admin Dashboard Analytics", 10, 10);
    doc.text(`Total Employers: ${systemStats.totalEmployers}`, 10, 20);
    doc.text(`Total Employees: ${systemStats.totalEmployees}`, 10, 30);
    doc.text(`Active Companies: ${systemStats.activeCompanies}`, 10, 40);
    doc.text(`Disputes Raised: ${systemStats.disputesRaised}`, 10, 50);
    doc.text(`Blacklisted Employees: ${systemStats.blacklistedEmployees}`, 10, 60);
    doc.save("admin_dashboard_data.pdf");
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(systemStats, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, "admin_dashboard_data.json");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-50  p-8 h-190 overflow-y-auto overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Row: Left - "System Analytics"; Right - Export Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">System Analytics</h2>
          <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
          <button
  onClick={exportToCSV}
  className="bg-blue-800 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
>
  Export to CSV
</button>  

            <button
              onClick={exportToPDF}
              className="bg-blue-800 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              Export to PDF
            </button>
            <button
              onClick={exportToJSON}
              className="bg-blue-800 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              Export to JSON
            </button>
          </div>
        </div>

        {/* Quick Insights Cards (placed immediately after header) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {[
            {
              title: " Employer Admins",
              value: systemStats.totalEmployers,
              gradient: "from-blue-200 to-blue-300",
            },
            {
              title: " Employees",
              value: systemStats.totalEmployees,
              gradient: "from-blue-200 to-blue-300",
            },
            {
              title: " Companies",
              value: systemStats.activeCompanies,
              gradient: "from-blue-200 to-blue-300",
            },
            {
              title: "Disputes Raised",
              value: systemStats.disputesRaised,
              gradient: "from-blue-200 to-blue-300",
            },
            {
              title: "Blackliste Employees",
              value: systemStats.blacklistedEmployees,
              gradient: "from-blue-200 to-blue-300",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.gradient} rounded-xl shadow-xl p-6 flex flex-col items-center transition transform hover:scale-105`}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {card.title}
              </h3>
              <p className="text-4xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* System Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl ">
            <div className="bg-blue-500 p-4 ">
              <h3 className="text-2xl font-bold text-white ">
                Employer & Employee Stats
              </h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <Bar data={barChartData} options={barChartOptions}/>
              </div>
            </div>
          </div>
          {/* Pie Chart Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
            <div className="bg-blue-500 p-4">
              <h3 className="text-2xl font-bold text-white">
                Disputes & Blacklist Stats
              </h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

