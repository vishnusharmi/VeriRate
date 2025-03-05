import { useState, useEffect } from "react";

const fakeData = {
  employees: [
    { id: 1, name: "Ravi Kumar", role: "Software Engineer", status: "Active" },
    { id: 2, name: "Krishna Sharma", role: "HR Manager", status: "Active" },
    {
      id: 3,
      name: "Ram Verma",
      role: "Finance Analyst",
      status: "Blacklisted",
    },
    { id: 4, name: "Priya Mehta", role: "UI/UX Designer", status: "Active" },
  ],
  auditLogs: [
    {
      id: 101,
      employeeName: "Ravi Kumar",
      action: "Logged in",
      timestamp: "2024-03-02 10:15 AM",
    },
    {
      id: 102,
      employeeName: "Krishna Sharma",
      action: "Updated profile",
      timestamp: "2024-03-02 11:00 AM",
    },
    {
      id: 103,
      employeeName: "Ram Verma",
      action: "Blacklisted by admin",
      timestamp: "2024-03-01 09:45 PM",
    },
    {
      id: 104,
      employeeName: "Priya Mehta",
      action: "Enabled 2FA",
      timestamp: "2024-03-02 08:30 AM",
    },
    {
      id: 105,
      employeeName: "Ravi Kumar",
      action: "Changed password",
      timestamp: "2024-03-02 07:20 AM",
    },
  ],
  securityStats: {
    totalEmployees: 4,
    twoFA: 2,
    blacklisted: 1,
  },
};

const EmployerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [securityStats, setSecurityStats] = useState({
    twoFA: 0,
    blacklisted: 0,
  });

  useEffect(() => {
    setEmployees(fakeData.employees);
    setAuditLogs(fakeData.auditLogs.slice(0, 5)); // Show only recent logs
    setSecurityStats(fakeData.securityStats);
  }, []);

  return (
    <div className="flex flex-col gap-10 p-6">
      {/* Employee Overview */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Overview</h2>
        <p className="text-gray-600">
          Total Employees: <strong>{securityStats.totalEmployees}</strong>
        </p>
        <p className="text-gray-600">
          2FA Enabled: <strong>{securityStats.twoFA}</strong>
        </p>
        <p className="text-gray-600">
          Blacklisted Employees: <strong>{securityStats.blacklisted}</strong>
        </p>
      </div>

      {/* Recent Employee Activity */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Employee Activity</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {auditLogs.map((log) => (
            <li key={log.id}>
              {log.action} by {log.employeeName} on {log.timestamp}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-6">
        <button className="bg-blue-600 text-white p-3 rounded-md">
          Add Employee
        </button>
        <button className="bg-gray-600 text-white p-3 rounded-md">
          View Audit Logs
        </button>
        <button className="bg-red-600 text-white p-3 rounded-md">
          Manage Blacklist
        </button>
      </div>
    </div>
  );
};

export default EmployerDashboard;
