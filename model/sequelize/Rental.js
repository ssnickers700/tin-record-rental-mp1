const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Rental = sequelize.define("Rental", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    record_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Rental;

