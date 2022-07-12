// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database")

// coupon model
const Coupon =  sequelize.define("coupon", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    value: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

// exporting coupon model
module.exports = Coupon;