import { useState, useEffect } from "react";
import DashboardStats from "./DashboardStats";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";
import PaginationControls from "./PaginationControls";
import axiosInstance from "../../../../middleware/axiosInstance";

const Records = () => {
  // Dashboard stats
  const [employees, setEmployees] = useState("0");
  const [disputes, setDisputes] = useState("0");
  const [health, setHealth] = useState("0");
  const [employeePercent, setEmployeePercent] = useState("0");
  const [disputePercent, setDisputePercent] = useState("0");
  const [solvedPercent, setSolvedPercent] = useState("0");

  // Filter states
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [periodFilter, setPeriodFilter] = useState("All Time");

  // Activity data state
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchActivities();
    fetchStats();
  }, [
    periodFilter,
    activityFilter,
    pagination.currentPage,
    pagination.pageSize,
  ]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/activity-logs", {
        params: {
          entity:
            activityFilter !== "All Activities" ? activityFilter : undefined,
          period: periodFilter,
          page: pagination.currentPage,
          limit: pagination.pageSize,
        },
      });
      const { totalRecords, totalPages, currentPage, pageSize, data } =
        response.data;

      const transformedData = data.map((activity) => ({
        id: activity.id || "N/A",
        type: activity.entity || "Unknown",
        action: activity.action || "N/A",
        actor: activity.userId ? `User ${activity.userId}` : "N/A",
        subject: activity.details || "N/A",
        description: activity.details || "N/A",
        date: activity.timestamp
          ? new Date(activity.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A",
        time: activity.timestamp
          ? new Date(activity.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
      }));

      setActivities(transformedData);
      setPagination({ totalRecords, totalPages, currentPage, pageSize });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/activity-logs/recent-cards");
      const data = response.data;

      setEmployees(data.totalEmployees.toLocaleString());
      setDisputes(data.activeDisputes.toLocaleString());
      setHealth(data.solvedDisputePercentage.toFixed(1));
      setEmployeePercent(data.employeeGrowthPercentage.toString());
      setDisputePercent(data.disputeChangePercentage.toString());
      setSolvedPercent(data.solvedDisputeGrowthPercentage.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1,
    }));
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto overflow-hidden">
      <div className="space-y-2 my-3">
        <h2 className="text-3xl font-semibold">Employee Records</h2>
        <p className="text-gray-600">Welcome John! Here's today's update.</p>
      </div>

      <DashboardStats
        employees={employees}
        disputes={disputes}
        health={health}
        employeePercent={employeePercent}
        disputePercent={disputePercent}
        solvedPercent={solvedPercent}
      />

      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col flex-grow">
        <ActivityFilter
          activityFilter={activityFilter}
          setActivityFilter={setActivityFilter}
          periodFilter={periodFilter}
          setPeriodFilter={setPeriodFilter}
        />

        <ActivityList activities={activities} loading={loading} />

        <PaginationControls
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default Records;
