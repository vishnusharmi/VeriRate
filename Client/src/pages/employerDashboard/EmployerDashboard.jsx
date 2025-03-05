import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Import some MUI icons for visual flair
import BusinessIcon from "@mui/icons-material/Business";
import GavelIcon from "@mui/icons-material/Gavel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const API = "https://dummyjson.com";
// Donut chart data (static for now)
const chartData = [
  { name: "Payment", value: 42 },
  { name: "Service", value: 28 },
  { name: "Technical", value: 17 },
  { name: "Other", value: 13 },
];
const COLORS = ["#0088FF", "#00C49F", "#FFBB28", "#FF8042"];

// Helper style objects for statuses
const statusStyles = {
  Active: {
    color: "green",
    backgroundColor: "#d6ffe6",
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "20px",
    display: "inline-block",
    minWidth: "60px",
    textAlign: "center",
  },
  Review: {
    color: "#dc3545",
    backgroundColor: "#ffe6ea",
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "20px",
    display: "inline-block",
    minWidth: "60px",
    textAlign: "center",
  },
  Pending: {
    color: "#ffc107",
    backgroundColor: "#fff9e6",
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "20px",
    display: "inline-block",
    minWidth: "60px",
    textAlign: "center",
  },
};

export default function EnhancedDashboard() {
  // State for Recent Company Records
  const [recentRecords, setRecentRecords] = useState([
    { company: "Acme Corporation", status: "Active", lastUpdated: "Today" },
    {
      company: "Globex Industries",
      status: "Review",
      lastUpdated: "Yesterday",
    },
    {
      company: "Stark Enterprises",
      status: "Active",
      lastUpdated: "2 days ago",
    },
    {
      company: "Wayne Industries",
      status: "Pending",
      lastUpdated: "1 week ago",
    },
  ]);

  // ---------------- Backend Logic ----------------
  useEffect(() => {
    // Example: Fetch recent company records from backend API.
    // Since DummyJSON doesn't have a 'companies' endpoint, we'll fetch users
    // and map the first 4 users to mimic company records.
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.users) {
          // Map the first 4 users to our record format.
          const mappedRecords = data.users.slice(0, 4).map((user) => ({
            company: `${user.firstName} ${user.lastName}`,
            // For demonstration, assign status randomly.
            status: ["Active", "Review", "Active", "Pending"][
              Math.floor(Math.random() * 4)
            ],
            // Use a static value for last updated; adjust as needed.
            lastUpdated: "Today",
          }));
          setRecentRecords(mappedRecords);
        }
      })
      .catch((error) => {
        console.error("Error fetching recent company records:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #f0f4f7 0%, #f9fafc 100%)",
        height: "90vh", // Ensure container has fixed viewport height
        p: 2,
        overflowY: "auto",
      }}
    >
      {/* Top Row: Stats Cards */}
      <Grid container spacing={2}>
        {/* Total Company Records */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessIcon
                  sx={{ color: "primary.main", fontSize: 40, mr: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  Total Company Records
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                1,254
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +24 this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Disputes */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <GavelIcon sx={{ color: "error.main", fontSize: 40, mr: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Active Disputes
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="error">
                37
              </Typography>
              <Typography variant="body2" color="text.secondary">
                12 high priority
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Compliance Score */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <CheckCircleIcon
                  sx={{ color: "success.main", fontSize: 40, mr: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  Compliance Score
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                92%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +5% from last quarter
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Middle Row: Recent Records & Disputation Breakdown */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Recent Company Records */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              height: "500px",
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Recent Company Records
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table
                  sx={{
                    borderSpacing: "0 5px",
                    borderCollapse: "separate",
                    minWidth: "600px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Last Updated
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentRecords.map((record, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          boxShadow: 6,
                          borderRadius: 10,
                          backgroundColor: "#fff",
                        }}
                      >
                        <TableCell>{record.company}</TableCell>
                        <TableCell>
                          <span
                            style={
                              statusStyles[record.status] ||
                              statusStyles["Pending"]
                            }
                          >
                            {record.status}
                          </span>
                        </TableCell>
                        <TableCell>{record.lastUpdated}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: "primary.main",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            View
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Disputation Breakdown */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              fontWeight: "bold",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Disputation Breakdown
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <PieChart width={300} height={220}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Box display="flex" flexDirection="column" gap={1}>
                  {chartData.map((item, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      p={1}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: COLORS[index % COLORS.length],
                          mr: 1,
                        }}
                      />
                      <Typography variant="body1" fontWeight="bold" mr={1}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1">{item.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row: System Compliance Overview */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                System Compliance Overview
              </Typography>
              <Grid container spacing={2}>
                {/* Each box is wrapped in a Box with extra shadow and padding */}
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Data Protection
                    </Typography>
                    <Typography variant="h5" color="#00C49F" fontWeight="bold">
                      98%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Access Controls
                    </Typography>
                    <Typography variant="h5" color="#FF8042" fontWeight="bold">
                      94%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Audit Logging
                    </Typography>
                    <Typography variant="h5" color="#00C49F" fontWeight="bold">
                      99%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      System
                    </Typography>
                    <Typography variant="h5" color="#FFBB28" fontWeight="bold">
                      85%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
