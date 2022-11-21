const Sequelize = require("sequelize");

const sequelize = Sequelize("record-rental-mysql", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;