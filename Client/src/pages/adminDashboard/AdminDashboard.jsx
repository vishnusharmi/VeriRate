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

// Register Chart.js components
ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const AdminDashboard = () => {
  // 📌 Static data representing system-wide analytics for the Super Admin.
  const systemStats = {
    totalEmployers: 120, // Total registered employers on the platform
    totalEmployees: 5000, // Total employees managed across all employers
    activeCompanies: 85, // Companies that have been active in the last 30 days
    disputesRaised: 45, // Number of disputes raised by employees/employers
    blacklistedEmployees: 150, // Number of employees blacklisted across companies
  };

  // 📌 Data configuration for Bar Chart - Displays employer & employee counts.
  const barChartData = {
    labels: ["Employers", "Employees", "Active Companies"],
    datasets: [
      {
        label: "System Stats",
        data: [
          systemStats.totalEmployers,
          systemStats.totalEmployees,
          systemStats.activeCompanies,
        ],
        backgroundColor: ["#1E88E5", "#43A047", "#FFB300"],
      },
    ],
  };

  // 📌 Data configuration for Pie Chart - Displays disputes & blacklist statistics.
  const pieChartData = {
    labels: ["Disputes Raised", "Blacklisted Employees"],
    datasets: [
      {
        data: [systemStats.disputesRaised, systemStats.blacklistedEmployees],
        backgroundColor: ["#E53935", "#6D4C41"],
      },
    ],
  };

  // 📌 Function to export dashboard data as CSV.
  const exportToCSV = () => {
    const csvData = Papa.unparse([
      { Metric: "Total Employers", Value: systemStats.totalEmployers },
      { Metric: "Total Employees", Value: systemStats.totalEmployees },
      { Metric: "Active Companies", Value: systemStats.activeCompanies },
      { Metric: "Disputes Raised", Value: systemStats.disputesRaised },
      {
        Metric: "Blacklisted Employees",
        Value: systemStats.blacklistedEmployees,
      },
    ]);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "admin_dashboard_data.csv");
  };

  // 📌 Function to export dashboard data as PDF.
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Admin Dashboard Analytics", 10, 10);
    doc.text(`Total Employers: ${systemStats.totalEmployers}`, 10, 20);
    doc.text(`Total Employees: ${systemStats.totalEmployees}`, 10, 30);
    doc.text(`Active Companies: ${systemStats.activeCompanies}`, 10, 40);
    doc.text(`Disputes Raised: ${systemStats.disputesRaised}`, 10, 50);
    doc.text(
      `Blacklisted Employees: ${systemStats.blacklistedEmployees}`,
      10,
      60
    );
    doc.save("admin_dashboard_data.pdf");
  };

  // 📌 Function to export dashboard data as JSON.
  const exportToJSON = () => {
    const jsonData = JSON.stringify(systemStats, null, 2); // Pretty-print JSON
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, "admin_dashboard_data.json");
  };

  return (
    <div className="p-4">
      {/* 📌 Export Buttons for CSV, PDF, and JSON */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToJSON}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Export to JSON
        </button>
      </div>

      {/* 📌 System Analytics Section */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">System Analytics</h2>

      {/* 📌 Displaying System Stats in a Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Employer & Employee Stats
          </h3>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Disputes & Blacklist Stats
          </h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* 📌 Existing Dashboard Cards */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Insights</h2>
      <div className="flex gap-10 flex-wrap items-center justify-center">
        {[
          { title: "Total Employers", value: systemStats.totalEmployers },
          { title: "Total Employees", value: systemStats.totalEmployees },
          { title: "Active Companies", value: systemStats.activeCompanies },
          { title: "Disputes Raised", value: systemStats.disputesRaised },
          {
            title: "Blacklisted Employees",
            value: systemStats.blacklistedEmployees,
          },
        ].map((card) => (
          <div
            key={crypto.randomUUID()}
            className="flex flex-col rounded-md shadow-md gap-6 p-4 w-48"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-700">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
