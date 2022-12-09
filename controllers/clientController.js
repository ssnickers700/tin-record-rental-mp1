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
        pageTitle: "Nowy pracownika",
        btnLabel: "Dodaj",
        btnClass: "form-button-submit-add",
        formAction: "/clients/add",
        navLocation: "clients"
    });
}

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId).then(client => {
        res.render("pages/client/form", {
            clientObj: client,
            formMode: "edit",
            pageTitle: "Edycja pracownika",
            btnLabel: "Edytuj",
            btnClass: "form-button-submit-edit",
            formAction: "/clients/edit",
            navLocation: "clients"
        });
    });
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId).then(client => {
        res.render("pages/client/form", {
            clientObj: client,
            formMode: "showDetails",
            pageTitle: "Szczegóły pracownika",
            formAction: "",
            navLocation: "clients"
        });
    });
}

exports.addClient = (req, res, next) => {
    const clientData = {...req.body}
    ClientRepository.createClient(clientData)
        .then(result => {
            res.redirect("/clients");
        });
}

exports.editClient = (req, res, next) => {
    const clientId = req.params._id;
    console.log(clientId + "<------")
    const clientData = {...req.body}
    ClientRepository.updateClient(clientId, clientData)
        .then(result => {
            res.redirect("/clients");
        });
}

exports.deleteClient = (req, res, next) => {
    const clientId = req.params._id;
    ClientRepository.deleteClient(clientId)
        .then(result => {
            res.redirect("/clients");
        });
}