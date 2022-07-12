// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database")

//User Model
const User = sequelize.define("user", {
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

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    country: {
        type: Sequelize.STRING,
    },

    state: {
        type: Sequelize.STRING,
    },

    city: {
        type: Sequelize.STRING,
    },

    zipCode: {
        type: Sequelize.INTEGER,
    },
    
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// exporting user model
module.exports = User;