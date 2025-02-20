const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./Config/DBconnection");
const ratingRoutes = require("./Routes/ratingRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/ratings", ratingRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
