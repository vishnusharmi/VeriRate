import { useState, useEffect } from "react";
import {
  User,
  Star,
  CheckCircle,
  AlertTriangle,
  Bell,
  ChevronDown,
  Trash,
  Edit,
  Clock,
} from "lucide-react";
import BusinessIcon from "@mui/icons-material/Business";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import axios from "axios";

const Records = () => {
  // Dashboard stats
  const [employees, setEmployees] = useState("2,847");
  const [disputes, setDisputes] = useState("279");
  const [health, setHealth] = useState("68.9");
  const [employePercent, setEmployePercent] = useState("12");
  const [disputePercent, setDisputePercent] = useState("-3");
  const [solvedPercent, setSolvedPercent] = useState("5");

  // Filter states
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [periodFilter, setPeriodFilter] = useState("Today");
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Activity data state
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint
  const API_ENDPOINT = "http://localhost:3000/api/getRecentActivities";

  useEffect(() => {
    fetchActivities();
    fetchStats();
  }, [periodFilter]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT);
      const data = response.data.activities;

      const transformedData = data.map((activity) => ({
        id: activity.id,
        type: activity.entity || "Unknown",
        action: activity.action,
        actor: `User ${activity.userId}`,
        subject: activity.details,
        description: activity.details,
        date: new Date(activity.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }));

      setActivities(transformedData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch activities");
      setLoading(false);
      console.error("Error fetching activities:", err);
    }
  };

  const fetchStats = async () => {
    try {
      // Static data for now
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  // Function to get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "Employee Management":
        return <User className="text-blue-500" />;
      case "Rating Management":
        return <Star className="text-yellow-500" />;
      case "Verifications":
        return <CheckCircle className="text-green-500" />;
      case "Blacklist Changes":
        return <AlertTriangle className="text-red-500" />;
      case "Document Updates":
        return <Edit className="text-purple-500" />;
      case "Delete":
        return <Trash className="text-red-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  // Filter activities based on selected filter
  const filteredActivities = activities.filter((activity) => {
    if (activityFilter === "All Activities") {
      return true;
    }
    return activity.type === activityFilter;
  });

  const renderPercentage = (percent) => (
    <p
      className={`text-sm mt-1 ${
        Number(percent) > 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {Number(percent) > 0
        ? `↑ ${percent}% from last month`
        : `↓ ${Math.abs(percent)}% from last month`}
    </p>
  );

  const getCardBorderColor = (percent) =>
    Number(percent) > 0 ? "border-green-500" : "border-red-600";

  const activityOptions = [
    "All Activities",
    "Employee Management",
    "Ratings & Feedback",
    "Verifications",
    "Blacklist Changes",
    "Document Updates",
  ];

  const periodOptions = ["Today", "This Week", "This Month", "All Time"];

  return (
    <div className="p-5 space-y-5 min-h-screen max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">Employee Records</h2>
        <p className="text-gray-600">Welcome John! Here's today's update.</p>
      </div>

      {/* Employee, Dispute, and Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Employee Card */}
        <div
          className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(
            employePercent
          )} shadow flex justify-between items-center`}
        >
          <div>
            <p className="text-sm text-gray-500">Employee Management</p>
            <p className="text-l font-bold">{employees} Total Employees</p>
            {renderPercentage(employePercent)}
          </div>
          <BusinessIcon className="text-blue-500" style={{ fontSize: 35 }} />
        </div>

        {/* Dispute Card */}
        <div
          className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(
            disputePercent
          )} shadow flex justify-between items-center`}
        >
          <div>
            <p className="text-sm text-gray-500">Dispute Resolution</p>
            <p className="text-l font-bold">{disputes} Active Conflicts</p>
            {renderPercentage(disputePercent)}
          </div>
          <ReportProblemIcon
            className="text-orange-500"
            style={{ fontSize: 35 }}
          />
        </div>

        {/* Health Card */}
        <div
          className={`w-full p-5 bg-gray-100 rounded-2xl border-2 ${getCardBorderColor(
            solvedPercent
          )} shadow flex justify-between items-center`}
        >
          <div>
            <p className="text-sm text-gray-500">Dispute Management</p>
            <p className="text-l font-bold">{health}% Solved Conflicts</p>
            {renderPercentage(solvedPercent)}
          </div>
          <MonitorHeartIcon
            className="text-green-500"
            style={{ fontSize: 35 }}
          />
        </div>
      </div>

      {/* Recent Activity with Filters */}
      <div className="w-full p-5 bg-gray-100 rounded-2xl shadow mt-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="mr-2 text-gray-700" size={20} />
            <h3 className="text-lg font-bold">Recent Activity</h3>
          </div>

          <div className="flex items-center space-x-4">
            {/* Period Filter */}
            <div className="relative">
              <div className="text-sm text-gray-600 mr-2">Period:</div>
              <div
                className="flex items-center justify-between border rounded-md py-1 px-3 text-gray-700 cursor-pointer bg-white w-32"
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              >
                <span>{periodFilter}</span>
                <ChevronDown size={16} />
              </div>

              {showPeriodDropdown && (
                <div className="absolute mt-1 w-32 bg-blue-500 rounded-md shadow-lg z-10">
                  {periodOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
                      onClick={() => {
                        setPeriodFilter(option);
                        setShowPeriodDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Type Filter */}
            <div className="relative">
              <div className="text-sm text-gray-600 mr-2">Filter:</div>
              <div
                className="flex items-center justify-between border rounded-md py-1 px-3 text-gray-700 cursor-pointer bg-white w-40"
                onClick={() => setShowActivityDropdown(!showActivityDropdown)}
              >
                <span>{activityFilter}</span>
                <ChevronDown size={16} />
              </div>

              {showActivityDropdown && (
                <div className="absolute mt-1 w-48 bg-blue-500 rounded-md shadow-lg z-10">
                  {activityOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
                      onClick={() => {
                        setActivityFilter(option);
                        setShowActivityDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No recent activities found in our records.
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 capitalize">
                      {activity.action}
                    </h4>
                    <p className="text-sm text-gray-500">{activity.type}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-700">{activity.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">{activity.date}</p>
                  <Clock className="text-gray-400" size={14} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;
