const ClientRepository = require("../repository/sequelize/ClientRepository");

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients().then(clients => {
        res.render("pages/client/list", {
            clients: clients,
            navLocation: "clients"
        });
    });
}

exports.showAddClientForm = (req, res, next) => {
    res.render("pages/client/form", {
        clientObj: {},
        formMode: "createNew",
        pageTitle: "Nowy klient",
        btnLabel: "Dodaj",
        btnClass: "form-button-submit-add",
        formAction: "/clients/add",
        navLocation: "clients",
        validationErrors: []
    });
}

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId).then(client => {
        res.render("pages/client/form", {
            clientObj: client,
            formMode: "edit",
            pageTitle: "Edycja klienta",
            btnLabel: "Edytuj",
            btnClass: "form-button-submit-edit",
            formAction: "/clients/edit",
            navLocation: "clients",
            validationErrors: []
        });
    });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId).then(client => {
        res.render("pages/client/form", {
            clientObj: client,
            formMode: "showDetails",
            pageTitle: "Szczegóły klienta",
            formAction: "",
            navLocation: "clients",
            validationErrors: []
        });
    });
}

exports.addClient = (req, res, next) => {
    const clientData = {...req.body}
    ClientRepository.createClient(clientData)
        .then(() => {
            res.redirect("/clients#popup-add");
        })
        .catch(err => {
            res.render("pages/client/form", {
                clientObj: clientData,
                formMode: "createNew",
                pageTitle: "Nowy klient",
                btnLabel: "Dodaj",
                btnClass: "form-button-submit-add",
                formAction: "/clients/add",
                navLocation: "clients",
                validationErrors: err.errors
            });
        });
}

exports.editClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = {...req.body}
    ClientRepository.updateClient(clientId, clientData)
        .then(() => {
            res.redirect("/clients#popup-edit");
        })
        .catch(err => {
            res.render("pages/client/form", {
                clientObj: clientData,
                formMode: "edit",
                pageTitle: "Edycja klienta",
                btnLabel: "Edytuj",
                btnClass: "form-button-submit-edit",
                formAction: "/clients/edit",
                navLocation: "clients",
                validationErrors: err.errors
            });
        });
}

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then(() => {
            res.redirect("/clients#popup-delete");
        });
}