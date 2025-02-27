const express = require("express");
const dotenv = require("dotenv");
const companiesRouter = require("./Routes/companies-route");
const cors = require("cors");
const blackListRoute = require("./Routes/blackList-route");
const auditLogsRouter = require("./Routes/audit-logs-route");
const sequelize = require("./Config/DBconnection");
const ratingRoutes = require("./Routes/ratingRoutes");
const router = require("./Routes/EmployeeRoutes");
const disputeRoutes = require("./Routes/disputes-route");
const userRouters = require("./Routes/user-route");
const loginRoutes = require("./Routes/userLoginRoute");
require("dotenv").config();
const allAssociations = require("./associations/associationsEXPL");

const app = express();
allAssociations();

app.use(cors());
// app.use(cors());

app.use(express.json());
app.use("/api", blackListRoute);
app.use("/api", loginRoutes);
app.use("/api", auditLogsRouter);
app.use("/api", userRouters);
app.use("/api", ratingRoutes);
app.use("/api", companiesRouter);
app.use("/api", disputeRoutes);

const PORT = process.env.PORT || 3001;

app.use("/api", router);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
