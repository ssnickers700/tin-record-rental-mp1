const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");
const Record = require("../../model/sequelize/Record");

exports.getRecords = () => {
    return Record.findAll();
}

exports.getRecordById = (recordId) => {
    return Record.findByPk(recordId, {
            include: [{
                model: Rental,
                as: "rentals",
                include: [{
                    model: Client,
                    as: "client"
                }]
            }]
        });
}

exports.createRecord = (newRecordData) => {
    return Record.create({
        recordName: newRecordData.recordName,
        artistName: newRecordData.artistName,
        price: newRecordData.price,
        unit: newRecordData.unit
    });
}

exports.updateRecord = (recordId, recordData) => {
    return Record.update(recordData, {where: {_id: recordId}});
}

exports.deleteRecord = (recordId) => {
    return Record.destroy({
        where: {_id: recordId}
    })
}

