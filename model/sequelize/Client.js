const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Client = sequelize.define("Client", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    solvency: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Client;

