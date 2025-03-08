const express = require("express");

const helmet = require("helmet");
const companiesRouter = require("./Routes/companies-route.js");
const cors = require("cors");
const blackListRoute = require("./Routes/blackList-route.js");
const auditLogsRouter = require("./Routes/audit-logs-route.js");
const sequelize = require("./Config/DBconnection.js");
const ratingRoutes = require("./Routes/ratingRoutes.js");
const EmployeeRoutes = require("./Routes/EmployeeRoutes.js");
const disputeRoutes = require("./Routes/disputes-route.js");
const userRouters = require("./Routes/user-route.js");
const loginRoutes = require("./Routes/userLoginRoute.js");
const activityModel = require("./Models/activityModel.js");
const activityRoutes = require("./Routes/activityRoutes.js");
const departmentRoutes = require("./Routes/department-route.js");
require("dotenv").config();

const allAssociations = require("./associations/associationsEXPL");

const app = express();
allAssociations();

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  origin: "*",
}));
app.use(helmet());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api", blackListRoute);
app.use("/api", loginRoutes);
app.use("/api", auditLogsRouter);
app.use("/api", userRouters);
app.use("/api", ratingRoutes);
app.use("/api", companiesRouter);
app.use("/api", disputeRoutes);
app.use("/api", EmployeeRoutes);
app.use("/api", activityRoutes);
app.use("/api", departmentRoutes);


const adminSettingsRouter = require("./Routes/adminSettingsRoutes.js");
app.use("/api/admin-settings", adminSettingsRouter);

// Sync all models
sequelize
  .sync({ force: false }) // Sync all models normally
  .then(async () => {
    // Sync only the Activity model with schema changes (alter the table if necessary)
    await activityModel.sync({ alter: true });

    // Start the server after syncing the models
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
