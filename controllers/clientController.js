exports.showClientList = (req, res, next) => {
    res.render("pages/client/list", {navLocation: "clients"});
}

exports.showAddClientForm = (req, res, next) => {
    res.render("pages/client/form", {navLocation: "clients"});
}

exports.showEditClientForm = (req, res, next) => {
    res.render("pages/client/edit-form", {navLocation: "clients"});
}

exports.showClientDetails = (req, res, next) => {
    res.render("pages/client/details", {navLocation: "clients"});
}