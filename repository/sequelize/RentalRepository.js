const Sequelize = require("sequelize")

const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");
const Record = require("../../model/sequelize/Record");

exports.getRentals = () => {
    return Rental.findAll({
        include: [{
            model: Client,
            as: "client"
        },
            {
                model: Record,
                as: "record"
            }]
    });
};

exports.getRentalsById = (rentalId) => {
    return Rental.findByPk(rentalId,
        {
            include: [{
                model: Client,
                as: "client"
            },
            {
                model: Record,
                as: "record"
            }]
        });
}

exports.createRental = (newRentalData) => {
    return Rental.create({
        client_id: newRentalData.client_id,
        record_id: newRentalData.record_id,
        startDate: newRentalData.startDate,
        endDate: newRentalData.endDate
    });
}

exports.updateRental = (rentalId, rentalData) => {
    return Rental.update(rentalData, {where: {_id: rentalId}});
}

exports.deleteRental = (rentalId) => {
    return Rental.destroy({
        where: {_id: rentalId}
    })
}

exports.deleteManyRentals = (rentalIds) => {
    return Rental.findAll({_id: {[Sequelize.Op.in]: rentalIds}})
}

