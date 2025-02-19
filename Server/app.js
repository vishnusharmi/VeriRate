const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./Config/DBconnection");
const userRouters = require('./Routes/user-route');
// const { FORCE } = require("sequelize/lib/index-hints");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',userRouters)




const PORT = process.env.PORT || 3000;

sequelize
  .sync({force:false})
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
