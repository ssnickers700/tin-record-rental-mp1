const ClientRepository = require("../repository/sequelize/ClientRepository");
const authUtil = require("../util/authUtils");

exports.getClients = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getClientById = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            if (!client) {
                res.status(404).json({message: `Client with ${clientId} not found`});
            } else {
                res.status(200).json(client);
            }
        });
};

exports.createClient = (req, res, next) => {
    req.body.password = authUtil.hashPassword(req.body.password);
    ClientRepository.createClient(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateClient = (req, res, next) => {
    const clientId = req.params.clientId;
    const hashPattern = /^\$2[aby]?\$\d{1,2}\$[.\/A-Za-z0-9]{53}$/
    if (hashPattern.test(req.body.password)) {
        delete req.body.password;
    } else {
        req.body.password = authUtil.hashPassword(req.body.password);
    }
    ClientRepository.updateClient(clientId, req.body)
        .then(result => {
            res.status(200).json({message: "Client updated", client: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then(result => {
            res.status(200).json({message: "Removed client", client: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

