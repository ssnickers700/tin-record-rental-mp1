const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");
const Record = require("../../model/sequelize/Record");

exports.getClients = () => {
    return Client.findAll();
}

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,
        {
            include: [{
                model: Rental,
                as: "rentals",
                include: [{
                    model: Record,
                    as: "record"
                }]
            }]
        });
}

exports.createClient = (newClientData) => {
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        email: newClientData.email,
        solvency: newClientData.solvency
    });
}

exports.updateClient = (clientId, clientData) => {
    const firstName = clientData.firstName;
    const lastName = clientData.lastName;
    const email = clientData.email;
    const solvency = clientData.solvency;
    return Client.update(
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            solvency, solvency
        },
        {where: {id: clientId}});
}

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: {_id: clientId}
    })
}

