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
// ChartJS.register(
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale
// );

// const AdminDashboard = () => {
//   // 📌 Static data representing system-wide analytics for the Super Admin.
//   const systemStats = {
//     totalEmployers: 120, // Total registered employers on the platform
//     totalEmployees: 5000, // Total employees managed across all employers
//     activeCompanies: 85, // Companies that have been active in the last 30 days
//     disputesRaised: 45, // Number of disputes raised by employees/employers
//     blacklistedEmployees: 150, // Number of employees blacklisted across companies
//   };

//   // 📌 Data configuration for Bar Chart - Displays employer & employee counts.
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
//         backgroundColor: ["#1E88E5", "#43A047", "#FFB300"],
//       },
//     ],
//   };

//   // 📌 Data configuration for Pie Chart - Displays disputes & blacklist statistics.
//   const pieChartData = {
//     labels: ["Disputes Raised", "Blacklisted Employees"],
//     datasets: [
//       {
//         data: [systemStats.disputesRaised, systemStats.blacklistedEmployees],
//         backgroundColor: ["#E53935", "#6D4C41"],
//       },
//     ],
//   };

//   // 📌 Function to export dashboard data as CSV.
//   const exportToCSV = () => {
//     const csvData = Papa.unparse([
//       { Metric: "Total Employers", Value: systemStats.totalEmployers },
//       { Metric: "Total Employees", Value: systemStats.totalEmployees },
//       { Metric: "Active Companies", Value: systemStats.activeCompanies },
//       { Metric: "Disputes Raised", Value: systemStats.disputesRaised },
//       {
//         Metric: "Blacklisted Employees",
//         Value: systemStats.blacklistedEmployees,
//       },
//     ]);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "admin_dashboard_data.csv");
//   };

//   // 📌 Function to export dashboard data as PDF.
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Admin Dashboard Analytics", 10, 10);
//     doc.text(`Total Employers: ${systemStats.totalEmployers}`, 10, 20);
//     doc.text(`Total Employees: ${systemStats.totalEmployees}`, 10, 30);
//     doc.text(`Active Companies: ${systemStats.activeCompanies}`, 10, 40);
//     doc.text(`Disputes Raised: ${systemStats.disputesRaised}`, 10, 50);
//     doc.text(
//       `Blacklisted Employees: ${systemStats.blacklistedEmployees}`,
//       10,
//       60
//     );
//     doc.save("admin_dashboard_data.pdf");
//   };

//   // 📌 Function to export dashboard data as JSON.
//   const exportToJSON = () => {
//     const jsonData = JSON.stringify(systemStats, null, 2); // Pretty-print JSON
//     const blob = new Blob([jsonData], { type: "application/json" });
//     saveAs(blob, "admin_dashboard_data.json");
//   };

//   return (
//     <div className="p-4">
//       {/* 📌 Export Buttons for CSV, PDF, and JSON */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={exportToCSV}
//           className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
//         >
//           Export to CSV
//         </button>
//         <button
//           onClick={exportToPDF}
//           className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
//         >
//           Export to PDF
//         </button>
//         <button
//           onClick={exportToJSON}
//           className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
//         >
//           Export to JSON
//         </button>
//       </div>

//       {/* 📌 System Analytics Section */}
//       <h2 className="text-xl font-bold text-gray-700 mb-4">System Analytics</h2>

//       {/* 📌 Displaying System Stats in a Responsive Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-md p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Employer & Employee Stats
//           </h3>
//           <Bar data={barChartData} />
//         </div>

//         <div className="bg-white shadow-md p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Disputes & Blacklist Stats
//           </h3>
//           <Pie data={pieChartData} />
//         </div>
//       </div>

//       {/* 📌 Existing Dashboard Cards */}
//       <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Insights</h2>
//       <div className="flex gap-10 flex-wrap items-center justify-center">
//         {[
//           { title: "Total Employers", value: systemStats.totalEmployers },
//           { title: "Total Employees", value: systemStats.totalEmployees },
//           { title: "Active Companies", value: systemStats.activeCompanies },
//           { title: "Disputes Raised", value: systemStats.disputesRaised },
//           {
//             title: "Blacklisted Employees",
//             value: systemStats.blacklistedEmployees,
//           },
//         ].map((card) => (
//           <div
//             key={crypto.randomUUID()}
//             className="flex flex-col rounded-md shadow-md gap-6 p-4 w-48"
//           >
//             <h3 className="text-lg font-semibold">{card.title}</h3>
//             <p className="text-2xl font-bold text-gray-700">{card.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
























"use client"

import { useState, useEffect } from "react"
import FileSaver from "file-saver"
import { jsPDF } from "jspdf"
import Papa from "papaparse"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js"
import { useNavigate } from "react-router"

// Register Chart.js components
ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale)

