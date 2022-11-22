const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("record-rental-sequelize", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;