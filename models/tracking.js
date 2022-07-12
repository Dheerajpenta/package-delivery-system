// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database");

// tracking model
const Tracking =  sequelize.define("tracking", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "picking up package"
    },
    distanceToDeliver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    timeToDeliver: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
});

// exporting tracking model
module.exports = Tracking;