const API_URL = "https://dummyjson.com" // Dummy API URL

const AdminDashboard = () => {
  // Move the useNavigate hook inside the component
  const navigate = useNavigate()

  const [systemStats, setSystemStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch data from the dummy API and map it to systemStats keys.
  const fetchSystemStats = async () => {
    try {
      const response = await fetch(`${API_URL}/users`)
      const data = await response.json()
      const users = data.users || []

      // Mapping:
      const totalEmployers = data.total || users.length // Total users
      const totalEmployees = users.reduce((sum, user) => sum + user.age, 0) // Sum of ages
      const activeCompanies = users.filter((user) => user.age > 30).length
      const disputesRaised = users.filter((user) => user.gender === "female").length
      const blacklistedEmployees = users.filter((user) => user.gender === "male").length

      setSystemStats({
        totalEmployers,
        totalEmployees,
        activeCompanies,
        disputesRaised,
        blacklistedEmployees,
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError("Error fetching system stats")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  // Data configuration for Bar Chart.
  const barChartData = {
    labels: ["Employers", "Employees", "Active Companies"],
    datasets: [
      {
        label: "System Stats",
        data: [systemStats.totalEmployers, systemStats.totalEmployees, systemStats.activeCompanies],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
        borderColor: ["#2980b9", "#27ae60", "#f39c12"],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  }

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
  }

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
  }

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
  }

  // Export functions.
  const exportToCSV = () => {
    const csvData = Papa.unparse([
      { Metric: "Total Employers", Value: systemStats.totalEmployers },
      { Metric: "Total Employees", Value: systemStats.totalEmployees },
      { Metric: "Active Companies", Value: systemStats.activeCompanies },
      { Metric: "Disputes Raised", Value: systemStats.disputesRaised },
      { Metric: "Blacklisted Employees", Value: systemStats.blacklistedEmployees },
    ])
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    FileSaver.saveAs(blob, "admin_dashboard_data.csv")
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text("Admin Dashboard Analytics", 10, 10)
    doc.text(`Total Employers: ${systemStats.totalEmployers}`, 10, 20)
    doc.text(`Total Employees: ${systemStats.totalEmployees}`, 10, 30)
    doc.text(`Active Companies: ${systemStats.activeCompanies}`, 10, 40)
    doc.text(`Disputes Raised: ${systemStats.disputesRaised}`, 10, 50)
    doc.text(`Blacklisted Employees: ${systemStats.blacklistedEmployees}`, 10, 60)
    doc.save("admin_dashboard_data.pdf")
  }

  const exportToJSON = () => {
    const jsonData = JSON.stringify(systemStats, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    FileSaver.saveAs(blob, "admin_dashboard_data.json")
  }

  // Function to handle card navigation
  const handleCardClick = (path) => {
    if (path) {
      navigate(path)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Row: Left - "System Analytics"; Right - Export Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">System Analytics</h2>
          <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Export to CSV
            </button>
            <button
              onClick={exportToPDF}
              className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Export to PDF
            </button>
            <button
              onClick={exportToJSON}
              className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Export to JSON
            </button>
          </div>
        </div>

        {/* Quick Insights Cards (placed immediately after header) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {[
            {
              title: "Total Employers",
              value: systemStats.totalEmployers,
              gradient: "from-blue-100 to-blue-200",
              path: "/admin/user-management",
            },
            {
              title: "Total Employees",
              value: systemStats.totalEmployees,
              gradient: "from-green-100 to-green-200",
              path: "/admin/user-management",
            },
            {
              title: "Active Companies",
              value: systemStats.activeCompanies,
              gradient: "from-yellow-100 to-yellow-200",
              path: "/admin/company-management",
            },
            {
              title: "Disputes Raised",
              value: systemStats.disputesRaised,
              gradient: "from-red-100 to-red-200",
              path: "/admin/disputes",
            },
            {
              title: "Blacklisted Employees",
              value: systemStats.blacklistedEmployees,
              gradient: "from-gray-100 to-gray-200",
              path: "/company/blacklist",
            },
          ].map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.path)}
              className={`bg-gradient-to-br ${card.gradient} rounded-xl shadow-xl p-6 flex flex-col items-center transition transform hover:scale-105 cursor-pointer`}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{card.title}</h3>
              <p className="text-4xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* System Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl ">
            <div className="bg-gradient-to-r from-blue-700 to-green-300 p-4 ">
              <h3 className="text-2xl font-bold text-white ">Employer & Employee Stats</h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>
          </div>
          {/* Pie Chart Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
            <div className="bg-gradient-to-r from-purple-700 to-green-600 p-4">
              <h3 className="text-2xl font-bold text-white">Disputes & Blacklist Stats</h3>
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
  )
}

export default AdminDashboard

