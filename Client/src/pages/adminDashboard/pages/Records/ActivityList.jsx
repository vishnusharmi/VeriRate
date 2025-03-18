import {
  Person as UserIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as AlertTriangleIcon,
  Delete as TrashIcon,
  Edit as EditIcon,
  Business as BuildingIcon,
  Group as UsersIcon,
  Gavel as GavelIcon,
  AccessTime as ClockIcon,
  Notifications as BellIcon,
} from "@mui/icons-material";

const ActivityList = ({ activities, loading, error }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "Employee Management":
        return <UserIcon className="text-blue-500" />;
      case "Rating Management":
        return <StarIcon className="text-yellow-500" />;
      case "Verifications":
        return <CheckCircleIcon className="text-green-500" />;
      case "Blacklist Management":
        return <AlertTriangleIcon className="text-red-500" />;
      case "Document Updates":
        return <EditIcon className="text-purple-500" />;
      case "Company Management":
        return <BuildingIcon className="text-indigo-500" />;
      case "User Management":
        return <UsersIcon className="text-teal-500" />;
      case "Dispute Management":
        return <GavelIcon className="text-orange-500" />;
      case "Delete":
        return <TrashIcon className="text-red-500" />;
      case "All Activities":
      default:
        return <BellIcon className="text-gray-500" />;
    }
  };

  const getActivityBadgeColor = (type) => {
    switch (type) {
      case "Employee Management":
        return "bg-blue-100 text-blue-800";
      case "Rating Management":
        return "bg-yellow-100 text-yellow-800";
      case "Verifications":
        return "bg-green-100 text-green-800";
      case "Blacklist Management":
        return "bg-red-100 text-red-800";
      case "Document Updates":
        return "bg-purple-100 text-purple-800";
      case "Company Management":
        return "bg-indigo-100 text-indigo-800";
      case "User Management":
        return "bg-teal-100 text-teal-800";
      case "Dispute Management":
        return "bg-orange-100 text-orange-800";
      case "Delete":
        return "bg-red-100 text-red-800";
      case "All Activities":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-y-auto p-5 space-y-4 flex-grow sub-scrollbar">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : activities.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No recent activities found in our records.
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-gray-50 rounded-lg border border-gray-100 p-4 hover:shadow transition-shadow duration-200"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div
                  className={`p-3 rounded-full ${
                    getActivityBadgeColor(activity.type).split(" ")[0]
                  }`}
                >
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 capitalize">
                      {activity.action}
                    </h4>
                    <div className="flex items-center mt-1 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getActivityBadgeColor(
                          activity.type
                        )}`}
                      >
                        {activity.type}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 flex items-center">
                        <ClockIcon className="mr-1" style={{ fontSize: 12 }} />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {activity.actor}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  {activity.subject || "N/A"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityList;
