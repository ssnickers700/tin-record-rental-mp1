const RecordRepository = require("../repository/sequelize/RecordRepository");

exports.showRecordList = (req, res, next) => {
    RecordRepository.getRecords().then(records => {
        res.render("pages/record/list", {
            records: records,
            navLocation: "records"
        });
    });
}

exports.showAddRecordForm = (req, res, next) => {
    res.render("pages/record/form", {
        record: {},
        formMode: "createNew",
        pageTitle: "Nowa płyta",
        btnLabel: "Dodaj",
        btnClass: "form-button-submit-add",
        formAction: "/records/add",
        navLocation: "records",
        validationErrors: []
    });
}

exports.showEditRecordForm = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.getRecordById(recordId).then(record => {
        res.render("pages/record/form", {
            record: record,
            formMode: "edit",
            pageTitle: "Edycja płyty",
            btnLabel: "Edytuj",
            btnClass: "form-button-submit-edit",
            formAction: "/records/edit",
            navLocation: "records",
            validationErrors: []
        });
    });
}

exports.showRecordDetails = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.getRecordById(recordId).then(record => {
        res.render("pages/record/form", {
            record: record,
            formMode: "showDetails",
            pageTitle: "Szczegóły płyty",
            formAction: "",
            navLocation: "records",
            validationErrors: []
        });
    });
}

exports.addRecord = (req, res, next) => {
    const recordData = {...req.body}
    RecordRepository.createRecord(recordData)
        .then(() => {
            res.redirect("/records#popup-add");
        })
        .catch(err => {
            res.render("pages/record/form", {
                record: recordData,
                formMode: "createNew",
                pageTitle: "Nowa płyta",
                btnLabel: "Dodaj",
                btnClass: "form-button-submit-add",
                formAction: "/records/add",
                navLocation: "records",
                validationErrors: err.errors
            });
        });
}

exports.editRecord = (req, res, next) => {
    const recordId = req.body._id;
    const recordData = {...req.body}
    RecordRepository.updateRecord(recordId, recordData)
        .then(() => {
            res.redirect("/records#popup-edit");
        })
        .catch(err => {
            res.render("pages/record/form", {
                record: recordData,
                formMode: "edit",
                pageTitle: "Edycja płyty",
                btnLabel: "Edytuj",
                btnClass: "form-button-submit-edit",
                formAction: "/records/edit",
                navLocation: "records",
                validationErrors: err.errors
            });
        });
}

exports.deleteRecord = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.deleteRecord(recordId)
        .then(() => {
            res.redirect("/records#popup-delete");
        });
}