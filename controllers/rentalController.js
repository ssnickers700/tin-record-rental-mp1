const RentalRepository = require("../repository/sequelize/RentalRepository");
const ClientsRepository = require("../repository/sequelize/ClientRepository");
const RecordRepository = require("../repository/sequelize/RecordRepository");

exports.showRentalList = (req, res, next) => {
    RentalRepository.getRentals().then(rentals => {
        res.render("pages/rental/list", {
            rentals: rentals,
            navLocation: "rentals"
        });
    });
}

exports.showAddRentalForm = (req, res, next) => {
    let allClients, allRecords;
    ClientsRepository.getClients().then(clients => {
        allClients = clients;
        return RecordRepository.getRecords();
    }).then(records => {
        allRecords = records;
        res.render("pages/rental/form", {
            rental: {},
            formMode: "createNew",
            allClients: allClients,
            allRecords: allRecords,
            pageTitle: "Nowy wynajem",
            btnLabel: "Dodaj",
            btnClass: "form-button-submit-add",
            formAction: "/rentals/add",
            navLocation: "rentals",
            validationErrors: []
        });
    });
}

exports.showEditRentalForm = (req, res, next) => {
    let allClients, allRecords;
    ClientsRepository.getClients().then(clients => {
        allClients = clients;
        return RecordRepository.getRecords();
    }).then(records => {
        allRecords = records;
        const rentalId = req.params.rentalId;
        RentalRepository.getRentalById(rentalId).then(rental => {
            res.render("pages/rental/form", {
                rental: rental,
                formMode: "edit",
                allClients: allClients,
                allRecords: allRecords,
                pageTitle: "Edycja wynajmu",
                btnLabel: "Edytuj",
                btnClass: "form-button-submit-edit",
                formAction: "/rentals/edit",
                navLocation: "rentals",
                validationErrors: []
            });
        });
    });
}

exports.showRentalDetails = (req, res, next) => {
    let allClients, allRecords;
    ClientsRepository.getClients().then(clients => {
        allClients = clients;
        return RecordRepository.getRecords();
    }).then(records => {
        allRecords = records;
        const rentalId = req.params.rentalId;
        RentalRepository.getRentalById(rentalId).then(rental => {
            res.render("pages/rental/form", {
                rental: rental,
                formMode: "showDetails",
                allClients: allClients,
                allRecords: allRecords,
                pageTitle: "Szczegóły wynajmu",
                formAction: "",
                navLocation: "rentals",
                validationErrors: []
            });
        });
    });
}

exports.addRental = (req, res, next) => {
    let allClients, allRecords;
    ClientsRepository.getClients().then(clients => {
        allClients = clients;
        return RecordRepository.getRecords();
    }).then(records => {
        allRecords = records;
        const rentalData = {...req.body}
        if (!rentalData.endDate) {
            rentalData.endDate = null;
        }
        RentalRepository.createRental(rentalData)
            .then(() => {
                res.redirect("/rentals#popup-add");
            })
            .catch(err => {
                res.render("pages/rental/form", {
                    rental: rentalData,
                    formMode: "createNew",
                    allClients: allClients,
                    allRecords: allRecords,
                    pageTitle: "Nowy wynajem",
                    btnLabel: "Dodaj",
                    btnClass: "form-button-submit-add",
                    formAction: "/rentals/add",
                    navLocation: "rentals",
                    validationErrors: err.errors
                });
            });
    });
}

exports.editRental = (req, res, next) => {
    let allClients, allRecords;
    ClientsRepository.getClients().then(clients => {
        allClients = clients;
        return RecordRepository.getRecords();
    }).then(records => {
        allRecords = records;
        const rentalId = req.body._id;
        const rentalData = {...req.body}
        if (!rentalData.endDate) {
            rentalData.endDate = null;
        }
        RentalRepository.updateRental(rentalId, rentalData)
            .then(() => {
                res.redirect("/rentals#popup-edit");
            })
            .catch(err => {
                res.render("pages/rental/form", {
                    rental: rentalData,
                    formMode: "edit",
                    allClients: allClients,
                    allRecords: allRecords,
                    pageTitle: "Edycja wynajmu",
                    btnLabel: "Edytuj",
                    btnClass: "form-button-submit-edit",
                    formAction: "/rentals/edit",
                    navLocation: "rentals",
                    validationErrors: err.errors
                });
            });
    });
}

exports.deleteRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    RentalRepository.deleteRental(rentalId)
        .then(() => {
            res.redirect("/rentals#popup-delete");
        });
}