import { useState, useEffect } from "react";
import { BarChart, Star } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ratings"); 

        if (response.data.success) {
          const ratings = response.data.data; 

          const trendLabels = [];
          const trendData = [];

          ratings.forEach((rating) => {
            const month = new Date(rating.created_at).toLocaleString(
              "default",
              { month: "short" }
            );
            const existingIndex = trendLabels.indexOf(month);
            if (existingIndex === -1) {
              trendLabels.push(month);
              trendData.push(1);
            } else {
              trendData[existingIndex] += 1; 
            }
          });

          setAnalyticsData({
            averageRating: (
              ratings.reduce((sum, rating) => sum + rating.rating, 0) /
              ratings.length
            ).toFixed(2),
            ratingDistribution: [
              {
                label: "1 Star",
                count: ratings.filter((r) => r.rating === 1).length,
              },
              {
                label: "2 Stars",
                count: ratings.filter((r) => r.rating === 2).length,
              },
              {
                label: "3 Stars",
                count: ratings.filter((r) => r.rating === 3).length,
              },
              {
                label: "4 Stars",
                count: ratings.filter((r) => r.rating === 4).length,
              },
              {
                label: "5 Stars",
                count: ratings.filter((r) => r.rating === 5).length,
              },
            ],
            trend: { labels: trendLabels, data: trendData },
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Trend Data (based on transformed structure)
  const trendData = {
    labels: analyticsData.trend.labels,
    datasets: [
      {
        label: "Ratings per Month",
        data: analyticsData.trend.data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-gray-500" />
            <h2 className="text-xl font-semibold">
              Aggregated Employee Ratings
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-2">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-4xl font-semibold">
                  {analyticsData.averageRating}
                </p>
                <Star className="text-yellow-500 w-8 h-8" />
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Rating Distribution</p>
              <div className="space-y-2">
                {analyticsData.ratingDistribution.map((rating, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{rating.label}</p>
                    <p>{rating.count} users</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="text-gray-500" />
            <h2 className="text-xl font-semibold">Trend Analysis</h2>
          </div>
          <div className="space-y-6">
            <Line
              data={trendData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Average Rating Over Time",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
