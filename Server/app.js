const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./Config/DBconnection");
const userRouters = require('./Routes/user-route');
const loginRoutes = require('./Routes/userLoginRoute')
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',userRouters);
app.use('/api' , loginRoutes)




const PORT = process.env.PORT || 3000;

sequelize
  .sync({force:false})
  .then(() => {
    app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
