exports.showClientList = (req, res, next) => {
    res.render("pages/client/list");
}

exports.showAddClientForm = (req, res, next) => {
    res.render("pages/client/form");
}

exports.showEditClientForm = (req, res, next) => {
    res.render("pages/client/edit-form");
}

exports.showClientDetails = (req, res, next) => {
    res.render("pages/client/details");
}