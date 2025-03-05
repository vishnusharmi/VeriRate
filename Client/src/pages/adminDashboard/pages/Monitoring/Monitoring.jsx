import { PeopleOutlined } from "@mui/icons-material";
import { useState } from "react";

const mockAuditLogs = [
  {
    id: 1,
    admin: "Admin John",
    action: "Enabled 2FA",
    timestamp: "2024-03-01 10:30:22",
    status: "Success",
  },
  {
    id: 2,
    admin: "Admin Sarah",
    action: "Blacklisted Employee",
    timestamp: "2024-03-01 10:35:10",
    status: "Success",
  },
  {
    id: 3,
    admin: "Admin Mike",
    action: "Failed Login Attempt",
    timestamp: "2024-03-01 11:05:45",
    status: "Failed",
  },
];

const Monitoring = () => {
  const [filteredLogs, setFilteredLogs] = useState(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteredLogs(
      mockAuditLogs.filter(
        (log) =>
          log.admin.toLowerCase().includes(event.target.value.toLowerCase()) ||
          log.action.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <PeopleOutlined className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Audit Logs</h2>
        </div>
        <p className="text-gray-500 mt-2">
          View system activity logs for security tracking.
        </p>
      </div>
      <div className="p-6">
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="max-h-60 overflow-y-auto border rounded-md">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 border-b last:border-none flex justify-between"
              >
                <div>
                  <p className="font-medium">{log.admin}</p>
                  <p className="text-sm text-gray-500">{log.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                  <p
                    className={`text-xs font-semibold ${
                      log.status === "Failed"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {log.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center p-3">No logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
