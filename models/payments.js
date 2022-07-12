// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database");

// payment model
const Payment =  sequelize.define("payment", {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// exporting payment model
module.exports = Payment;