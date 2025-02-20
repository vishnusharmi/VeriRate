const express = require("express");
const dotenv = require("dotenv");
const companiesRouter = require("./Routes/companies-route");
const cors = require("cors");
const sequelize = require("./Config/DBconnection");
const router = require("./Routes/EmployeeRoutes");

const userRouters = require('./Routes/user-route');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',userRouters)

app.use("/api", companiesRouter);


const PORT = process.env.PORT || 3000;

app.use("/api", router);

sequelize
  .sync({force:false})
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
