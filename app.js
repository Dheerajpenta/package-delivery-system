// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");

// importing service files
const sequelize = require("./services/database");

// intializing express
const app = express();

// intializing cors
app.use(cors());

// intializing bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// importing route files
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const packageRoutes = require("./routes/package");
const couponRoutes = require("./routes/coupon");

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/package", packageRoutes);
app.use("/coupon", couponRoutes);

// function to syncing data with database and starting port
(async () => {
    try {
  
      // syncing data
      await sequelize.sync({ force: false });
  
      // starting port
      app.listen(3000);
      console.log("App running on port 3000");
    } catch (error) {
  
      // if error
      console.log(error);
    }
  })();