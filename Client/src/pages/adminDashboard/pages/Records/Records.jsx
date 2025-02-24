import BusinessIcon from "@mui/icons-material/Business";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";

const Records = () => {
  const [employees, setEmployees] = useState("2,847");
  const [disputes, setDisputes] = useState("279");
  const [health, setHealth] = useState("68.9");

  const [employePercent, setEmployePercent] = useState("12");
  const [disputePercent, setDisputePercent] = useState("-3");
  const [solvedPercent, setSolvedPercent] = useState("5");

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, title: "New company registration approved", time: "2 hours ago" },
    { id: 2, title: "Payroll processed successfully", time: "5 hours ago" },
    { id: 3, title: "Employee feedback received", time: "1 day ago" },
  ]);

  const renderPercentage = (percent) => (
    <p className={`text-sm mt-1 ${Number(percent) > 0 ? "text-green-600" : "text-red-600"}`}>
      {Number(percent) > 0 ? `↑ ${percent}% from last month` : `↓ ${Math.abs(percent)}% from last month`}
    </p>
  );

  const getCardBorderColor = (percent) => (Number(percent) > 0 ? "border-green-500" : "border-red-600");

// shadow-[inset_0px_-30px_36px_-28px_rgba(0,0,0,0.35),inset_0px_20px_36px_-28px_rgba(0,0,0,0.35)]
  return (
    <div className="p-5 space-y-5 min-h-screen max-w-6xl mx-auto overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">Employee Records</h2>
        <p className="text-gray-600">Welcome John! Here's today's update.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(employePercent)} shadow flex justify-between items-center`}>
          <div>
            <p className="text-sm text-gray-500">Employee Management</p>
            <p className="text-l font-bold">{employees} Total Employees</p>
            {renderPercentage(employePercent)}
          </div>
          <BusinessIcon className="text-blue-500" style={{ fontSize: 35 }} />
        </div>

        <div className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(disputePercent)} shadow flex justify-between items-center`}>
          <div>
            <p className="text-sm text-gray-500">Dispute Resolution</p>
            <p className="text-l font-bold">{disputes} Active Conflicts</p>
            {renderPercentage(disputePercent)}
          </div>
          <ReportProblemIcon className="text-orange-500" style={{ fontSize: 35 }} />
        </div>

        <div className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(solvedPercent)} shadow flex justify-between items-center`}>
          <div>
            <p className="text-sm text-gray-500">Dispute Management</p>
            <p className="text-l font-bold">{health}% Solved Conflicts</p>
            {renderPercentage(solvedPercent)}
          </div>
          <MonitorHeartIcon className="text-green-500" style={{ fontSize: 35 }} />
        </div>
      </div>

      {/* recent activity */}
      <div className="w-full p-5 bg-gray-100 rounded-2xl shadow mt-5 max-h-96 overflow-y-auto custom-scrollbar">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <NoteAddIcon className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Records;
