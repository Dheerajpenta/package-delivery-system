// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");

// intializing express
const app = express();

// intializing cors
app.use(cors());

// intializing bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// starting port
app.listen(3000);
console.log("App running on port 3000");