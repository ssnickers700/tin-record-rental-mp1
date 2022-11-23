const sequelize = require("./sequelize");

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

    let allClients, allRecords;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Client.findAll();
        })
        .then(clients => {
            if (!clients || clients.length === 0) {
                return Client.bulkCreate([
                    {firstName: "Siemowit", lastName: "Blanek", email: "siema.wit@gmail.com", insolvency: false},
                    {firstName: "Zygmunt", lastName: "Gara", email: "zigy.zig@gmail.com", insolvency: false},
                    {firstName: "Pankracy", lastName: "Pika", email: "pan.pika@gmail.com", insolvency: false},
                ])
                    .then(() => {
                        return Client.findAll();
                    });
            } else {
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Record.findAll();
        })
        .then(records => {
            if (!records || records.length === 0) {
                Record.bulkCreate([
                    {recordName: "Bleach", artistName: "Nirvana", price: 14.00, unit: 8},
                    {recordName: "77", artistName: "Talking Heads", price: 17.00, unit: 4},
                    {recordName: "Born in the U.S.A.", artistName: "Bruce Springsteen", price: 15.00, unit: 9}
                ])
                    .then(() => {
                        return Record.findAll();
                    })
            } else {
                return records;
            }
        })
        .then(records => {
            allRecords = records;
            return Rental.findAll();
        })
        .then(rentals => {
            if (!rentals || rentals.length === 0) {
                Rental.bulkCreate([
                    {client_id: allClients[0], record_id: allRecords[0], startDate: "2022-09-22", endDate: "2022-10-01"},
                    {client_id: allClients[2], record_id: allRecords[1], startDate: "2022-10-04", endDate: null},
                    {client_id: allClients[0], record_id: allRecords[2], startDate: "2022-10-24", endDate: null}
                ])
                    .then(() => {
                        return Rental.findAll();
                    })
            } else {
                return rentals;
            }
        });
};
