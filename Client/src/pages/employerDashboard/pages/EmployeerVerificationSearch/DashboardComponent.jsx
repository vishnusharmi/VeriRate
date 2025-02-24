import { BarChart, WorkHistory, Star } from "@mui/icons-material";

const Dashboard = ({ analyticsData }) => (
  <div className="mt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="text-gray-500" />
          <h2 className="text-xl font-semibold">Verification Statistics</h2>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-2">Verification Success Rate</p>
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute h-2 bg-blue-500 rounded"
                style={{ width: `${analyticsData.verificationRate}%` }}
              ></div>
            </div>
            <p className="mt-1">{analyticsData.verificationRate}%</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Cross-Reference Success Rate</p>
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute h-2 bg-blue-500 rounded"
                style={{ width: `${analyticsData.crossReferenceRate}%` }}
              ></div>
            </div>
            <p className="mt-1">{analyticsData.crossReferenceRate}%</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <WorkHistory className="text-gray-500" />
          <h2 className="text-xl font-semibold">Overall Metrics</h2>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-gray-600">Total Verifications</p>
            <p className="text-4xl font-semibold">
              {analyticsData.totalVerifications}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Average Employee Rating</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-semibold">
                {analyticsData.averageRating}
              </p>
              <Star className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
