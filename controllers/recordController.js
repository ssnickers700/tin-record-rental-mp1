exports.showRecordList = (req, res, next) => {
    res.render("pages/record/list", {navLocation: "records"});
}

exports.showAddRecordForm = (req, res, next) => {
    res.render("pages/record/form", {navLocation: "records"});
}

exports.showEditRecordForm = (req, res, next) => {
    res.render("pages/record/edit-form", {navLocation: "records"});
}

exports.showRecordDetails = (req, res, next) => {
    res.render("pages/record/details", {navLocation: "records"});
}