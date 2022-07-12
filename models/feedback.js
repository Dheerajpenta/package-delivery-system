// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database")

// coupon model
const Feedback =  sequelize.define("feedback", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    rateExperience: {
        type: Sequelize.INTEGER
    },
    feedback: {
        type: Sequelize.STRING
    }
});

// exporting coupon model
module.exports = Feedback;