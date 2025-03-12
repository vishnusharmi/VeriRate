import { PeopleOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../middleware/axiosInstance"; // Adjust the import path as needed

const Monitoring = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get("/activity-logs/specific-types");
        setLogs(response.data); // Set the logs directly from response.data
        setFilteredLogs(response.data); // Initialize filteredLogs with all logs
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredLogs(logs); // Reset to all logs if search term is cleared
    } else {
      setFilteredLogs(
        logs.filter(
          (log) =>
            log.details.toLowerCase().includes(value.toLowerCase()) ||
            log.action.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
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
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="h-100 overflow-y-auto border rounded-md content-scrollbar">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border-b last:border-none flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{log.details}</p>
                  <p className="text-sm text-gray-500">{log.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${log.priority === "high" ? "text-red-500" : "text-green-500"}`}>
                    {log.priority}
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