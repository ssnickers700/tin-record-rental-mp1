const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Record = sequelize.define("Record", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recordName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artistName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    unit: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Record;

