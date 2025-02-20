const express = require("express");
const dotenv = require("dotenv");
const companiesRouter = require("./Routes/companies-route");
const cors = require("cors");
const sequelize = require("./config/DBconnection");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", companiesRouter);


const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
