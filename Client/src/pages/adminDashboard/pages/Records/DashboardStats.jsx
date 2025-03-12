import {
  Business as BusinessIcon,
  ReportProblem as ReportProblemIcon,
  MonitorHeart as MonitorHeartIcon,
} from "@mui/icons-material";

const DashboardStats = ({
  employees,
  disputes,
  health,
  employePercent,
  disputePercent,
  solvedPercent,
}) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
      {/* Employee Card */}
      <div
        className={`w-full p-5 bg-white rounded-2xl border-l-4 ${getCardBorderColor(
          employePercent
        )} shadow-md hover:shadow-lg transition-shadow duration-300`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Employee Management</p>
            <p className="text-2xl font-bold">{employees}</p>
            <p className="text-sm text-gray-700">Total Employees</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <BusinessIcon className="text-blue-500" style={{ fontSize: 35 }} />
          </div>
        </div>
      </div>

      {/* Dispute Card */}
      <div
        className={`w-full p-5 bg-white rounded-2xl border-l-4 ${getCardBorderColor(
          disputePercent
        )} shadow-md hover:shadow-lg transition-shadow duration-300`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Dispute Resolution</p>
            <p className="text-2xl font-bold">{disputes}</p>
            <p className="text-sm text-gray-700">Active Conflicts</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <ReportProblemIcon
              className="text-orange-500"
              style={{ fontSize: 35 }}
            />
          </div>
        </div>
      </div>

      {/* Health Card */}
      <div
        className={`w-full p-5 bg-white rounded-2xl border-l-4 ${getCardBorderColor(
          solvedPercent
        )} shadow-md hover:shadow-lg transition-shadow duration-300`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Dispute Management</p>
            <p className="text-2xl font-bold">{health}%</p>
            <p className="text-sm text-gray-700">Solved Conflicts</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <MonitorHeartIcon
              className="text-green-500"
              style={{ fontSize: 35 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
