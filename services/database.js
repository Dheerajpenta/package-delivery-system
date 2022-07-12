// dependencies
const Sequelize = require("sequelize");


/* 
connecting with local mysql workbench

first argument => database name (packagedeliverysystem)
second argument => your username (root)
third argument => user password (mysql)
*/
const sequelize = new Sequelize("packagedeliverysystem", "root", "mysql", {
    dialect: "mysql",
    host: "localhost" // we are running server locally, so localhost
});

// exporting sequelize
module.exports = sequelize;