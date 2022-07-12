// dependencies
const Sequelize = require("sequelize");

// service files
const sequelize = require("../services/database")

// package model
const Package =  sequelize.define("package", {
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
    },

    packageImgSrc: {
        type: Sequelize.STRING,
        unique: true,
    },

    length: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    breadth: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    pickUpAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    dropAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    alternativePhoneNumber: {
        type: Sequelize.BIGINT,
        unique: true,
    },

    cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

// exporting package model
module.exports = Package;