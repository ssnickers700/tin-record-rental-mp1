const sequelize = require("sequelize");

const Client = require("../../model/sequelize/Client");
const Record = require("../../model/sequelize/Record");
const Rental = require("../../model/sequelize/Rental");

module.exports = () => {
    Client.hasMany(Rental, {
        as: "rentals",
        foreignKey: {name: "client_id", allowNull: false},
        constraints: true,
        onDelete: "CASCADE"
    });
    Rental.belongsTo(Client, {
        as: "client",
        foreignKey: {name: "client_id", allowNull: false},
        constraints: true,
        onDelete: "CASCADE"
    });
    Record.hasMany(Rental, {
        as: "records",
        foreignKey: {name: "record_id", allowNull: false},
        constraints: true,
        onDelete: "CASCADE"
    });
    Rental.belongsTo(Record, {
        as: "record",
        foreignKey: {name: "record_id", allowNull: false},
        constraints: true,
        onDelete: "CASCADE"
    });

    
}
